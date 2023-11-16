<script setup>
import { ref, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import Tab from "@/components/ui/Settings/Tab.vue";
import Accounts from "@/components/ui/Settings/Pages/Accounts.vue";
</script>

<template>
  <DashboardLayout>
    <div class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:py-10 py-6 mb-10">
      <h4 class="text-[#244034] font-EBGaramond500 capitalize text-[27px]">settings</h4>
      <Tab>
        <template #tab1> Accounts </template>
        <template #tab2> Privacy/Security </template>
        <template #tab3> Payments </template>
        <template #tab4> Notification </template>
        <template #view1><Accounts /></template>
        <template #view2>oo</template>
        <template #view3>ooo</template>
        <template #view4>oo0o</template>
      </Tab>
    </div>
  </DashboardLayout>
</template>
