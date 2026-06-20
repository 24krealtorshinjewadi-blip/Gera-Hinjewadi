# Contributing to Gera Developments – Hinjewadi Sales Platform

Thank you for your interest in contributing! This guide will help you get started.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Supabase** account (for database backend)
- **Git** installed and configured

### Setup

1. **Fork & clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/Gera-Developments.git
   cd Gera-Developments
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**: Copy `.env.example` → `.env.local` and fill in your credentials.

4. **Initialize database**: Run `database.sql` in your Supabase SQL Editor.

5. **Start dev server**:
   ```bash
   npm run dev
   ```

---

## 📋 Development Workflow

Our project uses the **Git Flow** strategy. All development branches must branch off of and target the `develop` branch. Pushing directly to `master` or `develop` is prohibited.

For complete details on our branching strategy and conventions, see our [Git Flow Workflow Guide](docs/git-flow-workflow.md).

### Creating a Feature or Fix:

1.  **Checkout to `develop` and sync:**
    ```bash
    git checkout develop
    git pull origin develop
    ```

2.  **Create your supporting branch** (use prefixes like `feature/`, `fix/`, `refactor/`, etc.):
    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Make your changes and test locally:**
    Ensure linter, tests, and build all pass cleanly:
    ```bash
    npm run lint       # Run ESLint check
    npm run test       # Run unit test suite
    npm run build      # Verify build compiles
    ```

4.  **Commit with a clear, descriptive message** following Conventional Commits:
    ```bash
    git commit -m "feat: add agent performance dashboard"
    ```

5.  **Push and open a Pull Request targeting `develop`:**
    ```bash
    git push -u origin feature/your-feature-name
    ```
    Open the PR on GitHub targeting the **`develop`** branch.

---

## 🏷️ Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | Purpose                          |
|------------|----------------------------------|
| `feat:`    | New feature                      |
| `fix:`     | Bug fix                          |
| `docs:`    | Documentation changes            |
| `style:`   | Formatting (no logic change)     |
| `refactor:`| Code restructuring               |
| `perf:`    | Performance improvement          |
| `chore:`   | Maintenance / dependency updates |

---

## 🏗️ Project Architecture

```
src/
├── app/           # Next.js App Router pages & API routes
├── components/    # Reusable React components
├── lib/           # Utilities (auth, DB clients, storage)
└── proxy.ts       # Route guard for admin paths
```

### Key Patterns
- **Supabase + CSV fallback**: All data operations attempt Supabase first, falling back to local CSV for development.
- **Server-side auth**: JWT sessions managed via `httpOnly` cookies.
- **Zod validation**: All form inputs validated with Zod schemas.

---

## 🐛 Reporting Issues

Open an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if UI-related)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
