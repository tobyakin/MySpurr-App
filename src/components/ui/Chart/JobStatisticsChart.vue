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
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
// export default {
//   components: {
//     Apexchart: VueApexCharts,
//   },
const props = defineProps({
  chartData: {
    type: null,
  },
  jobViews: {
    type: null,
  },
  jobApplied: {
    type: null,
  },
  days: {
    type: null,
  },
});
// data() {
//   return {
let chatContainerHeight = ref(null);
let renderChart = ref(false);
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
      show: false, // Hide the toolbar
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
        cssClass: "!font-Satoshi700 !text-[#97A6A899] !text-[12px] opacity-40", // Add your custom font class name here
      },
    },
    type: "datetime",
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
        return value.toFixed(0) + "k"; // Replace 'Prefix' with your desired prefix
      },
      style: {
        cssClass: "!font-Satoshi700 !text-[#97A6A899] capitalize !text-[12px] opacity-40", // Add your custom font class name here
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
let jobAppliedData = ref([]);
let jobViewsData = ref([]);
const chartSeries = ref([
  {
    name: "Jobs Applied",
    data: jobAppliedData.value,
    color: "#6BA336",
  },
  {
    name: "Jobs Views",
    data: jobViewsData.value,
    color: "#F2C94C",
  },
]);
//   };
// },
// computed: {
//   getMonth() {
//     return {
//       number: dayjs().format("M"),
//       month: dayjs().format("MMM"),
//     };
//   },
// },
// methods: {
function setChatContainerHeight() {
  if (window.innerWidth < 768) {
    chatContainerHeight.value = 250; // Set mobile height
  } else {
    chatContainerHeight.value = "100%"; // Set desktop height
  }
}
//   },
onUnmounted(() => {
  window.removeEventListener("resize", setChatContainerHeight());
});
onMounted(() => {
  jobAppliedData.value = props.chartData?.map((item) => item.job_applied);
  jobViewsData.value = props.chartData?.map((item) => item.job_views);
  // console.log("jobAppliedData.value", jobAppliedData.value, jobViewsData.value);

  setChatContainerHeight();
  window.addEventListener("resize", setChatContainerHeight());
  const getFormattedDate = () => {
    const date = new Date(); // Assuming the year is 2023
    // const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-US");
  };
  // Extract x-axis categories and y-axis values from chart data
  const DateValues = Array.from({ length: 7 }, (_, index) => getFormattedDate(index + 1));
  chartOptions.value.xaxis.categories = DateValues;
  renderChart.value = true;
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
