import { create } from "zustand";

interface UserStore {
  id: string;
  email: string;
  type: string;
  industry?: string;
  mine_name?: string;
  mine_location?: string;
}

interface UserState {
  user?: UserStore;
  setUser: (user: UserStore) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user: UserStore) => set({ user }),
  removeUser: () => set({ user: undefined }),
}));
