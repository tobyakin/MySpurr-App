<template>
  <div class="h-full bg-cover">
    <VueApexCharts
      v-if="renderChart"
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      :height="chatContainerHeight"
      ref="chart"
    />
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, watch, onUnmounted } from "vue";
import dayjs from "dayjs";

// Define props
const props = defineProps({
  chartData: {
    type: Array,
  },
  days: {
    type: Number,
    default: 7,
  },
});

const chatContainerHeight = ref(null);
const renderChart = ref(false);

const chartOptions = ref({
  grid: {
    show: true,
    borderColor: "#E4EAF0",
    strokeDashArray: 4,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    width: "100%",
    height: 350,
    stacked: true,
  },
  xaxis: {
    categories: [],
    tickAmount: 7,
    labels: {
      style: {
        cssClass: "!font-Satoshi700 !text-[#97A6A899] !text-[12px] opacity-40",
      },
    },
    type: "category",
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    min: 10,
    tickAmount: 7,
    labels: {
      formatter: function (value) {
        return value.toFixed(0) + "k";
      },
      style: {
        cssClass: "!font-Satoshi700 !text-[#97A6A899] capitalize !text-[12px] opacity-40",
      },
    },
  },
  legend: {
    show: true,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 1,
  },
  fill: {
    opacity: 1,
  },
  monthNumber: dayjs().format("M"),
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "13px",
            fontWeight: 900,
          },
        },
      },
    },
  },
});

const chartSeries = ref([
  {
    name: "Jobs Applied",
    data: [],
    color: "#6BA336",
  },
  {
    name: "Jobs Views",
    data: [],
    color: "#F2C94C",
  },
]);

const setChatContainerHeight = () => {
  if (window.innerWidth < 768) {
    chatContainerHeight.value = 250;
  } else {
    chatContainerHeight.value = "100%";
  }
};

// Watch for changes to props and update chart data
watch(
  () => props.chartData,
  (newVal) => {
    if (newVal) {
      const filteredData = newVal?.filter((item) => item.day !== undefined);
      chartSeries.value[0].data = filteredData?.map((item) => item.job_applied);
      chartSeries.value[1].data = filteredData?.map((item) => item.job_views);
      chartOptions.value.xaxis.categories = filteredData?.map((item) => item.day);
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  setChatContainerHeight();
  window.addEventListener("resize", setChatContainerHeight);

  const filteredData = props.chartData?.filter((item) => item.day !== undefined);
  chartSeries.value[0].data = filteredData?.map((item) => item.job_applied);
  chartSeries.value[1].data = filteredData?.map((item) => item.job_views);
  chartOptions.value.xaxis.categories = filteredData?.map((item) => item.day);
  renderChart.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", setChatContainerHeight);
});
</script>

<style>
/* #apexchartsarea-chart {
  height: 326px !important;
}
.vue-apexcharts {
  height: 326px !important;
}
#apex-chat-container {
  height: 326px; 
} */
</style>
