<template>
  <div class="py-20 container">
    <div
      class="bg-[#E9FAFB] border-[#F6F6F6] flex lg:flex-row flex-col gap-5 justify-between items-center border-[1px] rounded-[15px] p-6 px-14"
    >
      <div
        class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
      >
        <UserAvater
          :imageUrl="props?.talent?.image"
          inputClasses="!h-[89.536px] !w-[89.536px]"
          class=""
        />
        <div class="lg:text-left text-center">
          <p
            class="text-[#000000] text-[17.518px] capitalize font-Satoshi500 leading-[31.739px]"
          >
            {{ props?.talent?.first_name }} {{ props?.talent?.last_name }}
          </p>
          <p
            class="text-[#00000066] text-[14.598px] capitalize leading-[31.739px] font-Satoshi400"
          >
            {{ props?.talent?.skill_title }}
          </p>
          <div class="flex items-center lg:justify-start justify-center gap-2">
            <p class="lg:text-[13.625px] text-[14px] text-[#244034] font-Satoshi500">
              ${{ props?.talent?.rate }}/hr
            </p>
            <div class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"></div>
            <p class="text-[#244034] lg:text-[13.625px] text-[14px] font-Satoshi500">
              {{ props?.talent?.location }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center lg:justify-normal justify-center gap-6">
        <div class="flex items-center gap-3">
          <a
            v-if="props?.talent?.email"
            :href="`mailto:${props?.talent?.email}`"
            class="flex items-center mt-1"
            target="_blank"
          >
            <mailoutline />
          </a>

          <a
            v-if="props?.talent?.linkedin"
            :href="props?.talent?.linkedin"
            target="_blank"
          >
            <LinkdeinIcon />
          </a>
          <a
            v-if="props?.talent?.instagram"
            :href="props?.talent?.instagram"
            target="_blank"
          >
            <InstagramIcon />
          </a>
          <a v-if="props?.talent?.behance" :href="props?.talent?.behance" target="_blank">
            <BeIcon />
          </a>
          <a v-if="props?.talent?.twitter" :href="props?.talent?.twitter" target="_blank">
            <TwitterIcon />
          </a>
        </div>
        <div class="flex items-center gap-5">
          <button @click="copyUrl()">
            <SearchIconVeritical />
          </button>
          <button
            class="btn-brand !bg-[#31795A] !border-none text-center flex items-start !py-2 !text-white"
          >
            <span style="display: grid; place-content: center" class="">Message</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row mt-10 w-full">
      <div class="lg:w-[70%] p-4">
        <p v-if="props?.talent?.overview" class="text-[28px] text-[#000] font-Satoshi500">
          Overview
        </p>
        <div class="text-[#000000BF] font-Satoshi400 text-[16px] mt-4 leading-[35px]">
          <p>
            {{ props?.talent?.overview }}
          </p>
          <!-- <p class="mt-4"></p> -->
          <!-- .slice(0, 10) -->
          <!--               
 -->
          <!--               {{ talent?.top_skills.length - 10 }}+
 -->
        </div>
        <p
          v-if="props?.talent?.top_skills?.length"
          class="text-[28px] text-[#000] font-Satoshi500 mb-4 mt-6"
        >
          Skills
        </p>
        <div class="flex gap-4 flex-wrap">
          <div
            v-for="item in props?.talent?.top_skills"
            :key="item.name"
            class="bg-[#EFF6F3] rounded-full p-5 py-3 text-[17px] text-center font-Satoshi400 text-[#276A4D]"
          >
            {{ item.name }}
          </div>
          <div
            class="bg-[#D2F34C] hidden rounded-full p-4 py-3 text-[17px] font-Satoshi400 text-[#000000]"
          ></div>
        </div>
        <p
          v-if="props?.talent?.education?.length"
          class="text-[28px] text-[#000] font-Satoshi500 mb-12 mt-8"
        >
          Education
        </p>
        <EducationDetails :items="props?.talent?.education" />
        <!-- <SampleFive :items="items" /> -->

        <p
          v-if="props?.talent?.employment?.length"
          class="text-[28px] text-[#000] font-Satoshi500 mb-12 mt-8"
        >
          Work Experience
        </p>
        <WorkExperience :items="props?.talent?.employment" />
        <p
          v-if="props?.talent?.portfolio?.length"
          class="text-[28px] text-[#000] font-Satoshi500 mb-12 mt-8"
        >
          Portfolio
        </p>
        <div
          class="flex flex-row gap-4 w-full overflow-hidden cursor-move mt-6 hide-scrollbar overflow-x-auto"
        >
          <img
            loading="lazy"
            @click="redirectToSinglePortFolio(img.id)"
            role="button"
            v-for="img in props?.talent?.portfolio"
            :key="img"
            :src="img.featured_image"
            class="h-[214.078px] flex flex-col w-auto rounded-lg"
            alt=""
          />
        </div>
        <p class="text-[28px] text-[#000] font-Satoshi500 hidden mb-12 mt-8">Reviews</p>
        <div class="flex hidden flex-col gap-4">
          <div
            v-for="i in 1"
            :key="i"
            class="border-[#2440341A] border-[1.265px] rounded-[9.732px] p-6"
          >
            <p class="text-[#001E00] font-Satoshi400 text-[16px] mb-4 tracking-[0.6px]">
              Find B2B Partners for UK and US Online Tutoring Company
            </p>
            <div class="flex items-center gap-1 font-Satoshi400 mb-2">
              <RateStar v-for="i in 5" :key="i" />
              <span class="text-[#001E00] text-[14px]">5.00 </span
              ><span class="text-[#5E6D55] text-[12px]">Dec 15, 2022 - Feb 2, 2023</span>
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
      <div class="lg:w-[30%] w-full p-4">
        <p class="text-[28px] text-[#000] font-Satoshi500">Certificates</p>
        <div
          class="bg-[#E9FAFB] p-8 border-[#F6F6F6] border-[1px] flex flex-col gap-12 mt-4 rounded-[15px]"
        >
          <div
            v-for="i in props?.talent?.certificate"
            :key="i"
            class="flex items-center gap-5"
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
              @click="printPage"
              class="btn-brand !border-none !w-full !px-3 !py-2 !text-[#FFFFFF] text-center !bg-[#31795A]"
            >
              <span class="mb-2">Download CV</span>
            </button>
          </div>
        </div>
        <p class="text-[20px] text-[#000] font-Satoshi500 mt-16">Location</p>
        <div class="flex flex-col gap-12 mt-4 rounded-[15px]">
          <!-- <img loading="lazy" src="@/assets/img/Map.webp" alt="" /> -->
          <Map :lat="props?.talent?.latitude" :lng="props?.talent?.longitude" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, onMounted } from "vue";
import WorkExperience from "@/components/ui/genericComponents/WorkExperience.vue";
import EducationDetails from "@/components/ui/genericComponents/EducationDetails.vue";
import LinkdeinIcon from "@/components/icons/linkdeinIcon.vue";
import InstagramIcon from "@/components/icons/instagramIcon.vue";
import BeIcon from "@/components/icons/beIcon.vue";
import TwitterIcon from "@/components/icons/twitterIcon.vue";
import RateStar from "@/components/icons/rateStar.vue";
import CertificateBadge from "@/components/icons/certificateBadge.vue";
import mailoutline from "@/components/icons/mailoutline.vue";

// import LinkIcon from "@/components/icons/linkIcon.vue";
import UserAvater from "@/components/ui/Avater/UserAvater.vue";
import CalenderWithPen from "@/components/icons/calenderWithPen.vue";
import SearchIconVeritical from "@/components/icons/searchIconVeritical.vue";
const Map = defineAsyncComponent(() => import("@/components/ui/Map/Map.vue"));
import { useClipboard } from "@vueuse/core";
import { useToast } from "vue-toastification";
const toast = useToast();

let source = "";

onMounted(() => {
  source =
    import.meta.env.VITE_LANDING_PAGE +
    `talent/` +
    `${props?.talent?.first_name}/` +
    props?.talent?.uniqueId;
});

// let source = window.location.href;
const { copy, copied, isSupported } = useClipboard({ source });
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
const printPage = () => {
  window.print();
};

const props = defineProps({
  talent: Object,
});
const redirectToSinglePortFolio = (id) => {
  window.open(`https://www.myspurr.net/portfolio/${id}`, "_blank");
};
</script>
