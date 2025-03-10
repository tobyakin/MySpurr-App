<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import BusinessJobCard from "@/components/ui/Jobs/Business/JobCard.vue";
import { useJobsStore } from "@/stores/jobs";

import SearchIconVeritical from "@/components/icons/searchIconVeritical.vue";
import LinkdeinIcon from "@/components/icons/linkdeinIcon.vue";
import Intro from "@/components/ui/ProfileEdit/Forms/Business/Intro.vue";
import InstagramIcon from "@/components/icons/instagramIcon.vue";
import BeIcon from "@/components/icons/beIcon.vue";
import TwitterIcon from "@/components/icons/twitterIcon.vue"
import EditProfileAvater from "@/components/ui/Avater/EditProfileAvater.vue";
import { useUserProfile } from "@/stores/profile";
import EditIcon from "@/components/icons/editIcon.vue";
import EditModal from "@/components/ui/ProfileEdit/EditModal.vue";
import ProfilePicture from "@/components/ui/ProfileEdit/Forms/Business/ProfilePicture.vue";
import HeadlineBio from "@/components/ui/ProfileEdit/Forms/Business/HeadlineBio.vue";
import OverviewPage from "@/components/ui/ProfileEdit/Forms/Business/OverviewPage.vue";
import { storeToRefs } from "pinia";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import Arrow from "@/components/icons/paginationArrow.vue"
import { useTabStore } from "@/stores/tab";

import { useClipboard } from "@vueuse/core";
import { useToast } from "vue-toastification";
import { useQuery } from "vue-query";
import { useStore } from "@/stores/user";

const userDetails = computed(() => {
  return user?.value?.data;
});

let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
let source = "";
onMounted(async () => {
  await profile.userProfile()
  source =
  import.meta.env.VITE_LANDING_PAGE +
    `business/` +
    `${userDetails.value?.business_name}/`.toLowerCase().replace(/ /g, '-') +
    userDetails.value?.uniqueId
  return accountType;
});
let profile = useUserProfile();
const { user } = storeToRefs(profile);
const tabStore = useTabStore();
const JobsStore = useJobsStore();
const { MyJob } = storeToRefs(JobsStore);
let loadMyjobs = ref(false);
const Maps = defineAsyncComponent(() => import("@/components/ui/Map/Map.vue"));

const toast = useToast();

import { useRouter } from "vue-router";
const router = useRouter();

let view = null;
let showModal = ref(false);
let formTitle = ref("");

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

const scrollContainer = ref(null);
const scrollAmount = 300; // Amount to scroll
const isAtStart = ref(true);
const isAtEnd = ref(false);

const checkScrollPosition = () => {
  const container = scrollContainer.value;
  if (container) {
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    isAtStart.value = scrollLeft === 0;

    isAtEnd.value = scrollLeft >= maxScrollLeft;
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
  checkScrollPosition();
};

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }
  checkScrollPosition();
};

// Copy Function
const { copy, copied, isSupported } = useClipboard({ source });

const HandleToggleEditImageModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Profile Picture";
  view = ProfilePicture;
};
const HandleToggleEditHeadlineBioModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Headline Bio";
  view = HeadlineBio;
};
const HandleToggleEditIntro = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Intro";
  view = Intro;
};
const HandleToggleEditOverviewModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Overview";
  view = OverviewPage;
};
const closeModal = () => {
  showModal.value = !showModal.value;
  view = null;
};
const redirectToMessage = () => {
  router.push({ name: "messages"});
};

const copyUrl = () => {
  if (isSupported) {
    if (copied) {
      copy(source);
      toast.success("Link Copied", {
        timeout: 4000,
      });
    }
  } else {
    toast.error("Your browser does not support Clipboard API", {
      timeout: 4000,
    });
  }
};

const getProfileData = async () => {
  let response = await profile.userProfile();
  return response;
};
const fetchData = async () => {
  await Promise.all([getProfileData()]);
};

fetchData();

const { isLoading } = useQuery(["profile"], getProfileData, {
  retry: 10,
  staleTime: 10000,
  onSuccess: (data) => {
    user.value = data;
  },
});

const size = computed(()=>{
  return userDetails.value?.size?.length > 0 ? userDetails.value?.size : '-'
})

const formattedWebsite = computed(() => {
  const website = userDetails.value?.website || '';
  if (website && !website.startsWith('http://') && !website.startsWith('https://')) {
    return `http://${website}`;  // You can default to http, or change to https
  }
  return website;
});

onMounted(async () => {
  checkScrollPosition();
  try {
    await Promise.all([
      getMyJobs(),
      
    ]);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
});

</script>



<template>
  <DashboardLayout>
    <ShortLoader v-if="isLoading" />
    <div
      v-else
      class="flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <div id="talent-cv" class="mx-auto w-[80%] msgBreak:w-[90%] dashBreak2:w-[85%] msgTab:container talent-cv">
        <div
          class="bg-[#E9FAFB] border-[#F6F6F6] flex flex-col gap-8 justify-between border-[1px] rounded-[15px] p-6 px-14"
        >
          <div class="flex lg:flex-row flex-col gap-5 justify-between items-center">
            <div
              class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
            >
              <EditProfileAvater
                :imageUrl="userDetails?.company_logo"
                @toggleModal="HandleToggleEditImageModal"
                inputClasses="!h-[89.536px] !w-[89.536px]"
                class=""
              />
              <div class="lg:text-left text-center">
                <p
                  class="text-[#000000] text-[17.518px] capitalize font-Satoshi500 leading-[31.739px]"
                >
                  {{ userDetails.business_name }}
                </p>
                <p
                  class="text-[#00000066] !my-1.5 text-[14.598px] flex gap-[8px] items-center capitalize leading-[31.739px] font-Satoshi400"
                  v-if="userDetails?.skill_title"
                >
                  {{ userDetails?.skill_title }}
                  <span
                    v-if="userDetails?.experience_level"
                    class="bg-[#00474F] rounded-full py-[0.05px] capitalize text-[10.519px] text-[#E6F1F3] font-medium px-[19px]"
                    >{{ userDetails?.experience_level }}</span
                  >
                </p>
                <div class="flex items-center lg:justify-start justify-center gap-2">
                  <p
                    class="text-[#244034] flex gap-3 lg:text-[13.625px] text-[14px] font-Satoshi500"
                  >
                    {{ userDetails?.location }}
                    <a
                      v-if="accountType === 'business'"
                      :href="formattedWebsite"
                      target="_blank"
                      class="underline text-[13.63px] cursor-pointer font-Satoshi500 text-[#244034]"
                      >View Website</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center lg:justify-center lg:items-end gap-6">
              
              <div class="flex items-center gap-5">
                <button @click="HandleToggleEditHeadlineBioModal">
                  <EditIcon class="text-[#297F88]" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="accountType === 'business'"
            class="flex flex-row justify-between items-center dashBreak:flex-col dashBreak:gap-6"
          >
            <div class="flex items-center justify-center lg:justify-start lg:items-center gap-10 msgTab:flex-col msgTab:gap-4 dashBreak:order-2">
              <div class="flex flex-col gap-3 msgTab:flex-row">
                <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Size</p>
                <h4 class="text-[#244034] font-Satoshi500 text-[13.25px]">{{ size }}</h4>
              </div>
              <div class="flex flex-col gap-3 msgTab:flex-row">
                <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Email</p>
                <h4 class="text-[#244034] font-Satoshi500 text-[13.25px]">
                  {{ userDetails?.business_email }}
                </h4>
              </div>
              <div class="flex flex-col gap-3 msgTab:flex-row">
                <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Phone</p>
                <h4 class="text-[#244034] font-Satoshi500 text-[13.25px]">+{{ userDetails?.country_code }}{{ userDetails?.phone_number }}</h4>
              </div>
              <div class="flex flex-col gap-3 msgTab:flex-row">
                <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Category</p>
                <h4 class="text-[#244034] capitalize font-Satoshi500 text-[13.25px]">
                  {{ userDetails?.business_service }}
                </h4>
              </div>
            </div>
            <div class="flex flex-col justify-end dashBreak:justify-center gap-4">
              <div class="flex justify-end gap-3 items-center dashBreak:justify-center">
                  <a
                    v-if="userDetails?.social_media?.linkedin"
                    :href="userDetails?.social_media?.linkedin"
                    target="_blank"
                  >
                    <LinkdeinIcon />
                  </a>
                  <a
                    v-if="userDetails?.social_media?.instagram"
                    :href="userDetails?.social_media?.instagram"
                    target="_blank"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    v-if="userDetails?.social_media?.behance"
                    :href="userDetails?.social_media?.behance"
                    target="_blank"
                  >
                    <BeIcon />
                  </a>
                  <a
                    v-if="userDetails?.social_media?.twitter"
                    :href="userDetails?.social_media?.twitter"
                    target="_blank"
                  >
                    <TwitterIcon />
                  </a>
                
              </div>
              <div class="flex items-center gap-5">
                <button @click="copyUrl()">
                  <SearchIconVeritical />
                </button>
                <button
                  class="btn-brand !bg-[#31795A] !border-none text-center flex items-start !py-2 !text-white"
                  @click="redirectToMessage"
                >
                  <span style="display: grid; place-content: center" class="">Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row mt-10 w-full">
          <div class="lg:w-[70%] p-4">
            <div class="flex flex-row items-center justify-between gap-[96px]">
              <p class="text-[1.67rem] text-[#000] font-Satoshi500">Overview</p>
              <button @click="HandleToggleEditOverviewModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>
            <div
              class="text-[#000000BF] font-Satoshi400 text-justify text-[1rem] mt-4 leading-[2rem]"
            >
              <p>
                {{ userDetails?.about_business }}
              </p>
            </div>
            <div
              v-if="accountType === 'business'"
              class="flex flex-row items-center justify-between mt-10 mb-8 gap-[96px]"
            >
              <p class="text-[1.67rem] text-[#000] font-Satoshi500">Introductory Video</p>
              <button @click="HandleToggleEditIntro">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>
            <!-- no video url in userDetails response -->
            <div
              v-if="accountType === 'business'"
              class="text-[#000000BF]"
            >
              <h3>*No introductory video yet</h3>
            </div>
            <!-- <div
              v-if="accountType === 'business'"
              class="text-[#000000BF] bg-[#E1E1E1] h-[422.49px] rounded-[9.56px] border-[0.96px] border-[#E1E1E1] font-Satoshi400 text-justify text-[16px] mt-4 leading-[35px]"
            >
            
            </div> -->
          </div>
          <div class="lg:w-[30%] p-4">
            <p
              :class="accountType === 'talent' ? 'mt-16' : ''"
              class="text-[1.67rem] text-[#000] font-Satoshi500"
            >
              Location
            </p>
            <div class="flex flex-col gap-12 mt-4 relative rounded-[15px]">
              <Maps :lat="userDetails?.latitude" :lng="userDetails?.longitude" />
            </div>
          </div>
        </div>
        <div
          v-if="accountType !== 'talent'"
          class="mt-12 w-full flex flex-col overflow-hidden"
        >
          <div class="flex w-full justify-between mb-4">
            <p class="text-[1.67rem] text-[#000] font-Satoshi500">Open Positions</p>

            <router-link
              class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
              to="/post-job"
              >Post a job</router-link
            >
          </div>
          <div>
            <!-- <TopPicksJob :job="topPickedJobs" /> -->
          </div>
          <div class="flex gap-3 overflow-x-auto w-full hide-scrollbar my-8">
            <ShortLoader v-if="loadMyjobs" />
            <div v-else class="w-full">
              <div 
              ref="scrollContainer"
              class="flex gap-3 overflow-x-auto hide-scrollbar my-8">
                  <BusinessJobCard
                    class="min-w-[95%] lg:min-w-[40%]"
                    v-for="item in MyJob?.data"
                    :key="item"
                    :job="item"
                  />
                </div>
                <div class="flex w-[60%] flex-row gap-4">
                  <button
                    @click="scrollLeft"
                    :disbled="isAtStart"
                    class="border-[#007582] border-2 p-4 py-2 rounded-l-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
                    :class="{ 'opacity-50 cursor-not-allowed': isAtStart }"
                  >
                    <Arrow class="rotate-[180deg]"  :class="{ 'opacity-50 cursor-not-allowed': isAtStart }"/>
                  </button>
                  <button
                    @click="scrollRight"
                    :disbled="isAtEnd"
                    class="border-[#007582] border-2 p-4 py-2 rounded-r-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
                    :class="{ 'opacity-50 cursor-not-allowed': isAtEnd }"
                  >
                    <Arrow :class="{ 'opacity-50 cursor-not-allowed': isAtEnd }"/>
                  </button>
                </div>
            </div >
          </div>
        </div>
      </div>
    </div>
    <EditModal
      v-if="showModal"
      @closeModal="closeModal"
      :formTitle="formTitle"
      :view="view"
    />
  </DashboardLayout>
</template>
