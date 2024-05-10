<script setup>
import { ref, onMounted, computed } from "vue";
import TabsVue from "./ChartCardTab.vue";
import CircleEyeIcon from "@/components/icons/circleEyeIcon.vue";
import CircleArrowUpIcon from "@/components/icons/CircleArrowUpIcon.vue";
import DocumentIcon from "@/components/icons/documentIcon.vue";
import CircleArrowDown from "@/components/icons/circleArrowDown.vue";
import JobStatisticsChart from "@/components/ui/Chart/JobStatisticsChart.vue";
import SingleData from "@/components/ui/Chart/SingleData.vue";
// const tab = ref("Week");
const activetab = ref("monthly");
// Set initial tab value based on the prop or local storage
onMounted(() => {
  const storedTab = localStorage.getItem("activeTab");
  if (storedTab) {
    activetab.value = storedTab;
  }
});
const props = defineProps({ statistics: null });
const statistics = computed(() => props.statistics);
console.log("statistics", statistics.value);
// const filterTab = (category) => {
//   tab.value = category;
//   //   filteredTab.value = [];
//   //   if (category != "ALL") {
//   //     filteredTab.value = store.blogPost.filter((item) => item.blog_category == category);
//   //   }
// };

// Extract job_views and job_applied from the data
// Find the objects containing total_job_views and total_job_applied
const totalJobViewsObj = statistics?.value?.find((obj) => "total_job_views" in obj);
const totalJobAppliedObj = statistics?.value?.find((obj) => "total_job_applied" in obj);

// Extract values or default to 0 if not found
const total_job_views = totalJobViewsObj ? totalJobViewsObj.total_job_views : 0;
const total_job_applied = totalJobAppliedObj ? totalJobAppliedObj.total_job_applied : 0;
// Use refs to store arrays for job_views, job_applied, and day
const jobViews = ref(statistics?.value?.map((item) => item.job_views));
const jobApplied = ref(statistics?.value?.map((item) => item.job_applied));
const days = ref(statistics.value?.data?.map((item) => item.day));
</script>
<template>
  <div
    class="py-4 rounded-[4.533px] w-full bg-[#FFF] border-[0.567px] border-[#254035AB]"
  >
    <div class="flex lg:flex-row flex-col px-4 justify-between">
      <div>
        <h4 class="text-[23.471px] font-Satoshi700 leading-[28.762px] text-[#244034]">
          Jobs Statistics
        </h4>
        <p class="text-[10.88px] leading-[17.646px] text-[#244034] font-Satoshi400">
          Showing job statistics July 19 - 25
        </p>
      </div>
      <!-- <div
        class="flex w-auto flex-row bg-[#B2ECF2] p-[3.5px] h-[40.172px] rounded-[6.695px]"
      >
        <button
          class="border-none p-4 py-0 rounded-[3.348px] font-Satoshi500 text-[16.144px] leading-[1px] items-center flex"
          @click="filterTab('Week')"
          :class="{ 'bg-[#fff] text-[#244034]': tab == 'Week' }"
        >
          Week</button
        ><button
          class="border-none p-4 py-0 rounded-[3.348px] font-Satoshi500 text-[16.144px] leading-[1px] items-center flex"
          @click="filterTab('Month')"
          :class="{ 'bg-[#fff] text-[#244034]': tab == 'Month' }"
        >
          Month</button
        ><button
          class="border-none p-4 py-0 rounded-[3.348px] font-Satoshi500 text-[16.144px] leading-[1px] items-center flex"
          @click="filterTab('Year')"
          :class="{ 'bg-[#fff] text-[#244034]': tab == 'Year' }"
        >
          Year
        </button>
      </div> -->
    </div>
    <TabsVue>
      <template #tab1>Overview</template><template #tab2>Jobs View</template
      ><template #tab3>Jobs Applied</template>
      <template #view1>
        <div class="flex lg:flex-row flex-col gap-4 w-full h-full">
          <div class="min-w-[95%] lg:min-w-[65.9%]">
            <JobStatisticsChart
              :jobViews="jobViews"
              :jobApplied="jobApplied"
              :chartData="props.statistics"
              :days="days"
            />
          </div>
          <div class="flex lg:flex-col md:flex-row flex-col w-full h-full gap-4">
            <div
              class="p-[22.17px] px-[17px] rounded-[4.533px] w-full bg-[#FFF] flex flex-row justify-between h-full border-[0.567px] border-[#254035AB]"
            >
              <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between w-full">
                  <h4 class="text-[#244034] text-[14.4px] leading font-Satoshi700">
                    Jobs Views
                  </h4>
                  <CircleEyeIcon />
                </div>
                <h4
                  class="text-[#244034] font-Satoshi500 text-[38.17px] leading-[59.218px]"
                >
                  {{ total_job_views }}
                </h4>
                <div class="flex items-center text-[14.4px] gap-3">
                  <p>This Week</p>
                  <p class="text-[#D3DA51] font-Satoshi700">0%</p>
                  <CircleArrowUpIcon />
                </div>
              </div>
            </div>
            <div
              class="p-[22.17px] px-[17px] rounded-[4.533px] w-full bg-[#FFF] flex flex-row justify-between h-full border-[0.567px] border-[#254035AB]"
            >
              <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between w-full">
                  <h4 class="text-[#244034] text-[14.4px] leading font-Satoshi700">
                    Jobs Applied
                  </h4>
                  <DocumentIcon />
                </div>
                <h4
                  class="text-[#244034] font-Satoshi500 text-[38.17px] leading-[59.218px]"
                >
                  {{ total_job_applied }}
                </h4>
                <div class="flex items-center text-[14.4px] gap-3">
                  <p>This Week</p>
                  <p class="text-[#DA5252] font-Satoshi700">0%</p>
                  <CircleArrowDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #view2>
        <div class="flex lg:flex-row flex-col gap-4 w-full lg:h-[45vh]">
          <SingleData :chartData="jobViews" class="w-full" />
        </div>
      </template>

      <template #view3>
        <div class="flex lg:flex-row flex-col gap-4 w-full lg:h-[45vh]">
          <SingleData :chartData="jobApplied" class="w-full" />
        </div>
      </template>
    </TabsVue>
  </div>
</template>
