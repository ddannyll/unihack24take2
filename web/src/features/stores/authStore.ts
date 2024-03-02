import { create } from "zustand";
import { RecordIdString } from "../pocketbase-types";
import { pb } from "../pocketbase";
import { useShallow } from "zustand/react/shallow";

type AuthStoreType = {
  loggedIn: boolean;

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
export const useAuthStore = create<AuthStoreType>()((set) => ({
  loggedIn: false,
  actions: {
    async login(email: string, password: string) {
      await pb.collection("users").authWithPassword(email, password);
    },
    async register(email: string, password: string, confirmPassword: string) {
      await pb.collection("users").create({ email, password, confirmPassword });
      return await pb.collection("users").authWithPassword(email, password);
    },
    logout() {
      pb.authStore.clear();
      set((_state) => ({ loggedIn: false }));
    },
  },
}));
