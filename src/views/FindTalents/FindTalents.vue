<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { defineAsyncComponent, onMounted, computed, reactive, ref, watch } from "vue";
// import { useHead } from "@vueuse/head";
import { storeToRefs } from "pinia";
// import GoPro from "@/components/Bander/GoPro.vue";
import Arrow from "@/components/icons/paginationArrow.vue";
import JobCard from "@/components/ui/FindTalents/JobCard.vue";
// import Subscribe from "@/components/Bander/Subscribe.vue";
import { useJobsStore } from "@/stores/jobs";
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
const Label = defineAsyncComponent(() => import("@/components/ui/Form/Input/Label.vue"));

// import FormSelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
const jobsStore = useJobsStore();
const { talent } = storeToRefs(jobsStore);
// Define a ref to keep track of the current page
const currentPage = ref(1);

// Create a computed property to access the talent data
const talentData = computed(() => talent.value?.data || []);

// Create a computed property to access the pagination data
const pagination = computed(() => talent.value?.pagination || {});

// Create a computed property to paginate the talent data
const paginatedTalent = computed(() => {
  const perPage = pagination.value.per_page;
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  return talentData.value.slice(startIndex, endIndex);
});
const totalPages = computed(() =>
  Math.ceil(talentData.value.length / pagination.value.per_page)
);

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

// You can also watch the currentPage to react to page changes
watch(currentPage, (newPage) => {
  console.log("Current Page:", newPage);
});

onMounted(async () => {
  await jobsStore.allTalents();
});
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-5 py-4 mb-5">
      <div
        class="bg-[#E9FAFB] rounded-[14.957px] flex flex-col gap-3 lg:gap-5 p-8 lg:px-10 px-8 md:px-10 border-[0.491px] border-[#97A6A8]"
      >
        <div class="flex lg:flex-row flex-col gap-12">
          <FormGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Name or Keyword"
            name="Name"
            placeholder="Name or keyword"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
          ></FormGroup>
          <FormGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Categories"
            name="Name"
            placeholder="Graphics Design"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
          ></FormGroup>
          <FormGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Location"
            name="Name"
            placeholder="Abuja. Nigeria"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
          ></FormGroup>
        </div>
        <div class="flex lg:flex-row flex-col justify-between w-full gap-12">
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Expert Level</Label>
            <a-select
              placeholder=""
              :show-arrow="false"
              :bordered="false"
              class="w-full mt-2 font-light font-Satoshi400 !p-0 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029] text-[12.68px]"
              show-search
            >
              <a-select-option disabled>select expert level</a-select-option>
              <a-select-option
                v-for="item in ['Freelance', 'Full Time', 'Part Time']"
                :key="item"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Qualification</Label>
            <a-select
              placeholder=""
              :show-arrow="false"
              :bordered="false"
              class="w-full mt-2 font-light font-Satoshi400 !p-0 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029] text-[12.68px]"
              show-search
            >
              <a-select-option disabled>select qualification</a-select-option>
              <a-select-option
                v-for="item in ['Freelance', 'Full Time', 'Part Time']"
                :key="item"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </div>

          <!-- <FormSelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Expert Level"
            name="Name"
            placeholder="Expert Level"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029]  text-[12.68px]"
          ></FormSelectGroup> -->
          <!-- <FormSelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Qualification"
            name="Name"
            placeholder="Qualification"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029]  text-[12.68px]"
          ></FormSelectGroup> -->
        </div>
        <div class="flex lg:flex-row flex-col justify-between w-full gap-12">
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Salary Range</Label>
            <a-select
              placeholder=""
              :show-arrow="false"
              :bordered="false"
              class="w-full mt-2 font-light font-Satoshi400 !p-0 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029] text-[12.68px]"
              show-search
            >
              <a-select-option disabled>select Salary Range</a-select-option>
              <a-select-option
                v-for="item in ['Freelance', 'Full Time', 'Part Time']"
                :key="item"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2">Candidate Type</Label>
            <a-select
              placeholder=""
              :show-arrow="false"
              :bordered="false"
              class="w-full mt-2 font-light font-Satoshi400 !p-0 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029] text-[12.68px]"
              show-search
            >
              <a-select-option disabled>select Candidate Type</a-select-option>
              <a-select-option
                v-for="item in ['Freelance', 'Full Time', 'Part Time']"
                :key="item"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </div>

          <!-- <FormSelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Salary Range"
            name="Name"
            placeholder="Salary Range"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029]  text-[12.68px]"
          ></FormSelectGroup>
          <FormSelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label=" Candidate Type"
            name="Name"
            placeholder="Candidate Type"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-b-[#31795A33] border-b-[0.509px] !bg-transparent opacity-[0.8029]  text-[12.68px]"
          ></FormSelectGroup> -->
        </div>
        <div class="flex gap-12">
          <button
            class="bg-[#31795A] text-white lg:w-[40%] w-full text-center mx-auto p-4 py-4 justify-center rounded-full font-Satoshi500 text-[12.103px] items-center flex"
          >
            Reset
          </button>
        </div>
      </div>
      <div class="text-center lg:my-10 my-5 py-20 pb-10">
        <h4 class="text-[50.549px] text-[#000000] font-Satoshi500 leading-[47.52px]">
          Creative Talents for Hire
        </h4>
        <p class="text-[#007582] text-[21.194px] font-Satoshi400 lg:leading-[39.552px]">
          Find you desired talent & make your work done
        </p>
      </div>
      <!-- <GoPro /> -->
      <div class="my-10">
        <p class="text-[#00000066] font-Satoshi400 text-[23.998px]">
          All
          <span class="text-[#000000] font-Satoshi500">{{ paginatedTalent.length }}</span>
          candidates found
        </p>
      </div>
      <div class="mt-14 flex flex-col gap-8">
        <JobCard
          class="w-full"
          v-for="item in paginatedTalent"
          :key="item"
          :talent="item"
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
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
