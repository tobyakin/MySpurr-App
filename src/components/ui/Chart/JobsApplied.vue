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
  
  // Define props
  const props = defineProps({
    chartData: {
      type: Array,
      default: () => [],
    },
  });
  
  const chatContainerHeight = ref(null);
  const renderChart = ref(false);
  
  const chartOptions = ref({
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
      show: true,
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        },
        style: {
          cssClass: "!font-Satoshi700 !text-[#97A6A899] capitalize !text-[12px] opacity-40",
        },
      },
    },
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
  ]);
  
  const setChatContainerHeight = () => {
    if (window.innerWidth < 768) {
      chatContainerHeight.value = 250;
    } else {
      chatContainerHeight.value = "100%";
    }
  };
  
  watch(
    () => props.chartData,
    (newVal) => {
      if (Array.isArray(newVal)) {
        const filteredData = newVal.filter((item) => item.day !== undefined);
  
        chartSeries.value[0].data = filteredData.map((item) => item.job_applied || 0);
  
        chartOptions.value.xaxis.categories = filteredData.map((item) => item.day || '');
      }
    },
    { immediate: true, deep: true }
  );
  
  onMounted(() => {
    setChatContainerHeight();
  
    const filteredData = (props.chartData || []).filter((item) => item.day !== undefined);
  
    chartSeries.value[0].data = filteredData.map((item) => item.job_applied || 0);
    chartOptions.value.xaxis.categories = filteredData.map((item) => item.day || '');
  
    renderChart.value = true;
  });
  
  onUnmounted(() => {
    window.removeEventListener("resize", setChatContainerHeight);
  });
  
  
</script>

  