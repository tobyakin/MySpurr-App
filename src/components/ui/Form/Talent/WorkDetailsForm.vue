<script setup>
import { ref, onMounted, watch, computed, defineAsyncComponent } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
// import GlobalInput from "@/components/ui/GlobalInput.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";

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
const educationLevel = ["Certificate", "Bachelors", "Masters ", "Doctorate "];
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
const formState = ref({
  skill_title: "",
  highest_education: "",
  year_obtained: "",
  work_history: "",
  certificate_earned: "",
  availability: "",
});
const isFormValid = computed(() => {
  return (
    formState.value.skill_title.trim() !== "" &&
    top_skills.value.length >= 0 && // Check if top_skills is not empty
    formState.value.highest_education.trim() !== "" &&
    formState.value.year_obtained.trim() !== "" &&
    formState.value.work_history.trim() !== "" &&
    formState.value.certificate_earned.trim() !== "" &&
    formState.value.availability.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
const onFinish = async () => {
  loading.value = true;
  let payload = {
    skill_title: formState.value.skill_title,
    top_skills: top_skills.value,
    highest_education: formState.value.highest_education,
    year_obtained: formState.value.year_obtained,
    work_history: formState.value.work_history,
    certificate_earned: formState.value.certificate_earned,
    availability: formState.value.availability,
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
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="true"
          >
          </multiselect>
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
            placeholder="Specialization in digital marketing"
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
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
      </button>
    </div>
    <CenteredModalLarge class="!hidden"
      ><p>What is your most recent work history</p>
      <div
        class="border-[0.737px] w-full border-[#254035AB] mt-6 rounded-[5.897px] p-4 py-1.5"
      >
        <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Title </label>
        <GlobalInput
          v-model="formState.skill_title"
          class="bg-transparent border-none"
          placeholder="Graphics Designer"
          type="text"
          required
        />
      </div>
      <div class="flex w-full mt-8 gap-4">
        <div
          class="border-[0.737px] w-full border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Start date</label
          >
          <GlobalInput
            v-model="formState.skill_title"
            class="bg-transparent border-none"
            placeholder="Graphics Designer"
            type="date"
            required
          />
        </div>
        <div
          class="border-[0.737px] w-full border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">End date</label>
          <GlobalInput
            v-model="formState.skill_title"
            class="bg-transparent border-none"
            placeholder="Graphics Designer"
            type="date"
            required
          />
        </div>
      </div>

      <div
        class="border-[0.737px] w-full border-[#254035AB] mt-6 rounded-[5.897px] p-4 py-1.5"
      >
        <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Description</label>
        <textarea
          v-model="formState.portfolio_description"
          rows="4"
          class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
          required
          placeholder="Give a brief description about the job, what was done?, how was it done?, what was the impact?"
        />
      </div>
      <div class="flex flex-row gap-5 pb-8 mt-5">
        <button
          type="submit"
          class="font-Satoshi500 text-white text-[14px] bg-[#43D0DF] uppercase leading-[11.593px] rounded-full p-5 w-full"
        >
          Done
        </button>
      </div>
    </CenteredModalLarge>
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
