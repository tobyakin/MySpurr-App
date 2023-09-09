<script setup>
import { ref, onMounted, watch } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import AttachFileIcon from "@/components/icons/attachFile.vue";
import { useRouter } from "vue-router";

let store = useStore();
console.log(store.getUser);
const router = useRouter();

const OnboardingStore = useOnboardingStore();
const { step } = storeToRefs(OnboardingStore);
const emit = defineEmits("next");
const formState = {
  company_logo: "",
  company_type: "",
  social_media: "",
  social_media_two: "",
};

onMounted(() => {
  checkVaildlity();
});

const formVaildlity = ref(false);

watch(
  () => [
    formState.company_logo,
    formState.company_type,
    formState.social_media,
    formState.social_media_two,
  ],
  () => {
    checkVaildlity();
  }
);

const checkVaildlity = () => {
  console.log("Checking profile validity...");
  console.log(formState);

  formVaildlity.value =
    formState.company_logo &&
    formState.company_type &&
    formState.social_media &&
    formState.social_media_two
      ? true
      : false;
  console.log("Form validity:", formVaildlity.value);
};

const prev = () => {
  emit("prev", step.value - 1);
};
const file = ref(null);
const previewImage = ref(null);

const onFinish = async () => {
  let payload = {
    company_type: formState.company_type,
    social_media: formState.social_media,
    social_media_two: formState.social_media_two,
  };
  console.log(file.value);
  const formData = new FormData();

  if (file.value) {
    // Convert the selected image to base64 and append it to the FormData
    const reader = new FileReader();
    reader.onload = (event) => {
      formData.append("company_logo", event.target.result);
      submitForm(formData, payload);
    };
    reader.readAsDataURL(file.value);
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
const uploadFile = () => {
  file.value = previewImage.value.files[0];
  showImage();
};
const showImage = async () => {
  if (file.value) {
    previewImage.value = URL.createObjectURL(file.value);
  } else {
    previewImage.value = null;
  }
};
</script>

<template>
  <section class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your portfolio
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide at least one portfolio work to get started on
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
            ref="proof_of_id_front_back"
            accept=""
            id="uploadFile"
            hidden
          />
          <label
            for="uploadFile"
            class="cursor-pointer w-full justify-between flex text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Upload company logo <AttachFileIcon
          /></label>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Company type - startup, agency, corporation</label
          >
          <GlobalInput
            v-model="formState.company_type"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Please select social media 1</label
          >
          <GlobalInput
            v-model="formState.social_media"
            class="bg-transparent border-none"
          />
        </div>

        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Please select social media 2</label
          >
          <GlobalInput
            v-model="formState.social_media_two"
            class="bg-transparent border-none"
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
        type="primary"
        @click="onFinish"
        class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Complete Profile
      </button>
    </div>
  </section>
</template>
