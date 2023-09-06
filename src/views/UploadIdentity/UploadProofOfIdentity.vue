<script setup>
import { ref } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
let store = useStore();
console.log(store.getUser);
const steps = ref([true, false]);

const changeScreen = (from, to, type = null) => {
  steps.value[from] = false;
  steps.value[to] = true;
};
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-10 py-4 mb-5">
      <p class="text-[40.705px] font-Satoshi400 text-center mt-10 text-[#244034]">
        Upload a proof of your identity
      </p>
      <p class="text-[25.382px] font-Satoshi400 text-center text-[#244034]">
        MySpurr requires a valid government issue ID (drivers license, passport, national
        ID)
      </p>
      <div class="flex flex-row gap-10 mt-14">
        <div class="w-full">
          <label class="font-Satoshi500 text-[15.606px]" for=""> Your Country </label>
          <input
            class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
            placeholder="Name or keyword"
            type="text"
          />
        </div>
        <div class="w-full">
          <label class="font-Satoshi500 text-[15.606px]" for=""> Document Type </label>
          <input
            class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
            placeholder="Name or keyword"
            type="text"
          />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
