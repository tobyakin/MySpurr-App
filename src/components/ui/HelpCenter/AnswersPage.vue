<template>
  <div class="w-full flex flex-col lg:gap-[81.97px] gap-[41.97px]">
    <div class="w-full gap-4">
      <Tab>
        <template #tab1> Account and Profile </template>
        <template #tab2> Getting Started </template>
        <template #tab3> Job Management </template>
        <template #tab4> Payments and Billing </template>
        <template #tab5> Policies and Guidelines</template>
        <template #tab6> Communication</template>
        <template #view1><AccountAndProfile /></template>
        <template #view2><GettingStarted /></template>
        <template #view3><JobManagement /> </template>
        <template #view4><PaymentsAndBilling /> </template>
        <template #view5><PoliciesAndGuidelines /> </template>
        <template #view6><Communication /> </template>
      </Tab>
    </div>
  </div>
</template>

<script setup>
import Tab from "./Tab.vue";
import AccountAndProfile from "./Pages/AccountAndProfile.vue";
import GettingStarted from "./Pages/GettingStarted.vue";
import JobManagement from "./Pages/JobManagement.vue";
import PaymentsAndBilling from "./Pages/PaymentsAndBilling.vue";
import PoliciesAndGuidelines from "./Pages/PoliciesAndGuidelines.vue";
import Communication from "./Pages/Communication.vue";
</script>

<style></style>
