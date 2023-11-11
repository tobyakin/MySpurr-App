<script setup>
import { ref } from "vue";
import Tab from "./Tab.vue";
import BalanceCard from "@/components/ui/Wallet/BalanceCard.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
const emit = defineEmits("goToWallet");
let amount = ref(null);

const goToWallet = () => {
  emit("goToWallet");
};
</script>
<template>
  <div>
    <div>
      <button
        @click="goToWallet"
        class="flex items-center gap-3 text-[#2C4C50] font-Satoshi400 text-[16px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_3130_11959)">
            <path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#007582"
            />
          </g>
          <defs>
            <clipPath id="clip0_3130_11959">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Back
      </button>
    </div>
    <Tab>
      <template #tab1> Withdraw </template>
      <template #tab2> Add Funds </template>
      <template #tab3> Settings </template>
      <template #view1
        ><div class="flex flex-col gap-[60px]">
          <div>
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Withdraw Funds
            </h3>
          </div>
          <div class="flex lg:flex-row flex-col items-center gap-[100px]">
            <BalanceCard :hide="false" class="lg:w-[90%] w-full h-auto" />
            <div class="w-full">
              <div class="flex flex-col gap-[12px]">
                <label
                  class="!text-[#254035] px-2 text-[16px] leading-[37.234px] font-Satoshi400"
                  >How much are you withdrawing?</label
                >
                <GlobalInput
                  inputClasses="bg-transparent !py-3"
                  placeholder=""
                  type="text"
                  v-model="amount"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row w-full">
            <button
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div></template
      >
      <template #view2>oo</template>
      <template #view3>ooo</template>
    </Tab>
  </div>
</template>
