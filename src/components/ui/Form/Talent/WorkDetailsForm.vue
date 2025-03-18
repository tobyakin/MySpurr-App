<script setup>
import { ref, onMounted, watch, computed, defineAsyncComponent, reactive } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useSkillsStore } from "@/stores/skills";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";

const skillsStore = useSkillsStore();
const { skills, jobTitle, contriesCode, states } = storeToRefs(skillsStore);

const focusedField = ref(null);
const OnboardingStore = useOnboardingStore();
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);

const handleFocus = (field) => {
  focusedField.value = field;
  validatePreviousFields(field);
  errors[field] = false; // Clear the error for the focused field
};

const handleBlur = () => {
  focusedField.value = null;
};

const validatePreviousFields = (field) => {
  const fieldsOrder = [
    'skill_title',
    'overview',
    'ciso',
    'siso',
    'top_skills',
    'highest_education',
    'employment_type',
    'availability',
    'rate'
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
    case 'skill_title':
      return !!skill_title.value;
    case 'overview':
      return !!overview.value;
    case 'ciso':
      return !!ciso.value;
    case 'siso':
      return !!siso.value;
    case 'top_skills':
      return top_skills.value.length > 0;
    case 'highest_education':
      return !!highest_education.value;
    case 'employment_type':
      return !!employment_type.value;
    case 'availability':
      return !!availability.value;
    case 'rate':
      return !!rate.value && !isNaN(parseFloat(rate.value));
    default:
      return true;
  }
};

const {
  step,
  skill_title,
  highest_education,
  overview,
  rate,
  availability,
  top_skills,
  employment_type,
  ciso,
  siso,
} = storeToRefs(OnboardingStore);

const availabilityData = ["Immediately", "One week"];
const employmentType = [
  "Freelance",
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
];
let options = ref([]);
let skillTitles = ref([]);
const skillTitlesNames = ref([]);

const educationLevel = ["Certificate", "Bachelors", "Masters", "Doctorate"];

const emit = defineEmits(["next"]);

const minRate = ref(null);
const maxRate = ref(null);
const rateError = ref(null);

const isFormValid = computed(() => {
  const currentRate = parseFloat(rate.value);
  return (
    skill_title.value.trim() !== "" &&
    top_skills.value.length > 0 &&
    highest_education.value.trim() !== "" &&
    overview.value.trim() !== "" &&
    ciso.value.trim() !== "" &&
    siso.value.trim() !== "" &&
    rate.value.trim() !== "" &&
    !isNaN(currentRate) &&
    (minRate.value === null || currentRate >= minRate.value) &&
    (maxRate.value === null || currentRate <= maxRate.value) &&
    employment_type.value.trim() !== "" &&
    availability.value.trim() !== ""
  );
});

const selectedCountry = ref("");
const selectedState = ref("");

// Compute ISO codes based on selected country and state
const selectedIso2 = computed(() => {
  const foundCountry = contriesCode?.value?.data?.find(
    (country) => country.name.toLowerCase() === selectedCountry.value.toLowerCase()
  );
  return foundCountry ? foundCountry.iso2 : null;
});

const selectedsiso = computed(() => {
  const foundState = states?.value?.data?.find(
    (state) => state.name.toLowerCase() === selectedState.value.toLowerCase()
  );
  return foundState ? foundState.iso2 : null;
});

// Watchers for ISO codes
watch(selectedIso2, async (newInput) => {
  siso.value = "";
  states.value = null;
  await skillsStore.handleGetStates(newInput);
});

watch(selectedIso2, (newInput) => {
  ciso.value = newInput;
});

watch(selectedsiso, (newInput) => {
  siso.value = newInput;
});

// Validation Errors
const errors = reactive({
  top_skills: false,
  skill_title: false,
  highest_education: false,
  overview: false,
  ciso: false,
  siso: false,
  rate: false,
  employment_type: false,
  availability: false,
});

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Validation rules
  const validationRules = [
    { field: "skill_title", value: !skill_title.value },
    { field: "top_skills", value: top_skills.value.length === 0 },
    { field: "highest_education", value: !highest_education.value },
    { field: "overview", value: !overview.value },
    { field: "siso", value: !siso.value },
    { field: "ciso", value: !ciso.value },
    { field: "rate", value: !rate.value },
    { field: "employment_type", value: !employment_type.value },
    { field: "availability", value: !availability.value },
  ];

  let isValid = true;
  validationRules.forEach((rule) => {
    if (rule.value) {
      errors[rule.field] = true;
      isValid = false;
    }
  });

  return isValid;
};

const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });
};

// watch(
//   [
//     top_skills,
//     skill_title,
//     highest_education,
//     overview,
//     siso,
//     ciso,
//     rate,
//     employment_type,
//     availability,
//   ],
//   () => {
//     clearInputErrors();
//   }
// );

const next = () => {
  if (!validateForm()) {
    return;
  } else {
    emit("next", step.value + 1);
  }
};

// Watch for changes in skill_title to update minRate and maxRate
watch(skill_title, (newSkillTitle) => {
  if (newSkillTitle) {
    const selectedOption = skillTitles.value.find(option => option.name === newSkillTitle);
    if (selectedOption) {
      minRate.value = selectedOption.min_rate || null;
      maxRate.value = selectedOption.max_rate || null;
    }
  } else {
    minRate.value = null;
    maxRate.value = null;
  }
});

watch(selectedCountry, async (newCountry) => {
  const foundCountry = contriesCode?.value?.data?.find(
    (country) => country.name.toLowerCase() === newCountry.toLowerCase()
  );
  ciso.value = foundCountry ? foundCountry.iso2 : '';

  if (ciso.value) {
    states.value = null;
    await skillsStore.handleGetStates(ciso.value);
  }
});

watch(selectedState, (newState) => {
  const foundState = states?.value?.data?.find(
    (state) => state.name.toLowerCase() === newState.toLowerCase()
  );
  siso.value = foundState ? foundState.iso2 : '';
});

// Job Title Dropdown Logic
const showJobTitleDropdown = ref(false);
const selectedJobTitle = ref(null);

const handleJobTitleChange = (name) => {
  const selected = skillTitles.value.find((item) => item.name === name);
  selectJobTitleOptions(selected);
};

const selectJobTitleOptions = (option) => {
  if (option) {
    selectedJobTitle.value = option.name;
    skill_title.value = option.name;
    showJobTitleDropdown.value = false;
    minRate.value = option.min_rate || null;
    maxRate.value = option.max_rate || null;
    rateError.value = null;
  }
};

const validateAndCorrectRate = () => {
  const currentRate = parseFloat(rate.value);

  if (isNaN(currentRate)) {
    rateError.value = 'Please enter a valid number';
    return;
  }

  if (minRate.value && currentRate < minRate.value) {
    rateError.value = `Rate must be greater than or equal to $${minRate.value}`;
  } else if (maxRate.value && currentRate > maxRate.value) {
    rateError.value = `Rate must be less than or equal to $${maxRate.value}`;
  } else {
    rateError.value = null;
  }
};

// Multi-select Logic for Top Skills
const search = ref("");
const showDropdown = ref(false);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return options.value.filter((option) => option.name.toLowerCase().includes(searchTerm));
});

const filterOptions = () => {
  showDropdown.value = true;
  highlightedIndex.value = -1;
};

const placeholderText = computed(() => {
  return top_skills.value.length >= 3 ? "" : "Select your top skills (e.g., Graphics Design)";
});

const shouldDisplayInput = computed(() => {
  return top_skills.value.length < 3;
});

const selectOption = (option) => {
  if (top_skills.value.length < 3) {
    search.value = "";
    showDropdown.value = false;
    highlightedIndex.value = -1;
    top_skills.value.push(option);
  }
};

const removeSelectedItem = (index) => {
  top_skills.value.splice(index, 1);
};

const highlightNext = () => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
  }
};

const highlightPrevious = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
};

const getNextId = () => {
  const ids = options.value.map((option) => parseInt(option.id));
  const maxId = Math.max(...ids);
  return (maxId + 1).toString();
};

const selectHighlightedOption = () => {
  if (highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value]);
  } else if (search.value && !filteredOptions.value.length) {
    // Add the typed item if no matches
    const nextId = getNextId();
    selectOption({ id: nextId, name: search.value });
  }
};

onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getJobTitles();
  await skillsStore.getCountriesCode();
  options.value = skills.value.data;
  skillTitles.value = jobTitle.value.data;
  skillTitlesNames.value = skillTitles.value.map((item) => item.name);

  if (selectedJobTitle.value) {
    const selectedOption = skillTitles.value.find(option => option.name === selectedJobTitle.value);
    if (selectedOption) {
      minRate.value = selectedOption.min_rate || null;
      maxRate.value = selectedOption.max_rate || null;
    }
  }

  const foundCountry = contriesCode.value?.data.find((country) => country.iso2 === ciso.value);
  selectedCountry.value = foundCountry ? foundCountry.name : '';

  if (selectedCountry.value) {
    await skillsStore.handleGetStates(ciso.value);
    
    const foundState = states.value?.data.find((state) => state.iso2 === siso.value);
    selectedState.value = foundState ? foundState.name : '';
  }

});
</script>

<template>
  <div class="w-full md:w-[350px] h-auto bg-[#007582] rounded-xl px-5 py-3 flex justify-between items-center mb-3 sticky top-1 z-10 lg:hidden md:hidden">
    <div>
      <h3 class=" text-[24px] font-medium text-white pb-[5px]">
        Need Help?
      </h3>
      <p class="text-white text-sm">Contact support</p>
    </div>
    <div class="flex gap-3">
      <div>
        <img src="../../../../assets/aa.svg" alt="">
      </div>
      <div>
        <a href="tel:08166813812">
          <img src="../../../../assets/a.svg" alt="">
        </a>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="lg:w-[60%] animate__animated animate__fadeIn relative">
      <div class="flex gap-[150px] justify-center items-center">
        <div>
          <div class="w-auto">
            <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
              Your work details
            </h1>
            <p
              class="text-[16px] text-[#011B1F] leading-[23.734px] font-Satoshi400 !my-4 md:!mb-8"
            >
              Please provide details to your most recent work detail. You will have a chance to
              add to this when your onboarding as been completed
            </p>
            <div
              class="flex-col flex pb-12"
            >
              <div
                :class="errors.skill_title ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 mb-6"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Skill title</label
                >
                <div class="relative">
                  <SelectGroup
                    v-model="selectedJobTitle"
                    DropdownItem="level of education"
                    placeholder=""
                    :items="skillTitlesNames"
                    name=""
                    item-text="name"
                    class="w-full flex border-none"
                    @update:modelValue="handleJobTitleChange"
                    @focus="handleFocus('skill_title')"
                    @blur="handleBlur"
                  />
                </div>
              </div>
              <div
                :class="errors.overview ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 mb-6"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Overview</label>
                <textarea
                  v-model="overview"
                  rows="4"
                  class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
                  placeholder="Give a brief description about yourself"
                  @focus="handleFocus('overview')"
                  @blur="handleBlur"
                />
              </div>
              <div
                :class="errors.siso || errors.ciso ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] flex lg:flex-row flex-col items-center rounded-[5.897px] p-4 py-1.5 gap-3 mb-6"
              >
                <div class="w-full">
                  <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Country</label>
                  <div class="flex w-full items-center">
                    <a-select
                      placeholder="country or region"
                      :bordered="false"
                      :show-arrow="false"
                      class="w-full !px-0 border-2 rounded-md my-2"
                      show-search
                      v-model:value="selectedCountry"
                      @focus="handleFocus('ciso')"
                      @blur="handleBlur"
                    >
                      <a-select-option disabled>country or region</a-select-option>
                      <a-select-option
                        v-for="country in contriesCode?.data"
                        :key="country.id"
                        :value="country.name"
                      >
                        {{ country.name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>

                <div class="w-full">
                  <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">State</label>
                  <div class="flex w-full items-center">
                    <span v-if="!states" class="p-2 px-2">loading..</span>
                    <a-select
                      v-else
                      placeholder="state or city"
                      :show-arrow="false"
                      :bordered="false"
                      class="w-full !px-0 border-2 rounded-md my-2"
                      show-search
                      v-model:value="selectedState"
                      @focus="handleFocus('siso')"
                      @blur="handleBlur"
                    >
                      <a-select-option disabled>state or city</a-select-option>
                      <a-select-option
                        v-for="state in states?.data"
                        :key="state.id"
                        :value="state.name"
                      >
                        {{ state.name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
              </div>

              <div
                :class="errors.top_skills ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 mb-6"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Select your top 3 skills</label>
                <div>
                  <div class="selected-items p-2 gap-2">
                    <div
                      v-for="(selectedItem, index) in top_skills"
                      :key="selectedItem.id"
                      class="selected-item bg-brand text-sm font-Satoshi400 p-[5px] text-white rounded-[5px]"
                    >
                      {{ selectedItem.name }}
                      <span
                        @click="removeSelectedItem(index)"
                        class="remove-btn text-black hover:text-white"
                        >x</span
                      >
                    </div>
                  </div>
                  <div>
                    <GlobalInput
                      v-if="shouldDisplayInput"
                      v-model="search"
                      @input="filterOptions"
                      @keydown.down="highlightNext"
                      @keydown.up="highlightPrevious"
                      @keydown.enter="selectHighlightedOption"
                      ref="searchInput"
                      inputClasses="bg-transparent !border-none"
                      :placeholder="placeholderText"
                      type="text"
                      @focus="handleFocus('top_skills')"
                      @blur="handleBlur"
                    />
                    <ul
                      v-if="showDropdown"
                      class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
                    >
                      <li
                        v-for="(option, index) in filteredOptions"
                        :key="option.id"
                        @click="selectOption(option)"
                        :class="{ highlighted: index === highlightedIndex }"
                        class="hover:bg-brand hover:text-white"
                      >
                        {{ option.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div
                :class="errors.highest_education ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 mb-6"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >What is your highest level of education?</label
                >
                <SelectGroup
                  v-model="highest_education"
                  DropdownItem="level of education"
                  placeholder=""
                  :items="educationLevel"
                  name=""
                  class="w-full flex border-none"
                   @focus="handleFocus('highest_education')"
                    @blur="handleBlur"
                />
              </div>
              <div
                :class="errors.employment_type ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 mb-6"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Employment type
                </label>
                <SelectGroup
                  v-model="employment_type"
                  DropdownItem=""
                  :items="employmentType"
                  placeholder="Employment type"
                  name=""
                  class="bg-transparent border-none"
                   @focus="handleFocus('employment_type')"
                    @blur="handleBlur"
                />
              </div>
              <div
                :class="errors.availability ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 mb-6"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Availability
                </label>
                <SelectGroup
                  v-model="availability"
                  DropdownItem=""
                  :items="availabilityData"
                  placeholder="Availability"
                  name=""
                  class="bg-transparent border-none"
                    @focus="handleFocus('availability')"
                    @blur="handleBlur"
                />
              </div>

              <div class="mb-3" v-if="minRate && maxRate">
                <p>
                  Choose between ${{ minRate }} - ${{ maxRate }}
                </p>
              </div>
              <div
                :class="errors.rate ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5 m-0"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Rate /hr ($)</label
                >
                <GlobalInput
                  v-model="rate"
                  :min="minRate"
                  :max="maxRate"
                  inputClasses="bg-transparent border-none"
                  placeholder="$100"
                  type="number"
                  @input="validateAndCorrectRate"
                  @focus="handleFocus('rate')"
                  @blur="handleBlur"
                />
              </div>
              <div v-if="rateError" class="text-red-500 text-sm">{{ rateError }}</div>
            </div>
          </div>
          <div class="flex flex-row gap-5 pb-8 mt-5">
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
      </div>
    </div>
    <div class="hidden md:block w-[200px] h-[200px] bg-[#007582] rounded-xl px-5 py-3 absolute right-44 bottom-32">
      <h3 class=" text-[35px] font-medium text-white pb-[5px]">
        Need <br>Help?
      </h3>
      <p class="pb-[19px] text-white text-lg">Contact support</p>
      <div class="flex justify-end gap-2">
        <div>
          <img src="../../../../assets/aa.svg" alt="">
        </div>
        <div>
          <a href="tel:08166813812">
            <img src="../../../../assets/a.svg" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.multiselect {
  @apply font-Satoshi400;
}
.multiselect__tag {
  @apply !bg-brand text-sm font-Satoshi400;
}
.multiselect__tags-wrap {
  @apply w-full;
}
.multiselect__tags {
  @apply border-none p-2 pr-0;
}
.multiselect__select {
  @apply !p-3 !py-3 !w-0;
}
.multiselect__option:hover {
  @apply !bg-brand;
}
.multiselect__option:active {
  @apply !bg-brand;
}
.multiselect__option--highlight {
  @apply !bg-brand;
}
.selected-items {
  display: flex;
  flex-wrap: wrap;
}

.selected-item {
  border-radius: 3px;
  display: flex;
  align-items: center;
}

.remove-btn {
  cursor: pointer;
  margin-left: 5px;
}

.dropdown {
  list-style: none;
  padding: 0;
  margin: 0;
}
.drop_down_section {
  position: absolute;
  top: 70px;
  transform-origin: center top;
  z-index: 2003;
  padding: 12px;
  overflow: auto;
}
.dropdown li {
  padding: 10px;
  cursor: pointer;
}

.dropdown li.highlighted {
  background-color: #f0f0f0;
}
</style>
