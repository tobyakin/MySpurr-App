<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
import Tabs from "@/components/ui/Jobs/Tabs.vue";
let store = useStore();
console.log(store.getUser);
</script>

<template>
  <DashboardLayout>
    <div class="container lg:py-0 py-5 mb-5">
      <Tabs>
        <template #tab1> All jobs </template>
        <template #tab2> Branding Jobs </template>
        <template #view1
          ><div
            class="bg-[#F3F5CD] rounded-[14.957px] flex gap-14 p-8 px-6 border-[0.491px] border-[#97A6A8]"
          >
            <div class="w-full">
              <label class="font-Satoshi500 text-[15.606px]" for="">
                Name or Keyword
              </label>
              <input
                class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                placeholder="Name or keyword"
                type="text"
              />
            </div>
            <div class="w-full">
              <label class="font-Satoshi500 text-[15.606px]" for=""> Job Type </label>
              <input
                class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                placeholder="Name or keyword"
                type="text"
              />
            </div>
            <div class="w-full">
              <label class="font-Satoshi500 text-[15.606px]" for=""> Location </label>
              <input
                class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                placeholder="Name or keyword"
                type="text"
              />
            </div></div
        ></template>
        <template #view2>branding jobs</template>
      </Tabs>
    </div>
  </DashboardLayout>
</template>
