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
          v-for="item in jobsdata"
          :key="item"
          :job="item"
        />
      </div>
    </template>
  </Tab>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import Tab from "./Tab.vue";
import { useJobsStore } from "@/stores/jobs";
const JobsStore = useJobsStore();
import { storeToRefs } from "pinia";
const { myJobsApplications } = storeToRefs(JobsStore);

import JobRowCard from "@/components/ui/Jobs/JobRowCardCopy.vue";
const jobsdata = [
  {
    company_image: null,
    company_name: "MySpurr",
    verify: false,
    job_title: "Software Engineer",
    skills: [{ name: "React" }, { name: "NodeJS" }, { name: "MongoDB" }],
    employee_type: "Part-Time",
    location: "Remote",
    rate: " $30 - $50 / hour",
    weekly_hours: "20 hrs/week",
    availablity: true,
    match: true,
  },
  {
    company_image: null,
    company_name: "Trigo meadia",
    verify: true,
    job_title: " Developer in java c++kk",
    skills: [{ name: "React" }, { name: "NodeJS" }, { name: "MongoDB" }],
    employee_type: "Full-Time",
    location: "Remote",
    rate: " $30 - $50 / hour",
    weekly_hours: "30 hrs/week",
    availablity: true,
    match: false,
  },
  {
    company_image: null,
    company_name: "Kavlr.io",
    verify: false,
    job_title: "Vue Developer",
    skills: [{ name: "React" }, { name: "NodeJS" }, { name: "MongoDB" }],
    employee_type: "Full-Time",
    location: "Remote",
    rate: " $230 - $500 / hour",
    weekly_hours: "50 hrs/week",
    availablity: true,
    match: true,
  },
];
onMounted(async () => {
  await JobsStore.handleMyJobApplications();
});
</script>

<style></style>
