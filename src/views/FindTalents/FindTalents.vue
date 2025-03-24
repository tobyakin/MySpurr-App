<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { defineAsyncComponent, reactive, watchEffect, computed, ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Arrow from "@/components/icons/paginationArrow.vue";
import JobCard from "@/components/ui/FindTalents/JobCard.vue";
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import { useJobsStore } from "@/stores/jobs";
import { useSkillsStore } from "@/stores/skills";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import filterBtnIcon from "@/components/icons/filterBtnIcon.vue";

const Label = defineAsyncComponent(() => import("@/components/ui/Form/Input/Label.vue"));

// Stores
const jobsStore = useJobsStore();
const skillsStore = useSkillsStore();
const store = useStore();
const profileStore = useUserProfile();
const router = useRouter();

// Refs
const loading = ref(false);
const showMobFilter = ref(false);
const currentPage = ref(1);
const country = ref('Nigeria');
const { talent, states, contriesCode, skills } = storeToRefs(jobsStore);

// Filter options
const filterOptions = reactive({
  name: "",
  skills: "",
  location: "",
  expertLevel: "",
  qualification: "",
  candidateType: "",
});

// Range filter
let rateMin = ref(null);
let rateMax = ref(null);

// Data options
const CandidateType = ["Freelance", "Full-time", "Part-time", "Internship", "Contract"];
const qualification = ["Certificate", "Bachelors", "Masters", "Doctorate"];
const Experience = [
  { name: "Beginner", year: "(1-2 yrs)" },
  { name: "Intermediate", year: "(3-5 yrs)" },
  { name: "Expert", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];

// Computed properties
const accountType = computed(() => store.getUser.data.user.type);
const isOnBoarded = computed(() => profileStore.user);
const talentData = computed(() => talent.value?.data || []);
const pagination = computed(() => talent.value?.pagination || {});
const totalPages = computed(() => Math.ceil(pagination.value.last_page));
const displayedPageNumbers = computed(() => {
  const maxDisplayedPages = 5;
  const startPage = Math.max(currentPage.value - Math.floor(maxDisplayedPages / 2), 1);
  const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages.value);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const isFilter = computed(() => {
  return Object.values(filterOptions).some(val => val) || rateMin.value || rateMax.value;
});

// Methods

const setPage = (page) => {
  if (page >= 1 && page <= (pagination.value.last_page || 1)) {
    currentPage.value = page;
    scrollToTop();
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetFilters = () => {
  Object.keys(filterOptions).forEach(key => filterOptions[key] = "");
  rateMin.value = null;
  rateMax.value = null;
};

const showFilter = () => {
  showMobFilter.value = !showMobFilter.value;
};

const toggleFilter = () => {
  showMobFilter.value = false;
};

const getCountryCode = async () => {
  await skillsStore.handleGetStates(country.value);
};

const getTallents = async () => {
  return await jobsStore.allTalents(currentPage.value);
};

// Filtered talents
const filteredTalents = computed(() => {
  let filtered = talentData.value;

  if (filterOptions.name) {
    filtered = filtered?.filter(item =>
      item.first_name.toLowerCase().includes(filterOptions.name.toLowerCase())
    );
  }

  if (filterOptions.skills) {
    filtered = filtered?.filter(item =>
      item.skill_title.toLowerCase().includes(filterOptions.skills.toLowerCase())
    );
  }

  if (filterOptions.location) {
    filtered = filtered?.filter(item =>
      item.location.toLowerCase().includes(filterOptions.location.toLowerCase())
    );
  }

  if (filterOptions.candidateType) {
    filtered = filtered?.filter(item =>
      item.employment_type.toLowerCase().includes(filterOptions.candidateType.toLowerCase())
    );
  }

  if (filterOptions.expertLevel) {
    filtered = filtered.filter(item =>
      item.experience_level.toLowerCase().includes(filterOptions.expertLevel.toLowerCase())
    );
  }

  if (filterOptions.qualification) {
    filtered = filtered?.filter(item =>
      item.highest_education.toLowerCase().includes(filterOptions.qualification.toLowerCase())
    );
  }

  if (rateMin.value !== null || rateMax.value !== null) {
    filtered = filtered.filter(item => {
      const rate = parseFloat(item.rate);
      const min = rateMin.value !== null ? parseFloat(rateMin.value) : Number.MIN_SAFE_INTEGER;
      const max = rateMax.value !== null ? parseFloat(rateMax.value) : Number.MAX_SAFE_INTEGER;
      return rate >= min && rate <= max;
    });
  }

  return filtered;
});

watch(currentPage, async () => {
  loading.value = true;
  await getTallents();
  loading.value = false;
});

watchEffect(() => {
  const searchQuery = router.currentRoute.value.query.search;
  if (searchQuery) filterOptions.name = searchQuery;
});

// Lifecycle hooks
onMounted(async () => {
  loading.value = true;
  try {
    await Promise.all([
      getTallents(),
      skillsStore.handleGetStates("NG"),
      skillsStore.getCountriesCode(),
      skillsStore.getskills(),
    ]);

    if (!isOnBoarded.value?.business_details && !isOnBoarded.value?.work_details) {
      const route = accountType.value === "talent" 
        ? "talent-onboarding" 
        : "business-onboarding";
      router.push({ name: route });
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <div class="filter">
            <div class="bg-[#F3F5CD] rounded-[14.957px] flex flex-col gap-8 p-8 lg:px-12 border-[0.491px] border-[#97A6A8] eventBreak:hidden">
              <div class="flex lg:flex-row flex-col gap-8">
                <FormGroup
                  v-model="filterOptions.name"
                  labelClasses="font-Satoshi500 text-[15.606px]"
                  label="Name or Keyword"
                  name="Name"
                  placeholder="Name or keyword"
                  type="text"
                  inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                />
                <FormGroup
                  v-model="filterOptions.skills"
                  labelClasses="font-Satoshi500 text-[15.606px]"
                  label="Skills"
                  name="Skills"
                  placeholder="Graphics Design"
                  type="text"
                  inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                />
                <FormGroup
                  v-model="filterOptions.location"
                  labelClasses="font-Satoshi500 text-[15.606px]"
                  label="Location"
                  name="Location"
                  placeholder="Abuja, Nigeria"
                  type="text"
                  inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                />
              </div>
              
              <div class="flex lg:flex-row flex-col gap-8">
                <div class="flex flex-col w-full text-left">
                  <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Experience</Label>
                  <div class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]">
                    <a-select
                      v-model:value="filterOptions.expertLevel"
                      placeholder="Expert Level"
                      :bordered="false"
                      :show-arrow="false"
                      class="w-full !outline-none !px-0"
                      show-search
                    >
                      <a-select-option disabled>Expert Level</a-select-option>
                      <a-select-option v-for="item in Experience" :key="item.name" :value="item.name">
                        {{ item.name }} {{ item.year }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
                
                <div class="flex flex-col w-full text-left">
                  <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Qualification</Label>
                  <div class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]">
                    <a-select
                      v-model:value="filterOptions.qualification"
                      placeholder="Qualification"
                      :bordered="false"
                      :show-arrow="false"
                      class="w-full !outline-none !px-0"
                      show-search
                    >
                      <a-select-option disabled>Qualification</a-select-option>
                      <a-select-option v-for="item in qualification" :key="item" :value="item">
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
                
                <div class="flex flex-col w-full text-left">
                  <Label class="font-Satoshi500 !text-[15.606px] !mb-2">Employment Type</Label>
                  <div class="w-full font-light font-Satoshi400 bg-white !p-0 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]">
                    <a-select
                      v-model:value="filterOptions.candidateType"
                      placeholder="Candidate Type"
                      :bordered="false"
                      :show-arrow="false"
                      class="w-full !outline-none !px-0"
                      show-search
                    >
                      <a-select-option disabled>Candidate Type</a-select-option>
                      <a-select-option v-for="item in CandidateType" :key="item" :value="item">
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
              </div>
              
              <div class="flex lg:flex-row flex-col gap-8">
                <div class="w-full">
                  <Label class="font-Satoshi500 text-[15.606px]">Salary Range ($/hr)</Label>
                  <div class="flex items-center justify-center gap-1 mt-2">
                    <input
                      v-model="rateMin"
                      type="number"
                      placeholder="Min"
                      class="w-full font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                    />
                    <div class="h-[2px] w-4 bg-black"></div>
                    <input
                      v-model="rateMax"
                      type="number"
                      placeholder="Max"
                      class="w-full font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                    />
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
                class="items-center gap-[0.71rem] bg-[#31795A] text-[#fff] px-8 py-[0.2rem] rounded-[2.4375rem] w-[9rem] btn-hover-2 hidden eventBreak:flex mob:py-2 mb-4"
              >
                <filterBtnIcon />
                <span class="text-[1.13638rem] mob:text-[1rem] font-Satoshi500 leading-[2.55681rem]">Filter</span>
              </button>
            </div>
          </div>
          
          <div class="text-center lg:my-10 my-5 py-10 msgMob:hidden">
            <h4 class="text-[3rem] text-[#000000] font-Satoshi500 leading-[2.97rem]">
              Creative Talents for Hire
            </h4>
            <p class="text-[#007582] text-[1.3rem] font-Satoshi400 lg:leading-[2.5rem]">
              Find your desired talent & make your work done
            </p>
          </div>
          
          <div class="my-10">
            <p class="text-[#00000066] font-Satoshi400 text-[23.998px]">
              All
              <span class="text-[#000000] font-Satoshi500">{{ filteredTalents?.length || 0 }}</span>
              candidates found
            </p>
          </div>
          
          <div v-if="filteredTalents?.length < 1" class="w-full h-[20rem] grid place-items-center">
            <h3>Sorry!! There are no talents matching your search parameters at this moment</h3>
          </div>
          
          <div v-else>
            <ShortLoader v-if="loading" />
            <div v-else>
              <div class="mt-14 flex flex-col gap-8 eventBreak:mt-0">
                <JobCard
                  class="min-w-[95%] lg:min-w-[45%]"
                  v-for="item in filteredTalents"
                  :key="item.id"
                  :talent="item"
                />
              </div>
              
              <div class="mt-12 flex w-[60%] flex-row justify-center mx-auto">
                <button
                  @click="setPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="border-[#007582] border-l-2 border-r-2 border-y-2 p-4 py-2 rounded-l-[6.032px] font-Satoshi500 text-[22.621px] items-center flex disabled:opacity-50"
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
                  :disabled="currentPage === totalPages"
                  class="border-[#007582] border-r-2 border-y-2 p-4 py-2 rounded-r-[6.032px] font-Satoshi500 text-[22.621px] items-center flex disabled:opacity-50"
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </div>
    </div>

    <!-- Mobile Filter -->
    <div 
      v-if="showMobFilter"
      class="w-full h-full fixed bg-[#0000004d] z-[999] top-0 left-0 backdrop-blur-sm"
      @click="toggleFilter"
    ></div>
    
    <div 
      class="mobile_filter fixed bottom-0 left-0 w-full overflow-y-auto hidden eventBreak:block transitionItem z-[999]"
      :class="showMobFilter ? 'h-[70vh]' : 'h-0'"
    >
      <section class="pb-[5.83rem] pt-[2rem] px-[1.94rem] bg-[#E9FAFB] rounded-t-[1.42044rem] msgTab:px-[1rem]">
        <div class="mb-[3rem] flex justify-end sticky top-[2rem] z-[99]">
          <button 
            class="border-gray-300 border p-[0.5rem] font-Satoshi700 cursor-pointer bg-[#fff] hover:scale-105 transitionItem px-4" 
            @click="toggleFilter"
          >
            X
          </button>
        </div>
        
        <div class="w-[80%] mx-auto flex flex-col gap-[2.1rem] msgTab:w-[90%]">
          <FormGroup
            v-model="filterOptions.name"
            labelClasses="font-Satoshi500 text-[1.52rem]"
            label=""
            name="Name"
            placeholder="Search by keywords"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-4 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-t-[6.828px] text-[0.88rem]"
          />
          
          <div>
            <label for="skills" class="font-Satoshi500 !text-[1rem]">Skills</label>
            <input
              v-model="filterOptions.skills"
              id="skills"
              placeholder="Graphics Design"
              class="bg-[#fff] w-full mt-[0.5rem] font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]"
            />
          </div>
          
          <div>
            <label for="location" class="font-Satoshi500 !text-[1rem]">Location</label>
            <div class="bg-[#fff] w-full mt-[0.5rem] font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]">
              <select
                v-model="country"
                class="w-full !outline-none !px-0 cursor-pointer text-[#000000] font-Satoshi500 leading-[1.75rem]"
                @change="getCountryCode"
              >
                <option disabled value="Nigeria" class="text-[1rem] font-Satoshi500">Nigeria</option>
                <option v-for="country in contriesCode?.data" :key="country.id" :value="country.iso2" class="text-[0.88rem]">
                  {{ country.name }}
                </option>
              </select>
            </div>
            <div class="bg-[#fff] w-full mt-[0.5rem] font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]">
              <input
                v-model="filterOptions.location"
                placeholder="City or State"
                class="w-full !outline-none !px-0 cursor-pointer text-[#000000] font-Satoshi500 leading-[1.75rem]"
              />
            </div>
          </div>
          
          <div class="w-full font-Satoshi500 !p-0 !text-[1.13638rem] leading-[2.55681rem] text-[#000] !bg-transparent !pb-6 !border-b-2 border-[#666666]">
            <select
              v-model="filterOptions.expertLevel"
              class="w-full !outline-none !px-0 cursor-pointer !text-[#000000] font-Satoshi500 text-[1rem] leading-[1.75rem] !bg-transparent"
            >
              <option disabled value="">Experience</option>
              <option v-for="item in Experience" :key="item.name" :value="item.name">
                {{ item.name }} {{ item.year }}
              </option>
            </select>
          </div>
          
          <div class="w-full font-Satoshi500 !p-0 !text-[1.13638rem] leading-[2.55681rem] text-[#000] !bg-transparent !pb-6 !border-b-2 border-[#666666]">
            <select
              v-model="filterOptions.qualification"
              class="w-full !outline-none !px-0 cursor-pointer !text-[#000000] font-Satoshi500 text-[1rem] leading-[1.75rem] !bg-transparent"
            >
              <option disabled value="">Qualification</option>
              <option v-for="item in qualification" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          
          <div class="w-full font-Satoshi500 !p-0 !text-[1.13638rem] leading-[2.55681rem] text-[#000] !bg-transparent !pb-6 !border-b-2 border-[#666666]">
            <select
              v-model="filterOptions.candidateType"
              class="w-full !outline-none !px-0 cursor-pointer !text-[#000000] font-Satoshi500 text-[1rem] leading-[1.75rem] !bg-transparent"
            >
              <option disabled value="">Employment Type</option>
              <option v-for="item in CandidateType" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="font-Satoshi500 !text-[1rem]">Salary Range ($/hr)</label>
            <div class="flex items-center justify-center gap-1 mt-2">
              <input
                v-model="rateMin"
                type="number"
                placeholder="Min"
                class="w-full font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]"
              />
              <div class="h-[2px] w-4 bg-black"></div>
              <input
                v-model="rateMax"
                type="number"
                placeholder="Max"
                class="w-full font-light font-Satoshi400 !p-4 border-gray-300 border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[0.88rem]"
              />
            </div>
          </div>
          
          <button
            @click="toggleFilter"
            class="bg-[#31795A] text-white w-full text-center mx-auto p-4 py-4 justify-center rounded-full font-Satoshi500 text-[12.103px] items-center flex mt-[0.5rem]"
            :class="!isFilter ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#31795A] btn-hover-2'"
          >
            Apply Filter
          </button>
        </div>
      </section>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.btn-hover-2:hover {
  background-color: #2a6a4f;
  transition: background-color 0.3s ease;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.transitionItem {
  transition: height 0.3s ease;
}

.mobile_filter {
  scrollbar-width: thin;
  scrollbar-color: #31795A #E9FAFB;
}

.mobile_filter::-webkit-scrollbar {
  width: 6px;
}

.mobile_filter::-webkit-scrollbar-track {
  background: #E9FAFB;
}

.mobile_filter::-webkit-scrollbar-thumb {
  background-color: #31795A;
  border-radius: 3px;
}
</style>