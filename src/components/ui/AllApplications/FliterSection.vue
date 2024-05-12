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
              v-for="item in prop?.JobDetails?.skills"
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
            <a-select-option v-for="item in rating" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref, watch, onMounted } from "vue";
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
const rating = ref(["Good fit", "Maybe", "Not a fit"]);

const prop = defineProps({ JobDetails: Object, applicantDeatails: Object });
const userDetails = computed(() => {
  return prop?.applicantDeatails;
});
const availaibility = computed(() => {
  return userDetails.value?.map((item) => item.availaibility);
});
const Salary = computed(() => {
  return userDetails.value?.map((item) => item.rate);
});
// console.log(availaibility.value);
// console.log(userDetails.value);
const sortInput = reactive({
  Salary: "",
  skills: "",
  Availabilty: "",
  Rating: "",
  Location: "",
  experienceLevel: "",
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
// Define props if needed
const emit = defineEmits(["sort"]);

const selectedSkills = ref("");
const selectedJobType = ref("");
const selectedLocation = ref("");
const selectedExperienceLevel = ref("");
const selectedCategory = ref("");
const selectedCurrency = ref("");

const handleSort = (criteria) => {
  let selectedValue = "";

  switch (criteria) {
    case "skills":
      selectedValue = selectedSkills.value;
      break;
    case "jobType":
      selectedValue = selectedJobType.value;
      break;
    case "Location":
      selectedValue = selectedLocation.value;
      break;
    case "experienceLevel":
      selectedValue = selectedExperienceLevel.value;
      break;
    case "Category":
      selectedValue = selectedCategory.value;
      break;
    case "currency":
      selectedValue = selectedCurrency.value;
      break;
    default:
      break;
  }

  if (selectedValue) {
    emit("sort", { criteria, value: selectedValue });
  }
};

// Watch for changes in selected values and trigger handleSort
watch(
  [
    selectedSkills,
    selectedJobType,
    selectedLocation,
    selectedExperienceLevel,
    selectedCategory,
    selectedCurrency,
  ],
  ([skills, jobType, location, experienceLevel, category, currency]) => {
    handleSort("skills");
    handleSort("jobType");
    handleSort("Location");
    handleSort("experienceLevel");
    handleSort("Category");
    handleSort("currency");
  }
);

onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getCountriesCode();
});
</script>
