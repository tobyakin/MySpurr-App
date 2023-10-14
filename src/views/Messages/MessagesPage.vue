<script setup>
import { ref, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <h4 class="text-[#244034] font-EBGaramond500 capitalize text-[27px]">messages</h4>
      <div class="flex flex-row gap-[34.16px] w-full max-h-[75vh] overflow-hidden">
        <div
          style="box-shadow: 0.86326px 0px 0px 0px #d3d6db"
          class="flex bg-white border-[0.449px] w-[45%] min-h-[75vh] border-[#254035AB] px-[38.15px] py-[20.72px]"
        ></div>
        <div
          class="flex bg-white border-[0.449px] w-full border-[#254035AB] px-[38.15px] py-[20.72px]"
        ></div>
      </div>
    </div>
  </DashboardLayout>
</template>
