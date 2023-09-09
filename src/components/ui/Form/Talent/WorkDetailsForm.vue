<script setup>
import { ref, onMounted, watch, defineAsyncComponent } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";

const OnboardingStore = useOnboardingStore();
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);

const { step } = storeToRefs(OnboardingStore);
let store = useStore();
console.log(store.getUser);
let loading = ref(false);
const top_skills = ref([]);
const availability = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];
const educationLevel = [
  "Certificate",
  "Associates",
  "Bachelors",
  "Masters ",
  "MBA ",
  "JD ",
  "MD/DO ",
  "Doctorate ",
];
const options = ref([
  { name: "Vue.js" },
  { name: "Adonis" },
  { name: "Rails" },
  { name: "React" },
  { name: "Sinatra" },
]);
const addTag = (newTagName) => {
  const tag = {
    name: newTagName,
  };
  options.value.push(tag);
  top_skills.value.push(tag);
};

const years = ref([]);

onMounted(() => {
  // Populate the years array with a range of years, e.g., from 2000 to the current year.
  const currentYear = new Date().getFullYear();
  for (let year = 1950; year <= currentYear; year++) {
    years.value.push(year.toString());
  }
});

const emit = defineEmits("next");
const formState = {
  skill_title: "",
  // top_skills: "",
  highest_education: "",
  year_obtained: "",
  work_history: "",
  certificate_earned: "",
  availability: "",
};

const formVaildlity = ref(false);

watch(
  () => [
    formState.skill_title,
    top_skills,
    formState.highest_education,
    formState.year_obtained,
    formState.work_history,
    formState.certificate_earned,
    formState.availability,
  ],
  () => {
    checkVaildlity();
  }
);
const checkVaildlity = () => {
  console.log("Checking validity...");
  console.log(formState);

  formVaildlity.value =
    formState.skill_title &&
    top_skills &&
    formState.highest_education &&
    formState.year_obtained &&
    formState.work_history &&
    formState.certificate_earned &&
    formState.availability
      ? true
      : false;
  console.log("Form validity:", formVaildlity.value);
};

const next = () => {
  // if (formVaildlity.value) {
  emit("next", step.value + 1);
  // }
};
const onFinish = async () => {
  loading.value = true;
  console.log(formState);
  let payload = {
    skill_title: formState.skill_title,
    top_skills: top_skills,
    highest_education: formState.highest_education,
    year_obtained: formState.year_obtained,
    work_history: formState.work_history,
    certificate_earned: formState.certificate_earned,
    availability: formState.availability,
  };
  try {
    const res = await OnboardingStore.submitTalentWorkDetails(payload);
    console.log(res);
    next();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  checkVaildlity();
});
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
        Please provide your work details, it will be used to complete your profile on
        MySpurr.
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Skill title</label
          >
          <GlobalInput
            v-model="formState.skill_title"
            class="bg-transparent border-none"
            placeholder="Graphics Designer"
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
          ></multiselect>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >What is your highest level of education?</label
          >
          <SelectGroup
            v-model="formState.highest_education"
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
            >What year was it obtained?</label
          >
          <SelectGroup
            v-model="formState.year_obtained"
            DropdownItem="year"
            placeholder=" year"
            :items="years"
            name=""
            required
            class="w-full flex border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >What is your most recent work history</label
          >
          <GlobalInput
            v-model="formState.work_history"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >What is your most recent certificate earned?</label
          >
          <GlobalInput
            v-model="formState.certificate_earned"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Select availability
          </label>
          <SelectGroup
            v-model="formState.availability"
            DropdownItem=""
            :items="availability"
            placeholder=""
            required
            name=""
            class="bg-transparent border-none"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="onFinish"
        type="submit"
        class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
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
