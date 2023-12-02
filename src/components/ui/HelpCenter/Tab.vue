<template>
  <div class="w-full flex lg:flex-row flex-col gap-10 lg:gap-[95px]">
    <div class="my_settings_tabs lg:flex hidden flex-col w-[40%] gap-[17.763px]">
      <a class="" @click="activateTab('1')" :class="[activeHelp === '1' ? 'active' : '']">
        <slot name="tab1"></slot>
      </a>
      <a class="" @click="activateTab('2')" :class="[activeHelp === '2' ? 'active' : '']">
        <slot name="tab2"></slot>
      </a>
      <a class="" @click="activateTab('3')" :class="[activeHelp === '3' ? 'active' : '']">
        <slot name="tab3"></slot>
      </a>
      <a class="" @click="activateTab('4')" :class="[activeHelp === '4' ? 'active' : '']">
        <slot name="tab4"></slot>
      </a>
      <a class="" @click="activateTab('5')" :class="[activeHelp === '5' ? 'active' : '']">
        <slot name="tab5"></slot>
      </a>
      <a class="" @click="activateTab('6')" :class="[activeHelp === '6' ? 'active' : '']">
        <slot name="tab6"></slot>
      </a>
    </div>
    <!-- tabs for mobile screen size start here -->
    <div
      class="my_settings_tabs lg:hidden flex lg:py-[25.3px] lg:px-[51.65px] p-4 justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <select class="w-full rounded px-4 outline-none" v-model="activeHelp">
        <option value="tab1">
          <slot name="tab1"></slot>
        </option>
        <option value="tab2">
          <slot name="tab2"></slot>
        </option>
        <option value="tab3">
          <slot name="tab3"></slot>
        </option>
        <option value="tab4">
          <slot name="tab4"></slot>
        </option>
        <option value="tab5">
          <slot name="tab5"></slot>
        </option>
        <option value="tab6">
          <slot name="tab6"></slot>
        </option>
      </select>
    </div>

    <!-- my_settings_tabs  view  start here -->
    <div class="w-full">
      <div v-if="activeHelp === '1'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activeHelp === '2'" class="">
        <slot name="view2"></slot>
      </div>
      <div v-if="activeHelp === '3'" class="">
        <slot name="view3"></slot>
      </div>
      <div v-if="activeHelp === '4'" class="">
        <slot name="view4"></slot>
      </div>
      <div v-if="activeHelp === '5'" class="">
        <slot name="view5"></slot>
      </div>
      <div v-if="activeHelp === '6'" class="">
        <slot name="view6"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// const activeHelp = ref("tab1");
import { useTabStore } from "@/stores/tab";
const store = useTabStore();
import { storeToRefs } from "pinia";

const { activeHelp } = storeToRefs(store);

const activateTab = (tab) => {
  activeHelp.value = tab;
};
onMounted(() => {
  return activeHelp.value;
});
</script>
<style scoped>
/* Style the my_settings_tabs */

.my_settings_tabs {
  scroll-padding-bottom: 0;
  text-transform: capitalize !important;
  @apply text-[14px] leading-[18.2px] font-Satoshi500 bg-none;
}

.my_settings_tabs::-webkit-scrollbar {
  width: 0px;
}

.my_settings_tabs a {
  cursor: pointer;
  transition: color 0.2s;
  @apply p-0  text-left text-[16.917px] text-[#011B1F] font-Satoshi400;
}

.my_settings_tabs a:last-child {
  border-right: 0px solid #ccc;
}

/* Styling for active tab */
.my_settings_tabs a.active {
  cursor: default;
  @apply text-[#297F88];
}

/* Style the tab content */

.tabcontent .map {
  height: 173px;
  width: 220px;
  background: #d3eafb;
  margin-left: 60px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.tabcontent {
  padding-top: 10px;
}
</style>
