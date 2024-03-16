<template>
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
            placeholder="Job Type"
            :bordered="false"
            :show-arrow="true"
            class="w-full !outline-none !px-0"
            show-search
            v-model:value="sortInput.jobType"
          >
            <a-select-option disabled>Job Type</a-select-option>
            <a-select-option v-for="item in 2" :key="item" :value="item">
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
          >
            <a-select-option
              v-for="item in skills?.data"
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
          >
            <a-select-option v-for="item in Experience" :key="item" :value="item.name">
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
            placeholder="Job Type"
            :bordered="false"
            :show-arrow="true"
            class="w-full !outline-none !px-0"
            show-search
            v-model:value="sortInput.jobType"
          >
            <a-select-option disabled>Job Type</a-select-option>
            <a-select-option v-for="item in 2" :key="item" :value="item">
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
            placeholder="Job Type"
            :bordered="false"
            :show-arrow="true"
            class="w-full !outline-none !px-0"
            show-search
            v-model:value="sortInput.jobType"
          >
            <a-select-option disabled>Job Type</a-select-option>
            <a-select-option v-for="item in 2" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useUserProfile } from "@/stores/profile";
import { storeToRefs } from "pinia";
import { useSkillsStore } from "@/stores/skills";
const skillsStore = useSkillsStore();
const { skills, contriesCode } = storeToRefs(skillsStore);

const userProfile = useUserProfile();
const { top_skills } = storeToRefs(userProfile);

// import VerifyIcon from "@/components/icons/verifyIcon.vue";

// import { useTabStore } from "@/stores/tab";
// const store = useTabStore();

defineProps({ JobDetails: Object });
const sortInput = reactive({
  skills: "",
  jobType: "",
  Location: "",
  experienceLevel: "",
  Category: "",
  currency: "",
});
const Experience = [
  { name: "Beginner ", year: "(1-2 yrs)" },
  { name: "Intermediate ", year: "(3-5 yrs)" },
  { name: "Expert ", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];
const CandidateType = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];
onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getCountriesCode();
});
</script>
