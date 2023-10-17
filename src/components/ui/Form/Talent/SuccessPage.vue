<template>
  <div class="my-40 h-screen flex flex-col gap-10">
    <header class="">
      <h1 class="text-[#000000] text-center text-[20px] font-Satoshi700">
        Your details have been Updated Successfully
      </h1>
    </header>
    <div class="flex justify-center">
      <button
        @click="next"
        class="bg-brand text-center font-Satoshi400 cursor-pointer rounded-md px-6 text-gray-100 py-3"
      >
        Proceed to Dashboard
      </button>
    </div>
  </div>
</template>

<script setup>
import { useOnboardingStore } from "@/stores/onBoarding";
import { storeToRefs } from "pinia";
const OnboardingStore = useOnboardingStore();

const { step } = storeToRefs(OnboardingStore);
const emit = defineEmits("next");

const next = () => {
  emit("next", step.value + 1);
};
</script>
