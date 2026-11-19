
## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. The
skill has multi-step workflows, checklists, and quality gates that produce better
results than an ad-hoc answer. When in doubt, invoke the skill. A false positive is
cheaper than a false negative.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke /office-hours
- Strategy, scope, "think bigger", "what should we build" → invoke /plan-ceo-review
- Architecture, "does this design make sense" → invoke /plan-eng-review
- Design system, brand, "how should this look" → invoke /design-consultation
- Design review of a plan → invoke /plan-design-review
- Developer experience of a plan → invoke /plan-devex-review
- "Review everything", full review pipeline → invoke /autoplan
- Bugs, errors, "why is this broken", "wtf", "this doesn't work" → invoke /investigate
- Test the site, find bugs, "does this work" → invoke /qa (or /qa-only for report only)
- Code review, check the diff, "look at my changes" → invoke /review
- Visual polish, design audit, "this looks off" → invoke /design-review
- Developer experience audit, try onboarding → invoke /devex-review
- Ship, deploy, create a PR, "send it" → invoke /ship
- Merge + deploy + verify → invoke /land-and-deploy
- Configure deployment → invoke /setup-deploy
- Post-deploy monitoring → invoke /canary
- Update docs after shipping → invoke /document-release
- Weekly retro, "how'd we do" → invoke /retro
- Second opinion, codex review → invoke /codex
- Safety mode, careful mode, lock it down → invoke /careful or /guard
- Restrict edits to a directory → invoke /freeze or /unfreeze
- Upgrade gstack → invoke /gstack-upgrade
- Save progress, "save my work" → invoke /context-save
- Resume, restore, "where was I" → invoke /context-restore
- Security audit, OWASP, "is this secure" → invoke /cso
- Make a PDF, document, publication → invoke /make-pdf
- Launch real browser for QA → invoke /open-gstack-browser
- Import cookies for authenticated testing → invoke /setup-browser-cookies
- Performance regression, page speed, benchmarks → invoke /benchmark
- Review what gstack has learned → invoke /learn
- Tune question sensitivity → invoke /plan-tune
- Code quality dashboard → invoke /health

## Deploy Configuration (configured by /setup-deploy)
- Platform: Vercel
- Production URL: https://mercedroofingpro.com
- Deploy workflow: auto-deploy on push to main (GitHub → Vercel integration)
- Deploy status command: HTTP health check
- Merge method: squash
- Project type: web app (Next.js 14)
- Post-deploy health check: https://mercedroofingpro.com

### Custom deploy hooks
- Pre-merge: npm run build
- Deploy trigger: automatic on push to main
- Deploy status: poll production URL
- Health check: https://mercedroofingpro.com

### Notes
- GitHub repo: https://github.com/Izac187/local-lead-sites (renamed from merced-roofing-pros 2026-11-18; old URL redirects)
- Vercel project: izac187s-projects/merced-roofing-pros (deployed 2026-05-13)
- GitHub → Vercel auto-deploy: connect manually in Vercel dashboard → Settings → Git (CLI connection failed but direct deploy worked)
- Env vars set via Vercel CLI: RESEND_API_KEY, LEAD_EMAIL (contact form email delivery)
- Custom domain: mercedroofingpro.com live (Hostinger nameservers → ns1/ns2.vercel-dns.com, propagated 2026-05-16)
- Merced env vars: RESEND_API_KEY, LEAD_EMAIL, SITE_DOMAIN=mercedroofingpro.com (drives sitemap host + *.vercel.app 301; added 2026-11-17)
- Hanford HVAC Vercel project: izac187s-projects/hanford-hvac-pros (prj_rzkItL3TLaPcOHXMUmbdX6gufwq5), same repo, env NEXT_PUBLIC_SITE=hanford-hvac. Created 2026-11-17; live at https://hanford-hvac-pros.vercel.app, no custom domain yet. Needs RESEND_API_KEY, LEAD_EMAIL, SITE_DOMAIN once the domain exists.
- Multi-site rule: one repo, one Vercel project per site. New site = config/sites/<slug>/ + registry entry + Vercel project with NEXT_PUBLIC_SITE=<slug>.

<!-- agent-handoff-protocol:v1 -->
## Durable context protocol

- Treat chat transcripts and agent-specific memory as temporary. Put decisions, constraints, progress, and unresolved questions in repository files.
- Keep project-specific commands, architecture, conventions, and validation steps in this file.
- Keep the root `CLAUDE.md` as `@AGENTS.md` plus only genuinely Claude-specific instructions.
- For material multi-step work, create or continue one file in `docs/plans/` using the plan template.
- Before transferring work or ending a session, update the active plan's `## Handoff` with completed work, validation, skipped work, surprises, and the exact next step.
- Review the working tree and the active plan before continuing another agent's work. Do not assume its transcript is available.
- Keep plan and handoff changes in the same commit as the work they describe when practical. Never claim a commit exists without verifying it.

## Design System
Always read the ACTIVE SITE's design file before making any visual or UI decisions:
- Merced (default, `NEXT_PUBLIC_SITE` unset or `merced`): root `DESIGN.md`
- Hanford HVAC: `config/sites/hanford-hvac/DESIGN.md` ("Pool at Dusk")
- New sites: add `config/sites/<slug>/DESIGN.md` and a `theme` block in that site's config
Theme tokens are per-site (`siteConfig.theme` → CSS vars in `app/layout.tsx`); components must read `var(--…)`, never hardcode a site's colors or fonts. The Merced rules below apply to Merced only.
Fonts: Bebas Neue (display/headings) + DM Sans (body). Colors: tar black (#1A1208) dark surfaces, Merced ember (#E8521A) CTAs, bleached concrete (#F5ECD7) page background.
Service cards use numbered style (01–04) — no icon tiles, no emoji anywhere.
All nav links must scroll to in-page sections — no standalone About/Contact pages.
Business hours (Mon–Sat, 7am–8pm) must appear everywhere the 30-min callback is mentioned.
Do not deviate from DESIGN.md without explicit user approval. In QA mode, flag any code that doesn't match DESIGN.md.
