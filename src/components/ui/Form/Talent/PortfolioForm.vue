<script setup>
import { ref, computed } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import AttachFileIcon from "@/components/icons/attachFile.vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
let store = useStore();

let loading = ref(false);
const router = useRouter();
const OnboardingStore = useOnboardingStore();
const { step } = storeToRefs(OnboardingStore);
const emit = defineEmits(["next", "prev"]);
const formState = ref({
  compensation: "",
  portfolio_title: "",
  portfolio_description: "",
  images: [],
  social_media_link: "",
});
const file = ref(null);
const uploadedFile = ref(null);
const focusedField = ref(null);

// form validation starts here, the input in focus is tracked and the validity of previous input fields is accessed displaying a red border for invalid fields

const errors = reactive({
  compensation: false,
  portfolio_title: false,
  portfolio_description: false,
  images: false,
  social_media_link: false,
});

const handleFocus = (field) => {
  focusedField.value = field;
  validatePreviousFields(field);
  errors[field] = false; // Clear the error for the focused field
};

// Handle blur event
const handleBlur = () => {
  focusedField.value = null;
};

const validatePreviousFields = (field) => {
  const fieldsOrder = [
    'compensation',
    'portfolio_title',
    'portfolio_description',
    'images',
    'social_media_link',
  ];

  const fieldIndex = fieldsOrder.indexOf(field);
  if (fieldIndex === -1) return;

  for (let i = 0; i < fieldIndex; i++) {
    const currentField = fieldsOrder[i];
    if (!validateField(currentField)) {
      errors[currentField] = true;
    } else {
      errors[currentField] = false;
    }
  }
};

// Validate individual fields
const validateField = (field) => {
  switch (field) {
    case 'compensation':
      return !!formState.value.compensation.trim();
    case 'portfolio_title':
      return !!formState.value.portfolio_title.trim();
    case 'portfolio_description':
      return !!formState.value.portfolio_description.trim();
    case 'images':
      return formState.value.images.length > 0;
    case 'social_media_link':
      return !!formState.value.social_media_link.trim();
    default:
      return true;
  }
};


const isFormValid = computed(() => {
  return (
    formState.value.compensation.trim() !== "" &&
    file.value !== null &&
    formState.value.portfolio_title.trim() !== "" &&
    formState.value.portfolio_description.trim() !== "" &&
    formState.value.social_media_link.trim() !== ""
  );
});
const onFinish = async () => {
  loading.value = true;

  let payload = {
    compensation: formState.value.compensation,
    portfolio_title: formState.value.portfolio_title,
    portfolio_description: formState.value.portfolio_description,
    social_media_link: formState.value.social_media_link,
  };

  const formData = new FormData();

  formState.value.images.forEach((image) => {
    formData.append("images[]", image);
  });

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

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
const numUploadedImages = computed(() => {
  return formState.value.images.length;
});

// const onFinish = async () => {
//   loading.value = true;

//   let payload = {
//     compensation: formState.value.compensation,
//     portfolio_title: formState.value.portfolio_title,
//     portfolio_description: formState.value.portfolio_description,
//     social_media_link: formState.value.social_media_link,
//   };
//   console.log(file.value);
//   const formData = new FormData();

//   if (file.value) {
//     // Convert the selected image to base64 and append it to the FormData
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       formData.append("image", event.target.result);
//       submitForm(formData, payload);
//     };
//     reader.readAsDataURL(file.value);
//     next();
//   } else {
//     submitForm(formData, payload);
//   }
// };

// const submitForm = async (formData, payload) => {
//   Object.entries(payload).forEach(([key, value]) => {
//     formData.append(key, value);
//   });
//   console.log("form data" + " " + formData);
//   try {
//     const res = await OnboardingStore.submitTalentPortfolio(formData);
//     router.push({ name: "dashboard" });
//     return res;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loading.value = false;
//   }
// };
// const uploadFile = () => {
//   if (uploadedFile.value.files.length > 0) {
//     const selectedFileType = uploadedFile.value.files[0].type;
//     if (selectedFileType.startsWith("image/")) {
//       file.value = uploadedFile.value.files[0];
//     } else {
//       file.value = null;
//       alert("Please select an image file.");
//     }
//   } else {
//     file.value = null;
//   }
// };
const uploadFile = () => {
  const selectedFiles = uploadedFile.value.files;

  if (selectedFiles.length > 0) {
    const selectedFileTypes = Array.from(selectedFiles).map((file) => file.type);

    if (selectedFileTypes.every((type) => type.startsWith("image/"))) {
      file.value = selectedFiles.length;

      // Filter out only image files
      const imageFiles = Array.from(selectedFiles).filter((file) =>
        file.type.startsWith("image/")
      );

      // Ensure you don't exceed the maximum number of images (3 in this case)
      // if (imageFiles.length > 3) {
      //   alert("Please select up to 3 image files.");
      //   return;
      // }

      // Update the images array
      formState.value.images = imageFiles;
    } else {
      formState.value.images = []; // Clear the array
      alert("Please select only image files.");
    }
  } else {
    formState.value.images = []; // Clear the array
  }
};

const next = () => {
  emit("next", step.value + 1);
};

const prev = () => {
  emit("prev", step.value - 1);
};
</script>

<template>
  <form class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your portfolio
      </h1>
      <p class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8">
        Please provide at least one portfolio work to get started on
        <br class="lg:block hidden" />
        MySpurr.
      </p>
      <div class="flex-col flex gap-6 max-h-[65vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden">
        <!-- Compensation -->
        <div
          :class="errors.compensation ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Rate/compensation - Per hour (USD)
          </label>
          <GlobalInput
            v-model="formState.compensation"
            class="bg-transparent border-none"
            placeholder="$30k-$50k/yr"
            required
            type="text"
            @focus="handleFocus('compensation')"
            @blur="handleBlur"
          />
        </div>

        <!-- Portfolio Title -->
        <div
          :class="errors.portfolio_title ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Portfolio Title
          </label>
          <GlobalInput
            v-model="formState.portfolio_title"
            class="bg-transparent border-none"
            placeholder="Share your most recent portfolio (what is the title)"
            required
            @focus="handleFocus('portfolio_title')"
            @blur="handleBlur"
          />
        </div>

        <!-- Portfolio Description -->
        <div
          :class="errors.portfolio_description ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-3.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Portfolio description
          </label>
          <textarea
            v-model="formState.portfolio_description"
            rows="4"
            class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
            required
            placeholder="Give a brief description about the job, what was done?, how was it done?, what was the impact?"
            @focus="handleFocus('portfolio_description')"
            @blur="handleBlur"
          />
        </div>

        <!-- Upload Photos -->
        <div
          :class="errors.images ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-3.5"
        >
          <input
            id="preview_Image"
            @change="uploadFile"
            ref="uploadedFile"
            type="file"
            hidden
            accept="image/*"
            required
            multiple
          />
          <label
            for="preview_Image"
            class="cursor-pointer w-full justify-between flex text-[#01272C] px-4 text-[12px] font-Satoshi400"
          >
            <span v-if="!file">Upload photos (max 3mb each)</span>
            <span v-if="file">{{ numUploadedImages }} Uploaded</span>
            <AttachFileIcon />
          </label>
        </div>

        <!-- Social Media Link -->
        <div
          :class="errors.social_media_link ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Please select social media link
          </label>
          <GlobalInput
            v-model="formState.social_media_link"
            class="bg-transparent border-none"
            placeholder=""
            @focus="handleFocus('social_media_link')"
            @blur="handleBlur"
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
        type="submit"
        @click="onFinish"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Complete Profile
      </button>
    </div>
  </form>
</template>

<style scoped>
.multiselect__tag {
  @apply !bg-brand font-Satoshi400;
}
.multiselect__tags-wrap {
  @apply w-full;
}
.multiselect__tags {
  @apply border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-3;
}
</style>