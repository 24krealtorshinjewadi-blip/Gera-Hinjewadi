# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 2.x.x   | ✅ Active support  |
| 1.x.x   | ❌ End of life     |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue.
2. Email the project maintainer directly with:
   - Description of the vulnerability
   - Steps to reproduce
   - Impact assessment
3. You will receive an acknowledgment within **48 hours**.

## Security Measures

This platform implements the following security practices:

### Authentication & Authorization
- **JWT session cookies** (`httpOnly`, `secure`, `SameSite=Lax`) for admin authentication.
- **Server-side proxy** guards all `/admin` routes before page render.
- **No client-side token storage** — credentials are never exposed to browser JavaScript.

### Data Protection
- **Environment variables** for all secrets (Supabase keys, JWT secret, Twilio tokens).
- **Supabase Row Level Security (RLS)** enabled on all tables.
- **Service role client** used only in authenticated server-side API routes.
- **Input validation** via Zod schemas on all form submissions and API payloads.

### Infrastructure
- **HTTPS enforced** via Vercel deployment (automatic SSL/TLS).
- **No hardcoded credentials** anywhere in the codebase.
- **`.env*` files excluded** from version control via `.gitignore`.

### Repository & Development Security
- **Branch Protection Rules**: Restrict force pushes, direct commits, and deletion on both `master` and `develop` branches.
- **Pull Request Review Rules**: All code changes to `master` require a Pull Request, at least 1 approval, and must pass the CI pipeline before merging.
- **Code Ownership**: Configured code ownership (`.github/CODEOWNERS`) to enforce code reviews by authorized owners.
- **CI/CD Enforcement**: Actions workflows run automatically on push/PRs to verify linting, typescript types, tests, and build status.

## Best Practices for Deployment

1. **Change default passwords** — Update `ADMIN_PASSWORD` from the default `admin1234`.
2. **Generate strong JWT secret** — Use a cryptographically random string (≥ 32 chars).
3. **Restrict Supabase RLS** — Tighten policies for production environments.
4. **Enable 2FA** on your Supabase, Vercel, and GitHub accounts.
