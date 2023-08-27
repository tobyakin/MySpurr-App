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

const emit = defineEmits("next");
const formState = {
  business_name: "",
  top_skills: "",
  location: "",
  industry: "",
  website: "",
  business_service: "",
  business_email: "",
};

const formVaildlity = ref(false);

watch(
  () => [
    formState.business_name,
    formState.top_skills,
    formState.location,
    formState.industry,
    formState.website,
    formState.business_service,
    formState.business_email,
  ],
  () => {
    checkVaildlity();
  }
);
const checkVaildlity = () => {
  console.log("Checking business validity...");
  console.log(formState);

  formVaildlity.value =
    formState.business_name &&
    formState.top_skills &&
    formState.location &&
    formState.industry &&
    formState.website &&
    formState.business_service &&
    formState.business_email
      ? true
      : false;
  console.log("Form validity:", formVaildlity.value);
};

const next = () => {
  // if (formVaildlity.value) {
  emit("next", step.value + 1);
  // }
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
        class="flex-col flex gap-6 max-h-[65vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Business name</label
          >
          <GlobalInput
            v-model="formState.business_name"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400">Location</label>
          <GlobalInput
            v-model="formState.top_skills"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400">Industry</label>
          <GlobalInput
            v-model="formState.location"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >About your business</label
          >
          <GlobalInput
            v-model="formState.industry"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400">Website</label>
          <GlobalInput
            v-model="formState.website"
            class="bg-transparent border-none"
            placeholder=""
            type="url"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Business services</label
          >
          <GlobalInput
            v-model="formState.business_service"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400">E-mail</label>
          <GlobalInput
            v-model="formState.business_email"
            class="bg-transparent border-none"
            placeholder=""
            type="email"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-5">
      <button
        type="primary"
        @click="next"
        :class="{ 'bg-gray-400': !formVaildlity }"
        class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
      </button>
    </div>
  </section>
</template>
