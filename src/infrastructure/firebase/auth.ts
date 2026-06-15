import type { IAuthService, AuthUser } from "../../application/ports/IAuthService";

export function createAuthAdapter(): IAuthService {
  return {
    async signInWithGoogle(): Promise<AuthUser> {
      // Firebase: signInWithPopup(auth, googleProvider)
      return { uid: "mock-uid", email: "user@test.com", displayName: "User" };
    },

    async signInWithApple(): Promise<AuthUser> {
      // Firebase: signInWithPopup(auth, appleProvider)
      return { uid: "mock-uid", email: "user@test.com", displayName: "User" };
    },

    async signInWithEmail(email: string): Promise<AuthUser> {
      // Firebase: signInWithEmailAndPassword(auth, email, password)
      return { uid: "mock-uid", email, displayName: email.split("@")[0] };
    },

    async signOut(): Promise<void> {
      // Firebase: signOut(auth)
    },

    onAuthStateChanged(): () => void {
      // Firebase: onAuthStateChanged(auth, callback)
      const unsubscribe = () => {};
      return unsubscribe;
    },
  };
}