import { create } from "zustand";

export interface UserStore {
  id: string;
  email: string;
  type: string;
  industry?: string;
  mine_name?: string;
  mine_location?: string;
}

interface UserState {
  user?: any;
  setUser: (user: any) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user: UserStore) => set({ user }),
  removeUser: () => set({ user: undefined }),
}));
