<script setup>
import { ref, watch, computed } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
const OnboardingStore = useOnboardingStore();

const { step, employment_details } = storeToRefs(OnboardingStore);
let store = useStore();
console.log(store.getUser);

const emit = defineEmits("next");
const formState = ref({
  start_date: "",
  end_date: "",
});
const isFormValid = computed(() => {
  return (
    employment_details.value.company_name.trim() !== "" &&
    employment_details.value.title.trim() !== "" &&
    employment_details.value.employment_type.trim() !== "" &&
    employment_details.value.start_date !== "" &&
    employment_details.value.end_date !== ""
  );
});

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

// Update employment_details.value.end_date when EndDate changes
watch(EndDate, (newEndDate) => {
  employment_details.value.end_date = newEndDate;
});
// Update employment_details.value.start_date when StartDate changes
watch(StartDate, (newStartDate) => {
  employment_details.value.start_date = newStartDate;
});
</script>

<template>
  <form class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Employment details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide details fo your most recent employment details. You will have a
        chance to add to this when your onboarding as been completed
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Company name</label
          >
          <GlobalInput
            class="bg-transparent border-none"
            v-model="employment_details.company_name"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Title</label>
          <GlobalInput
            class="bg-transparent border-none"
            v-model="employment_details.title"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Employment type</label
          >
          <GlobalInput
            class="bg-transparent border-none"
            v-model="employment_details.employment_type"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div
          class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
              >Start Date</label
            >
            <a-date-picker
              :bordered="false"
              v-model:value="formState.start_date"
              class="bg-transparent border-none !outline-none w-full shadow-none"
            />
          </div>
        </div>
        <div
          class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
              >End Date</label
            >
            <a-date-picker
              :bordered="false"
              v-model:value="formState.end_date"
              class="bg-transparent border-none !outline-none w-full shadow-none"
            />
          </div>
        </div>
        <div class="flex gap-3 justify-start items-center">
          <input
            class="bg-transparent !border-[0.737px] !border-[#254035AB] rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
            type="checkbox"
            required
          />
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >I am currently working on this role
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="next"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Next
      </button>
    </div>
  </form>
</template>