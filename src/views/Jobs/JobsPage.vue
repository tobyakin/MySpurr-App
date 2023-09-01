<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
import JobRowCard from "@/components/ui/JobRowCard.vue";

import Tabs from "@/components/ui/Jobs/Tabs.vue";
let store = useStore();
console.log(store.getUser);
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <Tabs>
        <template #tab1> All jobs </template>
        <template #tab2> Branding Jobs </template>
        <template #view1
          ><div
            class="bg-[#F3F5CD] rounded-[14.957px] flex flex-col gap-12 p-8 px-12 border-[0.491px] border-[#97A6A8]"
          >
            <div class="flex gap-12">
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
              </div>
            </div>
            <div class="flex gap-12">
              <div class="w-full">
                <!-- <label class="font-Satoshi500 text-[15.606px]" for="">
                  Name or Keyword
                </label> -->

                <select
                  class="w-full mt-2 font-light font-Satoshi500 !p-2 !px-0 border-b-[#2C4C50] bg-transparent border-b-[0.509px] opacity-[0.8029] text-[15.606px]"
                  name=""
                  id=""
                >
                  <option>Skills</option>
                </select>
              </div>
              <div class="w-full">
                <select
                  class="w-full mt-2 font-light font-Satoshi500 !p-2 !px-0 border-b-[#2C4C50] bg-transparent border-b-[0.509px] opacity-[0.8029] text-[15.606px]"
                  name=""
                  id=""
                >
                  <option>Committment</option>
                </select>
              </div>
              <div class="w-full">
                <select
                  class="w-full mt-2 font-light font-Satoshi500 !p-2 !px-0 border-b-[#2C4C50] bg-transparent border-b-[0.509px] opacity-[0.8029] text-[15.606px]"
                  name=""
                  id=""
                >
                  <option>Rate</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-14 flex flex-col gap-8">
            <JobRowCard
              class="min-w-[95%] lg:min-w-[45%]"
              v-for="item in 4"
              :key="item"
            /></div
        ></template>
        <template #view2>branding jobs</template>
      </Tabs>
    </div>
  </DashboardLayout>
</template>
