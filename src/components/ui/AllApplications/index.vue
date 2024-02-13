<template>
  <div class="flex flex-col gap-[45px]">
    <Header :JobDetails="JobDetailsById?.data" />
    <div class="flex flex-row gap-4">
      <div class="w-[40%]">
        <h4 class="text-[#00000066] text-[12.032px] font-Satoshi400">
          All
          <span class="text-[#000000] font-Satoshi500">{{
            applicants?.data?.applicants?.length
          }}</span>
          Applicants
        </h4>
        <div class="w-full flex flex-col gap-[14px] mt-[44px]">
          <ApplicantsCard
            v-for="talent in applicants?.data?.applicants"
            :key="talent.id"
            :talent="talent"
            @viewProfile="handleViewProfile"
          />
        </div>
      </div>
      <div class="w-full">
        <ApplicantProfile
          v-if="talentApplication.data"
          :talents="talentApplication?.data"
        />
        <div v-else class="flex justify-center items-center">
          <h3 class="my-20">Select Talents to view details</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Header from "@/components/ui/AllApplications/Header.vue";
import ApplicantsCard from "@/components/ui/AllApplications/ApplicantsCard.vue";
import ApplicantProfile from "@/components/ui/AllApplications/ApplicantProfile.vue";
import { useJobsStore } from "@/stores/jobs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const jobsStore = useJobsStore();
const { JobDetailsById, applicants, talentApplication } = storeToRefs(jobsStore);
const applicantsId = ref(null);
const handleViewProfile = (id) => {
  applicantsId.value = id;
  console.log(id);
};
watch(applicantsId, async (newInput) => {
  await jobsStore.handleGetTalentApplication(newInput);
});

onMounted(async () => {
  await jobsStore.handleGetJobDetailsById(route.params.id);
  await jobsStore.handleGetApplicants(route.params.id);
});
</script>

<style></style>
