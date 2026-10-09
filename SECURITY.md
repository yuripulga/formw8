# Security & Privacy Policy — FormW8

## 🔒 Zero-Data Client-Side Architecture

FormW8 is architected on a strict **Zero-Data Client-Side Foundation**:
* **Zero Backend Storage:** No personal data (Full Legal Name, CPF, CNPJ, Address, Zip Code, Tax Information) is ever sent to, processed by, or stored on FormW8 servers or third-party tracking databases.
* **In-Browser Processing:** All ASCII character sanitization, FATCA rule validation, field mapping, and official IRS PDF generation happen 100% inside your browser runtime memory via `pdf-lib`.
* **Public Directory Lookups (Optional / Transparent):** Automated address lookup (by CEP) and corporate name lookup (by CNPJ) are optional convenience features. When utilized, your browser directly queries open Brazilian public data providers (BrasilAPI, Minha Receita, CNPJ.ws, ViaCEP) without passing through or logging to FormW8 infrastructure. You can fill in all fields manually and operate entirely offline at any time.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or data exposure risk, please **do not open a public GitHub issue**.

Report vulnerabilities confidentially via:
1. **Direct Security Email:** [`info@quimera.biz`](mailto:info@quimera.biz?subject=Security%20Advisory%20FormW8)
2. **Confidential GitHub Security Advisory:** Via the repository's Security tab.

### What to include in your report:
- Clear description of the vulnerability.
- Minimal step-by-step reproduction guide or proof-of-concept.
- Scope and impact assessment.
- Suggested mitigation or patch, if available.

We commit to acknowledging receipt within 24 hours and releasing verified patches immediately.

---

<details>
<summary><b>🇧🇷 Política de Segurança e Privacidade em Português</b></summary>

### 🔒 Arquitetura Zero-Data e Privacidade 100% no Navegador
* **Zero Armazenamento em Servidores:** O FormW8 não possui backend de coleta e não armazena nenhuma informação pessoal (Nome, CPF, CNPJ, Endereço ou Dados Fiscais).
* **Processamento 100% no Dispositivo:** Todas as transformações de texto, validação de regras fiscais americanas e geração dos PDFs oficiais da IRS acontecem exclusivamente na memória do navegador do usuário (`pdf-lib`).
* **Consultas Públicas Transparentes de CEP e CNPJ:** As consultas automáticas de CEP e CNPJ são feitas diretamente pelo navegador para serviços públicos abertos (BrasilAPI, Minha Receita, CNPJ.ws, ViaCEP). Nenhum dado passa por servidores do FormW8, e o usuário pode optar a qualquer momento por preencher todos os dados manualmente de forma offline.

### 🚨 Como Reportar Vulnerabilidades
Envie um e-mail confidencial para **[`info@quimera.biz`](mailto:info@quimera.biz?subject=Security%20Advisory%20FormW8)** ou abra um GitHub Security Advisory confidencial no repositório.

</details>
