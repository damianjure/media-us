export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface IAuthService {
  signInWithGoogle(): Promise<AuthUser>;
  signInWithApple(): Promise<AuthUser>;
  signInWithEmail(email: string): Promise<AuthUser>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}