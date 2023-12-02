import { defineStore } from 'pinia';
import { ref } from 'vue'

  export const useTabStore = defineStore('tab', () => {

    const activeTab = ref('talent')
    let isLoading = ref(true)
    let activeHelp = ref('1')

    const updateActiveHelp = (tab) => {
      activeHelp.value = tab
    }

      return {
        activeTab,
        isLoading,
        activeHelp,
        updateActiveHelp
      }
});
