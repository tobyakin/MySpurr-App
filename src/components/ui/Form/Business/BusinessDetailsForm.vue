<script setup>
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
const userProfile = useUserProfile();
const OnboardingStore = useOnboardingStore();
const { user } = storeToRefs(userProfile);
const { step, businessDetails } = storeToRefs(OnboardingStore);

let store = useStore();
const emit = defineEmits(["next"]);
const userDetails = computed(() => {
  return userProfile.user.data;
});

const formState = ref({
  business_name: "",
  // top_skills: "",
  location: "",
  industry: "",
  website: "",
  business_service: "",
  business_email: "",
  about_business: "",
});

const isFormValid = computed(() => {
  return (
    formState.value.business_name.trim() !== "" &&
    formState.value.location.trim() !== "" &&
    formState.value.industry.trim() !== "" &&
    formState.value.website.trim() !== "" &&
    formState.value.business_service.trim() !== "" &&
    formState.value.business_email.trim() !== "" &&
    formState.value.about_business.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
const onFinish = async () => {
  console.log(formState);
  let payload = {
    business_name: formState.value.business_name,
    // top_skills: formState.top_skills,
    location: formState.value.location,
    industry: formState.value.industry,
    website: formState.value.website,
    business_service: formState.value.business_service,
    business_email: formState.value.business_email,
    about_business: formState.value.about_business,
  };
  try {
    const res = await OnboardingStore.submitBusinessDetails(payload);
    next();
    return res;
  } catch (error) {
    console.log(error);
  }
};
const prefillDetails = (SingleObject) => {
  formState.value.business_name = SingleObject.business_name || "";
  formState.value.business_email = SingleObject.email || "";
};
watch(userDetails, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

onMounted(async () => {
  await userProfile.userProfile();
  prefillDetails(userDetails.value);
});
</script>

<template>
  <section class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your business details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide your business details, they will be used to
        <br class="lg:block hidden" />
        complete your profile on MySpurr.
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] text-[12px] px-2 font-Satoshi400"
            >Business name</label
          >
          <input
            class="w-full font-light font-Satoshi400 text-left text-[14px] !p-2 bg-transparent border-none opacity-[0.8029] rounded-[4.074px] text-sm"
            type="button"
            :value="formState.business_name"
          />
          <!-- <GlobalInput
            v-model="formState.business_name"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
          /> -->
        </div>
        <div
          class="border-[0.737px] hidden border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Top skills</label
          >
          <GlobalInput
            v-model="formState.top_skills"
            inputClasses="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Location</label>
          <GlobalInput
            v-model="formState.location"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Industry</label>
          <GlobalInput
            v-model="formState.industry"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >About your business</label
          >
          <textarea
            v-model="formState.about_business"
            rows="4"
            class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
            required
            placeholder="Give a brief description about your business"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Website</label>
          <GlobalInput
            v-model="formState.website"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="url"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Business services</label
          >
          <GlobalInput
            v-model="formState.business_service"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
            :key="true"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">E-mail</label>
          <!-- <GlobalInput
            v-model="formState.business_email"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="email"
          /> -->
          <input
            class="w-full font-light font-Satoshi400 text-left text-[14px] !p-2 bg-transparent border-none opacity-[0.8029] rounded-[4.074px] text-sm"
            type="button"
            :value="formState.business_email"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-5">
      <button
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        @click="onFinish"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
      </button>
    </div>
  </section>
</template>
