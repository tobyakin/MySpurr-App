<script setup>
import chartCalenderIcon from "@/components/icons/chartCalenderIcon.vue";
</script>
<template>
  <div
    class="bg-[#ECFAFC] border-[#254035AB] lg:p-[28px] p-[19px] border-[0.567px] rounded-[10px]"
  >
    <div class="flex lg:flex-row flex-col items-center gap-3 justify-between">
      <h4 class="text-[20px text-[#000000] font-Satoshi700">Recent Transactions</h4>
      <div class="flex items-center gap-3">
        <button
          class="p-2 py-1.5 text-[#01181B] flex-row gap-1 font-Satoshi700 bg-[#E6F1F3] items-center lg:text-[12px] text-[10px] border-[#254035AB] border-[1px] rounded-[10px] flex"
        >
          All Transactions
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
  </div>
</template>
<style></style>
