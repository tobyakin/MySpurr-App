<template>
  <div class="bg-[#ffffff] min-h-screen h-full">
    <div class="lg:w-[40%] mx-auto text-center px-3 justify-between flex lg:py-4 mt-10">
      <div
        class="flex font-Satoshi400 text-[14.908px] justify-center items-center lg:w-[50%] gap-1"
      >
        <TickCircle class="text-[#43D0DF]" />
        <p class="mb-0">Create an account</p>
      </div>
      <div class="flex items-center justify-around mx-auto w-auto">
        <hr class="border-b-[#000000] lg:w-[191.862px] border-b-[0.932px]" />
      </div>
      <div
        class="flex font-Satoshi400 text-[14.908px] overflow-hidden items-center justify-center lg:w-[50%] gap-1"
      >
        <TickCircle :class="step >= 4 ? 'text-[#43D0DF]' : 'text-[#B2ECF2]'" />
        <p class="mb-0">Your Profile details</p>
      </div>
      <!-- <div class="flex items-center justify-around w-auto">
        <hr class="border-b-[#000000] w-[41.862px] border-b-[0.932px]" />
      </div> -->
      <!-- <div
        class="flex font-Satoshi400 text-[14.908px] overflow-hidden justify-center items-center w-[60%] gap-1"
      >
        <TickCircle :class="step > 2 ? 'text-[#43D0DF]' : 'text-[#B2ECF2]'" />
        <p>Your Porfolio</p>
      </div> -->
    </div>
    <div class="justify-center flex py-6 p-4">
      <WorkDetailsForm v-if="step == 1" @next="next" />
      <EducationalDetails v-if="step == 2" @next="next" @prev="prev" />
      <EmploymentDetails v-if="step == 3" @next="next" @prev="prev" />
      <Certificate v-if="step == 4" @next="next" @prev="prev" />
      <!-- <PortfolioForm v-if="step == 2" @prev="prev" @next="next" /> -->
    </div>
  </div>
</template>

<script setup>
import { useOnboardingStore } from "@/stores/onBoarding";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import WorkDetailsForm from "@/components/ui/Form/Talent/WorkDetailsForm.vue";
// import PortfolioForm from "@/components/ui/Form/Talent/PortfolioForm.vue";
import EducationalDetails from "@/components/ui/Form/Talent/EducationalDetails.vue";
import EmploymentDetails from "@/components/ui/Form/Talent/EmploymentDetails.vue";
import Certificate from "@/components/ui/Form/Talent/Certificate.vue";
import TickCircle from "@/components/icons/tickCircle.vue";
import { useStore } from "@/stores/user";
const OnboardingStore = useOnboardingStore();
const { step } = storeToRefs(OnboardingStore);
const router = useRouter();
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
  if (step.value === 4) {
    return router.push({
      name: "dashboard",
    });
  }
  step.value = data;
};
</script>

<style></style>
