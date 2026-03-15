# `.cursor` / `.claude` Hygiene Checklist

Stand: 2026-03-15

Ziel: Konfigurations-Sicherheit und Konsistenz prüfen, ohne Änderungen an Website-Features/Design zu erzwingen.

## `.cursor` (Projektregeln, Hooks, Skills)

### Rules Konsistenz
- **Check**: Regeln sind in `.cursor/rules/*.md` (nicht `.mdc`) abgelegt.
- **Akzeptanzkriterium**: Keine widersprüchlichen “alwaysApply” Regeln für Security/Workflow/TypeScript.

### Hooks aktiv & nachvollziehbar
- **Check**: `.cursor/hooks.json` definiert u.a. Shell/MCP/ReadFile Hooks.
- **Akzeptanzkriterium**: Hooks sind nachvollziehbar dokumentiert, und verhindern Secret-Leaks (z.B. `.env`-Reads/Prompt).

### Skills sauber im Repo
- **Check**: `.cursor/skills/*` vorhanden.
- **Akzeptanzkriterium**: Skills enthalten keine Secrets und sind für Team/CI unkritisch.

## `.mcp.json` (MCP Server)

### Supply-chain Risiko (npx latest)
- **Check**: MCP Server nutzt `npx -y @playwright/mcp@latest`.
- **Akzeptanzkriterium**: Bewusste Entscheidung dokumentiert (latest vs pinned). Für stabile Production-Workflows ist “pinned version” i.d.R. besser.

## `.claude` (falls im Repo genutzt)

### Security Scan (AgentShield)
- **Check**: Regelmäßiger Scan der `.claude/` Konfig (Keys, allowlists, hooks, prompt-injection surface).
- **Akzeptanzkriterium**: Keine Findings ≥ medium, oder dokumentierte Mitigations.

## Git Hygiene (Secrets)
- **Check**: `.env.local` ist in `berneby-website/.gitignore` ignoriert — gut.
- **Akzeptanzkriterium**: Keine Secret-Dateien im Git-Index (z.B. `.env*`, `.pem`, `.key`).

