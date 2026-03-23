import { describe, it, expect } from "vitest";
import { hasKiChatConsentFromCookieHeader } from "./cookie-consent-server";

describe("hasKiChatConsentFromCookieHeader", () => {
  it("returns false for missing or empty cookie header", () => {
    expect(hasKiChatConsentFromCookieHeader(null)).toBe(false);
    expect(hasKiChatConsentFromCookieHeader("")).toBe(false);
  });

  it("returns true when Social.consented is true (URL-encoded JSON)", () => {
    const value = encodeURIComponent(JSON.stringify({ Social: { consented: true } }));
    expect(hasKiChatConsentFromCookieHeader(`cookie-consent=${value}`)).toBe(true);
  });

  it("returns true when Social.consented is true (raw JSON in cookie)", () => {
    const raw = JSON.stringify({ Social: { consented: true } });
    expect(hasKiChatConsentFromCookieHeader(`cookie-consent=${raw}`)).toBe(true);
  });

  it("returns false when Social not consented", () => {
    const value = encodeURIComponent(JSON.stringify({ Social: { consented: false } }));
    expect(hasKiChatConsentFromCookieHeader(`cookie-consent=${value}`)).toBe(false);
  });

  it("parses among multiple cookies", () => {
    const value = encodeURIComponent(JSON.stringify({ Social: { consented: true } }));
    const header = `foo=bar; cookie-consent=${value}; other=1`;
    expect(hasKiChatConsentFromCookieHeader(header)).toBe(true);
  });
});
