import { defineStore } from "pinia";
import type { transactionType } from "@/types/application.interface";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    wallet: 0,
  }),
  getters: {
    getWallet(state) {
      return state.wallet;
    },
  },
  actions: {
    updateMoneyInWallet(type: transactionType, amount: number) {
      this.wallet += amount * type;
    },
  },
});
