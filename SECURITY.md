# Política de Segurança — FormW8

## 🔒 Nosso Compromisso com a Privacidade
O FormW8 foi projetado desde o primeiro dia com **Zero-Data Architecture**:
* Nenhum dado preenchido (Nome, CPF, CNPJ, Endereço) é armazenado em banco de dados ou transmitido para servidores de terceiros.
* Toda a lógica de sanitização e geração do arquivo PDF é executada de forma isolada na sandbox de JavaScript do navegador do usuário (`pdf-lib`).

---

## 🚨 Reportando Vulnerabilidades
Se você descobrir uma potencial vulnerabilidade de segurança neste projeto (por exemplo, vazamento inadvertido de dados, falha de sanitização XSS ou vulnerabilidade de dependências), por favor **não abra uma issue pública**.

Envie os detalhes da vulnerabilidade diretamente para o mantenedor através de mensagem privada ou abrindo um **Security Advisory** confidencial no repositório do GitHub.

Inclua as seguintes informações:
1. Descrição clara da vulnerabilidade.
2. Passos para reproduzir o problema.
3. Impacto potencial estimado.
4. Possível sugestão de correção (se houver).

Responderemos e corrigiremos problemas críticos o mais rápido possível.
