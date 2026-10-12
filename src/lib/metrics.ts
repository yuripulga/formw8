/**
 * Anonymous, cookie-free event counters (zero-data friendly).
 *
 * Each event increments a number in a Firestore document named after the UTC day
 * (`daily/YYYY-MM-DD`). Nothing from the form, no identifiers, no cookies and no
 * browser storage are involved. Counting is disabled unless the deployment sets
 * NEXT_PUBLIC_FIREBASE_PROJECT_ID and NEXT_PUBLIC_FIREBASE_API_KEY, so local
 * development, E2E runs and forks never write to the maintainer's database.
 */

export const METRIC_EVENTS = [
  "visit",
  "wizard_step_2",
  "wizard_step_3",
  "wizard_step_4",
  "entity_pf",
  "entity_mei",
  "entity_pj_active",
  "entity_pj_passive",
  "pdf_download",
  "field_copy",
  "affiliate_husky",
  "affiliate_higlobe",
  "affiliate_wise",
] as const;

export type MetricEvent = (typeof METRIC_EVENTS)[number];

const sentThisPageLoad = new Set<MetricEvent>();

function isEnabled(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) &&
    Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
  );
}

/** UTC calendar day, e.g. "2026-10-12". */
export function metricsDay(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Builds the Firestore REST `commit` request body that increments one counter. */
export function buildIncrementBody(projectId: string, event: MetricEvent, day: string) {
  return {
    writes: [
      {
        transform: {
          document: `projects/${projectId}/databases/(default)/documents/daily/${day}`,
          fieldTransforms: [
            { fieldPath: event, increment: { integerValue: "1" } },
          ],
        },
      },
    ],
  };
}

/**
 * Counts an event once per page load. Fire-and-forget: it never throws and never
 * blocks the UI. Respects the browser's Do Not Track setting.
 */
export function trackEvent(event: MetricEvent): void {
  try {
    if (!isEnabled() || typeof window === "undefined") return;
    if (navigator.doNotTrack === "1") return;
    if (sentThisPageLoad.has(event)) return;
    sentThisPageLoad.add(event);

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit?key=${apiKey}`;

    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildIncrementBody(projectId, event, metricsDay())),
      keepalive: true,
    }).catch(() => {
      // Metrics must never affect the user experience.
    });
  } catch {
    // ignore
  }
}
