<template>
  <div class="w-full">
    <ShortLoader v-if="loadTalentApplications" />
    <div v-else class="flex flex-col gap-[45px]">
      <Header :JobDetails="JobDetailsById?.data" />
      <div>
        <div
          class="bg-[#E9FAFB] border-[0.735px] flex lg:flex-row flex-col gap-3 justify-between overflow-hidden rounded-[17.104px] p-6 lg:px-6"
        >
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi400 text-[#244034c5] !text-[15.606px] !mb-2"
              >Salary</Label
            >
            <div
              class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-b-[#939292] border-b-[0.9px] opacity-[0.8029] text-[12.68px]"
            >
              <a-select
                placeholder="Salary"
                :bordered="false"
                :show-arrow="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="sortInput.Salary"
                @change="handleSort('skills', sortInput.Salary)"
              >
                <a-select-option v-for="item in Salary" :key="item" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi400 text-[#244034c5] !text-[15.606px] !mb-2"
              >Skill</Label
            >
            <div
              class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-b-[#939292] border-b-[0.9px] opacity-[0.8029] text-[12.68px]"
            >
              <a-select
                placeholder="Job Type"
                :bordered="false"
                :show-arrow="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="sortInput.skills"
                @change="handleSort('skills', sortInput.skills)"
              >
                <a-select-option
                  v-for="item in JobDetailsById?.data?.skills"
                  :key="item"
                  :value="item.name"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>

          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi400 text-[#244034c5] !text-[15.606px] !mb-2"
              >Location</Label
            >
            <div
              class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-b-[#939292] border-b-[0.9px] opacity-[0.8029] text-[12.68px]"
            >
              <a-select
                placeholder="Job Type"
                :bordered="false"
                :show-arrow="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="sortInput.Location"
                @change="handleSort('skills', sortInput.Location)"
              >
                <a-select-option
                  v-for="item in contriesCode?.data"
                  :key="item.id"
                  :value="item.name"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi400 text-[#244034c5] !text-[15.606px] !mb-2"
              >Experience</Label
            >
            <div
              class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-b-[#939292] border-b-[0.9px] opacity-[0.8029] text-[12.68px]"
            >
              <a-select
                placeholder="Job Type"
                :bordered="false"
                :show-arrow="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="sortInput.experienceLevel"
                @change="handleSort('skills', sortInput.experienceLevel)"
              >
                <a-select-option
                  v-for="item in Experience"
                  :key="item"
                  :value="item.name"
                >
                  {{ item.name }} {{ item.year }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi400 text-[#244034c5] !text-[15.606px] !mb-2"
              >Availabilty</Label
            >
            <div
              class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-b-[#939292] border-b-[0.9px] opacity-[0.8029] text-[12.68px]"
            >
              <a-select
                placeholder="Availabilty"
                :bordered="false"
                :show-arrow="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="sortInput.Availabilty"
              >
                <a-select-option v-for="item in availaibility" :key="item" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi400 text-[#244034c5] !text-[15.606px] !mb-2"
              >Rating</Label
            >
            <div
              class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-b-[#939292] border-b-[0.9px] opacity-[0.8029] text-[12.68px]"
            >
              <a-select
                placeholder="Rating"
                :bordered="false"
                :show-arrow="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="sortInput.Rating"
              >
                <a-select-option v-for="item in rating" :key="item" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </div>

      <!-- <FliterSection
        :JobDetails="JobDetailsById?.data"
        :applicantDeatails="applicants?.data?.applicants"
      /> -->
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
            <!-- <ShortLoader v-if="loadApplicants" /> -->
            <div class="w-full flex flex-col gap-[14px]">
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
import { onMounted, ref, onUnmounted, reactive, computed, watch } from "vue";
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
import { useSkillsStore } from "@/stores/skills";
const skillsStore = useSkillsStore();
const { contriesCode } = storeToRefs(skillsStore);

const applicantsId = ref(null);
const sortInput = reactive({
  Salary: "",
  skills: "",
  Availabilty: "",
  Rating: "",
  Location: "",
  experienceLevel: "",
});
const rating = ref([
  { label: "Good fit", value: 3 },
  { label: "Maybe", value: 2 },
  { label: "Not a fit", value: 1 },
]);

const Experience = [
  { name: "Beginner ", year: "(1-2 yrs)" },
  { name: "Intermediate ", year: "(3-5 yrs)" },
  { name: "Expert ", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];
const availaibility = computed(() => {
  return applicants.value?.data?.applicants?.map((item) => item.availaibility);
});
const Salary = computed(() => {
  return applicants.value?.data?.applicants?.map((item) => item.rate);
});

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
const filteredApplicants = computed(() => {
  let filtered = applicants?.data?.applicants;

  // Perform filtering based on sortInput values
  if (sortInput.Salary) {
    filtered = filtered.filter((applicant) => applicant.rate === sortInput.Salary);
  }
  if (sortInput.skills) {
    filtered = filtered.filter((applicant) =>
      applicant.skills.includes(sortInput.skills)
    );
  }
  if (sortInput.Availabilty) {
    filtered = filtered.filter(
      (applicant) => applicant.availability === sortInput.Availabilty
    );
  }
  // Perform additional filtering for other criteria if needed

  return filtered;
});
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
onUnmounted(() => {
  if (talentApplication && talentApplication.value) {
    talentApplication.value.data = null;
  }
});
onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getCountriesCode();
});
</script>

<style></style>
