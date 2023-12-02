<template>
  <div class="w-full flex lg:flex-row flex-col gap-10 lg:gap-[95px]">
    <div class="my_settings_tabs lg:flex hidden flex-col w-[40%] gap-[17.763px]">
      <a
        class=""
        @click="activateTab('tab1')"
        :class="[activetab === 'tab1' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class=""
        @click="activateTab('tab2')"
        :class="[activetab === 'tab2' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
      <a
        class=""
        @click="activateTab('tab3')"
        :class="[activetab === 'tab3' ? 'active' : '']"
      >
        <slot name="tab3"></slot>
      </a>
      <a
        class=""
        @click="activateTab('tab4')"
        :class="[activetab === 'tab4' ? 'active' : '']"
      >
        <slot name="tab4"></slot>
      </a>
      <a
        class=""
        @click="activateTab('tab5')"
        :class="[activetab === 'tab5' ? 'active' : '']"
      >
        <slot name="tab5"></slot>
      </a>
      <a
        class=""
        @click="activateTab('tab6')"
        :class="[activetab === 'tab6' ? 'active' : '']"
      >
        <slot name="tab6"></slot>
      </a>
    </div>
    <!-- tabs for mobile screen size start here -->
    <div
      class="my_settings_tabs lg:hidden flex lg:py-[25.3px] lg:px-[51.65px] p-4 justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <select class="w-full rounded px-4 outline-none" v-model="activetab">
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
      <div v-if="activetab === 'tab1'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'tab2'" class="">
        <slot name="view2"></slot>
      </div>
      <div v-if="activetab === 'tab3'" class="">
        <slot name="view3"></slot>
      </div>
      <div v-if="activetab === 'tab4'" class="">
        <slot name="view4"></slot>
      </div>
      <div v-if="activetab === 'tab5'" class="">
        <slot name="view5"></slot>
      </div>
      <div v-if="activetab === 'tab6'" class="">
        <slot name="view6"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const activetab = ref("tab1");

function activateTab(tab) {
  activetab.value = tab;
}
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
