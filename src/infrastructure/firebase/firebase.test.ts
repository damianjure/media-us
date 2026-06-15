import { describe, it, expect, vi } from "vitest";

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(),
}));

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({ type: "firestore" })),
  enableIndexedDbPersistence: vi.fn().mockResolvedValue(undefined),
  connectFirestoreEmulator: vi.fn(),
}));

import { initializeFirebase } from "./firebase";
import { initializeApp } from "firebase/app";

describe("Firebase initialization", () => {
  it("initializes Firebase app", () => {
    initializeFirebase();
    expect(initializeApp).toHaveBeenCalledOnce();
  });

  it("returns Firestore instance", () => {
    const db = initializeFirebase();
    expect(db).toBeDefined();
  });
});