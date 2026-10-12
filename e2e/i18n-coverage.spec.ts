import { test, expect, Page } from "@playwright/test";

/**
 * Guards translation coverage: no Portuguese UI text may leak into another locale.
 * It walks the pages, every wizard step (including validation errors), the modals and the
 * FAQ, then looks at visible text, accessibility attributes and metadata.
 */

// Words and accents that give Portuguese away. Proper nouns and Brazilian terms are removed first.
const PORTUGUESE =
  /[áàâãéêíóôõúçÁÉÍÓÚÇ]|\b(você|voce|não|nao|para|uma|dos|das|sua|seu|pelo|pela|isso|também|mais|menos|quando|onde|como|empresa|pessoa|física|jurídica|formulário|preencher|baixar|próximo|voltar|avançar|passo|gerar|guia|plataforma|receber|pagamentos|exterior|imposto|retenção|endereço|razão|social|buscar|fechar|abrir|copiar|copiado|sim|apoiar)\b/i;
const BRAZILIAN_TERMS =
  /\b(Carnê-Leão|CPF|CNPJ|CEP|MEI|SLU|LTDA|Simples Nacional|Fator R|Pix|Receita Federal|Lucro Presumido|pró-labore|Brasil)\b/gi;

// Intentional: the language name in its own language and the FAQ about accented characters.
const ALLOWED = [/^Português$/, /accents \(á, ç, õ\)/, /Accented characters or special symbols/];

async function collect(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const out: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (!el || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) continue;
      const text = node.textContent?.trim();
      if (text) out.push(text);
    }
    for (const el of Array.from(document.querySelectorAll("[alt],[aria-label],[title],[placeholder]"))) {
      for (const attr of ["alt", "aria-label", "title", "placeholder"]) {
        const value = el.getAttribute(attr);
        if (value) out.push(value);
      }
    }
    out.push(document.title);
    for (const meta of Array.from(
      document.querySelectorAll(
        'meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"],meta[name="keywords"]'
      )
    )) {
      out.push((meta as HTMLMetaElement).content);
    }
    return out;
  });
}

async function leaks(page: Page): Promise<string[]> {
  const found = new Set<string>();
  for (const raw of await collect(page)) {
    const text = raw.replace(BRAZILIAN_TERMS, "").replace(/\s+/g, " ").trim();
    if (text.length < 3 || !PORTUGUESE.test(text)) continue;
    if (ALLOWED.some((rule) => rule.test(raw.trim()))) continue;
    found.add(raw.trim().slice(0, 120));
  }
  return [...found];
}

const PLATFORMS = [
  "deel", "rippling", "upwork", "remote", "google-adsense", "apple-developer", "steam",
  "github-sponsors", "stripe", "payoneer", "fiverr", "turing", "toptal",
];

test.beforeEach(async ({ page }) => {
  await page.route(/viacep\.com\.br|brasilapi\.com\.br|minhareceita\.org|cnpj\.ws/, (route) => route.abort());
});

test.describe("English coverage (/en has no Portuguese UI text)", () => {
  // An English browser: the language notice then points to nothing on /en pages.
  test.use({ locale: "en-US" });

  test("static pages, platform guides, pillar pages and 404", async ({ page }) => {
    const urls = [
      "/en",
      "/en/w8ben-individual",
      "/en/w8bene-company",
      ...PLATFORMS.map((slug) => `/en/platforms/${slug}`),
      "/en/this-page-does-not-exist",
    ];
    for (const url of urls) {
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      expect(await leaks(page), url).toEqual([]);
    }
  });

  test("wizard steps with validation errors, PF/MEI/PJ and Passive classification", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /next/i }).first().click();
    expect(await leaks(page), "step 1 error").toEqual([]);

    const name = page.locator("#user-name-input");
    await name.fill("José Müller Ørsted");
    expect(await leaks(page), "step 1 sanitize notice").toEqual([]);
    await name.press("Enter");
    expect(await leaks(page), "step 2").toEqual([]);

    await page.getByRole("radio").nth(2).click();
    await page.getByRole("radio", { name: /Holding/i }).click();
    await page.getByRole("switch").first().click();
    expect(await leaks(page), "step 2 holding passive").toEqual([]);

    await page.getByRole("radio").nth(2).click();
    await page.getByRole("button", { name: /next/i }).first().click();
    expect(await leaks(page), "step 3 PJ").toEqual([]);
    await page.getByRole("button", { name: /next/i }).first().click();
    expect(await leaks(page), "step 3 PJ errors").toEqual([]);

    await page.getByLabel(/CNPJ da empresa|Company CNPJ/i).fill("11222333000181");
    await page.getByLabel(/Company Legal Name/i).fill("Acme Tech Ltda");
    // The manual fields are already open after the validation errors above.
    const manual = page.getByRole("button", { name: /manualmente|manually/i });
    if (await manual.count()) await manual.click();
    await page.getByPlaceholder(/00000-000/).fill("01310100");
    await page.getByPlaceholder(/Av\. Paulista, 1000/i).fill("Avenida Paulista, 1000");
    await page.getByPlaceholder(/São Paulo|Sao Paulo/i).fill("Sao Paulo");
    await page.getByPlaceholder(/^SP$|e\.g\. SP|ex: SP/i).fill("SP");
    await page.getByRole("button", { name: /next/i }).first().click();
    await expect(page.getByRole("button", { name: /Download/i }).first()).toBeVisible({ timeout: 20_000 });
    expect(await leaks(page), "step 4 PJ passive").toEqual([]);

    // Platform tabs and the full list of fields
    for (const tab of ["Deel", "Rippling", "Upwork", "Google", "Steam"]) {
      const button = page.getByRole("button", { name: new RegExp(tab, "i") }).first();
      if (await button.count()) {
        await button.click();
        expect(await leaks(page), `step 4 tab ${tab}`).toEqual([]);
      }
    }
    const showAll = page.getByRole("button", { name: /show all/i });
    if (await showAll.count()) {
      await showAll.first().click();
      expect(await leaks(page), "step 4 all fields").toEqual([]);
    }
  });

  test("support modal, search modal and the expanded FAQ", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /support|pix/i }).first().click();
    expect(await leaks(page), "support modal").toEqual([]);
    await page.keyboard.press("Escape");

    await page.keyboard.press("Control+k");
    expect(await leaks(page), "search modal").toEqual([]);
    await page.keyboard.type("deel");
    expect(await leaks(page), "search results").toEqual([]);
    await page.keyboard.press("Escape");

    const questions = page.locator('[id^="faq-btn-"]');
    const count = await questions.count();
    for (let i = 0; i < count; i++) await questions.nth(i).click();
    expect(await leaks(page), "FAQ expanded").toEqual([]);
  });

  test("mobile viewport and dark mode", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US", viewport: { width: 390, height: 844 }, colorScheme: "dark" });
    const page = await context.newPage();
    for (const url of ["/en", "/en/platforms/deel"]) {
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      expect(await leaks(page), `${url} mobile dark`).toEqual([]);
    }
    await context.close();
  });
});
