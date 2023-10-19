<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from "vue";
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
import SampleOne from "@/assets/image/sampleOne.webp";
const Porfolio = [
  { img: SampleOne },
  { img: SampleOne },
  { img: SampleOne },
  { img: SampleOne },
];

let profile = useUserProfile();
const userDetails = computed(() => {
  return profile.user.data;
});
let view = null;
let showModal = ref(false);
let formTitle = ref("");
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
  view = null;
};
const closeModal = () => {
  showModal.value = !showModal.value;
  view = null;
};
onMounted(() => {
  return profile.userProfile();
});

onMounted(async () => {
  await profile.userProfile();
});
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10">
      <div id="talent-cv" class="py-20 container talent-cv">
        <div
          class="bg-[#E9FAFB] border-[#F6F6F6] flex lg:flex-row flex-col gap-5 justify-between items-center border-[1px] rounded-[15px] p-6 px-14"
        >
          <div
            class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
          >
            <EditProfileAvater
              @toggleModal="HandleToggleEditImageModal"
              inputClasses="!h-[89.536px] !w-[89.536px]"
              class=""
            />
            <div class="lg:text-left text-center">
              <p
                class="text-[#000000] text-[17.518px] capitalize font-Satoshi500 leading-[31.739px]"
              >
                {{ userDetails?.first_name }} {{ userDetails?.last_name }}
              </p>
              <p
                class="text-[#00000066] text-[14.598px] capitalize leading-[31.739px] font-Satoshi400"
              >
                {{ userDetails?.skill_title }}
              </p>
              <div class="flex items-center gap-2">
                <p class="lg:text-[13.625px] text-[14px] text-[#244034] font-Satoshi500">
                  ${{ userDetails?.rate }}/hr
                </p>
                <div class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"></div>
                <p class="text-[#244034] lg:text-[13.625px] text-[14px] font-Satoshi500">
                  {{ userDetails?.location }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center lg:justify-center lg:items-end gap-6">
            <div class="flex flex-row justify-center gap-3">
              <button>
                <LinkdeinIcon />
              </button>
              <button>
                <InstagramIcon />
              </button>
              <button>
                <BeIcon />
              </button>
              <button>
                <TwitterIcon />
              </button>
            </div>
            <div class="flex items-center gap-5">
              <div
                class="bg-[#EDF0B8] p-2 flex relative overflow-hidden pr-6 rounded-[5.982px] mt-0"
              >
                <a href="" class="text-[10.476px] font-Satoshi500 text-[#01272C]"
                  >myspurr.talent/tobiakinyele</a
                >
                <div
                  class="bg-[#2C4C50] p-1 absolute right-1 top-[6px] flex items-start rounded-full"
                >
                  <LinkIcon class="h-[7.596px] w-[7.596px]" />
                </div>
              </div>

              <button @click="HandleToggleEditHeadlineBioModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row mt-10 w-full">
          <div class="lg:w-[70%] p-4">
            <div class="flex flex-row items-center gap-[96px]">
              <p class="text-[28px] text-[#000] font-Satoshi500">Overview</p>
              <button @click="HandleToggleEditOverviewModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>
            <div class="text-[#000000BF] font-Satoshi400 text-[16px] mt-4 leading-[35px]">
              <p>{{ userDetails?.overview }}</p>
              <!-- <p class="mt-4"></p> -->
              <!-- .slice(0, 10) -->
              <!--               
 -->
              <!--               {{ talents?.top_skills.length - 10 }}+
 -->
            </div>
            <div class="flex flex-row items-center gap-[96px] !mb-4 mt-6">
              <p class="text-[28px] text-[#000] font-Satoshi500">Skills</p>
              <button @click="HandleToggleSkillsPageModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>

            <div class="flex gap-4 flex-wrap">
              <div
                v-for="(item, index) in userDetails?.top_skills"
                :key="item.name"
                class="bg-[#EFF6F3] rounded-full p-5 py-3 text-[17px] text-center font-Satoshi400 text-[#276A4D]"
              >
                {{ item.name }}
              </div>

              <div
                class="bg-[#D2F34C] hidden rounded-full p-4 py-3 text-[17px] font-Satoshi400 text-[#000000]"
              ></div>
            </div>
            <div class="flex flex-row items-center gap-[96px] !mb-12 mt-8">
              <p class="text-[28px] text-[#000] font-Satoshi500">Education</p>
              <button @click="HandleToggleEducationPageModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>

            <EducationDetails :items="userDetails?.education" />
            <div class="flex flex-row items-center gap-[16px] !mb-12 mt-8">
              <p class="text-[28px] text-[#000] font-Satoshi500">Work Experience</p>
              <button @click="HandleToggleWorkExperiencePageModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>

            <WorkExperience :items="userDetails?.employment" />
            <div class="flex flex-row items-center gap-[96px] !mb-12 mt-8">
              <p class="text-[28px] text-[#000] font-Satoshi500">Portfolio</p>
              <button @click="HandleTogglePortfolioModal">
                <EditIcon class="text-[#297F88]" />
              </button>
            </div>

            <div
              class="flex flex-row gap-4 w-full overflow-hidden cursor-move mt-6 hide-scrollbar overflow-x-auto"
            >
              <img
                @click="HandleTogglePortfolioModal"
                role="button"
                v-for="img in Porfolio"
                :key="img"
                :src="img.img"
                class="h-[214.078px] flex flex-col w-auto rounded-lg"
                alt=""
              />
            </div>
            <p class="text-[28px] text-[#000] font-Satoshi500 !mb-12 mt-8">Reviews</p>
            <div class="flex flex-col gap-4">
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
            <div class="flex flex-row items-center gap-[26px]">
              <p class="text-[28px] text-[#000] font-Satoshi500">Certificates</p>
              <button><EditIcon class="text-[#297F88]" /></button>
            </div>

            <div
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
                    <CalenderWithPen />
                    <p class="font-Satoshi500 text-[12.9px] text-[#000000]">
                      {{ i.certificate_year }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="">
                <button
                  class="btn-brand !border-none !w-full !py-3 !px-2 !text-[#FFFFFF] text-center !bg-[#31795A]"
                >
                  <span class="text-[12.067px]">Download CV</span>
                </button>
              </div>
            </div>
            <p class="text-[20px] text-[#000] font-Satoshi500 mt-16">Location</p>
            <div class="flex flex-col gap-12 mt-4 rounded-[15px]">
              <img src="@/assets/image/Map.webp" alt="map" />
            </div>
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
