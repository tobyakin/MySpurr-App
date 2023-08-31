<script setup>
import { ref, onMounted, watch } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import AttachFileIcon from "@/components/icons/attachFile.vue";
import { useRouter } from "vue-router";
// import Multiselect from "vue-multiselect";

let store = useStore();
console.log(store.getUser);
let loading = ref(false);
const router = useRouter();
// const value = ref([{ name: "Javascript", code: "js" }]);

// const options = ref([
//   { name: "Vue.js", code: "vu" },
//   { name: "Javascript", code: "js" },
//   { name: "Open Source", code: "os" },
// ]);

const OnboardingStore = useOnboardingStore();
const { step } = storeToRefs(OnboardingStore);
const emit = defineEmits("next", "prev");
const formState = {
  compensation: "",
  portfolio_title: "",
  portfolio_description: "",
  image: "",
  social_media_link: "",
};
const file = ref(null);
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
  },
  () => {
    showImage();
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
const onFinish = async () => {
  loading.value = true;

  let payload = {
    compensation: formState.compensation,
    portfolio_title: formState.portfolio_title,
    portfolio_description: formState.portfolio_description,
    social_media_link: formState.social_media_link,
  };
  console.log(file.value);
  const formData = new FormData();

  if (file.value) {
    // Convert the selected image to base64 and append it to the FormData
    const reader = new FileReader();
    reader.onload = (event) => {
      formData.append("image", event.target.result);
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
    const res = await OnboardingStore.submitTalentPortfolio(formData);
    router.push({ name: "dashboard" });
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
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
const prev = () => {
  emit("prev", step.value - 1);
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
            id="preview_Image"
            @change="uploadFile"
            ref="previewImage"
            type="file"
            hidden
          />
          <label
            for="preview_Image"
            class="cursor-pointer w-full justify-between flex text-[#01272C] px-4 text-[12px] font-Satoshi400"
            >Upload photos <AttachFileIcon /></label
          ><img :src="previewImage" alt="" />
        </div>
        <!-- <Multiselect
          v-model="value"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name"
          track-by="code"
          :options="options"
          :multiple="true"
          :taggable="true"
        ></Multiselect>
 -->
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
