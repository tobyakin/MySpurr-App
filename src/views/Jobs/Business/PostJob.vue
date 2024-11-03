<script setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import "vue-slider-component/theme/antd.css";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
import Label from "@/components/ui/Form/Input/Label.vue";
import CirclePlus from "@/components/icons/circlePlus.vue";
import ReviewJob from "@/components/ui/Jobs/ReviewJob.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { useJobsStore } from "@/stores/jobs";
import { useSkillsStore } from "@/stores/skills";
import { useUserProfile } from "@/stores/profile";
import { useTabStore } from "@/stores/tab";
import { useRouter } from "vue-router";
import { editorConfig } from "@/config/ckeditorConfig";
import { ClassicEditor } from 'ckeditor5'

const isLayoutReady = ref(false)
const editor = ClassicEditor

const dynamicPlaceholder = ref('Write about the job in details...');

const editorConfigs = computed(() => ({
  ...editorConfig,
  placeholder: dynamicPlaceholder.value,
}));

const router = useRouter();

let store = useStore();

const accountType = computed(() => {
  return store.getUser.data.user.type;
});

onMounted(() => {
  return accountType;
});

const profileStore = useUserProfile();

const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);

const isOnBoarded = computed(() => profileStore.user);
const loading = ref(false)

onMounted(() => {
  return accountType;
});
onMounted(async () => {
  try {
    loading.value = true
    await profileStore.userProfile();
    if (
      isOnBoarded.value &&
      !isOnBoarded.value.business_details &&
      !isOnBoarded.value.work_details
    ) {
      if (accountType.value === "talent") {
        router.push({ name: "talent-onboarding" });
      } else if (accountType.value === "business") {
        router.push({ name: "business-onboarding" });
      }
    }
  } catch (error) {
    /* empty */
  } finally {
    isLoading.value = !isLoading.value;
    loading.value = false
  }

  isLayoutReady.value = true
});

let profile = useUserProfile();

const skillsStore = useSkillsStore();
const { contriesCode, states, industries } = storeToRefs(skillsStore);

const jobsStore = useJobsStore();
const { postJobsValue, ciso, siso } = storeToRefs(jobsStore);

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

const Experience = [
  { name: "Intern ", year: "(3 - 6 months)" },
  { name: "Beginner ", year: "(1-2 yrs)" },
  { name: "Intermediate ", year: "(3-5 yrs)" },
  { name: "Expert ", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];

const getSuccessStatusFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const successParam = urlParams.get("success");
  return successParam === "true"; // Convert the value to a boolean
};

const state = reactive({
  status: getSuccessStatusFromURL(),
});

const step = ref([true, false]);
const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};

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
  if (index >= 0 && index < postJobsValue.value.questions.length) {
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

function formatNumber(value) {
  if (value === '') return '';
  return new Intl.NumberFormat().format(value);
}

const handleInput = (e)=>{
  let value = e.target.value;
  value = value.replace(/[^0-9]/g, '');
  // value = formatNumber(value)
}


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
let isLoadingState = ref(false);
// watchers to update the selectedIso2 and selectedsiso
watch(selectedIso2, async (newInput) => {
  siso.value = "";
  isLoadingState.value = true;
  try {
    await skillsStore.handleGetStates(newInput);
    isLoadingState.value = false;
  } catch (error) {
    console.log(error);
    isLoadingState.value = false;
  }
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
onMounted(async () => {
  await skillsStore.getskills();
  await skillsStore.getJobTitles();
  await skillsStore.getCountriesCode();
  await profile.userProfile();
});
function handleChangeScreen() {
  changeScreen(0, 1);
}
onMounted(() => {
  if (state.status === true) {
    handleChangeScreen();
  }
});

</script>

<template>
  <DashboardLayout>
    <ShortLoader v-if="loading" />
    <div class="container lg:py-20 py-4 mb-20" v-else>
      <div v-if="step[0]" class="">
        <div class="flex flex-col gap-[21px] mb-[53px]">
          <h3
            class="lg:text-[2.83rem] text-[1.88rem] text-[#000000] lg:leading-[3rem] font-Satoshi400"
          >
            Hire with MySpurr. Share your job post with thousands of creative talents
          </h3>
          <!-- <div
            v-if="!hasSubscriptedToPostJob"
            class="bg-[#EDF0B8] py-[19px] px-[30px] lg:px-[80px] flex items-center rounded-[10px]"
          >
            <ul class="list-disc flex flex-col gap-[8px] !mb-0">
              <li>Post your first job for free</li>
              <li>Post subsequent jobs for just $5/Job</li>
              <li>GoPro for unlimited usage</li>
            </ul>
          </div>
          <div v-if="hasSubscriptedToPostJob" class="w-full flex justify-start">
            <div
              class="bg-[#993939] py-[19px] px-[10px] lg:px-[20px] flex items-center rounded-[10px]"
            >
              <p class="text-[#E6F1F3] text-[19.94px] font-Satoshi500">
                You will be charged ₦ 5,000.00 for this job post
              </p>
            </div>
          </div> -->
        </div>
        <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[20px]">
          Job Details
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
                  {{ state.name }} </a-select-option
                ><a-select-option v-if="isLoadingState" disabled
                  >Loading...</a-select-option
                >
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
                <a-select-option disabled>select Job Type</a-select-option>
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
                    {
                      label: 'Onsite',
                      value: 'onsite',
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

            <!-- <SelectGroup
              v-model="postJobsValue.country_id"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Country*"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Job Category"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup>
            <SelectGroup
              v-model="postJobsValue.state_id"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="State*"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Job Category"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
            <!-- <SelectGroup
              v-model="postJobsValue.job_type"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Job Type"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="Job Type*"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
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
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 invisible !text-[17.792px] mb-2.5"></Label>
              <a-select
                placeholder=""
                :show-arrow="true"
                :bordered="true"
                class="w-full !outline-none !px-1"
                show-search
                v-model:value="postJobsValue.salaray_type"
              >
                <a-select-option
                  v-for="item in ['Monthly', 'Yearly', 'Hourly']"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>

            <!-- <SelectGroup
              v-model="postJobsValue.salaray_type"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label=""
              name="Name"
              :items="['Monthly', 'Yearly', 'Hourly']"
              placeholder="Job Category"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
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
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2.5 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
              @input="handleInput"
            ></FormGroup>
            <!-- <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 invisible !text-[17.792px] mb-2"></Label>
              <a-select
                placeholder="state or city"
                :show-arrow="false"
                :bordered="true"
                class="w-full !outline-none !px-0"
                show-search
                v-model:value="postJobsValue.currency"
              >
                <a-select-option disabled>Currency</a-select-option>
                <a-select-option v-for="item in ['USD', 'NGN']" :key="item" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
 -->
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
              <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Experience</Label>
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
                  <a-select-option disabled>Experience Level</a-select-option>
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
              <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Qualification</Label>
              <div
                class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              >
                <a-select
                  placeholder="Qualification Level"
                  :bordered="false"
                  :show-arrow="false"
                  class="w-full !outline-none !px-0"
                  show-search
                  v-model:value="postJobsValue.qualification"
                >
                  <a-select-option disabled>Qualification Level</a-select-option>
                  <a-select-option
                    v-for="item in ['Certificate', 'Bachelors', 'Masters ', 'Doctorate ']"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            
          </div>
          <div class="flex-row hidden w-full gap-8">
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[17.792px] mb-2">Industry*</Label>
              <a-select
                placeholder="state or city"
                :show-arrow="false"
                :bordered="true"
                class="w-full !outline-none !px-0"
                show-search
              >
                <a-select-option v-for="i in industries" :key="i" :value="i">
                  {{ i.name }}
                </a-select-option>
              </a-select>
            </div>
            <div class="flex flex-col w-full text-left">
              <Label class="font-Satoshi500 !text-[17.792px] mb-2">Career Level*</Label>
              <a-select
                placeholder="Career Level"
                :show-arrow="false"
                :bordered="true"
                class="w-full !outline-none !px-0"
                show-search
              >
                <a-select-option
                  v-for="i in [
                    'Beginner ',
                    'Intermediate ',
                    'Expert ',
                    'More than 10yrs',
                  ]"
                  :key="i"
                  :value="i"
                >
                  {{ i }}
                </a-select-option>
              </a-select>
            </div>

            <!-- <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Industry*"
              name="Name"
              :items="industries"
              placeholder="Industry"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
            <!-- <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Career Level*"
              name="Name"
              :items="['Beginner ', 'Intermediate ', 'Expert ', 'More than 10yrs']"
              placeholder="Career Level"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup> -->
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
            ></FormGroup>
            <button class="w-[26px] h-[26px] grid place-items-center" @click="removeQuestion(index)">
              <DeleteIcon class="!text-brand"/>
            </button>
          </div>
        </div>

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
