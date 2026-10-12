// NameGuard — public contract surface.
// These types describe what a check report looks like. They contain no
// implementation and no internal source references. Consumers may rely on
// field names and semantics; anything not declared here is internal.

/** ISO office/jurisdiction code as returned by the source (EU, US, GB, CN…). */
export type Jurisdiction = string;

export type MarkStatus = "live" | "dead" | "pending" | "unknown";

/** A single trademark-register hit. */
export interface MarkHit {
  /** Mark text as registered. */
  name: string;
  /** Lowercased normalised form. */
  normalizedName: string;
  /** Nice classes (1–45) the mark covers. */
  classes: number[];
  status: MarkStatus;
  owner?: string;
  /** Application/registration number where available. */
  serial?: string;
  jurisdiction: Jurisdiction;
  sourceUrl?: string;
}

export type DomainStatus = "available" | "registered" | "unknown";

/** A single TLD-domain availability result. */
export interface DomainResult {
  domain: string;
  tld: string;
  status: DomainStatus;
  /** ISO date strings where the registry exposes them. */
  registeredAt?: string;
  expiresAt?: string;
  /** DNS resolution signal — registered + false ⇒ likely parked/unused. */
  resolves?: boolean;
}

/** Supplementary web-presence evidence — not register data. */
export interface WebEvidenceItem {
  title: string;
  snippet: string;
  url: string;
  source: "bing" | "duckduckgo";
}

export type RiskBand = "green" | "amber" | "red";

export interface ScoreBreakdown {
  /** 0–100 deterministic risk score. */
  score: number;
  band: RiskBand;
  /** Human-readable reasons that contributed to the score. */
  reasons: string[];
}

export type SourceStatus = "ok" | "timeout" | "error";

export interface SourceReport {
  status: SourceStatus;
  durationMs: number;
  error?: string;
}

/** The full response of POST /check. */
export interface CheckReport {
  /** Name as submitted. */
  input: string;
  /** Normalised key used for scoring/caching. */
  normalized: string;
  score: ScoreBreakdown;
  domains: DomainResult[];
  marks: MarkHit[];
  web: WebEvidenceItem[];
  /** Per-source health — distinguish "checked, nothing found" (ok) from
   *  "source unavailable" (error/timeout). Never conflate the two. */
  sources: Record<string, SourceReport>;
  /** True when served from the check cache rather than a live query. */
  cached: boolean;
}
