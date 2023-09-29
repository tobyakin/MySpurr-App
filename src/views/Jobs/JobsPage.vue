<script setup>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
import JobRowCard from "@/components/ui/Jobs/JobRowCard.vue";
import Arrow from "@/components/icons/paginationArrow.vue";
import Tabs from "@/components/ui/Jobs/Tabs.vue";
import { useJobsStore } from "@/stores/jobs";
const jobsStore = useJobsStore();
const { Job } = storeToRefs(jobsStore);

const FormGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/FormGroup.vue")
);

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
            class="bg-[#F3F5CD] rounded-[14.957px] flex flex-col gap-8 p-8 px-12 border-[0.491px] border-[#97A6A8]"
          >
            <div class="flex gap-12">
              <FormGroup
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Name or Keyword"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Job Type"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Location"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
            </div>
            <div class="flex gap-12">
              <FormGroup
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Job Type"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Experience Level"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Rate"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
            </div>
            <div class="flex gap-12">
              <button
                class="border-[#007582] bg-[#31795A] text-white w-[40%] text-center mx-auto border-2 p-4 py-2 justify-center rounded-full font-Satoshi500 text-[10.672px] items-center flex"
              >
                Apply Filter
              </button>
            </div>
          </div>
          <div class="mt-14 flex flex-col gap-8">
            <JobRowCard
              class="min-w-[95%] lg:min-w-[45%]"
              v-for="item in 4"
              :key="item"
            />
          </div>
          <div class="mt-5 flex">
            <button
              class="border-[#007582] border-l-2 border-t-2 border-b-2 p-4 py-2 rounded-l-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
            >
              1
            </button>
            <button
              class="border-[#007582] border-2 p-4 py-2 rounded-r-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
            >
              <Arrow />
            </button></div
        ></template>
        <template #view2>branding jobs</template>
      </Tabs>
    </div>
  </DashboardLayout>
</template>
