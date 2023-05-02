import { auth } from "@/lib/firebase";
import { create } from "zustand";
auth.currentUser;

interface UserType {
  uid?: string;
  email?: string;
  displayName?: string;
  type?: string;
  industry_type?: string;
}

interface UserStoreType {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const userStore = create<UserStoreType>((set, get) => ({
  user: {},
  setUser: (user) => set((state) => ({ ...state, ...user })),
  removeUser: () => set(() => ({})),
}));
