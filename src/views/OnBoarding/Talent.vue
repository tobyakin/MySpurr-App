<template>
  <div class="bg-[#B2ECF2] h-screen justify-center flex py-6 p-4">
    <WorkDetailsForm v-if="step == 1" @next="next" />
    <PortfolioForm v-if="step == 2" @next="next" />
  </div>
</template>

<script setup>
import { useOnboardingStore } from "@/stores/onBoarding";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();
import WorkDetailsForm from "@/components/ui/Form/Talent/WorkDetailsForm.vue";
import PortfolioForm from "@/components/ui/Form/Talent/PortfolioForm.vue";
const OnboardingStore = useOnboardingStore();

const { step } = storeToRefs(OnboardingStore);
import { useStore } from "@/stores/user";

let store = useStore();
console.log(store.getUser);

const prev = () => {
  if (step.value == 1) {
    return router.push({
      name: "dashboard",
    });
  }
  step.value = step.value - 1;
};

const next = (data) => {
  step.value = data;
};
</script>

<style></style>
