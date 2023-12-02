<script setup>
import { ref } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import DefultPage from "@/components/ui/HelpCenter/DefultPage.vue";
import AnswersPage from "../../components/ui/HelpCenter/AnswersPage.vue";
const step = ref([true, false]);

const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <h4 class="text-[#244034] font-EBGaramond500 capitalize text-[27px]">
        Help center
      </h4>
      <div>
        <DefultPage @goToAccount="changeScreen(0, 1)" v-if="step[0]" />
        <AnswersPage v-if="step[1]" />
      </div>
    </div>
  </DashboardLayout>
</template>
