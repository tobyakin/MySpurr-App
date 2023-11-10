<template>
  <div class="bg-[#ECFAFC] border-[#254035AB] pt-[20px] border-[0.567px] rounded-[10px]">
    <div class="flex items-center flex-col lg:flex-row justify-between px-[20px]">
      <h4 class="text-[20px text-[#000000] font-Satoshi700">Transaction Summary</h4>
      <div class="flex flex-col lg:flex-row items-center gap-3">
        <div class="flex gap-3">
          <div
            class="text-[#7E9294] text-[12px] font-Satoshi400 flex items-center gap-[4px]"
          >
            <div class="h-[10px] w-[10px] rounded-[4px] my-2 bg-[#A7DDFC]"></div>
            Withdrawal
          </div>
          <div
            class="text-[#7E9294] text-[12px] font-Satoshi400 flex items-center gap-[4px]"
          >
            <div class="h-[10px] w-[10px] rounded-[4px] my-2 bg-[#AFF5ED]"></div>
            Income
          </div>
        </div>

        <button
          class="p-2 py-1.5 text-[#01181B] flex-row gap-1 font-Satoshi700 bg-[#E6F1F3] items-center text-[12px] border-[#254035AB] border-[1px] rounded-[10px] flex"
        >
          <chartCalenderIcon />
          This Month
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_2992_12058)">
              <path
                d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z"
                fill="#96C6CC"
              />
            </g>
            <defs>
              <clipPath id="clip0_2992_12058">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>

    <apexchart
      class="pl-[10px] pr-[18px]"
      v-if="renderChart"
      type="area"
      :options="chartOptions"
      :series="chartSeries"
      ref="chart"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import chartCalenderIcon from "@/components/icons/chartCalenderIcon.vue";
import dayjs from "dayjs";
export default {
  components: {
    Apexchart: VueApexCharts,
    chartCalenderIcon,
  },
  data() {
    return {
      renderChart: false,
      chartOptions: {
        grid: {
          show: true,
          borderColor: "#E4EAF0",
          strokeDashArray: 4,
          position: "back",
          xaxis: {
            lines: {
              show: true,
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
          id: "area-chart",
          toolbar: {
            show: false, // Hide the toolbar
          },
          width: "100%",
          height: 380,
        },
        xaxis: {
          categories: [],
          tickAmount: 10,
          labels: {
            style: {
              cssClass: "!font-Satoshi700 !text-[#97A6A899] !text-[12px] opacity-40", // Add your custom font class name here
            },
          },
        },
        yaxis: {
          min: 40,
          // max: 100,
          tickAmount: 3,
          labels: {
            formatter: function (value) {
              return value.toFixed(0) + "k"; // Replace 'Prefix' with your desired prefix
            },
            style: {
              cssClass: "!font-Satoshi700 !text-[#97A6A899] !text-[12px] opacity-40", // Add your custom font class name here
            },
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 1,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
        monthNumber: dayjs().format("M"),
      },
      chartSeries: [
        {
          name: "Income",
          data: [],
          color: "#0097FF",
        },
        { name: "Withdrawal", data: [], color: "#1AE8CE" },
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
  mounted() {
    const Incomedata = [45, 22, 78, 25, 19, 23, 50];
    const Widthdrawaldata = [20, 62, 19, 53, 2, 28, 25];
    const getFormattedDate = (day) => {
      const date = new Date(2023, 0, day); // Assuming the year is 2023
      const options = { day: "2-digit", month: "short" };
      return date.toLocaleDateString("en-US", options);
    };
    // Extract x-axis categories and y-axis values from chart data
    const values = Widthdrawaldata.map((item) => item);
    const Incomevalues = Incomedata.map((item) => item);
    const DateValues = Array.from({ length: 31 }, (_, index) =>
      getFormattedDate(index + 1)
    );

    // Update chart options and series
    this.chartOptions.xaxis.categories = DateValues;
    this.chartSeries[0].data = values;
    this.chartSeries[1].data = Incomevalues;
    this.renderChart = true;
    //Refresh the chart to reflect the updated data
    //this.$refs.chart.refresh();
  },
};
</script>
