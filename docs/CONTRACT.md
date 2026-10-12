# NameGuard — API Contract

> **LIVING** — describes the public surface only. Implementation details live
> in the DEV repository and are intentionally absent here.

## Endpoint

```
POST /check
Content-Type: application/json

{ "name": "yourbrand" }
```

- `name`: 2–100 characters, required.
- Response: `CheckReport` (see `src/index.d.ts`).

## Semantics

### Score bands

| Band | Range | Meaning |
|---|---|---|
| green | 0–24 | low apparent conflict |
| amber | 25–59 | some risk — investigate before committing |
| red | 60+ | high conflict likelihood |

The score is deterministic — identical evidence produces identical scores.
It is an indicator, **not legal advice** and not a clearance opinion.

### Source statuses

Each connector reports independently so one failure never hides another's
results:

- `ok` — source queried successfully (an empty `marks` list means *checked,
  nothing found*).
- `timeout` — source did not respond within its budget.
- `error` — source failed; `error` carries a short reason (e.g.
  `"not configured"`).

### Signal separation

- `marks` — trademark-register hits only. Never inferred from domains.
- `domains` — registry availability + DNS signals only.
- `web` — general web-presence evidence; supplementary context, never
  treated as register data.
