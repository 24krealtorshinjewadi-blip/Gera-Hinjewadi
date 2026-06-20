# Git Flow Branching Strategy & Workflow Guide

This document defines the branching model, development workflow, and release lifecycle for the **Gera Developments CRM** project. All developers must follow these practices to maintain code quality, history clarity, and deployment stability.

---

## 🗺️ Branching Strategy

Our repository uses a tailored version of the **Git Flow** strategy, structured around two permanent branches and several short-lived supporting branches.

```mermaid
gitGraph
    commit id: "Initial Release (v1.0)" tag: "v1.0"
    branch develop
    checkout develop
    commit id: "Setup boilerplate"
    branch feature/leads-filtering
    checkout feature/leads-filtering
    commit id: "Add search input"
    commit id: "Add filter dropdown"
    checkout develop
    merge feature/leads-filtering
    branch release/v2.0
    checkout release/v2.0
    commit id: "Bump version to v2.0"
    checkout master
    merge release/v2.0 tag: "v2.0"
    checkout develop
    merge release/v2.0
```

### 1. Permanent Branches
*   **`master`**: Houses production-ready code. Commits on `master` correspond directly to production releases. No direct commits or pushes are permitted.
*   **`develop`**: The primary integration branch for development. Contains the latest delivered development changes for the next release.

### 2. Supporting Branches (Short-Lived)
All supporting branches must follow the naming conventions below and are eventually merged back and deleted.

| Branch Namespace | Source Branch | Target Branch | Purpose |
| :--- | :--- | :--- | :--- |
| **`feature/*`** | `develop` | `develop` | Adding new features or enhancements. |
| **`fix/*`** | `develop` | `develop` | Standard bug fixes. |
| **`hotfix/*`** | `master` | `master` & `develop` | Critical bugs found in production that require immediate fixing. |
| **`release/*`** | `develop` | `master` & `develop` | Release preparation (metadata updates, final polish). |
| **`refactor/*`** | `develop` | `develop` | Code restructuring with no logic/feature changes. |
| **`chore/*`** | `develop` | `develop` | Dependency updates, tooling setup, house-keeping tasks. |
| **`docs/*`** | `develop` | `develop` | Documentation updates (README, manuals, etc.). |

---

## 🛠️ Step-by-Step Development Flow

### Feature Development Example
1.  **Checkout to `develop` and sync:**
    ```bash
    git checkout develop
    git pull origin develop
    ```
2.  **Create your supporting branch:**
    ```bash
    git checkout -b feature/leads-whatsapp-alerts
    ```
3.  **Implement your changes, run validation scripts locally:**
    ```bash
    npm run lint       # Run ESLint check
    npm run test       # Run local test suite
    npm run build      # Verify next.js build compiles
    ```
4.  **Commit with Conventional Commits rules:**
    ```bash
    git add .
    git commit -m "feat: add twilio whatsapp alerts on lead capture"
    ```
5.  **Push and Open a Pull Request:**
    Push your branch to GitHub:
    ```bash
    git push -u origin feature/leads-whatsapp-alerts
    ```
    Open a Pull Request targeting the **`develop`** branch on GitHub. Do NOT target `master`.

---

## 🔒 Branch Protection Rules & CI Checks

To enforce our workflow, the following Branch Protection Rules are configured on GitHub:

### `master` Branch Protection
*   **No Direct Commits**: Pushing directly to `master` is disabled.
*   **PR Required**: Changes must come from a Pull Request.
*   **Approvals Required**: At least **1 approving review** from a code owner is required before merging.
*   **Stale Review Dismissal**: Reviews are dismissed automatically when new commits are pushed.
*   **Status Checks**: The GitHub Actions CI check (`Build, Lint, Typecheck, and Test`) must pass.
*   **Conversation Resolution**: All review threads must be resolved.
*   **No Force Pushes / Deletion**: Enforced globally.

### `develop` Branch Protection
*   **PR Required**: Changes must come from a Pull Request.
*   **Status Checks**: The GitHub Actions CI check must pass.
*   **No Force Pushes / Deletion**: Enforced globally to prevent history rewriting.
