# Repository Rules & AI Agent Instructions

## 🚨 Mandatory Rules (Source of Truth & Governance)

### 1. Source of Truth Documentation & Execution Plan
* `docs/TECHNICAL_SPEC.md` and `docs/EXECUTION_PLAN.md` are the single source of truth for this project.
* **EVERY TASK / COMMIT RULE:** After completing any feature, fix, or structural change, you MUST update `docs/EXECUTION_PLAN.md` (updating item status: `[ ]` To Do, `[~]` In Progress, `[x]` Done) and any relevant section in `docs/TECHNICAL_SPEC.md`.

### 2. Git Commit & Push Approval
* **NEVER** run `git commit` or `git push` without explicit user confirmation and approval.

### 3. Internationalization (i18n) Mandatory
* **NEVER** hardcode user-facing strings or numbers in components or pages.
* All UI copy, questions, labels, error messages, and descriptions must be managed through translation dictionary files (i18n).

### 4. Design System & Styling Strictness
* **NEVER** create custom arbitrary styles outside the defined Design System (Tailwind CSS configuration/theme) unless explicitly requested and approved by the user.

### 5. Next.js Best Practices & Architecture
* Follow strict Next.js App Router conventions:
  * Default to React Server Components (RSC) where possible.
  * Use Client Components (`"use client"`) only when interactive state, browser APIs, or event listeners are required.
  * Maintain Zero-Data Client-Side Architecture (all W-8 form processing, regex sanitization, and PDF generation happen in the browser; no user data stored on servers).
  * Enforce strict TypeScript types and zero runtime type coercion errors.

### 6. Release Lifecycle & Deployment Gate
* The mandatory delivery process is:
  1. **Working Branch:** Develop and verify changes in a dedicated branch.
  2. **Code Review & Static Analysis:** Rigorous verification of types, lints, i18n, and edge cases.
  3. **Commit & Push:** Only performed after explicit user approval.
  4. **Manual Validation Gate:** Pause for user manual testing and review.
  5. **Explicit Merge & Deploy Approval:** Deployment to Firebase Hosting only proceeds after explicit confirmation and sign-off by the user.

