import { describe, expect, it } from "vitest";
import { validateLeadInput } from "../src/validation";
import { validLeadBody } from "./helpers";

describe("validateLeadInput", () => {
  it("accepts a valid lead and normalizes urgency", () => {
    const r = validateLeadInput(validLeadBody);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.email).toBe("jane@acme.com");
      expect(r.value.urgency).toBe("Priority");
      expect(r.value.source).toBe("gmx-labs-repo-inspection");
    }
  });

  it("defaults unknown urgency to Standard", () => {
    const r = validateLeadInput({ ...validLeadBody, urgency: "whenever" });
    expect(r.ok && r.value.urgency).toBe("Standard");
  });

  it("rejects an invalid email", () => {
    const r = validateLeadInput({ ...validLeadBody, email: "not-an-email" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("email");
  });

  it("rejects a non-HTTPS / malformed repo URL", () => {
    for (const bad of ["ftp://x/y", "notaurl", "http://github.com/a/b", "https://github.com"]) {
      const r = validateLeadInput({ ...validLeadBody, repoUrl: bad });
      expect(r.ok, `should reject ${bad}`).toBe(false);
      if (!r.ok) expect(r.field).toBe("repoUrl");
    }
  });

  it("accepts GitHub, GitLab, Bitbucket, and general HTTPS repo URLs", () => {
    for (const good of [
      "https://github.com/acme/repo",
      "https://gitlab.com/acme/repo",
      "https://bitbucket.org/acme/repo",
      "https://git.acme.com/team/private-repo.git",
    ]) {
      expect(validateLeadInput({ ...validLeadBody, repoUrl: good }).ok, good).toBe(true);
    }
  });

  it("rejects a repo URL with embedded credentials", () => {
    const r = validateLeadInput({
      ...validLeadBody,
      repoUrl: "https://user:placeholder-token@github.com/a/b",
    });
    expect(r.ok).toBe(false);
  });

  it("rejects when consent is not true", () => {
    const r = validateLeadInput({ ...validLeadBody, consent: false });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("consent");
  });

  it("requires name", () => {
    const r = validateLeadInput({ ...validLeadBody, name: "   " });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("name");
  });

  it("rejects oversized fields", () => {
    const r = validateLeadInput({ ...validLeadBody, name: "a".repeat(200) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("name");
  });

  it("rejects submissions containing obvious secrets", () => {
    // Built via concatenation so no literal key-shaped token appears in source
    // (avoids tripping GitHub push protection); still matches the scan regexes.
    const secrets = [
      "-----BEGIN RSA PRIVATE KEY-----",
      "here is my key " + "sk_" + "live_" + "ABCDEFGHIJKLMNOP1234567890",
      "ghp" + "_" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    ];
    for (const s of secrets) {
      const r = validateLeadInput({ ...validLeadBody, message: s });
      expect(r.ok, `should reject secret: ${s.slice(0, 12)}`).toBe(false);
    }
  });

  it("rejects a non-object body", () => {
    expect(validateLeadInput("nope").ok).toBe(false);
    expect(validateLeadInput(null).ok).toBe(false);
  });
});
