<script setup>
import { watchEffect, ref, computed, onMounted, reactive, watch, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import "vue-slider-component/theme/antd.css";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import JobRowCard from "@/components/ui/Jobs/JobRowCard.vue";
import Arrow from "@/components/icons/paginationArrow.vue";
import Tabs from "@/components/ui/Jobs/Tabs.vue";
import { useJobsStore } from "@/stores/jobs";
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
import Label from "@/components/ui/Form/Input/Label.vue";
import { useRouter } from "vue-router";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import { useSkillsStore } from "@/stores/skills";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import filterBtnIcon from "@/components/icons/filterBtnIcon.vue"

const loading = ref(false);
const jobsStore = useJobsStore();
const { Job } = storeToRefs(jobsStore);
const router = useRouter();
const showMobFilter = ref(false)
const skillsStore = useSkillsStore();
const { states, contriesCode, skills } = storeToRefs(skillsStore);
const country = ref('Nigeria')


const Experience = [
  { name: "Beginner ", year: "(1-2 yrs)" },
  { name: "Intermediate ", year: "(3-5 yrs)" },
  { name: "Expert ", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];
const CandidateType = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];

const sortInput = reactive({
  name: "",
  jobType: "",
  Location: "",
  experienceLevel: "",
  Category: "",
  currency: "",
});
let rateMin = ref();
let rateMax = ref();
let range = ref([rateMin.value, rateMax.value]);

const updateRange = (value) => {
  rateMin.value = value[0];
  rateMax.value = value[1];
};
import { useTabStore } from "@/stores/tab";
let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});

const profileStore = useUserProfile();

const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);

const isOnBoarded = computed(() => profileStore.user);

onMounted(async () => {
  try {
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
  }
});

// Create a computed property to synchronize the range with rateMin and rateMax
const computedRange = computed(() => {
  return [rateMin.value, rateMax.value];
});

// Watch for changes in the computedRange and update the range
watch(computedRange, (newRange) => {
  range.value = newRange;
});

// Watch for changes in the range and update start and end
watch(range, (newRange) => {
  updateRange(newRange);
});

const currentPage = ref(1);

const pagination = computed(() => Job.value?.pagination || {});


const totalPages = computed(() => Math.ceil(pagination.value.last_page));

// Function to change the current page
const setPage = (page) => {
  if (page >= 1 && page <= (pagination.value.last_page || 1)) {
    currentPage.value = page;
  }
};

const displayedPageNumbers = computed(() => {
  const maxDisplayedPages = 5;
  const startPage = Math.max(currentPage.value - Math.floor(maxDisplayedPages / 2), 1);
  const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages.value);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
});

const filteredJobs = computed(() => {
  let filtered = Job.value?.data; // Create a shallow copy of the jobs array

  // Filtering based on the search criteria
  if (sortInput.name) {
    filtered = filtered?.filter((item) =>
      item.job_title.toLowerCase().includes(sortInput.name.toLowerCase())
    );
  }
  if (sortInput.jobType && typeof sortInput.jobType === 'string' && sortInput.jobType !== "Job Type") {
    filtered = filtered?.filter((item) => {
      const itemJobType = item.job_type.toLowerCase().trim();
      const inputJobType = sortInput.jobType.toLowerCase().trim();
      
      if(itemJobType.includes(inputJobType)) {
        return item;
      }
    });
  }

  if (sortInput.Location && sortInput.Location !== "Select State") {
    filtered = filtered?.filter((item) => {
      const itemLocation = item.state.toLowerCase().trim();
      const inputLocation = sortInput.Location.toLowerCase().trim();
      
      if(itemLocation.includes(inputLocation)) {
        return item;
      }
    });
  }

  if (sortInput.experienceLevel && typeof sortInput.experienceLevel === 'string' && sortInput.experienceLevel !== "Experience") {
    filtered = filtered?.filter((item) => {
      const itemExperience = item.experience.toLowerCase().trim();
      const inputExperience = sortInput.experienceLevel.toLowerCase().trim();
      
      if(itemExperience.includes(inputExperience)) {
        return item;
      }
    });
  }

  if (sortInput.Category && sortInput.Category !== "Search Skill Categories") {
    filtered = filtered.filter((item) =>
      item.skills.some((skill) =>
        skill.name.toLowerCase().includes(sortInput.Category.toLowerCase())
      )
    );
  }
  if (sortInput.currency) {
    filtered = filtered.filter((item) =>
      item.currency.toLowerCase().includes(sortInput.currency.toLowerCase())
    );
  }

  // Filtering by Rate within the specified range
  if (rateMin.value || rateMax.value) {
    filtered = filtered.filter((item) => {
      const salaryMin = parseFloat(item.salary_min);
      const salaryMax = parseFloat(item.salary_max);
      const min =
        rateMin.value !== null ? parseFloat(rateMin.value) : Number.MIN_SAFE_INTEGER;
      const max =
        rateMax.value !== null ? parseFloat(rateMax.value) : Number.MAX_SAFE_INTEGER;

      return salaryMax >= min && salaryMin <= max;
    });
  }
  return filtered;
});

const handleScreenResize = (event) => {
  if (event.matches) {
    sortInput.experienceLevel = "Experience";
    sortInput.jobType = "Job Type";
    sortInput.Location = "Select State"
    sortInput.Category = "Search Skill Categories"
  } else {
    sortInput.experienceLevel = "";
    sortInput.jobType = "";
    sortInput.Category = "";
    sortInput.Location = "";
  }
};

const resetFilters = () => {
  sortInput.name = "";
  sortInput.jobType = "";
  sortInput.Location = "";
  sortInput.experienceLevel = "";
  sortInput.Category = "";
  rateMin.value = "";
  rateMax.value = "";
};
// You can also watch the currentPage to react to page changes
watch(currentPage, async (newPage) => {
  await jobsStore.allJobs(newPage)
});


const showFilter = ()=>{
  showMobFilter.value = !showMobFilter.value

  if (showMobFilter.value) {
    sortInput.experienceLevel = "Experience";
    sortInput.jobType = "Job Type";
  } else {
    sortInput.experienceLevel = "";
    sortInput.candidateType = "";
  }
}

const toggleFilter = ()=>{
  showMobFilter.value = false
}

const isFilter = computed(()=>{
  return sortInput.name.length > 0 || sortInput.Location !== "Select State" || sortInput.experienceLevel !== "Experience" || sortInput.jobType !== "Job Type" || sortInput.Category !== "Search Skill Categories"
})

const getCountryCode = async ()=>{
  let payload = country.value
  await skillsStore.handleGetStates(payload)
}

onMounted(async () => {
  loading.value = true;
  try {
    await jobsStore.allJobs(1);
    loading.value = false;
  } catch (error) {
    console.error;
    loading.value = false;
  }
});
// Watch for changes in the route query parameters
watchEffect(() => {
  const searchQuery = router.currentRoute.value.query.search;
  if (searchQuery) {
    // Set the search query in your component's data
    sortInput.name = searchQuery;
  }
});

onMounted(async () => {
  const mediaQuery = window.matchMedia('(max-width: 1024px)');
  mediaQuery.addEventListener('change', handleScreenResize);

  handleScreenResize(mediaQuery);

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleScreenResize);
  });

  let payload = "NG"
  await skillsStore.handleGetStates(payload);
  await skillsStore.getCountriesCode()
  await skillsStore.getskills();
  return accountType;
});

</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <Tabs>
        <template #tab1> All jobs </template>
        <template #view1>
          <div
            class="bg-[#F3F5CD] rounded-[14.957px] flex flex-col gap-8 p-8 lg:px-12 border-[0.491px] border-[#97A6A8] eventBreak:hidden"
          >
            <div class="flex lg:flex-row flex-col gap-8">
              <FormGroup
                v-model="sortInput.name"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Name or Keyword"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                v-model="sortInput.Category"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Skill"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                v-model="sortInput.Location"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Location"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
            </div>
            <div class="flex lg:flex-row flex-col gap-8">
              <div class="flex flex-col w-full text-left">
                <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Job Type</Label>
                <div
                  class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                >
                  <a-select
                    placeholder="Job Type"
                    :bordered="false"
                    :show-arrow="false"
                    class="w-full !outline-none !px-0"
                    show-search
                    v-model:value="sortInput.jobType"
                  >
                    <a-select-option disabled>Job Type</a-select-option>
                    <a-select-option
                      v-for="item in CandidateType"
                      :key="item"
                      :value="item"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </div>
              </div>

              <!-- <FormGroup
                v-model="sortInput.jobType"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Job Type"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup> -->
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
                    v-model:value="sortInput.experienceLevel"
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

              <!-- <FormGroup
                v-model="sortInput.experienceLevel"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Experience Level"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup> -->
              <div class="w-full flex flex-row gap-1">
                <div class="flex flex-col justify-center">
                  <Label class="font-Satoshi500 text-[15.606px]">Rate</Label>
                  <div class="flex items-center justify-center gap-1 mt-2">
                    <input
                      class="w-full font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                      type="number"
                      v-model="rateMin"
                      id="start"
                    />
                    <div class="h-[2px] w-4 bg-black"></div>
                    <input
                      class="w-full font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                      type="number"
                      v-model="rateMax"
                      id="end"
                    />
                    <!-- <div class="w-full">
                      <SelectGroup
                        labelClasses="font-Satoshi500 hidden text-[15.606px]"
                        name="Name"
                        placeholder="currency"
                        type="text"
                        :items="['USD', 'NGN']"
                        inputClasses="w-full mt-0 font-light font-Satoshi400 bg-white !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                      />
                    </div> -->
                  </div>
                </div>
                <div class="flex flex-col w-[30%] text-left">
                  <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Currency</Label>
                  <div
                    class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                  >
                    <a-select
                      placeholder=" currency"
                      :bordered="false"
                      :show-arrow="false"
                      class="w-full !outline-none !px-0"
                      show-search
                      v-model:value="sortInput.currency"
                    >
                      <a-select-option
                        v-for="item in ['USD', 'NGN']"
                        :key="item"
                        :value="item"
                      >
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>

                <div>
                  <!-- <vue-slider
                    v-model="range"
                    :tooltip="'none'"
                    :enable-cross="false"
                  ></vue-slider> -->
                </div>
              </div>
            </div>

            <div class="flex gap-12">
              <button
                @click="resetFilters"
                class="border-[#007582] bg-[#31795A] text-white lg:w-[40%] text-center mx-auto border-2 p-4 py-2 justify-center rounded-full font-Satoshi500 text-[10.672px] items-center flex btn-hover-2"
              >
                Reset
              </button>
            </div>
          </div>
          <div>
            <button 
            @click="showFilter"
            class="items-center gap-[0.71rem] bg-[#31795A] text-[#fff] px-8 py-4 rounded-[2.4375rem] w-[9rem] btn-hover-2 hidden eventBreak:flex mob:py-4 mb-4">
              <filterBtnIcon />
              <span class="text-[1.13638rem] mob:text-[1rem] font-Satoshi500 leading-[ 2.55681rem]">Filter</span>
            </button>
          </div>
          <!-- <div class="mt-14 flex flex-col gap-8">
            <JobRowCard
              class="min-w-[95%] lg:min-w-[45%]"
              v-for="item in Job.data"
              :key="item"
              :job="item"
            />
          </div> -->
          <ShortLoader v-if="loading" />
          <div v-else class="mt-14 flex flex-col gap-8 eventBreak:mt-0">
            <JobRowCard
              class="min-w-[95%] lg:min-w-[45%]"
              v-for="item in filteredJobs"
              :key="item"
              :job="item"
            />
          </div>
          <div class="mt-12 flex w-[60%] flex-row justify-center mx-auto">
            <button
              @click="setPage(currentPage - 1)"
              class="border-[#007582] border-l-2 border-r-2 border-y-2 p-4 py-2 rounded-l-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
            >
              <Arrow class="rotate-[180deg]"/>
            </button>
            <button
              v-for="pageNumber in displayedPageNumbers"
              :key="pageNumber"
              :class="[
                'border-[#007582] p-4 py-2 font-Satoshi500 text-[22.621px] items-center flex border-y-2 border-r-2',
                pageNumber === currentPage ? 'bg-[#007582] text-white' : '',
              ]"
              @click="setPage(pageNumber)"
            >
              {{ pageNumber }}
            </button>
            <button
              @click="setPage(currentPage + 1)"
              class="border-[#007582] border-r-2 border-y-2 p-4 py-2 rounded-r-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
            >
              <Arrow />
            </button>
          </div>
          <!-- <div class="mt-12 flex w-[60%] flex-row justify-center mx-auto">
            <button
              v-for="pageNumber in displayedPageNumbers"
              :key="pageNumber"
              :class="[
                'border-[#007582] p-4 py-2 font-Satoshi500 text-[22.621px] items-center flex',
                pageNumber === 1
                  ? 'border-t-2 border-b-2 border-l-2 rounded-l-[6.032px]'
                  : 'border-y-2 border-r-2',
                pageNumber === currentPage ? 'bg-[#007582] text-white' : '',
              ]"
              @click="setPage(pageNumber)"
            >
              {{ pageNumber }}
            </button>
            <button
              @click="setPage(currentPage + 5)"
              class="border-[#007582] border-r-2 border-y-2 p-4 py-2 rounded-r-[6.032px] font-Satoshi500 text-[22.621px] items-center flex"
            >
              <Arrow />
            </button>
          </div> -->
          <div class="mobile_filter fixed bottom-0 left-0 w-full overflow-y-auto hidden eventBreak:block transitionItem"
          :class="showMobFilter? 'h-[70vh]': 'h-0'"
          >
            <section class="pb-[5.83rem] pt-[2rem] px-[1.94rem] bg-[#E9FAFB] rounded-t-[1.42044rem] msgTab:px-[1rem]">
              <div class="mb-[3rem] flex justify-end">
                <button class="border-gray-300 border p-[0.5rem] font-Satoshi700 cursor-pointer bg-[#fff] hover:scale-105 transitionItem px-4" @click="toggleFilter">X</button>
              </div>
              <div class="w-[80%] mx-auto flex flex-col gap-[2.1rem] msgTab:w-[90%]">
                  <FormGroup
                      v-model="sortInput.name"
                      labelClasses="font-Satoshi500 text-[1.52rem]"
                      label=""
                      name="Name"
                      placeholder="Search by keywords"
                      type="text"
                      inputClasses="w-full mt-2 font-light font-Satoshi400 !p-4 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-t-[6.828px] text-[0.88rem]"
                      >
                  </FormGroup>
                  <div>
                    <label for="location" class="font-Satoshi500 !text-[1rem]">Skills Categories</label>
                    <div
                      class="bg-[#fff] w-full mt-[0.5rem] font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]"
                    >
                      <select
                        v-model="sortInput.Category"
                        :bordered="false"
                        :show-arrow="false"
                        class="w-full !outline-none !px-0 cursor-pointer text-[#000000] font-Satoshi500 leading-[1.75rem]"
                        show-search
                      >
      
                        <option disabled value="Search Skill Categories" class="text-[1rem] font-Satoshi500">Search Skill Categories</option>
                        <option v-for="skill in skills?.data" :key="skill.id" :value="skill.name" class="text-[0.88rem]">
                          {{ skill.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label for="location" class="font-Satoshi500 !text-[1rem]">Location</label>
                    <div
                      class="bg-[#fff] w-full mt-[0.5rem] font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]"
                    >
                      <select
                        v-model="country"
                        :bordered="false"
                        :show-arrow="false"
                        class="w-full !outline-none !px-0 cursor-pointer text-[#000000] font-Satoshi500 leading-[1.75rem]"
                        show-search
                        @change="getCountryCode"
                      >
                        <option disabled value="Nigeria" class="text-[1rem] font-Satoshi500">Nigeria</option>
                        <option v-for="country in contriesCode?.data" :key="country.id" :value="country.iso2" 
                        class="text-[0.88rem]"
                        >
                          {{ country.name }}
                        </option>
                      </select>
                    </div>
                    <div
                      class="bg-[#fff] w-full mt-[0.5rem] font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]"
                    >
                      <select
                        v-model="sortInput.Location"
                        :bordered="false"
                        :show-arrow="false"
                        class="w-full !outline-none !px-0 cursor-pointer text-[#000000] font-Satoshi500 leading-[1.75rem]"
                        show-search
                      >
                        <option disabled value="Select State" class="text-[1rem] font-Satoshi500">Select State</option>
                        <option v-for="state in states?.data" :key="state.id" :value="state.name" class="text-[0.88rem]">
                          {{ state.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div
                  class="w-full font-Satoshi500 !p-0 !text-[1.13638rem] leading-[2.55681rem] text-[#000] !bg-transparent !pb-6 !border-b-2 border-[#666666]"
                  >
                      <select
                          v-model="sortInput.experienceLevel"
                          placeholder="Experience"
                          :bordered="false"
                          :show-arrow="false"
                          class="w-full !outline-none !px-0 cursor-pointer !text-[#000000] font-Satoshi500 text-[1rem] leading-[1.75rem] !bg-transparent"
                          show-search
                          
                      >
                          <option disabled value="Experience">Experience</option>
                          <option v-for="item in Experience" :key="item.name" :value="item.name">
                          {{ item.name }} ({{ item.year }})
                          </option>
                      </select>
                  </div>
                  <div
                  class="w-full font-Satoshi500 !p-0 !text-[1.13638rem] leading-[2.55681rem] text-[#000] !bg-transparent !pb-6 !border-b-2 border-[#666666]"
                  >
                      <select
                          v-model="sortInput.jobType"
                          placeholder="Employment Type"
                          :bordered="false"
                          :show-arrow="false"
                          class="w-full !outline-none !px-0 cursor-pointer !text-[#000000] font-Satoshi500 text-[1rem] leading-[1.75rem] !bg-transparent"
                          show-search
                          
                      >
                          <option disabled value="Job Type">Job Type</option>
                          <option v-for="item in CandidateType" :key="item" :value="item">
                          {{ item }}
                          </option>
                      </select>
                  </div>

                  <button
                    @click="toggleFilter"
                      class="bg-[#31795A] text-white w-full text-center mx-auto p-4 py-4 justify-center rounded-full font-Satoshi500 text-[12.103px] items-center flex mt-[0.5rem]"
                      :class="
                        !isFilter
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-[#31795A] btn-hover-2'
                      "
                    >
                      Apply Filter
                    </button>
                </div>
            </section>
          </div>
        </template>
      </Tabs>
    </div>
  </DashboardLayout>
</template>
<style>
.vue-slider-process {
  @apply !bg-[#007582];
}
.vue-slider-dot-handle {
  @apply !border-[#007582];
}
.vue-slider-rail {
  @apply !bg-[#43D0DF];
}
</style>
