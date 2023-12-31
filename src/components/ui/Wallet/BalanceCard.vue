<script setup>
import WithdrawIcon from "@/components/icons/withdrawIcon.vue";
import SettingsIcon from "@/components/icons/settingsIcon.vue";
import AddFundsIcon from "@/components/icons/AddFundsIcon.vue";
const emit = defineEmits(["goToWithdraw"]);

const goToWithdraw = () => {
  emit("goToWithdraw");
};
defineProps({
  hide: Boolean,
  balance: String,
});
</script>
<template>
  <div
    class="bg-[#EDF0B8] border-[#254035AB] flex flex-col gap-2 justify-between text-center lg:p-[32px] p-[20px] border-[0.567px] rounded-[10px]"
  >
    <div>
      <p class="text-[#000000] text-[18px] font-Satoshi400">Your Total Balance</p>
      <div class="flex flex-row justify-center gap-2">
        <span>&#8358;</span>
        <h4
          class="lg:text-[56px] text-[40px] text-[#000000] font-EBGaramond500 leading-[63.84px]"
        >
          {{ balance }}
        </h4>
        <button class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M3.31597 6.85214C2.54672 7.76152 1.95971 8.83001 1.61133 10.0012C2.68741 13.615 6.03529 16.25 9.99861 16.25C10.8258 16.25 11.6261 16.1352 12.3846 15.9207M5.18905 5.18969C6.56927 4.27965 8.22245 3.75 9.99935 3.75C13.9627 3.75 17.3106 6.38504 18.3866 9.99877C17.7934 11.9932 16.5082 13.6898 14.8094 14.81M5.18905 5.18969L2.49936 2.5M5.18905 5.18969L8.2316 8.23223M14.8094 14.81L17.4994 17.5M14.8094 14.81L11.7671 11.7678M11.7671 11.7678C12.2195 11.3154 12.4994 10.6904 12.4994 10C12.4994 8.61929 11.3801 7.5 9.99936 7.5C9.30901 7.5 8.68401 7.77982 8.2316 8.23223M11.7671 11.7678L8.2316 8.23223"
              stroke="#2B8C97"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <p class="text-[#6C8285] font-Satoshi400 leading-[27.734px] text-[16px]">
        September 27 2023 04:30PM
      </p>
    </div>
    <div
      v-if="hide"
      class="lg:p-[20px] p-[12px] bg-[#ECFAFC] rounded-[10px] flex flex-row gap-[10px] lg:gap-[20px]"
    >
      <button
        @click="goToWithdraw"
        class="bg-white flex flex-col w-full gap-1 text-center items-center justify-center rounded-[10px] p-[10px]"
      >
        <WithdrawIcon />

        <p class="text-[#000000] font-Satoshi500 text-[10px] leading-[18px]">Withdraw</p>
      </button>
      <button
        class="bg-white flex flex-col w-full gap-1 text-center items-center justify-center rounded-[10px] p-[10px]"
      >
        <AddFundsIcon />
        <p class="text-[#000000] font-Satoshi500 text-[10px] leading-[18px]">Add Funds</p>
      </button>
      <button
        class="bg-white flex flex-col w-full gap-1 text-center items-center justify-center rounded-[10px] p-[10px]"
      >
        <SettingsIcon />

        <p class="text-[#000000] font-Satoshi500 text-center text-[10px] leading-[18px]">
          Settings
        </p>
      </button>
    </div>
  </div>
</template>
<style></style>
