<template>
  <div class="h-full bg-cover">
    <VueApexCharts
      class="h-full"
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
    default: () => [],
  },
  days: {
    type: Array,
    default: () => [],
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
    tickAmount: 10,
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
    tickAmount: 3,
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
});

const chartSeries = ref([
  {
    name: "Jobs Applied",
    data: [],
    color: "#6BA336",
  },
]);

const setChatContainerHeight = () => {
  if (window.innerWidth < 768) {
    chatContainerHeight.value = 250;
  } else {
    chatContainerHeight.value = "100%";
  }
};

onMounted(() => {
  setChatContainerHeight();
  window.addEventListener("resize", setChatContainerHeight);

  // Filter out the total object and map data
  const filteredData = props.chartData?.filter((item) => item.day !== undefined);
  chartSeries.value[0].data = filteredData?.map((item) => item.job_applied);
  chartOptions.value.xaxis.categories = filteredData?.map((item) => item.day);
  renderChart.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", setChatContainerHeight);
});

watch(
  () => props.chartData,
  (newVal) => {
    if (newVal) {
      const filteredData = newVal?.filter((item) => item.day !== undefined);
      chartSeries.value[0].data = filteredData?.map((item) => item.job_applied);
      chartOptions.value.xaxis.categories = filteredData?.map((item) => item.day);
    }
  },
  { immediate: true, deep: true }
);
</script>

<!--
<script>
import VueApexCharts from "vue3-apexcharts";
import dayjs from "dayjs";
export default {
  components: {
    Apexchart: VueApexCharts,
  },
  props: {
    chartData: {
      type: Array,
    },
    days: {
      type: Array,
    },
  },

  data() {
    return {
      chatContainerHeight: null,
      renderChart: false,
      chartOptions: {
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
          tickAmount: 10,
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
          // max: 100,
          tickAmount: 3,
          labels: {
            formatter: function (value) {
              return value.toFixed(0) + "k"; // Replace 'Prefix' with your desired prefix
            },
            style: {
              cssClass:
                "!font-Satoshi700 !text-[#97A6A899] capitalize !text-[12px] opacity-40", // Add your custom font class name here
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
      },
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
      chartSeries: [
        {
          name: "Jobs Applied",
          data: [],
          color: "#6BA336",
        },
        // {
        //   name: "Withdrawal",
        //   data: [],

        //   color: "#F2C94C",
        // },
      ],
    };
  },
  computed: {
    getMonth() {
      return {
        number: dayjs().format("M"),
        month: dayjs().format("MMM"),
      };
    },
  },
  methods: {
    setChatContainerHeight() {
      if (window.innerWidth < 768) {
        this.chatContainerHeight = 250; // Set mobile height
      } else {
        this.chatContainerHeight = "100%"; // Set desktop height
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setChatContainerHeight);
  },
  mounted() {
    this.setChatContainerHeight();
    window.addEventListener("resize", this.setChatContainerHeight);

    const Incomedata = this.chartData || [];
    // const Widthdrawaldata = [21, 7, 25, 13, 22, 8, 40];
    const getFormattedDate = (day) => {
      const date = new Date(2023, 0, day); // Assuming the year is 2023
      const options = { day: "2-digit", month: "short" };
      return date.toLocaleDateString("en-US", options);
    };
    // Extract x-axis categories and y-axis values from chart data
    // const values = Widthdrawaldata.map((item) => item);
    const Incomevalues = Incomedata?.map((item) => item);
    const DateValues = Array.from({ length: 7 }, (_, index) =>
      getFormattedDate(index + 1)
    );

    // Update chart options and series
    this.chartOptions.xaxis.categories = DateValues;
    this.chartSeries[0].data = Incomedata;
    // this.chartSeries[1].data = values;
    this.renderChart = true;
    //Refresh the chart to reflect the updated data
    //this.$refs.chart.refresh();
  },
};
</script>
-->
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
