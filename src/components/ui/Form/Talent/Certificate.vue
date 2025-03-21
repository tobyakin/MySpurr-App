<script setup>
import { ref, computed, watch } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useUserProfile } from "@/stores/profile";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { reactive } from "vue";

const OnboardingStore = useOnboardingStore();
let profile = useUserProfile();

const { step, certificate } = storeToRefs(OnboardingStore);
let store = useStore();
const focusedField = ref(null);

let loading = ref(false);

const emit = defineEmits(["next", "prev"]);
const formState = ref({
  certificate_date: "",
  certificate_year: "",
});

// Validation starts here 
const errors = reactive({
  title: false,
  institute: false,
  certificate_date: false,
  certificate_year: false,
  certificate_link: false
});

// Handle focus event
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
    'title',
    'institute',
    'certificate_date',
    'certificate_year',
    'certificate_link'
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

const validateField = (field) => {
  switch (field) {
    case 'title':
      return !!certificate.value.title.trim();
    case 'institute':
      return !!certificate.value.institute.trim();
    case 'certificate_date':
      return !!certificate.value.certificate_date.trim();
    case 'certificate_year':
      return !!certificate.value.certificate_year.trim();
    default:
      return true;
  }
};

const isFormValid = computed(() => {
  return (
    certificate.value.title.trim() !== "" &&
    certificate.value.institute.trim() !== "" &&
    certificate.value.certificate_date.trim() !== "" &&
    certificate.value.certificate_year.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
const prev = () => {
  emit("prev", step.value - 1);
};

const onFinish = async () => {
  loading.value = true;
  try {
    const res = await OnboardingStore.submitTalentWorkDetails();
    profile.userProfile();
    next();
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const CertificateDate = computed(() => {
  return dayjs(formState.value.certificate_date).format("YYYY-MM-DD");
});
// const CertificateYear = computed(() => {
//   return dayjs(formState.value.certificate_year).format("YYYY");
// });
watch(
  () => formState.value.certificate_date,
  (newCertificateDate) => {
    const year = dayjs(newCertificateDate).format("YYYY");
    certificate.value.certificate_year = year;
  }
);
watch(CertificateDate, (newCertificateDate) => {
  certificate.value.certificate_date = newCertificateDate;
});
// watch(CertificateYear, (newCertificateYear) => {
//   certificate.value.certificate_year = newCertificateYear;
// });
</script>

<template>
  <div class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Certificate
      </h1>
      <p class="text-[16px] text-[#011B1F] leading-[23.734px] font-Satoshi400 my-4 md:!mb-8">
        Please provide details of your most recent certificate. You will have a chance to
        add to this when your onboarding has been completed.
      </p>
      <div class="flex-col flex gap-6 pb-12">
        <!-- Title -->
        <div
          :class="errors.title ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Title</label>
          <GlobalInput
            v-model="certificate.title"
            inputClasses="bg-transparent border-none"
            placeholder="Diploma in Graphic Design"
            type="text"
            required
            @focus="handleFocus('title')"
            @blur="handleBlur"
          />
        </div>

        <!-- Institution -->
        <div
          :class="errors.institute ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Institution obtained from
          </label>
          <GlobalInput
            v-model="certificate.institute"
            inputClasses="bg-transparent border-none"
            placeholder="Coursera"
            type="text"
            required
            @focus="handleFocus('institute')"
            @blur="handleBlur"
          />
        </div>

        <!-- Certificate Date -->
        <div
          :class="errors.certificate_date ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] flex flex-row border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Date</label>
            <a-date-picker
              :bordered="false"
              v-model:value="formState.certificate_date"
              class="bg-transparent border-none !outline-none w-full shadow-none"
              @focus="handleFocus('certificate_date')"
              @blur="handleBlur"
            />
          </div>
        </div>

        <!-- Certificate Link (Optional) -->
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Link to certificate (optional)
          </label>
          <GlobalInput
            v-model="certificate.certificate_link"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="link"
            @focus="handleFocus('certificate_link')"
            @blur="handleBlur"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="prev"
        class="font-Satoshi500 text-white text-[14px] capitalize bg-[#43D0DF] leading-[11.593px] rounded-full p-5 w-full btn-hover-1"
      >
        Prev
      </button>
      <button
        @click="onFinish"
        type="submit"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF] btn-hover-1'"
        class="font-Satoshi500 text-white text-[14px] leading-[11.593px] rounded-full p-5 w-full"
      >
        <span v-if="!loading">Submit</span>
        <WhiteLoader v-else />
      </button>
    </div>
  </div>
</template>
