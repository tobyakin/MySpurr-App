<template>
  <div>
    <div class="applications_tabs flex gap-12 py-4 mt-6">
      <a
        class=""
        @click="activateTab('open_applications')"
        :class="[activetab === 'open_applications' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a
        class=""
        @click="activateTab('closed_applications')"
        :class="[activetab === 'closed_applications' ? 'active' : '']"
      >
        <slot name="tab2"></slot>
      </a>
    </div>
    <!-- applications_tabs  view  start here -->
    <div class="pt-[6px]">
      <div v-if="activetab === 'open_applications'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === 'closed_applications'" class="">
        <slot name="view2"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activetab = ref("open_applications");

function activateTab(tab) {
  activetab.value = tab;
}
</script>
<style scoped>
/* Style the applications_tabs */

.applications_tabs {
  padding-bottom: 0 !important;
  scroll-padding-bottom: 0;
  text-transform: capitalize !important;
  @apply text-[14px] leading-[18.2px] font-Satoshi500 bg-none;
}

.applications_tabs::-webkit-scrollbar {
  width: 0px;
}

.applications_tabs a {
  font-size: 26.036px;
  cursor: pointer;
  transition: color 0.2s;
  @apply p-0 py-2 text-center text-[#244034] font-Satoshi400;
}

.applications_tabs a:last-child {
  border-right: 0px solid #ccc;
}

/* Change background color of applications_tabs on hover */
/* .applications_tabs a:hover {
    color: #484848;
} */

/* Styling for active tab */
.applications_tabs a.active {
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
