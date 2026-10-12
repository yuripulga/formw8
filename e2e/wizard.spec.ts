import { test, expect, Page } from "@playwright/test";

// Valid synthetic documents (check digits are correct, they do not belong to anyone).
const CPF = "52998224725";
const CNPJ = "11222333000181";

// The step counter is rendered twice (mobile and desktop slots); only one is visible.
function stepIs(page: Page, n: number) {
  return page
    .getByText(new RegExp(`STEP ${n} OF 4|PASSO ${n} DE 4`, "i"))
    .locator("visible=true")
    .first();
}

async function fillName(page: Page, name: string) {
  const input = page.locator("#user-name-input");
  await input.fill(name);
  return input;
}

async function fillAddressManually(page: Page) {
  await page.getByRole("button", { name: /manualmente|manually/i }).click();
  await page.getByPlaceholder(/00000-000/).fill("01310100");
  await page.getByPlaceholder(/Av\. Paulista, 1000/i).fill("Avenida Paulista, 1000");
  await page.getByPlaceholder(/São Paulo|Sao Paulo/i).fill("Sao Paulo");
  await page.getByPlaceholder(/^SP$|e\.g\. SP|ex: SP/i).fill("SP");
}

test.beforeEach(async ({ page }) => {
  // Keep the suite hermetic: public CEP/CNPJ lookups must never hit the network.
  await page.route(/viacep\.com\.br|brasilapi\.com\.br|minhareceita\.org|cnpj\.ws/, (route) =>
    route.abort()
  );
  await page.goto("/");
});

test("pressing Enter on the name field stops at step 2 and does not auto-select an entity", async ({
  page,
}) => {
  const input = await fillName(page, "Maria Teste Silva");
  await input.press("Enter");
  await expect(stepIs(page, 2)).toBeVisible();
});

test("browser Back and Forward move between wizard steps", async ({ page }) => {
  const input = await fillName(page, "Maria Teste Silva");
  await input.press("Enter");
  await expect(stepIs(page, 2)).toBeVisible();

  await page.goBack();
  await expect(stepIs(page, 1)).toBeVisible();

  await page.goForward();
  await expect(stepIs(page, 2)).toBeVisible();
});

test("an empty name shows a validation error and keeps the user on step 1", async ({ page }) => {
  await page.getByRole("button", { name: /Next step|Próximo|Avançar/i }).click();
  await expect(stepIs(page, 1)).toBeVisible();
  await expect(page.locator("#user-name-input")).toBeVisible();
});

test("PF flow reaches the last step and downloads a W-8BEN PDF", async ({ page }) => {
  const input = await fillName(page, "Maria Teste Silva");
  await input.press("Enter");

  await page.getByRole("radio").first().click();
  await expect(stepIs(page, 3)).toBeVisible();

  await page.getByPlaceholder(/000\.000\.000-00/).fill(CPF);
  await fillAddressManually(page);
  await page.getByRole("button", { name: /Next step|Próximo|Avançar/i }).click();

  await expect(page.getByText(/W-8BEN/).first()).toBeVisible({ timeout: 20_000 });
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Download|Baixar/i }).first().click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^W-8BEN_.*\.pdf$/);
});

test("PJ flow (CNPJ) produces a W-8BEN-E file name", async ({ page }) => {
  const input = await fillName(page, "Maria Teste Silva");
  await input.press("Enter");

  await page.getByRole("radio").nth(2).click();
  await page.getByRole("radio").nth(2).click();
  await expect(stepIs(page, 3)).toBeVisible();

  await page.getByLabel(/CNPJ da empresa|Company CNPJ/i).fill(CNPJ);
  await page.getByLabel(/Razão Social|Company name|Registered/i).fill("Acme Tech Ltda");
  await fillAddressManually(page);
  await page.getByRole("button", { name: /Next step|Próximo|Avançar/i }).click();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Download|Baixar/i }).first().click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^W-8BEN-E_.*\.pdf$/);
});

test("Holding questions drive the Active/Passive NFFE classification", async ({ page }) => {
  const input = await fillName(page, "Maria Teste Silva");
  await input.press("Enter");

  await page.getByRole("radio").nth(2).click(); // Empresa SLU / LTDA
  await page.getByRole("radio", { name: /Holding/i }).click();

  // Both answers start as "no" -> Active NFFE
  await expect(page.getByText(/se enquadra como Active NFFE|qualifies as Active NFFE/i)).toBeVisible();

  // Passive income at least 50% -> Passive NFFE
  await page.getByRole("switch").first().click();
  await expect(page.getByText(/enquadrada como Passive NFFE|classified as Passive NFFE/i)).toBeVisible();

  // Turning it off again goes back to Active NFFE
  await page.getByRole("switch").first().click();
  await expect(page.getByText(/se enquadra como Active NFFE|qualifies as Active NFFE/i)).toBeVisible();

  // Passive assets at least 50% also leads to Passive NFFE
  await page.getByRole("switch").nth(1).click();
  await expect(page.getByText(/enquadrada como Passive NFFE|classified as Passive NFFE/i)).toBeVisible();
});
