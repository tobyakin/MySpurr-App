<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import "vue-slider-component/theme/antd.css";
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useJobsStore } from "@/stores/jobs";
import { useSkillsStore } from "@/stores/skills";
const skillsStore = useSkillsStore();
const { contriesCode, states } = storeToRefs(skillsStore);
import { useRoute } from "vue-router";
const jobsStore = useJobsStore();
const { postJobsValue, JobDetailsById, ciso, siso } = storeToRefs(jobsStore);
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
import Label from "@/components/ui/Form/Input/Label.vue";
import CirclePlus from "@/components/icons/circlePlus.vue";
import ReviewJob from "@/components/ui/Jobs/ReviewEditJob.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { editorConfig } from "@/config/ckeditorConfig";
import { ClassicEditor } from 'ckeditor5'

const isLayoutReady = ref(false)
const editor = ClassicEditor

const dynamicPlaceholder = ref('Write about the job in details...');

const editorConfigs = computed(() => ({
  ...editorConfig,
  placeholder: dynamicPlaceholder.value,
}));

const route = useRoute();
const loading = ref(false);
let options = ref([
  { name: "Design" },
  { name: "UI" },
  { name: "Digital" },
  { name: "Graphics" },
  { name: "Developer" },
  { name: "Product" },
  { name: "Microsoft" },
  { name: "Brand" },
  { name: "Photoshop" },
  { name: "Business" },
  { name: "IT & Technology" },
  { name: "Branding" },
  { name: "Finance" },
]);
const step = ref([true, false]);
const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};
const Experience = [
  { name: "Beginner ", year: "(1-2 yrs)" },
  { name: "Intermediate ", year: "(3-5 yrs)" },
  { name: "Expert ", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];

const qualification = ["Certificate", "Bachelors", "Masters ", "Doctorate "];

const search = ref("");
const showDropdown = ref(false);
const highlightedIndex = ref(-1);

postJobsValue.value.questions = []; 

const addQuestion = () => {
  const lastQuestion =
    postJobsValue.value.questions[postJobsValue.value.questions.length - 1]?.question;
  if (!lastQuestion || lastQuestion.trim() !== "") {
    postJobsValue.value.questions.push({ question: "" });
  }
};

const removeQuestion = (index) => {
  // Ensure the index is valid (i.e., within bounds)
  if (index >= 0 && index < postJobsValue.value.questions.length) {
    // Remove the question at the specified index
    postJobsValue.value.questions.splice(index, 1);
  }
};

const filteredOptions = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return options.value.filter((option) => option.name.toLowerCase().includes(searchTerm));
});

const filterOptions = () => {
  showDropdown.value = true;
  highlightedIndex.value = -1;
};
const placeholderText = computed(() => {
  return postJobsValue.value.skills.length >= 5 ? "" : "Add skills";
});
// const shouldDisplayInput = computed(() => {
//   return postJobsValue.value.skills.length < 5;
// });

const selectOption = (option) => {
  if (postJobsValue.value.skills.length < 5) {
    search.value = "";
    showDropdown.value = false;
    highlightedIndex.value = -1;
    postJobsValue.value.skills.push(option);
  }
};

const removeSelectedItem = (index) => {
  postJobsValue.value.skills.splice(index, 1);
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
watch(selectedCountry, async (newInput) => {
  postJobsValue.value.country_id = newInput;
});
watch(selectedState, async (newInput) => {
  postJobsValue.value.state_id = newInput;
});
const prefillDetails = (SingleObject) => {
  postJobsValue.value.job_title = SingleObject.job_title || "";
  postJobsValue.value.job_type = SingleObject.job_type || "";
  postJobsValue.value.description = SingleObject.description || "";
  postJobsValue.value.responsibilities = SingleObject.responsibilities || "";
  postJobsValue.value.required_skills = SingleObject.required_skills || "";
  postJobsValue.value.benefits = SingleObject.benefits || "";
  postJobsValue.value.salaray_type = SingleObject.salaray_type || null;
  postJobsValue.value.salary_min = SingleObject.salary_min || "";
  postJobsValue.value.salary_max = SingleObject.salary_max || "";
  postJobsValue.value.skills = SingleObject.skills || "";
  postJobsValue.value.experience = SingleObject.experience || "";
  postJobsValue.value.qualification = SingleObject.qualification || "";
  postJobsValue.value.questions = SingleObject.questions || "";
  postJobsValue.value.currency = SingleObject.currency || "";
  selectedCountry.value = SingleObject.country || "";
  selectedState.value = SingleObject.state || "";
};
watch(JobDetailsById, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

onMounted(async () => {
  loading.value = true;
  try {
    await skillsStore.getskills();
    await skillsStore.getJobTitles();
    await skillsStore.getCountriesCode();
    await jobsStore.handleGetJobDetailsById(route.params.id);
    prefillDetails(JobDetailsById?.value?.data);
    loading.value = false;
  } catch (error) {
    console.error;
    loading.value = false;
  }

  isLayoutReady.value = true
});
</script>

<template>
  <DashboardLayout>
    <ShortLoader v-if="loading" />

    <div v-else class="container lg:py-20 py-4 mb-20">
      <div v-if="step[0]" class="">
        <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[20px]">
          Edit Job Details
        </h4>
        <div class="mt-8 flex flex-col gap-8">
          <FormGroup
            v-model="postJobsValue.job_title"
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Job Title*"
            name="Name"
            placeholder="Ex: Product Designer"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></FormGroup>
          <div class="flex flex-row w-full gap-8">
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[17.792px] mb-2">Country*</Label>

              <a-select
                placeholder="country or region"
                :bordered="true"
                :show-arrow="false"
                class="w-full !outline-none !px-0"
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

            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[17.792px] mb-2">State*</Label>
              <a-select
                placeholder="state or city"
                :show-arrow="false"
                :bordered="true"
                class="w-full !outline-none !px-0"
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
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[17.792px] mb-2">Job Type*</Label>
              <a-select
                placeholder="Job Type"
                :show-arrow="false"
                :bordered="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="postJobsValue.job_type"
              >
                <a-select-option
                  v-for="item in [
                    { label: 'remote', value: 'remote' },
                    { label: 'internship', value: 'internship' },
                    { label: 'contract', value: 'contract' },
                    { label: 'Part Time', value: 'part-time' },
                    {
                      label: 'Full Time',
                      value: 'full-time',
                    },
                  ]"
                  :key="item.value"
                  :value="item.value"
                  class="capitalize"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </div>

          </div>
          <div class="flex flex-col">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Job Description*</Label>
            <ckeditor
              v-if="isLayoutReady"
              v-model="postJobsValue.description"
              :editor="editor"
              :config="editorConfigs"
            />
          </div>
          <div class="flex flex-col">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Responsibilities*</Label>

            <ckeditor
              v-if="isLayoutReady"
              v-model="postJobsValue.responsibilities"
              :editor="editor"
              :config="editorConfigs"
            />
          </div>
          <div class="flex flex-col">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Required Skills**</Label>

            <ckeditor
              v-if="isLayoutReady"
              v-model="postJobsValue.required_skills"
              :editor="editor"
              :config="editorConfigs"
            />
          </div>
          <div class="flex flex-col">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2"
              >Benefits (If any)*</Label
            >

            <ckeditor
              v-if="isLayoutReady"
              v-model="postJobsValue.benefits"
              :editor="editor"
              :config="editorConfigs"
            />
          </div>
        </div>

        <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
          Salary
        </h4>
        <div class="flex flex-row w-full gap-3">
          <div class="lg:w-[45%]">
            <SelectGroup
              v-model="postJobsValue.salaray_type"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label=""
              name="Name"
              :items="['Monthly', 'Yearly', 'Hourly']"
              placeholder="Job Category"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup>
          </div>
          <div class="lg:w-[55%] flex flex-row gap-3">
            <FormGroup
              v-model="postJobsValue.salary_min"
              labelClasses=" invisible"
              label=""
              name="Min"
              placeholder="Min"
              type="number"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2.5 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
            <FormGroup
              v-model="postJobsValue.salary_max"
              labelClasses=" invisible"
              label=" "
              name="Max"
              placeholder="Max"
              type="number"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2.5 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
            <SelectGroup
              v-model="postJobsValue.currency"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label=""
              name="Name"
              :items="['USD', 'NGN']"
              placeholder="Currency"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup>
          </div>
        </div>

        <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
          Skills & Experience
        </h4>
        <div class="mt-8 flex flex-col gap-8">
          <div class="mt-8 flex flex-col">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Skills*</Label>

            <div
              class="border-[#EDEDED] border-[0.8px] bg-white rounded-[9.489px] text-[12.68px] p-4 py-1.5"
            >
              <div>
                <div v-if="postJobsValue?.skills.length" class="selected-items p-2 gap-2">
                  <div
                    v-for="(selectedItem, index) in postJobsValue.skills"
                    :key="selectedItem.id"
                    class="selected-item bg-[#31795A1A] text-sm font-Satoshi400 gap-2 px-4 p-[5px] text-[#0000008A] !rounded-full"
                  >
                    {{ selectedItem.name }}
                    <span
                      @click="removeSelectedItem(index)"
                      class="remove-btn text-black hover:text-red-500"
                      >x</span
                    >
                  </div>
                </div>
                <div>
                  <GlobalInput
                    v-model="search"
                    @input="filterOptions"
                    @keydown.down="highlightNext"
                    @keydown.up="highlightPrevious"
                    @keydown.enter="selectHighlightedOption"
                    ref="searchInput"
                    inputClasses="bg-transparent opacity-[0.8029] bg-white !border-none"
                    :placeholder="placeholderText"
                    type="text"
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
          </div>

          <!-- <FormGroup
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Skills*"
            name="Name"
            placeholder="Add Skills"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></FormGroup> -->
          <div class="flex flex-row w-full gap-8">
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[15.606px] !mb-2"
                >Experience Level</Label
              >
              <div
                class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              >
                <a-select
                  placeholder="Experience Level"
                  :bordered="false"
                  :show-arrow="false"
                  class="w-full !outline-none !px-0"
                  show-search
                  v-model:value="postJobsValue.experience"
                >
                  <a-select-option disabled>select Experience</a-select-option>
                  <a-select-option
                    v-for="item in Experience"
                    :key="item"
                    :value="item.name"
                  >
                    {{ item.name }} {{ item.year }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Qualification*</Label>
              <div
                class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              >
                <a-select
                  placeholder="Qualification"
                  :bordered="false"
                  :show-arrow="false"
                  class="w-full !outline-none !px-0"
                  show-search
                  v-model:value="postJobsValue.qualification"
                >
                  <a-select-option disabled>select Qualification</a-select-option>
                  <a-select-option
                    v-for="item in qualification"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </div>
            </div>

            <!-- <SelectGroup
              v-model="postJobsValue.experience"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Experience*"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Experience"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
            <!-- <SelectGroup
              v-model="postJobsValue.qualification"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Qualification*"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Qualification"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
          </div>
          <div class="flex flex-row hidden w-full gap-8">
            <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Industry*"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Industry"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup>
            <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Career Level*"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Career Level"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup>
          </div>
        </div>
        <div class="flex flex-row justify-between items-center mt-[64.05px]">
          <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px]">
            Relevant Client Questions
          </h4>

          <button @click="addQuestion"><CirclePlus /></button>
        </div>

        <div v-if="postJobsValue.questions.length > 0">
          <div
            v-for="(question, index) in postJobsValue.questions"
            :key="index"
            class="mt-8 flex items-center gap-8"
          >
            <FormGroup
              labelClasses="font-Satoshi500 !text-[17.792px]"
              :label="`Question ${index + 1}`"
              :name="`Question ${index + 1}`"
              :placeholder="`Add Question ${index + 1}`"
              v-model="postJobsValue.questions[index].question"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
              >
            </FormGroup>
            <button class="w-[26px] h-[26px] grid place-items-center" @click="removeQuestion(index)">
              <DeleteIcon class="!text-brand"/>
            </button>
          </div>
        </div>
        <!-- <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
        Address & Location
      </h4>
      <div class="mt-8 flex flex-col gap-8">
        <FormGroup
          labelClasses="font-Satoshi500 !text-[17.792px]"
          label="Address*"
          name="Name"
          placeholder="Address of Job resident"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
        ></FormGroup>
        <div class="flex flex-row w-full gap-8">
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Country*"
            name="Name"
            :items="['Nigeria', 'Uk', 'Niger']"
            placeholder="Country"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="City*"
            name="Name"
            :items="['', '', '']"
            placeholder="City"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="State*"
            name="Name"
            :items="['Lagos', 'Abuja', 'Uyo']"
            placeholder="State"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
        </div>
      </div> -->
        <div class="flex justify-end gap-4 mt-12">
          <button
            @click="changeScreen(0, 1)"
            class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] capitalize leading-[11.593px] rounded-full px-5 p-3 w-auto text-white btn-hover-1"
          >
            review</button
          ><button
            class="bg-[#fff] font-Satoshi500 text-[14.153px] leading-[11.593px] rounded-full px-5 p-3 w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
      <ReviewJob v-if="step[1]" @back="changeScreen(1, 0)" />
      <!-- <CenteredModalLarge /> -->
    </div>
  </DashboardLayout>
</template>
<style></style>
