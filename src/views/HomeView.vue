<script setup>
import { ref, onMounted, computed } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import LogoIcon from "@/components/icons/logoIcon.vue";
import BusinessJobCard from "@/components/ui/Jobs/Business/JobCard.vue";
import Barchar from "@/components/ui/Chart/Barchar.vue";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import BusinessValuesCard from "@/components/ui/Cards/BusinessValuesCard.vue";
import JobsStatistics from "@/components/ui/Jobs/Business/JobsStatistics.vue";
import TopPicksJob from "@/components/ui/TopPicksJob/TopPicksJob.vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import MyApplicationsCard from "@/components/ui/MyApplications/MyApplicationCard.vue";
import CoursesCard from "@/components/ui/Courses/CourseCard.vue";
import { useTabStore } from "@/stores/tab";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useStatisticsStore } from "@/stores/dashboardStatistics";
import { useMessageStore } from "@/stores/message";
const messageStore = useMessageStore();
const { allMessages } = storeToRefs(messageStore)
const statStore = useStatisticsStore();
const JobsStore = useJobsStore();
const { stat } = storeToRefs(statStore);
const { Job, MyJob } = storeToRefs(JobsStore);
const router = useRouter();
const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);
const jobsLoading = ref(false);
let loadMyjobs = ref(false);
let store = useStore();
let profile = useUserProfile();

const isOnBoarded = computed(() => profile.user);

const userDetails = computed(() => {
  return profile?.user?.data;
});
const userID = computed(() => {
  return profile.user.data.id;
});
const accountType = computed(() => {
  return store.getUser?.data?.user?.type;
});
const recievedMessagesLength = ref()

const getAllMessages = async (userId)=>{
  try {
    await messageStore.handleGetMessages(userId)
  } catch (error) {
    cconsole.log(error)
  }
  const recievedMessages = allMessages.value.data?.filter(message=> message?.sender_id != userId)
  recievedMessagesLength.value = recievedMessages.length

  return recievedMessagesLength.value
}
onMounted(() => {
  return accountType, userID;
});
onMounted(async () => {
  try {
    await profile.userProfile();
    if (
      isOnBoarded.value &&
      !isOnBoarded.value.business_details &&
      !isOnBoarded.value.work_details
    ) {
      if (accountType.value === "talent") {
        router.push({ name: "talent-onboarding" });
      } else if (accountType.value === "business") {
        router.push({ name: "business-onboarding" });
      }
    }
    if(isOnBoarded.value){
      getAllMessages(userID.value)
    }
  } catch (error) {
    /* empty */
  } finally {
    isLoading.value = !isLoading.value;
  }
});

const getMyJobApplications = async () => {
  if (accountType.value === "talent") {
    await JobsStore.handleMyJobApplications();
  }
};
const getAllJobs = async () => {
  if (accountType.value === "talent") {
    jobsLoading.value = true;
    try {
      await JobsStore.allJobs();
      jobsLoading.value = false;
    } catch (error) {
      jobsLoading.value = false;
    }
  }
};
const getStatistics = async () => {
  if (accountType.value !== "talent") {
    try {
      await statStore.handleGetStatistics();
    } catch (error) {
      /* empty */
    }
  }
};

const getMyJobs = async () => {
  loadMyjobs.value = true;
  try {
    let response = await JobsStore.handleMyJobs();
    loadMyjobs.value = false;
    return response;
  } catch (error) {
    /* empty */
  } finally {
    loadMyjobs.value = false;
  }
};

onMounted(async () => {
  try {
    await Promise.all([
      getMyJobs(),
      getStatistics(),
      getAllJobs(),
      getMyJobApplications()
    ]);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
});
</script>

<template>
  <DashboardLayout>
    <slot></slot>
    <!-- <OnboardingRequest
      v-if="isOnBoarded && !isOnBoarded.business_details && !isOnBoarded.work_details"
    /> -->
    <!-- <PagePreLoader v-if="isLoading" /> -->

    <div class="container p-0 lg:p-6 lg:py-3 py-4 mb-5 overflow-hidden">
      <span class="font-EBGaramond500 text-[#244034] text-[27.673px]"
        >Hi {{ userDetails?.first_name }} ,</span
      >
      <div class="flex lg:flex-row flex-col flex-grow gap-[31.92px] mt-6 w-full">
        <div
          class="p-4 px-6 flex flex-col justify-between rounded-[4.533px] w-full bg-[#EDF0B8] border-[0.567px] border-[#254035AB]"
        >
          <div>
            <div
              class="text-[25.739px] lg:flex-row flex-col gap-2 font-EBGaramond500 lg:leading-[44.616px] flex text-[#244034]"
            >
              <p>Welcome to</p>
              <LogoIcon class="lg:my-2 lg:mb-0 mb-3" />
            </div>
            <p
              v-if="accountType === 'talent'"
              class="text-[#011B1F] text-[12.299px] leading-[16.707px] font-Satoshi400"
            >
              You now have full access to our network of job openings and thriving
              community. Are you ready to take on new opportunities?
            </p>
            <p
              v-if="accountType !== 'talent'"
              class="text-[#011B1F] text-[12.299px] leading-[16.707px] font-Satoshi400"
            >
              You now have full access to our network of talents and thriving community.
              Are you ready to start hiring?
            </p>
          </div>
          <div class="flex gap-4 mt-6">
            <router-link
              v-if="accountType === 'talent'"
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/profile"
              >MySpurr profile</router-link
            >
            <router-link
              v-if="accountType === 'talent'"
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/jobs"
              >Find jobs</router-link
            >
            <router-link
              v-if="accountType === 'talent'"
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/wallet"
              >Wallet</router-link
            >
            <router-link
              v-if="accountType !== 'talent'"
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/post-job"
              >Post a job</router-link
            >
            <router-link
              v-if="accountType !== 'talent'"
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/talents"
              >Find talent</router-link
            >
            <router-link
              v-if="accountType === 'talent'"
              class="text-[#011B1F] font-Satoshi500 hidden border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/courses"
              >Take courses</router-link
            >
            <router-link
              class="text-[#011B1F] font-Satoshi500 hidden border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/community"
              >Community</router-link
            >
          </div>
        </div>
        <div
          class="p-4 px-6 flex flex-col gap-3 justify-between rounded-[4.533px] w-full bg-[#EDF0B8] border-[0.567px] border-[#254035AB]"
        >
          <div>
            <p
              class="text-[#244034] lg:text-[26.2px] text-[19px] leading-[51.2px] font-Satoshi500"
            >
              Verify your account details
            </p>
            <p class="text-[#011B1F] text-[12.299px] leading-[17.284px] font-Satoshi400">
              In order for you to receive payments, we need to
              <br class="lg:block hidden" />
              verify your identity.
            </p>
          </div>
          <div class="flex gap-4 mt-6">
            <router-link
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to="/verify-identity"
            >
              Verify Identity
            </router-link>

            <router-link
              to="/verify-identity"
              class="text-[12.299px] font-Satoshi500 hidden text-white text-center justify-center mx-auto bg-[#43D0DF] p-3 px-[20px] w-[60%] rounded-full"
            >
              Verify Identity
            </router-link>
          </div>
        </div>
      </div>
      <!-- Update -->
      <div v-if="accountType !== 'talent'" class="mt-12">
        <div class="flex lg:flex-row flex-col gap-[32.11px] my-8">
          <BusinessValuesCard
            class=""
            title="New candidates to review"
            :digit="userDetails?.new_applicants"
            buttonPlaceholder="REVIEW CANDIDATES"
            route="job-lists"
          />
          <BusinessValuesCard
            class=""
            title="Schedules for today"
            digit="_"
            :comingSoon="true"
            buttonPlaceholder="Book meeting"
          />
          <BusinessValuesCard
            class=""
            title="Messages received"
            :digit="recievedMessagesLength"
            :comingSoon="false"
            buttonPlaceholder="read messages"
            route="messages"
          />
        </div>
      </div>

      <!-- Jobs Statistics -->
      <div
        v-if="accountType !== 'talent'"
        class="flex lg:flex-row flex-col gap-[32.12px] my-8"
      >
        <JobsStatistics :statistics="stat?.data" class="min-w-[95%] lg:min-w-[65.9%]" />
        <div class="flex flex-col gap-4 w-full">
          <div
            class="p-[28.26px] px-[22.48px] rounded-[4.533px] w-full bg-[#FFF] flex flex-row justify-between h-full border-[0.567px] border-[#254035AB]"
          >
            <div class="flex flex-col gap-3 h-full w-full">
              <h4
                class="text-[#244034] leading-[17.646px] font-Satoshi700 text-[23.467px]"
              >
                Jobs Open
              </h4>
              <div class="flex flex-row gap-2">
                <h4 class="text-[#244034] font-Satoshi700 leading-none text-[60.722px]">
                  {{ userDetails?.total_opened_jobs }}
                </h4>
                <div class="flex flex-col h-full justify-between">
                  <div class="flex flex-row"></div>
                  <p
                    class="text-[#4B7226] flex flex-row mt-10 text-[13.486px] uppercase tracking-[1.124px] lg:leading-[21.353px]"
                  >
                    jobs opened
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-[28.26px] pr-[22.48px] pl-0 rounded-[4.533px] w-full h-full bg-[#FFF] border-[0.567px] border-[#254035AB]"
          >
            <div class="flex flex-col gap-3 h-full w-full">
              <h4
                class="text-[#244034] pl-[22.48px] leading-[19.646px] font-Satoshi700 text-[23.467px]"
              >
                Applicants Summary
              </h4>
              <div class="flex flex-row gap-2 pl-[22.48px]">
                <h4 class="text-[#244034] font-Satoshi700 leading-none text-[60.722px]">
                  {{ userDetails?.total_number_applicants }}
                </h4>
                <div class="flex flex-col h-full justify-between">
                  <div class="flex flex-row"></div>
                  <p
                    class="text-[#4B7226] flex flex-row mt-10 text-[13.486px] uppercase tracking-[1.124px] lg:leading-[21.353px]"
                  >
                    applicants
                  </p>
                </div>
              </div>
              <div class="flex flex-row w-full pl-[6px]">
                <Barchar :userDetails="userDetails" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- jobs updates -->
      <div v-if="accountType !== 'talent'" class="mt-12">
        <div class="flex justify-between mb-4">
          <p class="text-[18px] font-Satoshi400 text-[#244034]">Job Updates</p>

          <router-link
            class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
            to="/job-lists"
            >View all jobs</router-link
          >
        </div>
        <ShortLoader v-if="loadMyjobs" />

        <div v-else class="flex gap-3 overflow-x-auto hide-scrollbar my-8">
          <BusinessJobCard
            class="min-w-[95%] lg:min-w-[40%]"
            v-for="item in MyJob?.data"
            :key="item"
            :job="item"
          />
        </div>
      </div>

      <!-- jobs -->
      <div
        v-if="accountType === 'talent'"
        class="mt-12 w-full flex flex-col overflow-hidden"
      >
        <div class="flex w-full justify-between mb-4">
          <p class="text-[18px] font-Satoshi400 text-[#244034]">Top job picks for you</p>

          <router-link
            class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
            to="/jobs"
            >View all jobs</router-link
          >
        </div>
        <div class="flex flex-col w-full overflow-hidden">
          <ShortLoader v-if="jobsLoading && Job === null" />
          <div v-else><TopPicksJob :job="Job" /></div>
        </div>
      </div>
      <div
        v-if="accountType === 'talent'"
        class="mt-10 flex gap-3 w-full overflow-x-auto"
      >
        <div class="my-8 w-full">
          <!-- min-w-[95%] lg:min-w-[70%] -->

          <div class="flex lg:flex-row flex-col lg:h-[300px] h-auto gap-3">
            <MyApplicationsCard />
            <CoursesCard />
          </div>
        </div>
        <!-- <div class="my-8 hidden">
          <div class="flex invisible justify-between mb-8">
            <p class="text-[18px] font-Satoshi400 text-[#244034]">My Courses</p>

            <router-link
              class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
              to="/courses"
              >View all courses</router-link
            >
          </div>
          <div
            class="border-[#254035AB] w-full bg-[#F0F3C4] border-[0.735px] rounded-[7.347px] p-4 py-[1.1rem]"
          ></div>

          <div class="grid grid-cols-2 gap-3">
            <CourseCard v-for="item in 4" :key="item" />
          </div>
        </div> -->
      </div>
      <!-- community -->
      <!-- <div v-if="accountType === 'talent'" class="my-8 hidden">
        <div class="flex justify-between mb-4">
          <p class="text-[18px] font-Satoshi400 text-[#244034]">Communities</p>

          <router-link
            class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
            to="/community"
            >View all communies</router-link
          >
        </div>
        <div class="flex gap-3 overflow-x-auto hide-scrollbar my-8">
          <CommunityCard class="" v-for="item in 6" :key="item" />
        </div>
      </div> -->
      <!-- articles -->
      <!-- <div class="mt-10 hidden overflow-x-auto">
        <p class="text-[18px] font-Satoshi400 !mb-[60px] text-[#244034]">
          MySpurr Articles
        </p>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-3">
          <ArticleCard class="" v-for="item in 4" :key="item" />
        </div>
      </div> -->
    </div>
  </DashboardLayout>
</template>
