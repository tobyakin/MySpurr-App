<template>
  <div>
    <div
      class="my_applications_tabs flex py-[25.3px] px-[51.65px] justify-between bg-[#E9FAFB] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <a
        class=""
        @click="activateTab('invites')"
        :class="[activetab === 'invites' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class=""
        @click="activateTab('applications')"
        :class="[activetab === 'applications' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
      <a
        class=""
        @click="activateTab('job_offers')"
        :class="[activetab === 'job_offers' ? 'active' : '']"
      >
        <slot name="tab3"></slot>
      </a>
      <a
        class=""
        @click="activateTab('my_job')"
        :class="[activetab === 'my_job' ? 'active' : '']"
      >
        <slot name="tab4"></slot>
      </a>
      <a
        class=""
        @click="activateTab('invoices')"
        :class="[activetab === 'invoices' ? 'active' : '']"
      >
        <slot name="tab5"></slot>
      </a>
      <a
        class=""
        @click="activateTab('help')"
        :class="[activetab === 'help' ? 'active' : '']"
      >
        <slot name="tab6"></slot>
      </a>
    </div>
    <!-- my_applications_tabs  view  start here -->
    <div class="pt-12">
      <div v-if="activetab === 'invites'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'applications'" class="">
        <slot name="view2"></slot>
      </div>
      <div v-if="activetab === 'job_offers'" class="">
        <slot name="view3"></slot>
      </div>
      <div v-if="activetab === 'my_job'" class="">
        <slot name="view4"></slot>
      </div>
      <div v-if="activetab === 'invoices'" class="">
        <slot name="view5"></slot>
      </div>
      <div v-if="activetab === 'help'" class="">
        <slot name="view6"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activetab = ref("invites");

function activateTab(tab) {
  activetab.value = tab;
}
</script>
<style scoped>
/* Style the my_applications_tabs */

.my_applications_tabs {
  scroll-padding-bottom: 0;
  text-transform: capitalize !important;
  @apply text-[14px] leading-[18.2px] font-Satoshi500 bg-none;
}

.my_applications_tabs::-webkit-scrollbar {
  width: 0px;
}

.my_applications_tabs a {
  font-size: 13.076px;
  cursor: pointer;
  transition: color 0.2s;
  @apply p-0 py-2 text-center text-[#244034] font-Satoshi500;
}

.my_applications_tabs a:last-child {
  border-right: 0px solid #ccc;
}

/* Change background color of my_applications_tabs on hover */
/* .my_applications_tabs a:hover {
    color: #484848;
} */

/* Styling for active tab */
.my_applications_tabs a.active {
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
