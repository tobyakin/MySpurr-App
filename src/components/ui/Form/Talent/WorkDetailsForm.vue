<script setup>
import { ref, onMounted, watch, computed, defineAsyncComponent, reactive } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
// import { useStore } from "@/stores/user";
import { useSkillsStore } from "@/stores/skills";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
// import Multiselect from "vue-multiselect";
const skillsStore = useSkillsStore();
const { skills, jobTitle, contriesCode, states } = storeToRefs(skillsStore);

const OnboardingStore = useOnboardingStore();
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);
// let selectedCountry = ref("");
// const selectedStates = ref("");

const {
  step,
  skill_title,
  highest_education,
  overview,
  location,
  rate,
  availability,
  top_skills,
  employment_type,
  ciso,
  siso,
} = storeToRefs(OnboardingStore);
// let store = useStore();
//
// let loading = ref(false);
const availabilityData = ["Immediately", "One week"];
const employmentType = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];
let options = ref([]);
let skillTitles = ref([]);

const educationLevel = ["Certificate", "Bachelors", "Masters ", "Doctorate "];

// const addTag = (newTagName) => {
//   const tag = {
//     name: newTagName,
//   };
//   options.value.push(tag);
//   top_skills.value.push(tag);
// };

// const years = ref([]);

// onMounted(() => {
//   // Populate the years array with a range of years, e.g., from 2000 to the current year.
//   const currentYear = new Date().getFullYear();
//   for (let year = currentYear; year >= 1950; year--) {
//     years.value.push(year.toString());
//   }
//   console.log("options", skills.value.data);
// });

const emit = defineEmits(["next"]);
const isFormValid = computed(() => {
  return (
    // skill_title.value.trim() !== "" &&
    top_skills.value.length > 0 && // Check if top_skills is not empty
    highest_education.value.trim() !== "" &&
    overview.value.trim() !== "" &&
    ciso.value.trim() !== "" &&
    siso.value.trim() !== "" &&
    rate.value.trim() !== "" &&
    employment_type.value.trim() !== "" &&
    availability.value.trim() !== ""
  );
});
// end tag ends here
const selectedCountry = ref("");
const selectedState = ref("");
// computed property to find the country ISO code
const selectedIso2 = computed(() => {
  const foundCountry = contriesCode?.value?.data?.find(
    (country) => country.name.toLowerCase() === selectedCountry.value.toLowerCase()
  );
  return foundCountry ? foundCountry.iso2 : null;
});
// computed property to find the state ISO code
const selectedsiso = computed(() => {
  const foundState = states?.value?.data?.find(
    (state) => state.name.toLowerCase() === selectedState.value.toLowerCase()
  );
  return foundState ? foundState.iso2 : null;
});
// watchers to update the selectedIso2 and selectedsiso
watch(selectedIso2, async (newInput) => {
  siso.value = "";
  states.value = null;
  await skillsStore.handleGetStates(newInput);
});
// watchers to update the selectedIso2 and selectedsiso
watch(selectedIso2, async (newInput) => {
  ciso.value = newInput;
});
//watchers to update the selectedsiso
watch(selectedsiso, async (newInput) => {
  siso.value = newInput;
});
// watch(selectedCountry, async (newInput) => {
//   postJobsValue.value.country_id = newInput;
// });
// watch(selectedState, async (newInput) => {
//   postJobsValue.value.state_id = newInput;
// });

// watch(ciso, async (newInput) => {
//   siso.value = "";
//   await skillsStore.handleGetStates(newInput);
// });
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
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Define validation rules for each field
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

  // Perform validation based on rules
  let isValid = true;
  validationRules.forEach((rule) => {
    if (rule.value) {
      errors[rule.field] = true;
      isValid = false;
    }
  });

  return isValid; // Only return false if there are validation errors
};
const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });
};

watch(
  [
    top_skills,
    skill_title,
    highest_education,
    overview,
    siso,
    ciso,
    rate,
    employment_type,
    availability,
  ],
  () => {
    clearInputErrors();
  }
);

const next = () => {
  if (!validateForm()) {
    return;
  } else {
    emit("next", step.value + 1);
  }
};
onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getJobTitles();
  await skillsStore.getCountriesCode();
  options.value = skills.value.data;
  skillTitles.value = jobTitle.value.data;
});

const showJobTitleDropdown = ref(false);
const highlightedJobTitleIndex = ref(-1);

const filteredOptionsJobTitle = computed(() => {
  const searchJobTitle = skill_title.value.toLowerCase();
  return skillTitles.value.filter((option) =>
    option.name.toLowerCase().includes(searchJobTitle)
  );
});

const filterJobTitleOptions = () => {
  showJobTitleDropdown.value = true;
  highlightedJobTitleIndex.value = -1;
};

const selectJobTitleOptions = (option) => {
  skill_title.value = option.name;
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
// multi select
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
  return top_skills.value.length >= 3 ? "" : "select your top skills Ex. Graphics Design";
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
    // If no options match the search term, add the typed item to the list
    const nextId = getNextId();

    selectOption({ id: nextId, name: search.value });
  }
};
</script>

<template>
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
              class="flex-col flex gap-6 pb-12"
            >
              <div
                :class="errors.skill_title ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Skill title</label
                >
                <div class="relative">
                  <GlobalInput
                    v-model="skill_title"
                    @input="filterJobTitleOptions"
                    @keydown.down="highlightNextJobTitle"
                    @keydown.up="highlightPreviousJobTitle"
                    @keydown.enter="selectHighlightedJobTitleOption"
                    ref="searchInput"
                    inputClasses="bg-transparent !border-none"
                    placeholder="Graphics Designer"
                    type=""
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

                <!-- <multiselect
                  v-model="skill_title"
                  :options="skillTitles"
                  placeholder="Ex. Graphics Designer"
                  @tag="addTag"
                  :searchable="true"
                  :close-on-select="false"
                  :show-labels="false"
                >
                </multiselect> -->
              </div>
              <div
                :class="errors.overview ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Overview</label>
                <textarea
                  v-model="overview"
                  rows="4"
                  class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
                  placeholder="Give a brief description about yourself"
                />
              </div>
              <div
                :class="errors.siso || errors.ciso ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] flex lg:flex-row flex-col items-center rounded-[5.897px] p-4 py-1.5 gap-3"
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
                <!-- <a-divider class="lg:hidden md:hidden" style="height: 1px; background-color: #254035ab" />
                <a-divider
                  class="lg:flex hidden"
                  style="height: 5vh; background-color: #254035ab"
                  type="vertical"
                /> -->

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
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Select your top 3 skills</label
                >
                <!-- <multiselect
                  v-model="top_skills"
                  :options="options"
                  :multiple="true"
                  :taggable="true"
                  :max="5"
                  placeholder=""
                  track-by="name"
                  label="name"
                  @tag="addTag"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :preselect-first="false"
                >
                </multiselect> -->
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
                    />

                    <!-- <input
                    v-model="search"
                    @input="filterOptions"
                    @keydown.down="highlightNext"
                    @keydown.up="highlightPrevious"
                    @keydown.enter="selectHighlightedOption"
                    ref="searchInput"
                    placeholder="Type to add or select..."
                  /> -->
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
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
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
                />
              </div>
              <div
                :class="errors.employment_type ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
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
                />
              </div>
              <div
                :class="errors.availability ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
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
                />
              </div>
              <div
                :class="errors.rate ? 'border-[#DA5252]' : 'border-[#254035AB]'"
                class="border-[0.737px] rounded-[5.897px] p-4 py-1.5"
              >
                <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                  >Rate /hr ($)</label
                >
                <GlobalInput
                  v-model="rate"
                  inputClasses="bg-transparent border-none"
                  placeholder="$100"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-5 pb-8 mt-5">
            <button
              @click="next"
              :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] leading-[11.593px] rounded-full p-5 w-full btn-hover-1"
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
