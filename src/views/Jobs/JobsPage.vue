<script setup>
import { defineAsyncComponent, ref, computed, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
import JobRowCard from "@/components/ui/Jobs/JobRowCard.vue";
import Arrow from "@/components/icons/paginationArrow.vue";
import Tabs from "@/components/ui/Jobs/Tabs.vue";
import { useJobsStore } from "@/stores/jobs";
const jobsStore = useJobsStore();
const { Job } = storeToRefs(jobsStore);

const FormGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/FormGroup.vue")
);
const Label = defineAsyncComponent(() => import("@/components/ui/Form/Input/Label.vue"));

let store = useStore();
console.log(store.getUser);
const sortInput = reactive({
  name: "",
  jobType: "",
  Location: "",
  experienceLevel: "",
  Category: "",
});
let start = ref(10);
let end = ref(10000000);
let range = ref([start.value, end.value]);

const updateRange = (value) => {
  start.value = value[0];
  end.value = value[1];
};

// Create a computed property to synchronize the range with start and end
const computedRange = computed(() => {
  return [start.value, end.value];
});

// Watch for changes in the computedRange and update the range
watch(computedRange, (newRange) => {
  range.value = newRange;
});

// Watch for changes in the range and update start and end
watch(range, (newRange) => {
  updateRange(newRange);
});

const jobsdata = [
  {
    company_image: null,
    company_name: "MySpurr",
    verify: false,
    job_title: "Software Engineer",
    skills: [{ name: "React" }, { name: "NodeJS" }, { name: "MongoDB" }],
    employee_type: "Part-Time",
    location: "Remote",
    rate: " $30 - $50 / hour",
    weekly_hours: "20 hrs/week",
    availablity: true,
    match: true,
  },
  {
    company_image: null,
    company_name: "Trigo meadia",
    verify: true,
    job_title: " Developer in java c++kk",
    skills: [{ name: "React" }, { name: "NodeJS" }, { name: "MongoDB" }],
    employee_type: "Full-Time",
    location: "Remote",
    rate: " $30 - $50 / hour",
    weekly_hours: "30 hrs/week",
    availablity: true,
    match: false,
  },
  {
    company_image: null,
    company_name: "Kavlr.io",
    verify: false,
    job_title: "Vue Developer",
    skills: [{ name: "React" }, { name: "NodeJS" }, { name: "MongoDB" }],
    employee_type: "Full-Time",
    location: "Remote",
    rate: " $230 - $500 / hour",
    weekly_hours: "50 hrs/week",
    availablity: true,
    match: true,
  },
];
const currentPage = ref(1);

// Create a computed property to paginate the talent data
const paginatedTalent = computed(() => {
  const perPage = 2;
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  return jobsdata.slice(startIndex, endIndex);
});
const totalPages = computed(() => Math.ceil(jobsdata.length / 2));

// Function to change the current page
const setPage = (page) => {
  if (page >= 1 && page <= (2 || 1)) {
    currentPage.value = page;
  }
};
const displayedPageNumbers = computed(() => {
  const maxDisplayedPages = 4;
  const startPage = Math.max(currentPage.value - Math.floor(maxDisplayedPages / 2), 1);
  const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages.value);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
});

// You can also watch the currentPage to react to page changes
watch(currentPage, (newPage) => {
  console.log("Current Page:", newPage);
});
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <Tabs>
        <template #tab1> All jobs </template>
        <template #tab2> Branding Jobs </template>
        <template #view1
          ><div
            class="bg-[#F3F5CD] rounded-[14.957px] flex flex-col gap-8 p-8 lg:px-12 border-[0.491px] border-[#97A6A8]"
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
                label=" Category"
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
              <FormGroup
                v-model="sortInput.jobType"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Job Type"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <FormGroup
                v-model="sortInput.experienceLevel"
                labelClasses="font-Satoshi500 text-[15.606px]"
                label=" Experience Level"
                name="Name"
                placeholder="Name or keyword"
                type="text"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              ></FormGroup>
              <div class="w-full">
                <div class="flex flex-col justify-center">
                  <Label class="font-Satoshi500 text-[15.606px]">Rate</Label>
                  <div class="flex items-center justify-center gap-1 mt-2">
                    <input
                      class="w-full font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                      type="number"
                      v-model="start"
                      id="start"
                    />
                    <div class="h-[2px] w-4 bg-black"></div>
                    <input
                      class="w-full font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                      type="number"
                      v-model="end"
                      id="end"
                    />
                    <div class="w-full">
                      <SelectGroup
                        labelClasses="font-Satoshi500 hidden text-[15.606px]"
                        name="Name"
                        placeholder="currency"
                        type="text"
                        :items="['USD', 'NGN']"
                        inputClasses="w-full mt-0 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <vue-slider
                    v-model="range"
                    :tooltip="'none'"
                    :enable-cross="false"
                  ></vue-slider>
                </div>
              </div>
            </div>

            <div class="flex gap-12">
              <button
                class="border-[#007582] bg-[#31795A] text-white lg:w-[40%] text-center mx-auto border-2 p-4 py-2 justify-center rounded-full font-Satoshi500 text-[10.672px] items-center flex"
              >
                Apply Filter
              </button>
            </div>
          </div>
          <div class="mt-14 flex flex-col gap-8">
            <JobRowCard
              class="min-w-[95%] lg:min-w-[45%]"
              v-for="item in paginatedTalent"
              :key="item"
              :job="item"
            />
          </div>
          <div class="mt-12 flex w-[60%] flex-row justify-center mx-auto">
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
          </div>
        </template>
        <template #view2>branding jobs</template>
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
