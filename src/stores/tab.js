import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
  state: () => ({
    activeTab: 'talent',
  }),
  actions: {
  },
});
