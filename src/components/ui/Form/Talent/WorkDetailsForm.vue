<script setup>
import { ref, onMounted, watch } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import { storeToRefs } from "pinia";

const OnboardingStore = useOnboardingStore();

const { step } = storeToRefs(OnboardingStore);
let store = useStore();
console.log(store.getUser);
let loading = ref(false);

const emit = defineEmits("next");
const formState = {
  skill_title: "",
  top_skills: "",
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
    formState.top_skills,
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
    formState.top_skills &&
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
    top_skills: formState.top_skills,
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
  <section class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your work details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide your work details, they will be used to
        <br class="lg:block hidden" />
        complete your profile on MySpurr.
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Skill title</label
          >
          <GlobalInput
            v-model="formState.skill_title"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Select your top 5 skills</label
          >
          <GlobalInput
            v-model="formState.top_skills"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >What is your highest level of education?</label
          >
          <GlobalInput
            v-model="formState.highest_education"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >What year was it obtained?</label
          >
          <GlobalInput
            v-model="formState.year_obtained"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >What is your most recent work history</label
          >
          <GlobalInput
            v-model="formState.work_history"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >What is your most recent certificate earned?</label
          >
          <GlobalInput
            v-model="formState.certificate_earned"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Select availability - freelance work, full-time positions or specific project
            types</label
          >
          <GlobalInput
            v-model="formState.availability"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        type="primary"
        @click="onFinish"
        class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
      </button>
    </div>
  </section>
</template>
