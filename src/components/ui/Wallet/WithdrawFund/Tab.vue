<template>
  <div>
    <div
      class="my_addFunds_tabs lg:flex hidden py-[25.3px] px-[51.65px] justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <a
        class=""
        @click="activateTab('withdraw')"
        :class="[activetab === 'withdraw' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class=""
        @click="activateTab('addFunds')"
        :class="[activetab === 'addFunds' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
      <a
        class=""
        @click="activateTab('settings')"
        :class="[activetab === 'settings' ? 'active' : '']"
      >
        <slot name="tab3"></slot>
      </a>
    </div>
    <!-- tabs for mobile screen size start here -->
    <div
      class="my_addFunds_tabs lg:hidden flex lg:py-[25.3px] lg:px-[51.65px] p-4 justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <select class="py-3 w-full rounded px-4 outline-none" v-model="activetab">
        <option value="withdraw">
          <slot name="tab1"></slot>
        </option>
        <option value="addFunds">
          <slot name="tab2"></slot>
        </option>
        <option value="settings">
          <slot name="tab3"></slot>
        </option>
      </select>
    </div>

    <!-- my_addFunds_tabs  view  start here -->
    <div class="pt-12">
      <div v-if="activetab === 'withdraw'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'addFunds'" class="">
        <slot name="view2"></slot>
      </div>
      <div v-if="activetab === 'settings'" class="">
        <slot name="view3"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activetab = ref("withdraw");

function activateTab(tab) {
  activetab.value = tab;
}
</script>
<style scoped>
/* Style the my_addFunds_tabs */

.my_addFunds_tabs {
  scroll-padding-bottom: 0;
  text-transform: capitalize !important;
  @apply text-[14px] leading-[18.2px] font-Satoshi500 bg-none;
}

.my_addFunds_tabs::-webkit-scrollbar {
  width: 0px;
}

.my_addFunds_tabs a {
  cursor: pointer;
  transition: color 0.2s;
  @apply p-0 py-2 text-center text-[13.076px] text-[#244034] font-Satoshi500;
}

.my_addFunds_tabs a:last-child {
  border-right: 0px solid #ccc;
}

/* Change background color of my_addFunds_tabs on hover */
/* .my_addFunds_tabs a:hover {
    color: #484848;
} */

/* Styling for active tab */
.my_addFunds_tabs a.active {
  cursor: default;
  @apply text-[#2F929C];
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
