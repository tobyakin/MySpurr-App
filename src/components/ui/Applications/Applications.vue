<template>
    <Tab>
      <template #tab1> Open applications </template>
      <template #tab2> Closed applications </template>
      <template #view1>
        <div class="mt-14 flex flex-col gap-8">
          <JobRowCard
            class="min-w-[95%] lg:min-w-[45%]"
            v-for="item in myJobsApplications.data"
            :key="item"
            :job="item"
          />
        </div>
      </template>
      <template #view2>
        <div class="mt-14 flex flex-col gap-8">
          <JobRowCard
            class="min-w-[95%] lg:min-w-[45%]"
            v-for="item in myJobsApplications.data"
            :key="item"
            :job="item"
          />
        </div>
      </template>
    </Tab>
  </template>
  
  <script setup>
  import { onMounted, reactive, ref, computed, watch } from "vue";
  import Tab from "@/components/ui/MyApplications/Tab.vue";
  import { useJobsStore } from "@/stores/jobs";
  const JobsStore = useJobsStore();
  import { storeToRefs } from "pinia";
  const { myJobsApplications, JobDetailsById, applicants, talentApplication } = storeToRefs(JobsStore);
  
  import JobRowCard from "@/components/ui/Jobs/JobRowCardCopy.vue";

  onMounted(async () => {
    await JobsStore.handleMyJobApplications();
    console.log(myJobsApplications.data)
  });

  </script>
  
  <style></style>
  