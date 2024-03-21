<script setup>
import { ref, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import ComingSoon from "@/components/ui/ComingSoon/ComingSoon.vue";
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <ComingSoon title="Book mark" />

      <!-- <h4 class="text-[#244034] font-EBGaramond500 capitalize text-[27px]">
        Book mark Page
      </h4> -->
    </div>
  </DashboardLayout>
</template>
