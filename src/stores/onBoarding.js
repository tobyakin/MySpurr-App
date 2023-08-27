import { defineStore } from "pinia";

export const useOnboardingStore = defineStore({
  id: "onBoardingStore",
  state: () => ({
    step: 1,
     }),
  getters: {
  },
  actions: {

  },
  persist: true,
});