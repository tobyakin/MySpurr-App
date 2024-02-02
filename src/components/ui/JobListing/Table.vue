<template>
  <div>
    <div
      class="my_applications_tabs lg:flex hidden py-[25.3px] px-[27.65px] items-center justify-between bg-[#F0F5F3] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <a class="text-[#244034] text-[15.259px] font-normal"> Title </a>

      <a class="h-[40.508px] w-[40.508px] rounded-full"> </a>
      <a class="text-[#244034] text-[15.259px] font-normal">Job Created </a>
      <a class="text-[#244034] text-[15.259px] font-normal">Applicants</a>
      <a class="text-[#244034] text-[15.259px] font-normal">Status </a>
      <a class="text-[#244034] text-[15.259px] font-normal">Action </a>
    </div>
    <div class="mt-14 flex flex-col gap-8">
      <JobsCard
        class="min-w-[95%] lg:min-w-[45%]"
        v-for="item in MyJob.data"
        :key="item"
        :job="item"
      />
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, computed, onMounted, reactive, watch } from "vue";

import JobsCard from "./JobsCard.vue";
import { storeToRefs } from "pinia";

import { useJobsStore } from "@/stores/jobs";
const jobsStore = useJobsStore();
const { MyJob } = storeToRefs(jobsStore);
onMounted(async () => {
  await jobsStore.handleMyJobs();
});
</script>
