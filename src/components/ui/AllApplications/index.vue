<template>
  <div class="w-full">
    <ShortLoader v-if="loadTalentApplications" />
    <div v-else class="flex flex-col gap-[45px]">
      <Header :JobDetails="JobDetailsById?.data" />
      <FliterSection
        :JobDetails="JobDetailsById?.data"
        :applicantDeatails="applicants?.data?.applicants"
      />
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
            <ShortLoader v-if="loadApplicants" />
            <div
              v-if="!loadTalentProfile && applicants?.data?.applicants !== null"
              class="w-full flex flex-col gap-[14px]"
            >
              <ApplicantsCard
                v-for="talent in applicants?.data?.applicants"
                :key="talent.id"
                :talent="talent"
                :selected="talent.talent_id === applicantsId"
                @viewProfile="handleViewProfile"
              />
            </div>

            <div
              v-if="applicants?.data?.applicants == null && !loadApplicants"
              class="flex justify-center items-center"
            >
              <h3 class="my-20">no applicants yet</h3>
            </div>
          </div>
        </div>
        <div class="w-full">
          <ShortLoader v-if="loadTalentProfile" />
          <ApplicantProfile
            v-if="!loadTalentProfile && talentApplication.data"
            :talents="talentApplication?.data"
          />
          <div
            v-if="!talentApplication.data && !loadTalentProfile"
            class="flex justify-center items-center"
          >
            <h3 class="my-20">Select Talents to view details</h3>
          </div>
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
import FliterSection from "@/components/ui/AllApplications/FliterSection.vue";
import { useJobsStore } from "@/stores/jobs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
let loadTalentProfile = ref(false);
const route = useRoute();
const jobsStore = useJobsStore();
const { JobDetailsById, applicants, talentApplication } = storeToRefs(jobsStore);
const applicantsId = ref(null);
const handleViewProfile = (id) => {
  applicantsId.value = id;
  console.log(id);
};
watch(applicantsId, async (newInput) => {
  loadTalentProfile.value = true;
  await jobsStore.handleGetTalentApplication(newInput);
  loadTalentProfile.value = false;
});
onMounted(async () => {
  // await jobsStore.handleGetJobDetailsById(route.params.id);
  // await jobsStore.handleGetApplicants(route.params.id);
});
const getJobDetailsById = async () => {
  let response = await jobsStore.handleGetJobDetailsById(route.params.id);
  return response;
};
const getApplicants = async () => {
  let response = await jobsStore.handleGetApplicants(route.params.id);
  return response;
};
const fetchData = async () => {
  await Promise.all([getApplicants()]);
};
const fetchDataJobByID = async () => {
  await Promise.all([getJobDetailsById()]);
};

fetchDataJobByID();
fetchData();
// const { isLoading, isError, data, error } = useQuery(
//   ["getJobDetailsById"],
//   getJobDetailsById,
//   getApplicants,
//   {
//     retry: 10, // Will retry failed requests 10 times before displaying an error
//     staleTime: 10000,
//   }
// );
// const { isLoading, isError, data, error } = useQuery(
//   ["getJobDetailsById"],
//   getApplicants,
//   {
//     retry: 10, // Will retry failed requests 10 times before displaying an error
//     staleTime: 10000,
//   }
// );
const { isLoading: loadTalentApplications } = useQuery(
  ["getJobDetailsById", route.params.id],
  getJobDetailsById,
  {
    retry: 10,
    staleTime: 10000,
    onSuccess: (data) => {
      JobDetailsById.value = data;
    },
  }
);
console.log(loadTalentApplications.value);
const { isLoading: loadApplicants } = useQuery(
  ["getApplicants", route.params.id],
  getApplicants,
  {
    retry: 10,
    staleTime: 10000,
    onSuccess: (data) => {
      applicants.value = data;
    },
  }
);
</script>

<style></style>
