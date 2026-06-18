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

1. Create a feature branch from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally.

3. Ensure the project builds without errors:
   ```bash
   npm run build
   ```

4. Run the linter:
   ```bash
   npm run lint
   ```

5. Commit with a clear, descriptive message:
   ```bash
   git commit -m "feat: add agent performance dashboard"
   ```

6. Push and open a Pull Request.

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
