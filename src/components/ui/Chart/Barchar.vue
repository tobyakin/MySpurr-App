<template>
  <div class="h-full bg-cover w-full">
    <apexchart
      v-if="renderChart"
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      :height="chatContainerHeight"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import dayjs from "dayjs";
export default {
  components: {
    Apexchart: VueApexCharts,
  },
  props: { userDetails: null },
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
          stackType: "100%",
        },
        xaxis: {
          show: false,
          tickAmount: 5,
          labels: {
            style: {
              cssClass: "!font-Satoshi700 !text-[#97A6A899] !text-[12px] opacity-40", // Add your custom font class name here
            },
            show: false,
          },
          type: "datetime",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },

          show: false,
          min: 10,
          // max: 100,
          tickAmount: 3,
          labels: {
            formatter: function (value) {
              return value.toFixed(0); // Replace 'Prefix' with your desired prefix
            },
            style: {
              cssClass:
                "!font-Satoshi400 !text-[#97A6A899] capitalize !text-[12px] opacity-40", // Add your custom font class name here
            },
          },
        },
        legend: {
          show: true,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          colors: ["#fff"],
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
          horizontal: true,
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
          name: "Full Time",
          data: [],
          color: "#BB6BD9",
        },
        {
          name: "Internship",
          data: [],
          color: "#F2994A",
        },
        {
          name: "Part-Time",
          data: [],
          color: "#6FCF97",
        },
        {
          name: "Contract",
          data: [],
          color: "#EB5757",
        },
        {
          name: "Remote",
          data: [],
          color: "#2D9CDB",
        },
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
        this.chatContainerHeight = "100%"; // Set mobile height
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

    // const getFormattedDate = (day) => {
    //   const date = new Date(2023, 0, day); // Assuming the year is 2023
    //   const options = { day: "2-digit", month: "short" };
    //   return date.toLocaleDateString("en-US", options);
    // };
    // // Extract x-axis categories and y-axis values from chart data
    // const DateValues = Array.from({ length: 7 }, (_, index) =>
    //   getFormattedDate(index + 1)
    // );

    // Update chart options and series
    // this.chartOptions.xaxis.categories = DateValues;
    this.chartSeries[0].data = [this.userDetails?.fulltime_jobs];
    this.chartSeries[1].data = [this.userDetails?.internship_jobs];
    this.chartSeries[2].data = [this.userDetails?.parttime_jobs];
    this.chartSeries[3].data = [this.userDetails?.contract_jobs];
    this.chartSeries[4].data = [this.userDetails?.remote_jobs];
    this.renderChart = true;
    console.log(this.renderChart);
    //Refresh the chart to reflect the updated data
  },
};
</script>
<style>
.apexcharts-legend-text {
  @apply !font-Satoshi400 !text-[#7C8493] !text-[14.86px];
}
.apexcharts-legend {
  @apply lg:!px-0 pl-[22.48px] pt-2;
}
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
