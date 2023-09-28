import { defineStore } from 'pinia';
import { ref } from 'vue'

  export const useTabStore = defineStore('tab', () => {

    const activeTab = ref('talent')


      return {
        activeTab
      }
});
