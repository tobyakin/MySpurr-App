<template>
  <div>
    <h1
      v-if="activetab === 'talent'"
      class="md:text-[22.225px] font-EBGaramond400 text-brand !my-4 text-center text-2xl"
    >
      <slot name="tab1title"></slot>
    </h1>
    <h1
      v-if="activetab === 'business'"
      class="md:text-[22.225px] font-EBGaramond400 text-brand !my-4 text-center text-2xl"
    >
      <slot name="tab2title"></slot>
    </h1>

    <div class="tabs flex flex-row">
      <a
        class="w-full !text-[10px] xl:!text-[14px]"
        @click="activateTab('talent')"
        :class="[activetab === 'talent' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class="w-full !text-[10px] xl:!text-[14px]"
        @click="activateTab('business')"
        :class="[activetab === 'business' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
    </div>
    <!-- tabs  view  start here -->
    <div class="pt-2">
      <div v-if="activetab === 'talent'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'business'" class="">
        <slot name="view2"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTabStore } from "@/stores/tab";

const store = useTabStore();
const activetab = ref(store.activeTab);

// Set initial tab value based on the prop or local storage
onMounted(() => {
  const storedTab = localStorage.getItem("activeTab");
  if (storedTab) {
    activetab.value = storedTab;
  }
  return activetab.value;
});

function activateTab(tab) {
  activetab.value = tab;
  localStorage.setItem("activeTab", tab);
}
</script>
