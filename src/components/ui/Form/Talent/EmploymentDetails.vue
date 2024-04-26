<script setup>
import { ref, watch, computed, onMounted, defineAsyncComponent } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import { useSkillsStore } from "@/stores/skills";
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);

const skillsStore = useSkillsStore();
const { skills, jobTitle } = storeToRefs(skillsStore);

import dayjs from "dayjs";
const OnboardingStore = useOnboardingStore();

const { step, employment_details } = storeToRefs(OnboardingStore);
let store = useStore();

const present = ref(false); // Add a variable to track if the checkbox is checked

const emit = defineEmits(["next", "prev"]);
const formState = ref({
  start_date: "",
  end_date: "",
});
const isFormValid = computed(() => {
  return (
    employment_details.value.company_name.trim() !== "" &&
    employment_details.value.title.trim() !== "" &&
    employment_details.value.employment_type.trim() !== "" &&
    employment_details.value.description !== "" &&
    employment_details.value.start_date !== "" &&
    employment_details.value.end_date !== ""
  );
});
const employmentType = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];

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
const currentlyWorkingHere = computed(() => {
  return present.value ? "till date" : "no"; //
});
const EndDateValue = computed(() => {
  return present.value ? "11-11-1111" : EndDate.value; // If checked, return " "
});

// Update employment_details.value.end_date when EndDate changes
watch(EndDateValue, (newEndDate) => {
  employment_details.value.end_date = newEndDate;
});
// Update employment_details.value.start_date when StartDate changes
watch(StartDate, (newStartDate) => {
  employment_details.value.start_date = newStartDate;
});
// Update employment_details.value.currently_working_here when currentlyWorkingHere changes
watch(currentlyWorkingHere, (newCurrentlyWorkingHere) => {
  employment_details.value.currently_working_here = newCurrentlyWorkingHere;
});

let skillTitles = ref([]);
let options = ref([]);

onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getJobTitles();
  options.value = skills.value.data;
  skillTitles.value = jobTitle.value.data;
});

const showJobTitleDropdown = ref(false);
const highlightedJobTitleIndex = ref(-1);

const filteredOptionsJobTitle = computed(() => {
  const searchJobTitle = employment_details.value.title.toLowerCase();
  return skillTitles.value.filter((option) =>
    option.name.toLowerCase().includes(searchJobTitle)
  );
});

const filterJobTitleOptions = () => {
  showJobTitleDropdown.value = true;
  highlightedJobTitleIndex.value = -1;
};

const selectJobTitleOptions = (option) => {
  employment_details.value.title = option.name;
  showJobTitleDropdown.value = false;
};

const highlightNextJobTitle = () => {
  if (highlightedJobTitleIndex.value < filteredOptionsJobTitle.value.length - 1) {
    highlightedJobTitleIndex.value++;
  }
};

const highlightPreviousJobTitle = () => {
  if (highlightedJobTitleIndex.value > 0) {
    highlightedJobTitleIndex.value--;
  }
};

const selectHighlightedJobTitleOption = () => {
  if (highlightedJobTitleIndex.value >= 0) {
    selectJobTitleOptions(filteredOptionsJobTitle.value[highlightedJobTitleIndex.value]);
  }
};
</script>

<template>
  <div class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Employment details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[23.734px] font-Satoshi400 my-4 md:!mb-8"
      >
        Please provide details to your most recent employment details. You will have a
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
            inputClasses="bg-transparent border-none"
            v-model="employment_details.company_name"
            placeholder=""
            type="text"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Title</label>
          <div class="relative">
            <GlobalInput
              inputClasses="bg-transparent border-none"
              v-model="employment_details.title"
              placeholder=""
              @input="filterJobTitleOptions"
              @keydown.down="highlightNextJobTitle"
              @keydown.up="highlightPreviousJobTitle"
              @keydown.enter="selectHighlightedJobTitleOption"
              type="text"
            />
            <ul
              v-if="showJobTitleDropdown"
              class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
            >
              <li
                v-for="(option, index) in filteredOptionsJobTitle"
                :key="option.id"
                @click="selectJobTitleOptions(option)"
                :class="{ highlighted: index === highlightedJobTitleIndex }"
                class="hover:bg-brand hover:text-white"
              >
                {{ option.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Employment type</label
          >
          <!-- <GlobalInput
            inputClasses="bg-transparent border-none"
            v-model="employment_details.employment_type"
            placeholder=""
            type="text"
          /> -->
          <SelectGroup
            v-model="employment_details.employment_type"
            DropdownItem=""
            :items="employmentType"
            placeholder=""
            name=""
            class="bg-transparent bg-none border-none"
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
          :class="present ? 'opacity-30' : ''"
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
        <!-- <div class="flex flex-row h-full rounded-[5.897px] py-1.5"> -->
        <div class="w-full flex flex-col gap-2">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Description</label
          >
          <div class="flex flex-col min-h-[28vh]">
            <QuillEditor
              v-model:content="employment_details.description"
              class=""
              theme="snow"
              placeholder="Give a brief description about your work "
              contentType="html"
            />
          </div>
        </div>
        <!-- </div> -->

        <!-- <div
          class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
              >Description</label
            >
            <textarea
              v-model="employment_details.description"
              rows="4"
              class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
              placeholder="Give a brief description about your work "
            />
          </div>
        </div> -->

        <div class="flex gap-3 justify-start items-center">
          <input
            class="bg-transparent !border-[0.737px] cursor-pointer !border-[#254035AB] accent-brand rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
            type="checkbox"
            v-model="present"
          />
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >I am currently working on this role
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="prev"
        class="font-Satoshi500 text-white text-[14px] uppercase bg-[#43D0DF] leading-[11.593px] rounded-full p-5 w-full"
      >
        prev
      </button>
      <button
        @click="next"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Next
      </button>
    </div>
  </div>
</template>
