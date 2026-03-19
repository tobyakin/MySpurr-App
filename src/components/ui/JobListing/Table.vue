<template>
  <div>
    <div
      class="my_applications_tabs lg:flex hidden py-[15.3px] px-[27.65px] items-center justify-between bg-[#F0F5F3] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <a class="text-[#244034] text-[15.259px] font-normal"> Title </a>

      <a class="h-[40.508px] w-[40.508px] rounded-full"> </a>
      <a class="text-[#244034] text-[15.259px] font-normal">Job Created </a>
      <a class="text-[#244034] text-[15.259px] font-normal">Applicants</a>
      <a class="text-[#244034] text-[15.259px] font-normal">Status </a>
      <a class="text-[#244034] text-[15.259px] font-normal">Action </a>
    </div>
    <ShortLoader v-if="isLoading" />
    <div v-else>
      <div class="mt-14 flex flex-col gap-8">
        <JobsCard
          class="min-w-[95%] lg:min-w-[45%]"
          v-for="item in paginatedJob"
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
    </div>
  </div>
</template>
<script setup>
import {ref, computed, watch } from "vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import Arrow from "@/components/icons/paginationArrow.vue"
import { useQuery } from "vue-query";
import JobsCard from "./JobsCard.vue";
import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobs";

const jobsStore = useJobsStore();
const { MyJob } = storeToRefs(jobsStore);
const getMyJobs = async () => {
  let response = await jobsStore.handleMyJobs();
  return response;
};
const fetchData = async () => {
  await Promise.all([getMyJobs()]);
};

fetchData();

const { isLoading } = useQuery(["myJobs"], getMyJobs, {
  retry: 10,
  staleTime: 1000,
  onSuccess: (data) => {
    MyJob.value = data;
  },
});

// Pagination Function

const currentPage = ref(1);
const pagination = computed(() => MyJob.value?.pagination || {});
const myJobData = computed(() => MyJob.value?.data || []);
const paginatedJob = computed(() => {
  const perPage = pagination.value.per_page;
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  return myJobData.value.slice(startIndex, endIndex);
});
const totalPages = computed(() => Math.ceil(pagination.value.last_page));

// Function to change the current page
const setPage = (page) => {
  if (page >= 1 && page <= (pagination.value.last_page || 1)) {
    currentPage.value = page;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling effect
  });
}

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
watch(currentPage, async (newPage) => {
  scrollToTop()
  await talentsStore.allTalents(newPage);
});
</script>
