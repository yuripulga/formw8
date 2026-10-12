import { describe, it, expect } from "vitest";
import { buildIncrementBody, metricsDay, METRIC_EVENTS, trackEvent } from "./metrics";

describe("metrics", () => {
  it("uses the UTC calendar day", () => {
    expect(metricsDay(new Date("2026-10-12T23:59:59Z"))).toBe("2026-10-12");
    expect(metricsDay(new Date("2026-10-13T00:00:01Z"))).toBe("2026-10-13");
  });

  it("builds a single +1 increment on the daily document", () => {
    const body = buildIncrementBody("my-project", "pdf_download", "2026-10-12");
    expect(body.writes).toHaveLength(1);
    const transform = body.writes[0].transform;
    expect(transform.document).toBe(
      "projects/my-project/databases/(default)/documents/daily/2026-10-12"
    );
    expect(transform.fieldTransforms).toEqual([
      { fieldPath: "pdf_download", increment: { integerValue: "1" } },
    ]);
  });

  it("never throws and sends nothing when metrics are not configured", () => {
    expect(() => trackEvent("visit")).not.toThrow();
  });

  it("only exposes anonymous, non-personal event names", () => {
    for (const name of METRIC_EVENTS) {
      expect(name).toMatch(/^[a-z0-9_]+$/);
    }
  });
});
