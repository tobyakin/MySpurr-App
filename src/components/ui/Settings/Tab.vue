<template>
  <div>
    <div
      class="my_settings_tabs lg:flex hidden py-[25.3px] px-[51.65px] justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <a
        class=""
        @click="activateTab('accounts')"
        :class="[activetab === 'accounts' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class=""
        @click="activateTab('privacy/Security')"
        :class="[activetab === 'privacy/Security' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
      <a
        class=""
        @click="activateTab('payments')"
        :class="[activetab === 'payments' ? 'active' : '']"
      >
        <slot name="tab3"></slot>
      </a>
      <a
        class=""
        @click="activateTab('notification')"
        :class="[activetab === 'notification' ? 'active' : '']"
      >
        <slot name="tab4"></slot>
      </a>
    </div>
    <!-- tabs for mobile screen size start here -->
    <div
      class="my_settings_tabs lg:hidden flex lg:py-[25.3px] lg:px-[51.65px] p-4 justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <select class="py-3 w-full rounded px-4 outline-none" v-model="activetab">
        <option value="accounts">
          <slot name="tab1"></slot>
        </option>
        <option value="privacy/Security">
          <slot name="tab2"></slot>
        </option>
        <option value="payments">
          <slot name="tab3"></slot>
        </option>
        <option value="notification">
          <slot name="tab4"></slot>
        </option>
      </select>
    </div>

    <!-- my_settings_tabs  view  start here -->
    <div class="pt-12">
      <div v-if="activetab === 'accounts'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'privacy/Security'" class="">
        <slot name="view2"></slot>
      </div>
      <div v-if="activetab === 'payments'" class="">
        <slot name="view3"></slot>
      </div>
      <div v-if="activetab === 'notification'" class="">
        <slot name="view4"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activetab = ref("accounts");

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
  @apply p-0 py-2 text-center text-[13.076px] text-[#244034] font-Satoshi500;
}

.my_settings_tabs a:last-child {
  border-right: 0px solid #ccc;
}

/* Change background color of my_settings_tabs on hover */
/* .my_settings_tabs a:hover {
    color: #484848;
} */

/* Styling for active tab */
.my_settings_tabs a.active {
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
