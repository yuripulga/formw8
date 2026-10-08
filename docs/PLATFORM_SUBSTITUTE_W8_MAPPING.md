# Mapeamento de Telas: Substitute W-8 das Principais Plataformas Globais

Este documento mapeia como os campos oficiais do IRS (W-8BEN e W-8BEN-E) se traduzem nos formulários digitais internos (*Substitute Forms*) das principais plataformas de contratação internacional.

---

## 🌐 1. Deel (Contractor Tax & Compliance Onboarding)

A Deel utiliza um formulário web dinâmico (*Substitute W-8BEN-E* para PJ e *Substitute W-8BEN* para PF).

| Campo na Deel | Tipo de Dado / Opção Correta | Correspondente no FormW8 |
| :--- | :--- | :--- |
| **Tax Classification** | `Corporation` (para SLU, LTDA, ME) | Passo 2: PJ $\rightarrow$ `Corporation` |
| **Chapter 3 Classification** | `Corporation` | Passo 4: Cartão Linha 4 (Chapter 3) |
| **Chapter 4 FATCA Classification** | `Active NFFE` (Atividade Operacional) | Passo 4: Cartão Linha 5 (Chapter 4) |
| **Foreign Tax Identifying Number (TIN)** | Digitar o **CNPJ** (PJ) ou **CPF** (PF) | Passo 3: CNPJ/CPF sanitizado (Linha 9b) |
| **Country of Incorporation** | `Brazil` | Linha 2: Brazil |
| **Permanent Residence Address** | Rua, Número, Bairro, Cidade, UF | Passo 3: Endereço sem acentos (Linha 6a) |
| **Treaty Benefits / Claim** | *No / Foreign Source Income (0% Withholding)* | Part III: Isenção fiscal por fonte estrangeira |
| **Signer Name & Capacity** | Nome do Administrador / `Owner` ou `Officer` | Nome completo sanitizado |

---

## ⚡ 2. Rippling (Contractor Tax Documents)

| Campo no Rippling | Opção Correta no Brasil | Correspondente no FormW8 |
| :--- | :--- | :--- |
| **Legal Business Name** | Razão Social Completa | Passo 3: Razão Social da Empresa |
| **Tax ID Type** | `Foreign Tax Identification Number` | Passo 3: CNPJ sem pontuação |
| **Entity Classification** | `Corporation` | Passo 2: PJ |
| **FATCA Status** | `Active NFFE` | Passo 4: Cartão FATCA |
| **Signer Title** | `Managing Partner` / `Owner` | Nome do titular |

---

## 💼 3. Upwork (W-8BEN Tax Residency)

| Campo no Upwork | Opção Correta no Brasil | Correspondente no FormW8 |
| :--- | :--- | :--- |
| **Legal Name of Business / Taxpayer** | Razão Social (PJ) ou Nome Civil (PF) | Passo 1 ou Passo 3 |
| **Federal Tax Classification** | `Corporation` (PJ) ou `Individual` (PF) | Passo 2 |
| **Foreign Tax Identification Number (TIN)** | CNPJ ou CPF | Passo 3: CNPJ/CPF |
| **Tax Residence Country** | `Brazil` | Linha 2 |

---

## 🎮 4. Google AdSense / YouTube & Steamworks (Valve)

| Plataforma | Campo no Questionário Fiscal | Opção Correta para Brasil |
| :--- | :--- | :--- |
| **Google AdSense** | *Tipo de Conta:* Pessoa Jurídica ou Física | Passo 2: PJ ou PF |
| **Google AdSense** | *Tratado Fiscal (Tax Treaty):* Não (Serviços prestados fora dos EUA) | 0% Withholding / Foreign Source |
| **Steamworks (Valve)** | *Beneficial Owner Type:* Corporation | W-8BEN-E: Corporation |
| **Steamworks (Valve)** | *Foreign TIN:* CNPJ da produtora/estúdio | CNPJ sanitizado |
