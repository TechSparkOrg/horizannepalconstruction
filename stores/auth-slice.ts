import type { AdminAuthState } from "@/api/types/auth.types";

export interface AuthSlice {
  isAuthenticated: boolean;
  user: AdminAuthState["user"];
  setAuth: (user: NonNullable<AdminAuthState["user"]>) => void;
  clearAuth: () => void;
}

export const initialAuthState: Pick<AuthSlice, "isAuthenticated" | "user"> = {
  isAuthenticated: false,
  user: null,
};

export const createAuthSlice = (set: any): AuthSlice => ({
  ...initialAuthState,
  setAuth: (user) => set({ isAuthenticated: true, user }),
  clearAuth: () => set({ isAuthenticated: false, user: null }),
});
