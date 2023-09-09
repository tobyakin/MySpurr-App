<script setup>
import { useOnboardingStore } from "@/stores/onBoarding";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import TickCircle from "@/components/icons/tickCircle.vue";
const router = useRouter();
import WorkDetailsForm from "@/components/ui/Form/Business/BusinessDetailsForm.vue";
import PortfolioForm from "@/components/ui/Form/Business/PortfolioForm.vue";
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
  if (step.value == 2) {
    return router.push({
      name: "dashboard",
    });
  }
  step.value = data;
};
</script>
<template>
  <div class="bg-[#ffffff] min-h-screen h-full">
    <div class="w-[40%] mx-auto text-center justify-between flex py-4">
      <div
        class="flex font-Satoshi400 text-[14.908px] justify-center items-center w-[70%] gap-1"
      >
        <TickCircle class="text-[#43D0DF]" />
        <p>Create an account</p>
      </div>
      <div class="flex items-center justify-around mx-auto w-auto">
        <hr class="border-b-[#000000] w-[41.862px] border-b-[0.932px]" />
      </div>
      <div
        class="flex font-Satoshi400 text-[14.908px] overflow-hidden items-center justify-center w-[66%] gap-1"
      >
        <TickCircle :class="step >= 2 ? 'text-[#43D0DF]' : 'text-[#B2ECF2]'" />
        <p>Your work details</p>
      </div>
      <div class="flex items-center justify-around w-auto">
        <hr class="border-b-[#000000] w-[41.862px] border-b-[0.932px]" />
      </div>
      <div
        class="flex font-Satoshi400 text-[14.908px] overflow-hidden justify-center items-center w-[60%] gap-1"
      >
        <TickCircle :class="step > 2 ? 'text-[#43D0DF]' : 'text-[#B2ECF2]'" />
        <p>Company logo</p>
      </div>
    </div>

    <div class="justify-center flex py-6 p-4">
      <WorkDetailsForm v-if="step == 1" @next="next" />
      <PortfolioForm v-if="step == 2" @prev="prev" @next="next" />
    </div>
  </div>
</template>

<style></style>
