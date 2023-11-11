<script setup>
import { ref } from "vue";
import chartCalenderIcon from "@/components/icons/chartCalenderIcon.vue";
import TransactionCard from "./TransactionCard.vue";
let dataValue = ref([
  {
    type: "debit",
    status: "completed",
    date: "Withdraw",
    price: "Withdraw",
    tile: "Withdraw",
  },
  {
    type: "credit",
    status: "failed",
    date: "Withdraw",
    price: "Withdraw",
    tile: "Withdraw",
  },
  {
    type: "credit",
    status: "pending",
    date: "Withdraw",
    price: "Withdraw",
    tile: "Withdraw",
  },
  {
    type: "debit",
    status: "completed",
    date: "Withdraw",
    price: "Withdraw",
    tile: "Withdraw",
  },
  {
    type: "credit",
    status: "failed",
    date: "Withdraw",
    price: "Withdraw",
    tile: "Withdraw",
  },
]);

const isDropdownOpen = ref(false);
const selectedOption = ref("All Transactions");
const options = ref(["All Transactions", "Debit Transactions", "Credit Transactions"]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isDropdownOpen.value = false;
};
</script>
<template>
  <div
    class="bg-[#ECFAFC] border-[#254035AB] lg:p-[28px] flex flex-col gap-[30px] p-[19px] border-[0.567px] rounded-[10px]"
  >
    <div class="flex lg:flex-row flex-col items-center gap-3 justify-between">
      <h4 class="text-[20px text-[#000000] font-Satoshi700">Recent Transactions</h4>
      <div class="flex items-center relative gap-3">
        <button
          @click="toggleDropdown"
          class="p-2 py-1.5 text-[#01181B] flex-row gap-1 font-Satoshi700 bg-[#E6F1F3] items-center lg:text-[12px] text-[10px] border-[#254035AB] border-[1px] rounded-[10px] flex"
        >
          {{ selectedOption }}
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
        <ul
          v-if="isDropdownOpen"
          class="absolute bg-white top-12 w-40 flex flex-col z-10 rounded-[10px] shadow-lg"
        >
          <li
            :class="[
              index === 0 || index === 1 ? 'border-b-[#254035AB] border-b-[0.5px]' : '',
              (index === 2 && 'rounded-b-[10px]') || (index === 0 && 'rounded-t-[10px]'),
            ]"
            v-for="(option, index) in options"
            :key="option"
            @click="selectOption(option)"
            class="py-2 cursor-pointer hover:bg-[#ECFAFC] px-3 text-[12px]"
          >
            {{ option }}
          </li>
        </ul>
        <button
          class="p-2 py-1.5 text-[#01181B] flex-row gap-1 font-Satoshi700 bg-[#E6F1F3] items-center lg:text-[12px] text-[10px] border-[#254035AB] border-[1px] rounded-[10px] flex"
        >
          <chartCalenderIcon />
          Last 7 Days
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
    <div class="h-[50vh] flex flex-col gap-[10px] overflow-y-auto hide-scrollbar">
      <TransactionCard :items="i" v-for="i in dataValue" :key="i" />
    </div>
  </div>
</template>
