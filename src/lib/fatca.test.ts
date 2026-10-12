import { describe, it, expect } from "vitest";
import { deriveChapter4Status } from "./fatca";

describe("deriveChapter4Status", () => {
  it("operating companies are always Active NFFE", () => {
    expect(deriveChapter4Status({})).toBe("ActiveNFFE");
    expect(
      deriveChapter4Status({ isHolding: false, passiveIncomeAtLeast50: true, passiveAssetsAtLeast50: true })
    ).toBe("ActiveNFFE");
  });

  it("holding with both answers 'no' is Active NFFE", () => {
    expect(
      deriveChapter4Status({ isHolding: true, passiveIncomeAtLeast50: false, passiveAssetsAtLeast50: false })
    ).toBe("ActiveNFFE");
  });

  it("holding is Passive NFFE when income OR assets reach 50%", () => {
    expect(deriveChapter4Status({ isHolding: true, passiveIncomeAtLeast50: true })).toBe("PassiveNFFE");
    expect(deriveChapter4Status({ isHolding: true, passiveAssetsAtLeast50: true })).toBe("PassiveNFFE");
    expect(
      deriveChapter4Status({ isHolding: true, passiveIncomeAtLeast50: true, passiveAssetsAtLeast50: true })
    ).toBe("PassiveNFFE");
  });
});
