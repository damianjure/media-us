import { describe, it, expect } from "vitest";
import { createAuthAdapter } from "./auth";

describe("AuthAdapter", () => {
  it("implements IAuthService interface", () => {
    const auth = createAuthAdapter();
    expect(auth).toBeDefined();
    expect(typeof auth.signInWithGoogle).toBe("function");
    expect(typeof auth.signInWithApple).toBe("function");
    expect(typeof auth.signInWithEmail).toBe("function");
    expect(typeof auth.signOut).toBe("function");
    expect(typeof auth.onAuthStateChanged).toBe("function");
  });
});