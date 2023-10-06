<script setup>
import { ref, onMounted, watch, computed, defineAsyncComponent } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
// import { useSkillsStore } from "@/stores/skills";
// import GlobalInput from "@/components/ui/GlobalInput.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";
// const skillsStore = useSkillsStore();
// const { skills } = storeToRefs(skillsStore);

const OnboardingStore = useOnboardingStore();
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);

const {
  step,
  skill_title,
  highest_education,
  overview,
  location,
  rate,
  availability,
  top_skills,
  employment_type,
} = storeToRefs(OnboardingStore);
let store = useStore();
console.log(store.getUser);
// let loading = ref(false);
// const top_skills = ref([]);
const availabilityData = ["Immediately", "One week"];
const employmentType = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];
const educationLevel = ["Certificate", "Bachelors", "Masters ", "Doctorate "];
// const options = skills.value;
const options = ref([
  { name: "Vue.js" },
  { name: "Adonis" },
  { name: "Rails" },
  { name: "React" },
  { name: "Sinatra" },
]);
const addTag = (newTagName) => {
  const tag = {
    skill: newTagName,
  };
  options.value.push(tag);
  top_skills.value.push(tag);
};

const years = ref([]);

onMounted(() => {
  // Populate the years array with a range of years, e.g., from 2000 to the current year.
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    years.value.push(year.toString());
  }
});

const emit = defineEmits("next");
// const formState = ref({
//   skill_title: "",
//   highest_education: "",
//   overview: "",
//   location: "",
//   rate: "",
//   availability: "",
// });
const isFormValid = computed(() => {
  return (
    skill_title.value.trim() !== "" &&
    top_skills.value.length >= 0 && // Check if top_skills is not empty
    highest_education.value.trim() !== "" &&
    overview.value.trim() !== "" &&
    location.value.trim() !== "" &&
    rate.value.trim() !== "" &&
    employment_type.value.trim() !== "" &&
    availability.value.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
</script>

<template>
  <form class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your work details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide details fo your most recent work detail. You will have a chance to
        add to this when your onboarding as been completed
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Skill title</label
          >
          <GlobalInput
            v-model="skill_title"
            class="bg-transparent border-none"
            placeholder="Graphics Designer"
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-3.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Overview</label>
          <textarea
            v-model="overview"
            rows="4"
            class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
            required
            placeholder="Give a brief description about yourself"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Location</label>
          <GlobalInput
            v-model="location"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Select your top 5 skills</label
          >
          <multiselect
            v-model="top_skills"
            :options="options"
            :multiple="true"
            :taggable="true"
            placeholder=""
            track-by="name"
            label="name"
            @tag="addTag"
            required
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
          >
          </multiselect>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >What is your highest level of education?</label
          >
          <SelectGroup
            v-model="highest_education"
            DropdownItem="level of education"
            placeholder=""
            :items="educationLevel"
            name=""
            required
            class="w-full flex border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Employment type
          </label>
          <SelectGroup
            v-model="employment_type"
            DropdownItem=""
            :items="employmentType"
            placeholder="Employment type"
            required
            name=""
            class="bg-transparent border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Availability
          </label>
          <SelectGroup
            v-model="availability"
            DropdownItem=""
            :items="availabilityData"
            placeholder="Availability"
            required
            name=""
            class="bg-transparent border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Rate /yr ($)</label
          >
          <GlobalInput
            v-model="rate"
            class="bg-transparent border-none"
            placeholder="$100"
            type="number"
            required
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="next"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Next
      </button>
    </div>
  </form>
</template>
<style>
.multiselect {
  @apply font-Satoshi400;
}
.multiselect__tag {
  @apply !bg-brand text-sm font-Satoshi400;
}
.multiselect__tags-wrap {
  @apply w-full;
}
.multiselect__tags {
  @apply border-none p-2 pr-0;
}
.multiselect__select {
  @apply !p-3 !py-3 !w-0;
}
</style>
