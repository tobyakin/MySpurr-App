<template>
  <div>
    <div class="myJobs_tabs flex gap-[38px] py-4 mt-6">
      <a
        class=""
        @click="activateTab('in_progress')"
        :class="[activetab === 'in_progress' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class=""
        @click="activateTab('pending_approval')"
        :class="[activetab === 'pending_approval' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
      <a
        class=""
        @click="activateTab('on_hold')"
        :class="[activetab === 'on_hold' ? 'active' : '']"
      >
        <slot name="tab3"></slot>
      </a>
    </div>
    <!-- myJobs_tabs  view  start here -->
    <div class="pt-[6px]">
      <div v-if="activetab === 'in_progress'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'pending_approval'" class="">
        <slot name="view2"></slot>
      </div>
      <div v-if="activetab === 'on_hold'" class="">
        <slot name="view3"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activetab = ref("in_progress");

function activateTab(tab) {
  activetab.value = tab;
}
</script>
<style scoped>
/* Style the myJobs_tabs */

.myJobs_tabs {
  padding-bottom: 0 !important;
  scroll-padding-bottom: 0;
  text-transform: capitalize !important;
  @apply text-[14px] leading-[18.2px] font-Satoshi500 bg-none;
}

.myJobs_tabs::-webkit-scrollbar {
  width: 0px;
}

.myJobs_tabs a {
  font-size: 26.036px;
  cursor: pointer;
  transition: color 0.2s;
  @apply p-0 py-2 text-center text-[#244034] font-Satoshi400;
}

.myJobs_tabs a:last-child {
  border-right: 0px solid #ccc;
}

/* Change background color of myJobs_tabs on hover */
/* .myJobs_tabs a:hover {
    color: #484848;
} */

/* Styling for active tab */
.myJobs_tabs a.active {
  cursor: default;
  font-weight: 400;
  @apply border-b-2 border-b-[#63D8E4] text-[#63D8E4];
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
