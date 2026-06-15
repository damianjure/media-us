import {
  getAuth,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { IAuthService, AuthUser } from "../../application/ports/IAuthService";
import { initializeFirebase } from "./firebase";

function mapUser(fbUser: { uid: string; email: string | null; displayName: string | null } | null): AuthUser | null {
  if (!fbUser) return null;
  return { uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName };
}

export function createAuthAdapter(): IAuthService {
  const db = initializeFirebase();
  const auth = getAuth(db.app);

  return {
    async signInWithGoogle(): Promise<AuthUser> {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return mapUser(result.user)!;
    },

    async signInWithApple(): Promise<AuthUser> {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      const result = await signInWithPopup(auth, provider);
      return mapUser(result.user)!;
    },

    async signInWithEmail(email: string, password: string): Promise<AuthUser> {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return mapUser(result.user)!;
    },

    async signOut(): Promise<void> {
      await fbSignOut(auth);
    },

    onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
      return fbOnAuthStateChanged(auth, (fbUser) => {
        callback(mapUser(fbUser));
      });
    },
  };
}