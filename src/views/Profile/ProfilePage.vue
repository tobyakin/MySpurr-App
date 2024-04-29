<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import WorkExperience from "@/components/ui/genericComponents/WorkExperience.vue";
import EducationDetails from "@/components/ui/genericComponents/EducationDetails.vue";
import LinkdeinIcon from "@/components/icons/linkdeinIcon.vue";
import InstagramIcon from "@/components/icons/instagramIcon.vue";
import BeIcon from "@/components/icons/beIcon.vue";
import TwitterIcon from "@/components/icons/twitterIcon.vue";
import RateStar from "@/components/icons/rateStar.vue";
import CertificateBadge from "@/components/icons/certificateBadge.vue";
import LinkIcon from "@/components/icons/linkIcon.vue";
import EditProfileAvater from "@/components/ui/Avater/EditProfileAvater.vue";
import { useUserProfile } from "@/stores/profile";
import EditIcon from "@/components/icons/editIcon.vue";
import EditModal from "@/components/ui/ProfileEdit/EditModal.vue";
import ProfilePicture from "@/components/ui/ProfileEdit/Forms/ProfilePicture.vue";
import HeadlineBio from "@/components/ui/ProfileEdit/Forms/HeadlineBio.vue";
import OverviewPage from "@/components/ui/ProfileEdit/Forms/OverviewPage.vue";
import SkillsPage from "@/components/ui/ProfileEdit/Forms/SkillsPage.vue";
import EducationPage from "@/components/ui/ProfileEdit/Forms/EducationPage.vue";
import WorkExperiencePage from "@/components/ui/ProfileEdit/Forms/WorkExperience.vue";
import PortfolioPage from "@/components/ui/ProfileEdit/Forms/PortfolioPage.vue";
import CertificatePage from "@/components/ui/ProfileEdit/Forms/CertificatePage.vue";
// import Map from "@/components/ui/Map/Map.vue";
import { storeToRefs } from "pinia";
// import PagePreLoader from "@/components/ui/Loader/PagePreLoader.vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
// import Scroller from "@/components/ui/Scroller.vue";
// const horizontalDiv = ref();
import Carousel from "@/components/ui/Carousel/index.vue";
import { useClipboard } from "@vueuse/core";
import { useToast } from "vue-toastification";
// import { useQuery } from "vue-query";
import { useTabStore } from "@/stores/tab";
import { useStore } from "@/stores/user";

let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  return accountType;
});
const printPage = () => {
  window.print();
};

const tabStore = useTabStore();
const Map = defineAsyncComponent(() => import("@/components/ui/Map/Map.vue"));

const toast = useToast();

import { useRouter } from "vue-router";
const router = useRouter();
// const showPageLoader = ref(true);

let profile = useUserProfile();
const { user } = storeToRefs(profile);

const userDetails = computed(() => {
  return user?.value?.data;
});
let view = null;
let showModal = ref(false);
let formTitle = ref("");

const source = ref(
  import.meta.env.VITE_LANDING_PAGE +
    `talent/` +
    `${userDetails.value?.first_name}-${userDetails.value?.last_name}/` +
    userDetails.value?.uniqueId
);
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
const HandleToggleEditOverviewModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Overview";
  view = OverviewPage;
};
const HandleToggleSkillsPageModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Skills";
  view = SkillsPage;
};
const HandleToggleEducationPageModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Education";
  view = EducationPage;
};
const HandleToggleWorkExperiencePageModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Work experience";
  view = WorkExperiencePage;
};
const HandleTogglePortfolioModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Portfolio";
  view = PortfolioPage;
};
const HandleToggleCertificateModal = () => {
  showModal.value = !showModal.value;
  formTitle.value = "Certificate";
  view = CertificatePage;
};
const closeModal = () => {
  showModal.value = !showModal.value;
  view = null;
};
const redirectToSinglePortfolio = (id) => {
  router.push({ name: "edit-portfolio", params: { id: id } });
};

const copyUrl = () => {
  if (isSupported) {
    if (copied) {
      console.log(source.value);
      copy(source.value);
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
let Loading = ref(false);

//   const { isLoading } = useQuery(["profile"], fetchData, {
//     retry: 10,
//     staleTime: 10000,
//     onSuccess: (data) => {
//       user.value = data;
//     },
//   });
// function creatNewPortfolio() {
//   toast.success(
//     "Portfolio creation is temporarily under maintenance for enhancements and improvements.",
//     {
//       timeout: 4000,
//     }
//   );
// }
// function redirectToEditPortfolio() {
//   toast.success(
//     "Portfolio editing is currently undergoing a tune-up for an even better experience!",
//     {
//       timeout: 4000,
//     }
//   );
// }
onMounted(async () => {
  Loading.value = true;
  try {
    fetchData();
    Loading.value = false;
  } catch (error) {
    console.error;
  } finally {
    Loading.value = false;
  }
});
</script>

<template>
  <DashboardLayout>
    <ShortLoader v-if="Loading" />
    <div
      v-else
      class="flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <div id="talent-cv" class="container talent-cv">
        <div
          class="bg-[#E9FAFB] border-[#F6F6F6] flex flex-col gap-8 justify-between border-[1px] rounded-[15px] p-6 px-14"
        >
          <div class="flex lg:flex-row flex-col gap-5 justify-between items-center">
            <div
              class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
            >
              <EditProfileAvater
                :imageUrl="
                  accountType === 'talent'
                    ? userDetails?.image
                    : userDetails?.company_logo
                "
                @toggleModal="HandleToggleEditImageModal"
                inputClasses="!h-[89.536px] !w-[89.536px]"
                class=""
              />
              <!-- <EditProfileAvater
              v-if="accountType === 'business'"
              :imageUrl="userDetails?.company_logo"
              @toggleModal="HandleToggleEditImageModal"
              inputClasses="!h-[89.536px] !w-[89.536px]"
              class=""
            /> -->
              <div class="lg:text-left text-center">
                <p
                  class="text-[#000000] text-[17.518px] capitalize font-Satoshi500 leading-[31.739px]"
                >
                  {{ userDetails?.first_name }} {{ userDetails?.last_name }}
                </p>
                <p
                  class="text-[#00000066] !my-1.5 text-[14.598px] flex gap-[8px] items-center capitalize leading-[31.739px] font-Satoshi400"
                >
                  {{ userDetails?.skill_title
                  }}<span>
                    <span
                      v-if="userDetails?.experience_level"
                      class="bg-[#00474F] rounded-full py-[2.05px] capitalize text-[10.519px] text-[#E6F1F3] font-medium px-[19px]"
                      >{{ userDetails?.experience_level }}</span
                    ></span
                  >
                </p>
                <div class="flex items-center lg:justify-start justify-center gap-2">
                  <p
                    v-if="accountType === 'talent'"
                    class="lg:text-[13.625px] text-[14px] text-[#244034] font-Satoshi500"
                  >
                    ${{ tabStore.abbr(userDetails?.rate) }}/hr
                  </p>
                  <div
                    v-if="accountType === 'talent'"
                    class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"
                  ></div>
                  <p
                    class="text-[#244034] flex gap-3 lg:text-[13.625px] text-[14px] font-Satoshi500"
                  >
                    {{ userDetails?.location }}
                    <a
                      v-if="accountType === 'business'"
                      :href="userDetails?.website"
                      target="_blank"
                      class="underline text-[13.63px] cursor-pointer font-Satoshi500 text-[#244034]"
                      >View Website</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center lg:justify-center lg:items-end gap-6">
              <div class="flex flex-row justify-center gap-3">
                <a
                  v-if="userDetails?.linkedin"
                  :href="userDetails?.linkedin"
                  target="_blank"
                >
                  <LinkdeinIcon />
                </a>
                <a
                  v-if="userDetails?.instagram"
                  :href="userDetails?.instagram"
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
                <a
                  v-if="userDetails?.behance"
                  :href="userDetails?.behance"
                  target="_blank"
                >
                  <BeIcon />
                </a>
                <a
                  v-if="userDetails?.twitter"
                  :href="userDetails?.twitter"
                  target="_blank"
                >
                  <TwitterIcon />
                </a>
              </div>
              <div class="flex items-center gap-5">
                <div
                  v-if="isSupported && accountType === 'talent'"
                  class="bg-[#EDF0B8] p-2 flex relative overflow-hidden pr-6 rounded-[5.982px] mt-0"
                >
                  <a
                    role="button"
                    target="_blank"
                    :href="
                      `https://www.myspurr.net/talent/` +
                      `${userDetails?.first_name}-${userDetails?.last_name}` +
                      `/` +
                      userDetails?.uniqueId
                    "
                    @click="copyUrl()"
                    class="text-[10.476px] font-Satoshi500 text-[#01272C]"
                    >myspurr.net/talent/{{ userDetails?.first_name }}</a
                  >
                  <div
                    class="bg-[#2C4C50] p-1 absolute right-1 top-[6px] flex items-start rounded-full"
                  >
                    <LinkIcon class="h-[7.596px] w-[7.px6px]" />
                  </div>
                </div>
                <button
                  class="exclude-from-print"
                  @click="HandleToggleEditHeadlineBioModal"
                >
                  <EditIcon class="text-[#297F88]" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="accountType === 'business'"
            class="flex flex-row items-center lg:justify-start lg:items-center gap-10"
          >
            <div class="flex flex-col gap-3">
              <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Size</p>
              <h4 class="text-[#244034] font-Satoshi500 text-[13.25px]">.</h4>
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Email</p>
              <h4 class="text-[#244034] font-Satoshi500 text-[13.25px]">
                {{ userDetails?.business_email }}
              </h4>
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Phone</p>
              <h4 class="text-[#244034] font-Satoshi500 text-[13.25px]">.</h4>
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-[#24403480] font-Satoshi400 text-[13.25px]">Category</p>
              <h4 class="text-[#244034] capitalize font-Satoshi500 text-[13.25px]">
                {{ userDetails?.business_service }}
              </h4>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row mt-10 w-full">
          <div class="lg:w-[70%] p-4">
            <div class="flex flex-row items-center justify-between gap-[96px]">
              <p class="text-[28px] text-[#000] font-Satoshi500">Overview</p>
              <button class="exclude-from-print" @click="HandleToggleEditOverviewModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>
            <div
              class="text-[#000000BF] font-Satoshi400 text-justify text-[16px] mt-4 leading-[35px]"
            >
              <p>
                {{
                  accountType === "talent"
                    ? userDetails?.overview
                    : userDetails?.about_business
                }}
              </p>
              <!-- <p class="mt-4"></p> -->
              <!-- .slice(0, 10) -->
              <!--               
 -->
              <!--               {{ talents?.top_skills.length - 10 }}+
 -->
            </div>
            <div
              v-if="accountType === 'business'"
              class="flex flex-row items-center justify-between my-10 gap-[96px]"
            >
              <p class="text-[28px] text-[#000] font-Satoshi500">Intro</p>
              <button @click="HandleToggleEditOverviewModal">
                <EditIcon class="text-[#297F88] exclude-from-print" />
              </button>
            </div>
            <div
              v-if="accountType === 'business'"
              class="text-[#000000BF] bg-[#E1E1E1] h-[422.49px] rounded-[9.56px] border-[0.96px] border-[#E1E1E1] font-Satoshi400 text-justify text-[16px] mt-4 leading-[35px]"
            ></div>

            <div
              v-if="accountType === 'talent'"
              class="flex flex-row items-center justify-between gap-[96px] !mb-4 mt-6"
            >
              <p class="text-[28px] text-[#000] font-Satoshi500">Skills</p>
              <button @click="HandleToggleSkillsPageModal">
                <EditIcon class="text-[#297F88] exclude-from-print" />
              </button>
            </div>

            <div v-if="accountType === 'talent'" class="flex gap-4 flex-wrap">
              <div
                v-for="item in userDetails?.top_skills"
                :key="item.name"
                class="bg-[#EFF6F3] rounded-full p-5 py-3 text-[17px] text-center font-Satoshi400 text-[#276A4D]"
              >
                {{ item.name }}
              </div>

              <div
                class="bg-[#D2F34C] hidden rounded-full p-4 py-3 text-[17px] font-Satoshi400 text-[#000000]"
              ></div>
            </div>
            <div
              v-if="accountType === 'talent'"
              class="flex flex-row items-center justify-between gap-[96px] !mb-12 mt-8"
            >
              <p class="text-[28px] text-[#000] font-Satoshi500">Education</p>
              <button @click="HandleToggleEducationPageModal">
                <EditIcon class="text-[#297F88] exclude-from-print" />
              </button>
            </div>

            <EducationDetails
              v-if="accountType === 'talent'"
              :items="userDetails?.education"
            />
            <div
              v-if="accountType === 'talent'"
              class="flex flex-row items-center justify-between gap-[16px] !mb-12 mt-8"
            >
              <p class="text-[28px] text-[#000] font-Satoshi500">Work Experience</p>
              <button @click="HandleToggleWorkExperiencePageModal">
                <EditIcon class="text-[#297F88] exclude-from-print" />
              </button>
            </div>

            <WorkExperience
              v-if="accountType === 'talent'"
              :items="userDetails?.employment"
            />
            <div>
              <div
                v-if="accountType === 'talent'"
                class="flex flex-row items-center justify-between gap-[96px] !mb-12 mt-8"
              >
                <p class="text-[28px] text-[#000] font-Satoshi500">Portfolio</p>
                <!-- @click="HandleTogglePortfolioModal" -->
                <button @click="HandleTogglePortfolioModal">
                  <EditIcon class="text-[#297F88] exclude-from-print" />
                </button>
              </div>
              <div
                v-if="!userDetails?.portfolio && accountType === 'talent'"
                class="flex flex-col w-full justify-center items-center"
              >
                <p
                  class="text-[15px] text-[#000] font-Satoshi400 text-center !mb-12 mt-8"
                >
                  Uploaded portfolio can be viewed here
                </p>
              </div>
              <Carousel
                v-if="userDetails?.portfolio"
                :dataValue="userDetails?.portfolio"
                @toPage="redirectToSinglePortfolio"
              />

              <!-- <div
                ref="horizontalDiv"
                v-if="userDetails?.portfolio"
                class="overflow-hidden flex flex-row w-full gap-3 hide-scrollbar overflow-x-auto"
              > -->
              <!--   
                                  class="overflow-hidden hide-scrollbar flex flex-row w-full lg:grid lg:grid-cols-3 gap-3 overflow-x-auto"

 -->
              <!--                 @click="redirectToSinglePortfolio(img.id)"
 -->
              <!-- <img
                  role="button"
                  @click="redirectToEditPortfolio"
                  v-for="img in userDetails?.portfolio"
                  :key="img"
                  :src="img.featured_image"
                  class="h-[221.52px] object-cover flex flex-col bg-[#EFF6F3] w-full rounded-lg"
                  :alt="img.title"
                /> -->
              <!-- </div> -->
              <!-- <div class="flex justify-center mt-3 w-full">
                <Scroller
                  :element="horizontalDiv"
                  :distance="horizontalDiv?.clientWidth"
                />
              </div> -->
            </div>
            <p class="text-[28px] text-[#000] font-Satoshi500 hidden !mb-12 mt-8">
              Reviews
            </p>
            <div class="flex flex-col hidden gap-4">
              <div
                v-for="i in 3"
                :key="i"
                class="border-[#2440341A] border-[1.265px] rounded-[9.732px] p-6"
              >
                <p
                  class="text-[#001E00] font-Satoshi400 text-[16px] mb-4 tracking-[0.6px]"
                >
                  Find B2B Partners for UK and US Online Tutoring Company
                </p>
                <div class="flex items-center gap-1 font-Satoshi400 mb-2">
                  <RateStar v-for="i in 5" :key="i" />
                  <span class="text-[#001E00] text-[14px]">5.00 </span
                  ><span class="text-[#5E6D55] text-[12px]"
                    >Dec 15, 2022 - Feb 2, 2023</span
                  >
                </div>
                <p
                  class="text-[#001E00] font-Satoshi400 italic text-[13px] mb-4 tracking-[0.6px]"
                >
                  "Great lead generation for education companies"
                </p>
                <p class="text-[#5E6D55] font-Satoshi400 text-[14px]">Private earnings</p>
              </div>
            </div>
          </div>
          <div class="lg:w-[30%] p-4">
            <div
              v-if="accountType === 'talent'"
              class="flex flex-row items-center justify-between gap-[26px]"
            >
              <p class="text-[28px] text-[#000] font-Satoshi500">Certificates</p>
              <button @click="HandleToggleCertificateModal">
                <EditIcon class="text-[#297F88] exclude-from-print" />
              </button>
            </div>

            <div
              v-if="accountType === 'talent'"
              class="bg-[#E9FAFB] p-6 border-[#F6F6F6] border-[1px] flex flex-col gap-10 mt-4 rounded-[15px]"
            >
              <div
                v-for="i in userDetails?.certificate"
                :key="i"
                class="flex items-center gap-4"
              >
                <CertificateBadge />
                <div class="flex flex-col gap-0 h-auto">
                  <a
                    target="_blank"
                    :href="i.certificate_link"
                    class="text-[15px] text-[#000] font-Satoshi500 hover:text-brand overflow-hidden"
                  >
                    {{ i.title }}
                  </a>
                  <p class="text-[14px] leading-[20px] text-[#31795A] font-Satoshi500">
                    {{ i.institute }}
                  </p>
                  <div class="flex items-center gap-2">
                    <!-- <CalenderWithPen /> -->
                    <p class="font-Satoshi500 text-[12.9px] text-[#000000]">
                      {{ i.certificate_year }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="">
                <button
                  @click="printPage"
                  class="btn-brand !border-none !w-full !py-2 !px-2 !text-[#FFFFFF] exclude-from-print text-center !bg-[#31795A]"
                >
                  <span class="text-[12.067px]">Download CV</span>
                </button>
              </div>
            </div>
            <p
              :class="accountType === 'talent' ? 'mt-16' : ''"
              class="text-[20px] text-[#000] font-Satoshi500"
            >
              Location
            </p>
            <div class="flex flex-col gap-12 mt-4 relative rounded-[15px]">
              <!-- <img src="@/assets/image/Map.webp" alt="map" /> -->
              <Map :lat="userDetails?.latitude" :lng="userDetails?.longitude" />
            </div>
          </div>
        </div>
        <div
          v-if="accountType !== 'talent'"
          class="mt-12 w-full flex flex-col overflow-hidden"
        >
          <div class="flex w-full justify-between mb-4">
            <p class="text-[18px] font-Satoshi400 text-[#244034]">Open Positions</p>

            <router-link
              class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
              to="/post-job"
              >Post a job</router-link
            >
          </div>
          <div>
            <!-- <TopPicksJob :job="topPickedJobs" /> -->
          </div>
          <!-- <div class="flex gap-3 overflow-x-auto w-full hide-scrollbar my-8">
          <JobCard
            class="min-w-[380px] lg:min-w-[50%] xl:min-w-[376.66px] md:min-w-[60%]"
            v-for="item in topPickedJobs?.data"
            :key="item.id"
            :job="item"
          />
        </div> -->
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
<style>
/* Hide the excluded section when printing */
@media print {
  .exclude-from-print {
    display: none;
  }

  /* Set default print settings */
  @page {
    size: A2; /* Paper size */
    margin: 0.5cm; /* Minimum margins */
  }
}
</style>
