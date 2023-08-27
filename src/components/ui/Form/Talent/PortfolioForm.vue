<script setup>
import { ref, onMounted, watch } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
// import { storeToRefs } from "pinia";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import AttachFileIcon from "@/components/icons/attachFile.vue";
import { useRouter } from "vue-router";

let store = useStore();
console.log(store.getUser);
let loading = ref(false);
const router = useRouter();

const OnboardingStore = useOnboardingStore();
// const { step } = storeToRefs(OnboardingStore);
// const emit = defineEmits("next");
const formState = {
  compensation: "",
  portfolio_title: "",
  portfolio_description: "",
  image: "",
  social_media_link: "",
};
const file = ref("");
const previewImage = ref(null);

onMounted(() => {
  checkVaildlity();
});

const formVaildlity = ref(false);

watch(
  () => [
    formState.compensation,
    formState.portfolio_title,
    formState.portfolio_description,
    formState.social_media_link,
  ],
  () => {
    checkVaildlity();
  }
);

const checkVaildlity = () => {
  formVaildlity.value =
    formState.compensation &&
    formState.portfolio_title &&
    formState.portfolio_description &&
    formState.social_media_link
      ? true
      : false;
};

// const next = () => {
//   emit("next", step.value + 1);
// };
const uploadFile = async () => {
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
const onFinish = async () => {
  loading.value = true;
  console.log(formState);
  let payload = {
    compensation: formState.compensation,
    portfolio_title: formState.portfolio_title,
    portfolio_description: formState.portfolio_description,
    social_media_link: formState.social_media_link,
  };
  const formData = new FormData();
  formData.append("image", file.value);

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const res = await OnboardingStore.submitTalentPortfolio(formData);
    router.push({ name: "dashboard" });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
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
        class="flex-col flex gap-6 max-h-[65vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Rate/Compensation - Per hour</label
          >
          <GlobalInput
            v-model="formState.compensation"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Portfolio Title</label
          >
          <GlobalInput
            v-model="formState.portfolio_title"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-3.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Portfolio description</label
          >
          <textarea
            v-model="formState.portfolio_description"
            rows="4"
            class="bg-transparent opacity-[0.8029] w-full outline-none border-0 p-4 py-1.5"
          />
        </div>

        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-3.5">
          <input
            id="previewImage"
            @input="uploadFile"
            ref="previewImage"
            type="file"
            accept=""
            hidden
          />
          <label
            for="previewImage"
            class="cursor-pointer w-full justify-between flex text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Upload photos <AttachFileIcon /></label
          ><img
            :src="previewImage"
            class="rounded w-full cursor-pointer h-[150px] object-cover"
            alt=""
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Please select social media link</label
          >
          <GlobalInput
            v-model="formState.social_media_link"
            class="bg-transparent border-none"
            placeholder=""
          />
        </div>
      </div>
      <!-- <div class="my-6">
        <button
          class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
        >
          Complete Profile
        </button>
      </div> -->
    </div>
    <div class="flex flex-col gap-5 mt-5">
      <button
        type="primary"
        @click="onFinish"
        :class="{ 'bg-gray-400': !formVaildlity }"
        class="bg-[#43D0DF] font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Complete Profile
      </button>
    </div>
  </section>
</template>
