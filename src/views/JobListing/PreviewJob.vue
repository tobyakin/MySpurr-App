<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useStore } from "@/stores/user";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import CircleBookMarkIcon from "@/components/icons/circleBookMarkIcon.vue";
import { storeToRefs } from "pinia";
import SearchIcon from "@/components/icons/circleSearchIcon.vue";
// import CircleTick from "@/components/icons/circleTick.vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
// let store = useStore();
import { useNumberFomateStore } from "@/stores/numberFomate";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";

import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useQuery } from "vue-query";
import { useJobsStore } from "@/stores/jobs";
import { useTabStore } from "@/stores/tab";
let numAbbr = useNumberFomateStore();

const store = useTabStore();
const jobsStore = useJobsStore();
const { JobDetailsById } = storeToRefs(jobsStore);
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const closeJob = async (slug) => {
  loading.value = true;
  try {
    const res = await jobsStore.handelCloseJob(slug);
    if (res.status === "true") {
      loading.value = false;
      router.push({ name: "job-lists" });
      // redirect to job-lists
    }
    return res;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};

const gotoApplications = (slug) => {
  router.push({ name: "applications", params: { slug: slug } });
};
const getJobDetails = async () => {
  let response = await jobsStore.handleGetJobDetailsById(route.params.id);
  return response;
};
const fetchData = async () => {
  await Promise.all([getJobDetails()]);
};

fetchData();
const { isLoading } = useQuery(["JobDetails", route.params.id], getJobDetails, {
  retry: 10,
  staleTime: 10000,
  onSuccess: (data) => {
    JobDetailsById.value = data;
  },
});

// onMounted(async () => {
//   await jobsStore.handleGetJobDetailsById(route.params.id);
// });
</script>

<template>
  <DashboardLayout>
    <ShortLoader v-if="isLoading" />
    <div v-else class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] lg:p-10 p-6">
        <div class="flex lg:flex-row flex-col gap-3 w-full">
          <div>
            <img
              class="h-[61.011px] w-[61.011px] rounded-full"
              src="@/assets/image/jobIcon.svg"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="flex lg:flex-row flex-col gap-4 justify-between">
              <div class="">
                <p class="text-[22.805px] font-Satoshi400 flex text-[#000]">
                  {{ JobDetailsById?.data?.company?.business_name }}
                </p>
                <div class="flex mt-1 gap-1">
                  <VerifyIcon class="w-4" />
                  <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
                    Verified Client.
                  </p>
                </div>
              </div>
              <div>
                <div class="flex gap-2">
                  <button class="">
                    <SearchIcon
                      class="lg:w-[54.215px] lg:h-[54.215px] h-[40px] w-[40px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div
            class="flex lg:flex-row flex-col gap-6 items-center justify-between w-full lg:gap-3"
          >
            <p
              class="lg:text-[26.625px] capitalize text-[19px] font-Satoshi500 text-[#000000]"
            >
              {{ JobDetailsById?.data?.job_title }}
            </p>
            <button
              @click="closeJob(JobDetailsById?.data?.slug)"
              :disabled="loading"
              :class="loading ? 'cursor-not-allowed' : ''"
              class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
            >
              <span v-if="!loading"> Close job </span>
              <WhiteLoader v-else />
            </button>
          </div>
          <div class="flex justify-between lg:mt-2 mt-6">
            <div class="flex gap-3 flex-wrap items-center">
              <div
                v-for="skill in JobDetailsById?.data?.skills"
                :key="skill"
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                {{ skill.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-[#E9FAFB] border-[0.735px] flex lg:flex-row flex-col gap-5 justify-between rounded-[17.104px] mt-10 p-6 lg:px-10"
      >
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Salary</p>
          <p class="text-[#244034] text-[17.104px] flex items-center font-Satoshi500">
            <span v-html="numAbbr.formatCurrency(JobDetailsById?.data?.currency)"></span>

            {{ store.abbr(JobDetailsById?.data?.salary_min) }}-
            {{ store.abbr(JobDetailsById?.data?.salary_max) }}/
            {{ JobDetailsById?.data?.salaray_type }}
          </p>
        </div>
        <!-- <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Expertise</p>
        <p class="text-[#244034] text-[17.104px] font-Satoshi500">
          {{ JobDetailsById?.data?.qualification }}
        </p>
      </div> -->
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Location</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.state }},
            {{ JobDetailsById?.data?.country }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Job Type</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.job_type }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Date</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.date_created }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Experience</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.experience }}
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row mt-10 w-full">
        <div class="lg:w-[60%] flex flex-col gap-6 justify-between p-4">
          <div>
            <p
              v-if="JobDetailsById?.data?.description"
              class="text-[16.236px] text-[#000] font-Satoshi500"
            >
              Job Description
            </p>

            <div
              v-html="JobDetailsById?.data?.description"
              class="text-[#000]/[0.75] editor font-Satoshi400 text-[12.546px] mt-4 leading-[24.689px]"
            ></div>

            <p class="text-[16.236px] text-[#000] font-Satoshi500 !mb-4 mt-6">
              Responsibilities
            </p>
            <div
              v-html="JobDetailsById?.data?.responsibilities"
              class="text-[#000]/[0.75] font-Satoshi400 editor text-[12.546px] mt-4 leading-[24.689px]"
            ></div>

            <p class="text-[16.236px] text-[#000] font-Satoshi500 !mb-4 mt-6">
              Required Skills:
            </p>
            <div
              v-html="JobDetailsById?.data?.required_skills"
              class="text-[#000]/[0.75] font-Satoshi400 editor text-[12.546px] leading-[24.689px]"
            ></div>

            <p
              v-if="JobDetailsById?.data?.benefits"
              class="text-[16.236px] text-[#000] font-Satoshi500 !mb-4 mt-6"
            >
              Benefits:
            </p>
            <div
              v-html="JobDetailsById?.data?.benefits"
              class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] leading-[24.689px]"
            ></div>
          </div>
        </div>
        <div class="lg:w-[40%]">
          <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] p-6">
            <p class="font-Satoshi700 text-[17.104px] text-[#31795A]/[0.70]">
              About the Company
            </p>
            <div class="flex mt-8 gap-4">
              <div>
                <img
                  class="h-[61.011px] w-[61.011px] rounded-full"
                  src="@/assets/image/jobIcon.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="flex gap-2 items-center">
                  <p class="text-[20.166px] font-Satoshi400 flex text-[#000]">
                    {{ JobDetailsById?.data?.company.business_name }}
                  </p>
                  <div class="flex mt-1 gap-1">
                    <VerifyIcon class="w-4" />
                    <p class="text-[10.646px] font-Satoshi700 text-[#000000B2]">
                      Verified Client.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3 flex-wrap mt-2 items-center">
                  <div
                    v-for="skill in JobDetailsById?.data?.company?.industry"
                    :key="skill"
                    class="bg-[#2F929C] font-Satoshi500 text-[8.552px] capitalize p-[4px] px-4 text-[#fff] rounded-full"
                  >
                    {{ skill.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-html="JobDetailsById?.data?.company.about_business"
              class="text-[#000]/[0.75] editor font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]"
            ></div>
            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div
              class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]"
            >
              <p>{{ JobDetailsById?.data?.total_opened_jobs }} Jobs opened</p>
            </div>

            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div class="flex rounded-[17.104px] mb-4 gap-6">
              <div class="flex flex-col gap-2">
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  Completed Jobs
                </p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  {{ JobDetailsById?.data?.completed_jobs }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Hired Jobs</p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  {{ JobDetailsById?.data?.hired_jobs }}
                </p>
              </div>
            </div>
            <button
              class="bg-[#31795A] rounded-full p-2 px-10 font-Satoshi500 text-[16.646px] text-white"
            >
              Message
            </button>
          </div>
        </div>
      </div>
      <div class="flex lg:flex-row flex-col gap-6 items-end mt-20 justify-end">
        <button
          @click="gotoApplications(JobDetailsById?.data?.slug)"
          class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
        >
          VIEW APPLICANTS
        </button>
        <button
          @click="closeJob(JobDetailsById?.data?.slug)"
          :disabled="loading"
          :class="loading ? 'cursor-not-allowed' : ''"
          class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
        >
          <span v-if="!loading"> Close job </span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
