import { create } from "zustand";
import { RecordIdString } from "../pocketbase-types";
import { pb } from "../pocketbase";
import { useShallow } from "zustand/react/shallow";

type AuthStoreType = {
  loggedIn: boolean;
  userId: RecordIdString | null;

  actions: {
    login: (email: string, password: string) => void;
    register: (
      email: string,
      password: string,
      confirmPassword: string,
    ) => void;
    logout: () => void;
  };
};
export const useAuthStore = create<AuthStoreType>()((set, get) => ({
  loggedIn: false,
  userId: null,

  actions: {
    async login(email: string, password: string) {
      const user = await pb
        .collection("users")
        .authWithPassword(email, password);
      set((_state) => ({ loggedIn: true, userId: user.record.id }));
    },
    async register(email: string, password: string, confirmPassword: string) {
      await pb.collection("users").create({ email, password, confirmPassword });
      get().actions.login(email, password);
    },
    logout() {
      pb.authStore.clear();
      set((_state) => ({ loggedIn: false }));
    },
  },
}));
