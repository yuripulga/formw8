# Security Policy — FormW8

## 🔒 Zero-Data Privacy Pledge
FormW8 is architected from the ground up on a strict **Zero-Data Client-Side Architecture**:
* **No personal identifying data** (Name, CPF, CNPJ, Address, Postal Code) is ever collected, transmitted, or saved to remote servers, databases, or analytics providers.
* All ASCII regex sanitization, ZIP/CNPJ autofill lookups, and PDF generation execute strictly inside the client's browser runtime memory (`pdf-lib`).

---

## 🚨 Reporting a Vulnerability
If you discover a potential security vulnerability (such as unintended data leakage, client-side XSS, or vulnerable dependency vectors), please **do not open a public GitHub issue**.

Please report vulnerabilities privately:
1. Open a confidential **GitHub Security Advisory** on the repository, or
2. Contact the maintainer directly via GitHub profile contact details.

### What to include in your report:
- A clear description of the vulnerability.
- Minimal reproduction steps or proof of concept.
- Potential impact assessment.
- Suggested fix or mitigation, if available.

We will review, acknowledge, and resolve critical vulnerabilities promptly.

---

<details>
<summary><b>🇧🇷 Política de Segurança em Português</b></summary>

### 🔒 Compromisso de Privacidade Zero-Data
O FormW8 opera sob arquitetura 100% Client-Side: nenhum dado preenchido (Nome, CPF, CNPJ, Endereço) é armazenado em servidores ou bancos de dados externos.

### 🚨 Como reportar vulnerabilidades
Se você identificar qualquer falha de segurança, por favor não abra uma issue pública. Envie um **Security Advisory** confidencial através do repositório do GitHub.

</details>
