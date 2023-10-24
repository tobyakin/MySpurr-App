<template>
  <div class="bg-[#ECFAFC] border-[#254035AB] py-[20px] border-[0.567px] rounded-[10px]">
    <div class="flex items-center justify-between px-[20px]">
      <h4 class="text-[20px text-[#000000] font-Satoshi700">Transaction Summary</h4>
      <div class="flex items-center gap-3">
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
    <!-- <apexchart
      class="!min-h-[40px]"
      v-if="renderChart"
      type="area"
      :options="chartOptions"
      :series="chartSeries"
      ref="chart"
    /> -->
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
        chart: {
          id: "area-chart",
          toolbar: {
            show: false, // Hide the toolbar
          },
          height: 350,
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              cssClass: "!font-Satoshi400", // Add your custom font class name here
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + "k"; // Replace 'Prefix' with your desired prefix
            },
            style: {
              cssClass: "!font-Satoshi400", // Add your custom font class name here
            },
          },
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
          name: "Series 1",
          data: [],
        },
        {
          name: "Series 2",
          data: [],
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
  mounted() {
    //Sample data for the area chart
    const chartData = [
      { x: "Mon", y: 0 },
      { x: "Tue", y: 40 },
      { x: "Wed", y: 35 },
      { x: "Thur", y: 100 },
      { x: "Fri", y: 45 },
      { x: "Sat", y: 45 },
      { x: "Sun", y: 45 },
    ];

    // Extract x-axis categories and y-axis values from chart data
    const categories = chartData.map((item) => item.x);
    const values = chartData.map((item) => item.y);

    // Update chart options and series
    this.chartOptions.xaxis.categories = categories;
    this.chartSeries[0].data = values;
    this.renderChart = true;
    //Refresh the chart to reflect the updated data
    //this.$refs.chart.refresh();
  },
};
</script>
