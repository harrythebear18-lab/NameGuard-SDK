# NameGuard SDK

Contract surface for NameGuard — the desktop tool that checks proposed brand
names against trademark registers, domain availability, and web presence.

This package contains **types and contracts only**. No implementation, no
internals, no secrets.

- `src/index.d.ts` — report/entity types (`CheckReport`, `MarkHit`,
  `DomainResult`, `WebEvidenceItem`, `ScoreBreakdown`, source statuses)
- `docs/CONTRACT.md` — API semantics, score bands, per-source status meaning

Consumers may depend on the field names and semantics declared here.
Anything not declared is internal and subject to change.
