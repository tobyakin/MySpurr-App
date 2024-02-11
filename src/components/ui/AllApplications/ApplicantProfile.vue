<template>
  <div class="py-0">
    <div
      class="bg-[#E9FAFB] border-[#F6F6F6] flex lg:flex-row flex-col gap-5 justify-between items-center border-[1px] rounded-[15px] p-[22px] px-6"
    >
      <div
        class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
      >
        <UserAvater
          :imageUrl="talents?.image"
          inputClasses="!h-[44.891px] !w-[44.891px]"
          class=""
        />
        <div class="lg:text-left text-center">
          <p
            class="text-[#000000] text-[17.518px] capitalize font-Satoshi500 leading-[31.739px]"
          >
            {{ talents?.first_name }} {{ talents?.last_name }}Application
          </p>
          <p
            class="text-[#00000066] text-[14.598px] capitalize leading-[31.739px] font-Satoshi400"
          >
            {{ talents?.skill_title }}..
          </p>
          <div class="flex items-center lg:justify-start justify-center gap-2">
            <p class="lg:text-[13.625px] text-[14px] text-[#244034] font-Satoshi500">
              ${{ talents?.rate }}/hr
            </p>
            <div class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"></div>
            <p class="text-[#244034] lg:text-[13.625px] text-[14px] font-Satoshi500">
              {{ talents?.location }}..
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center lg:justify-normal justify-center gap-6">
        <div class="flex items-center gap-3">
          <a v-if="!talents?.linkedin" :href="talents?.linkedin" target="_blank">
            <LinkdeinIcon />
          </a>
          <a v-if="!talents?.instagram" :href="talents?.instagram" target="_blank">
            <InstagramIcon />
          </a>
          <a v-if="!talents?.behance" :href="talents?.behance" target="_blank">
            <BeIcon />
          </a>
          <a v-if="!talents?.twitter" :href="talents?.twitter" target="_blank">
            <TwitterIcon />
          </a>
        </div>
        <div class="flex items-center gap-5">
          <button
            class="btn-brand !bg-[#31795A] !border-none text-center flex items-start lg:px-[25px] !py-[4px] !text-white"
          >
            <span style="display: grid; place-content: center" class="">Message</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row mt-10 w-full">
      <div class="lg:w-[70%] p-4">
        <p class="text-[14.038px] text-[#000] font-Satoshi500">Overview</p>
        <div class="text-[#000000BF] font-Satoshi400 text-[16px] mt-4 leading-[35px]">
          <p>
            {{ talents?.overview }}
          </p>
          <!-- <p class="mt-4"></p> -->
          <!-- .slice(0, 10) -->
          <!--               
 -->
          <!--               {{ talents?.top_skills.length - 10 }}+
 -->
        </div>
        <p class="text-[14.038px] text-[#000] font-Satoshi500 mb-4 mt-6">Skills</p>
        <div class="flex gap-4 flex-wrap">
          <div
            v-for="(item, index) in talents?.top_skills"
            :key="item.name"
            class="bg-[#EFF6F3] rounded-full p-5 py-3 text-[17px] text-center font-Satoshi400 text-[#276A4D]"
          >
            {{ item.name }}
          </div>
          <div
            class="bg-[#D2F34C] hidden rounded-full p-4 py-3 text-[17px] font-Satoshi400 text-[#000000]"
          ></div>
        </div>
        <p class="text-[14.038px] text-[#000] font-Satoshi500 mb-12 mt-8">Education</p>
        <EducationDetails :items="talents?.education" />
        <!-- <SampleFive :items="items" /> -->

        <p class="text-[14.038px] text-[#000] font-Satoshi500 mb-12 mt-8">
          Work Experience
        </p>
        <WorkExperience :items="talents?.employment" />
        <p class="text-[14.038px] text-[#000] font-Satoshi500 mb-12 mt-8">
          Relevant File attached
        </p>
        <div
          class="flex flex-row gap-4 w-full overflow-hidden cursor-move mt-6 hide-scrollbar overflow-x-auto"
        >
          <img
            loading="lazy"
            role="button"
            v-for="(img, index) in talents?.portfolio"
            :key="img"
            :src="img.cover_image"
            class="h-[214.078px] flex flex-col w-auto rounded-lg"
            alt=""
          />
        </div>
        <p class="text-[14.038px] text-[#000] font-Satoshi500 mb-12 mt-8">
          Screening Question Responses
        </p>
        <div class="flex flex-col mt-[8px] gap-4">
          <div
            v-for="i in 2"
            :key="i"
            class="border-[#2440341A] bg-white border-[1.265px] rounded-[9.732px] p-4"
          >
            <p
              class="text-[#001E00] font-Satoshi400 text-[15.727px] border-b-[0.392px] !pb-[4px] border-b-[#254035AB] tracking-[0.6px]"
            >
              question
            </p>
            <p class="text-[#5e6466] font-Satoshi400 text-[14px] mt-2 tracking-[0.6px]">
              .....
            </p>
          </div>
        </div>
      </div>
      <div class="lg:w-[30%] w-full p-4">
        <p class="text-[14.038px] text-[#000] font-Satoshi500">Certificates</p>
        <div
          class="bg-[#E9FAFB] p-[17px] border-[#F6F6F6] border-[1px] flex flex-col gap-12 mt-4 rounded-[15px]"
        >
          <div v-for="i in talents?.certificate" :key="i" class="flex items-center gap-5">
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
                <p class="font-Satoshi500 text-[12.9px] text-[#000000]">
                  {{ i.certificate_year }}
                </p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <button
              class="btn-brand !bg-[#31795A] !border-none text-center w-full !px-[1px] !py-[4px] !text-white"
            >
              Download CV
            </button>
          </div>
        </div>
        <p class="text-[14.038px] text-[#000] font-Satoshi500 mt-16">Location</p>
        <div class="flex flex-col gap-12 mt-4 rounded-[15px]">
          <!-- <img loading="lazy" src="@/assets/img/Map.webp" alt="" /> -->
          <Map :lat="talents?.latitude" :lng="talents?.longitude" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import UserAvater from "@/components/ui/Avater/UserAvater.vue";
import WorkExperience from "@/components/ui/genericComponents/WorkExperience.vue";
import EducationDetails from "@/components/ui/genericComponents/EducationDetails.vue";
import LinkdeinIcon from "@/components/icons/linkdeinIcon.vue";
import InstagramIcon from "@/components/icons/instagramIcon.vue";
import BeIcon from "@/components/icons/beIcon.vue";
import TwitterIcon from "@/components/icons/twitterIcon.vue";
import CertificateBadge from "@/components/icons/certificateBadge.vue";
const Map = defineAsyncComponent(() => import("@/components/ui/Map/Map.vue"));

defineProps({ talents: Object });
</script>
