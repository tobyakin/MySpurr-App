<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import AttachFileIcon from "@/components/icons/attachFile.vue";
import { useRouter } from "vue-router";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

let store = useStore();

const router = useRouter();

const OnboardingStore = useOnboardingStore();
const { step } = storeToRefs(OnboardingStore);
const emit = defineEmits(["next"]);
const formState = ref({
  company_logo: null,
  company_type: "",
  social_media: "",
  social_media_two: "",
});
const isFormValid = computed(() => {
  return (
    formState.value.company_logo !== null &&
    formState.value.company_type.trim() !== "" &&
    formState.value.social_media.trim() !== "" &&
    formState.value.social_media_two.trim() !== ""
  );
});

const prev = () => {
  emit("prev", step.value - 1);
};
const previewImage = ref(null);
const uploadFile = () => {
  formState.value.company_logo = previewImage.value.files[0];
  showImage();
};

const showImage = async () => {
  if (formState.value.company_logo) {
    previewImage.value = URL.createObjectURL(formState.value.company_logo);
  } else {
    previewImage.value = null;
  }
};

const onFinish = async () => {
  let payload = {
    company_type: formState.value.company_type,
    social_media: formState.value.social_media,
    social_media_two: formState.value.social_media_two,
  };
  console.log(formState.value.company_logo);
  const formData = new FormData();

  if (formState.value.company_logo) {
    // Convert the selected image to base64 and append it to the FormData
    const reader = new FileReader();
    reader.onload = (event) => {
      formData.append("company_logo", event.target.result);
      submitForm(formData, payload);
    };
    reader.readAsDataURL(formState.value.company_logo);
  } else {
    submitForm(formData, payload);
  }
};

const submitForm = async (formData, payload) => {
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log("form data" + " " + formData);
  try {
    const res = await OnboardingStore.submitBusinessPortfolio(formData);
    router.push({ name: "dashboard" });
    return res;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your Business information
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide us with your business information to get started on
        <br class="lg:block hidden" />
        MySpurr.
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-3.5">
          <input
            type="file"
            name=""
            @change="uploadFile"
            ref="previewImage"
            accept="image/*"
            id="uploadFile"
            hidden
          />
          <label
            for="uploadFile"
            class="cursor-pointer w-full justify-between flex text-[#01272C] px-2 text-[12px] font-Satoshi400"
          >
            <span v-if="!formState.company_logo">Upload company logo (max 3mb)</span
            ><span v-if="formState.company_logo">{{ formState.company_logo.name }} </span>
            <AttachFileIcon
          /></label>
        </div>
        <div
          class="border-[0.737px] border-[rgba(37,64,53,0.67)] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Company type - startup, agency, corporation</label
          >
          <GlobalInput
            v-model="formState.company_type"
            inputClasses="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Please select social media 1</label
          >
          <GlobalInput
            v-model="formState.social_media"
            inputClasses="bg-transparent border-none"
          />
        </div>

        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Please select social media 2</label
          >
          <GlobalInput
            v-model="formState.social_media_two"
            inputClasses="bg-transparent border-none"
            placeholder=""
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 mt-5">
      <button
        type="primary"
        @click="prev"
        class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Back
      </button>

      <button
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        @click="onFinish"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        <span v-if="!loading">Complete Profile</span>
        <WhiteLoader v-else />
      </button>
    </div>
  </section>
</template>
