<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { editorConfig } from "@/config/ckeditorConfig";
import { ClassicEditor } from 'ckeditor5'
import { reactive } from "vue";

const isLayoutReady = ref(false)
const editor = ClassicEditor
const focusedField = ref(null);

const dynamicPlaceholder = ref('Give a brief description about your education');

const editorConfigs = computed(() => ({
  ...editorConfig,
  placeholder: dynamicPlaceholder.value,
}));

const OnboardingStore = useOnboardingStore();

const { step, education } = storeToRefs(OnboardingStore);
const present = ref(false); // Add a variable to track if the checkbox is checked

const emit = defineEmits(["next", "prev"]);
const formState = ref({
  start_date: "",
  end_date: "",
});

// Validate fields logic starts here
const errors = reactive({
  school_name: false,
  degree: false,
  description: false,
  start_date: false,
  end_date: false,
});

const validatePreviousFields = (field) => {
  const fieldsOrder = [
    'school_name',
    'degree',
    'start_date',
    'end_date',
    'description',
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
    case 'school_name':
      return !!education.value.school_name.trim();
    case 'degree':
      return !!education.value.degree.trim();
    case 'description':
      return !!education.value.description.trim();
    case 'start_date':
      return !!education.value.start_date.trim();
    case 'end_date':
      return !!education.value.end_date.trim();
    default:
      return true;
  }
};

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

const isFormValid = computed(() => {
  return (
    education.value.school_name.trim() !== "" &&
    education.value.degree.trim() !== "" &&
    // education.value.field_of_study.trim() !== "" &&
    education.value.description !== "" &&
    education.value.start_date !== "" &&
    education.value.end_date !== ""
  );
});
const prev = () => {
  emit("prev", step.value - 1);
};

const next = () => {
  emit("next", step.value + 1);
};
// Create computed properties to format and update StartDate and EndDate
const StartDate = computed(() => {
  return dayjs(formState.value.start_date).format("YYYY-MM-DD");
});

const EndDate = computed(() => {
  return dayjs(formState.value.end_date).format("YYYY-MM-DD");
});
const EndDateValue = computed(() => {
  return present.value ? "11-11-1111" : EndDate.value; // If checked, return " "
});
const currentlySchoolingHere = computed(() => {
  return present.value ? "till date" : "no"; //
});

// Update education.value.end_date when EndDate changes
watch(EndDateValue, (newEndDate) => {
  education.value.end_date = newEndDate;
});
// Update education.value.start_date when StartDate changes
watch(StartDate, (newStartDate) => {
  education.value.start_date = newStartDate;
});
// Update education.value.currently_schooling_here when currentlySchoolingHere changes
watch(currentlySchoolingHere, (newCurrentlySchoolingHere) => {
  education.value.currently_schooling_here = newCurrentlySchoolingHere;
});

onMounted(async () => {
  isLayoutReady.value = true
});
</script>

<template>
  <div class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Educational details
      </h1>
      <p class="text-[16px] text-[#011B1F] leading-[23.734px] font-Satoshi400 my-4 md:!mb-8">
        Please provide details to your most recent educational detail. You will have a
        chance to add to this when your onboarding as been completed.
      </p>
      <div class="flex-col flex gap-6 pb-3">
        <!-- School Name -->
        <div
          :class="errors.school_name ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">School</label>
          <GlobalInput
            v-model="education.school_name"
            inputClasses="bg-transparent border-none"
            placeholder="University of Nigeria, Nsuka"
            type="text"
            @focus="handleFocus('school_name')"
            @blur="handleBlur"
          />
        </div>

        <!-- Degree -->
        <div
          :class="errors.degree ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Degree</label>
          <GlobalInput
            v-model="education.degree"
            inputClasses="bg-transparent border-none"
            placeholder="Ex. Bachelor of Science - BS"
            type="text"
            @focus="handleFocus('degree')"
            @blur="handleBlur"
          />
        </div>

        <!-- Start Date -->
        <div
          :class="errors.start_date ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] flex flex-row border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Start Date</label>
            <a-date-picker
              :bordered="false"
              v-model:value="formState.start_date"
              class="bg-transparent border-none !outline-none w-full shadow-none"
              @focus="handleFocus('start_date')"
              @blur="handleBlur"
            />
          </div>
        </div>

        <!-- End Date -->
        <div
          :class="errors.end_date ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] flex flex-row border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">End Date</label>
            <a-date-picker
              :bordered="false"
              v-model:value="formState.end_date"
              :disabled="present"
              class="bg-transparent border-none !outline-none w-full shadow-none"
              @focus="handleFocus('end_date')"
              @blur="handleBlur"
            />
          </div>
        </div>

        <!-- Description -->
        <div
          :class="errors.description ? 'border-[#DA5252]' : 'border-[#254035AB]'"
          class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Description</label>
          <div class="flex flex-col">
            <ckeditor
              v-if="isLayoutReady"
              v-model="education.description"
              :editor="editor"
              :config="editorConfigs"
              @focus="handleFocus('description')"
              @blur="handleBlur"
            />
          </div>
        </div>

        <!-- Currently Schooling Here Checkbox -->
        <div class="flex gap-3 justify-start items-center">
          <input
            class="bg-transparent !border-[0.737px] cursor-pointer !border-[#254035AB] rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
            type="checkbox"
            v-model="present"
          />
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            I am currently still schooling here
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="prev"
        class="font-Satoshi500 text-white text-[14px] bg-[#43D0DF] leading-[11.593px] rounded-full p-5 w-full btn-hover-1"
      >
        Prev
      </button>
      <button
        @click="next"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF] btn-hover-1'"
        class="font-Satoshi500 text-white text-[14px] leading-[11.593px] rounded-full p-5 w-full"
      >
        Next
      </button>
    </div>
  </div>
</template>
