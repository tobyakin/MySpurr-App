<template>
  <div class="w-full h-full">
    <p class="text-[18px] font-Satoshi400 !mb-8 text-[#244034] h-[23px]">My Applications</p>

    <MyApplicationCard :applications="myJobsApplications" class="w-full" />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import MyApplicationCard from "@/components/ui/MyApplicationCard.vue";
import { useJobsStore } from "@/stores/jobs";
const JobsStore = useJobsStore();
const { myJobsApplications } = storeToRefs(JobsStore);
onMounted(async () => {
  await JobsStore.handleMyJobApplications();
});
</script>
