<script setup>
import { ref, onMounted, computed, watch } from "vue";
import TabsVue from "./ChartCardTab.vue";
import CircleEyeIcon from "@/components/icons/circleEyeIcon.vue";
import CircleArrowUpIcon from "@/components/icons/CircleArrowUpIcon.vue";
import DocumentIcon from "@/components/icons/documentIcon.vue";
import CircleArrowDown from "@/components/icons/circleArrowDown.vue";
import JobStatisticsChart from "@/components/ui/Chart/JobStatisticsChart.vue";
import JobsView from "@/components/ui/Chart/JobsView.vue";
import JobsApplied from "@/components/ui/Chart/JobsApplied.vue";
const props = defineProps(['statistics'])

const activetab = ref("monthly");
const total_job_views = ref(0);
const total_job_applied = ref(0);

onMounted(() => {
  const storedTab = localStorage.getItem("activeTab");
  if (storedTab) {
    activetab.value = storedTab;
  }
});

const statistics = computed(() => props.statistics);

const totalJobViewsObj = statistics.value?.find((obj) => obj.total_job_views !== undefined);
const totalJobAppliedObj = statistics.value?.find((obj) => obj.total_job_applied !== undefined);

total_job_views.value = computed(() => 
  totalJobViewsObj ? totalJobViewsObj.value.total_job_views : 0
);

total_job_applied.value = computed(() => 
  totalJobAppliedObj ? totalJobAppliedObj.value.total_job_applied : 0
);

watch(
  () => props.statistics,
  (newStatistics) => {
    if (Array.isArray(newStatistics)) {
      const totalJobViewsObj = newStatistics.find((obj) => obj.total_job_views !== undefined);
      const totalJobAppliedObj = newStatistics.find((obj) => obj.total_job_applied !== undefined);

      total_job_views.value = totalJobViewsObj ? totalJobViewsObj.total_job_views : 0;
      total_job_applied.value = totalJobAppliedObj ? totalJobAppliedObj.total_job_applied : 0;
    }
  },
  { immediate: true, deep: true }
);
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
      <template #tab1>Overview</template>
      <template #tab2>Jobs View</template>
      <template #tab3>Jobs Applied</template>
      <template #view1>
        <div class="flex lg:flex-row flex-col gap-4 w-full h-full">
          <div class="min-w-[95%] lg:min-w-[65.9%]">
            <JobStatisticsChart :chartData="props.statistics" />
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
          <JobsView :chartData="props.statistics" class="w-full" />
        </div>
      </template>

      <template #view3>
        <div class="flex lg:flex-row flex-col gap-4 w-full lg:h-[45vh]">
          <JobsApplied :chartData="props.statistics" class="w-full" />
        </div>
      </template>
    </TabsVue>
  </div>
</template>
