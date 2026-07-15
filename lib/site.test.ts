import { describe, it, expect, afterEach } from "vitest";
import { resolveSiteSlug } from "@/lib/site";

const orig = process.env.NEXT_PUBLIC_SITE;
afterEach(() => {
  if (orig === undefined) delete process.env.NEXT_PUBLIC_SITE;
  else process.env.NEXT_PUBLIC_SITE = orig;
});

describe("resolveSiteSlug", () => {
  it("defaults to merced when unset", () => {
    delete process.env.NEXT_PUBLIC_SITE;
    expect(resolveSiteSlug()).toBe("merced");
  });
  it("defaults to merced when unknown", () => {
    process.env.NEXT_PUBLIC_SITE = "nope";
    expect(resolveSiteSlug()).toBe("merced");
  });
  it("returns a registered slug", () => {
    process.env.NEXT_PUBLIC_SITE = "hanford-hvac";
    expect(resolveSiteSlug()).toBe("hanford-hvac");
  });
});
