import { create } from "zustand";
import type { AuthUser } from "../../application/ports/IAuthService";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  signOut: () => set({ user: null, loading: false }),
}));