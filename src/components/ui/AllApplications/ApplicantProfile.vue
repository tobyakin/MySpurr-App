<template>
  <div class="py-0">
    <div
      class="bg-[#E9FAFB] border-[#F6F6F6] flex lg:flex-row flex-col gap-5 justify-between items-center border-[1px] rounded-[15px] p-[22px] px-6"
    >
      <div
        class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
      >
        <UserAvater
          :imageUrl="props?.talents?.image"
          inputClasses="!h-[44.891px] !w-[44.891px]"
          class=""
        />
        <div class="lg:text-left text-center">
          <p
            class="text-[#000000] text-[17.518px] capitalize font-Satoshi500 leading-[31.739px]"
          >
            {{ props?.talents?.first_name }} {{ props?.talents?.last_name }} Application
          </p>
          <p
            class="text-[#00000066] text-[14.598px] capitalize leading-[31.739px] font-Satoshi400"
          >
            {{ props?.talents?.skill_title }}
          </p>
          <div class="flex items-center lg:justify-start justify-center gap-2">
            <p class="lg:text-[13.625px] text-[14px] text-[#244034] font-Satoshi500">
              ${{ store.abbr(props?.talents?.rate) }}/hr
            </p>
            <div class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"></div>
            <p class="text-[#244034] lg:text-[13.625px] text-[14px] font-Satoshi500">
              {{ props?.talents?.location }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center lg:justify-end justify-center gap-6">
        <div class="flex items-center w-full justify-end gap-3">
          <a
            v-if="!props?.talents?.linkedin"
            :href="props?.talents?.linkedin"
            target="_blank"
          >
            <LinkdeinIcon />
          </a>
          <a
            v-if="!props?.talents?.instagram"
            :href="props?.talents?.instagram"
            target="_blank"
          >
            <InstagramIcon />
          </a>
          <a
            v-if="!props?.talents?.behance"
            :href="props?.talents?.behance"
            target="_blank"
          >
            <BeIcon />
          </a>
          <a
            v-if="!props?.talents?.twitter"
            :href="props?.talents?.twitter"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </div>
        <div class="flex items-center gap-5">
          <div
            class="w-full font-light font-Satoshi400 bg-transparent !p-0 border-r-[#939292] border-r-[0.9px] opacity-[0.8029] text-[12.68px]"
          >
            <a-select
              placeholder="Rating"
              :bordered="false"
              :show-arrow="true"
              class="w-full !outline-none !px-0"
              show-search
            >
              <a-select-option v-for="item in 4" :key="item" :value="item.name">
                {{ item.name }} {{ item.year }}
              </a-select-option>
            </a-select>
          </div>

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
        <p class="text-[14.038px] !mb-3 text-[#000] font-Satoshi500">Overview</p>
        <div class="text-[#000000BF] font-Satoshi400 text-[16px] mt-4 leading-[35px]">
          <p>
            {{ props?.talents?.overview }}
          </p>
          <!-- <p class="mt-4"></p> -->
          <!-- .slice(0, 10) -->
          <!--               
 -->
          <!--               {{ props?.talents?.top_skills.length - 10 }}+
 -->
        </div>
        <p class="text-[14.038px] text-[#000] font-Satoshi500 !mb-4 mt-6">Skills</p>
        <div class="flex gap-4 flex-wrap">
          <div
            v-for="(item, index) in props?.talents?.top_skills"
            :key="item.name"
            class="bg-[#EFF6F3] rounded-full p-5 py-3 text-[17px] text-center font-Satoshi400 text-[#276A4D]"
          >
            {{ item.name }}
          </div>
          <div
            class="bg-[#D2F34C] hidden rounded-full p-4 py-3 text-[17px] font-Satoshi400 text-[#000000]"
          ></div>
        </div>
        <p class="text-[14.038px] text-[#000] font-Satoshi500 !mb-8 mt-8">Education</p>
        <EducationDetails :items="props?.talents?.education" />
        <!-- <SampleFive :items="items" /> -->

        <p class="text-[14.038px] text-[#000] font-Satoshi500 !mb-8 mt-8">
          Work Experience
        </p>
        <WorkExperience :items="props?.talents?.employment" />
        <p class="text-[14.038px] text-[#000] font-Satoshi500 !mb-8 mt-8">
          Relevant File attached
        </p>
        <div class="w-full mt-6">
          <button
            @click="downloadFile(props?.talents?.other_file, 'fileName')"
            class="btn-brand !bg-[#31795A] !border-none text-center w-full !px-[1px] !py-[4px] !text-white"
          >
            Download File
          </button>
        </div>

        <!-- <div
          class="flex flex-row gap-4 w-full overflow-hidden cursor-move mt-6 hide-scrollbar overflow-x-auto"
        >
          <img
            loading="lazy"
            role="button"
            :src="props?.talents?.other_file"
            class="h-[214.078px] flex flex-col w-auto rounded-lg"
            alt=""
          />
        </div> -->
        <p class="text-[14.038px] text-[#000] font-Satoshi500 mb-12 mt-8">
          Screening Question Responses
        </p>
        <div class="flex flex-col mt-[8px] gap-4">
          <div
            v-for="i in props?.talents?.questions"
            :key="i"
            class="border-[#2440341A] bg-white border-[1.265px] rounded-[9.732px] p-4"
          >
            <p
              class="text-[#001E00] font-Satoshi400 text-[15.727px] border-b-[0.392px] !pb-[4px] border-b-[#254035AB] tracking-[0.6px]"
            >
              {{ i.question }}
            </p>
            <div v-for="answer in getAnswersForQuestion(i.id)" :key="answer.id">
              <p class="text-[#5e6466] font-Satoshi400 text-[14px] mt-2 tracking-[0.6px]">
                {{ answer.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-[30%] w-full p-4">
        <p class="text-[14.038px] text-[#000] font-Satoshi500">Certificates</p>
        <div
          class="bg-[#E9FAFB] p-[17px] border-[#F6F6F6] border-[1px] flex flex-col gap-12 mt-4 rounded-[15px]"
        >
          <div
            v-for="i in props?.talents?.certificate"
            :key="i"
            class="flex items-center gap-3"
          >
            <CertificateBadge class="w-[34px]" />
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
          <Map :lat="props?.talents?.latitude" :lng="props?.talents?.longitude" />
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
import { useTabStore } from "@/stores/tab";
const store = useTabStore();

// defineProps({ talents: Object });
const props = defineProps({ talents: Object });
// const getAnswersForQuestion = (questionId) => {
// return talents.filter((answer) => answer.question_id === questionId);
// };
function downloadFile(url, filename) {
  // Create an anchor element
  const anchor = document.createElement("a");
  anchor.style.display = "none"; // Make it hidden

  // Set the href attribute to the URL
  anchor.href = url;

  // Set the download attribute to specify the filename
  anchor.download = filename;

  // Append the anchor to the body
  document.body.appendChild(anchor);

  // Trigger a click event on the anchor
  anchor.click();

  // Clean up: remove the anchor from the body
  document.body.removeChild(anchor);
}
const getAnswersForQuestion = (questionId) => {
  return props?.talents?.answers.filter((answer) => answer.question_id === questionId);
};
</script>
