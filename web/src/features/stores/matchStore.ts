import { create } from "zustand";
import { RecordIdString } from "../pocketbase-types";
import { pb } from "../pocketbase";
import { useShallow } from "zustand/react/shallow";

type MatchStoreType = {
  messages: any[];
  peeps: any[];

  actions: {
    setMessages: (messages: any[]) => void;
    addMessage: (message: any) => void;
    setPeeps: (peeps: any[]) => void;
  };
};
export const useMatchStore = create<MatchStoreType>()((set, get) => ({
  messages: [],
  peeps: [],
  actions: {
    setMessages(messages: any[]) {
      set((_state) => ({ messages }));
    },
    setPeeps(peeps: any[]) {
      set((_state) => ({ peeps }));
    },
    addMessage(message: any) {
      set((_state) => ({ messages: [...get().messages, message] }));
    },
  },
}));
