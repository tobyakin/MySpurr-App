<script setup>
import DownLoadIcon from "@/components/icons/DownLoadIcon.vue";
</script>
<template>
  <div>
    <div class="bg-[#fff] border-[#254035AB] border-[0.567px] rounded-[10px]">
      <div
        class="bg-[#FBEEEE] p-[32px] flex flex-col justify-center text-center rounded-t-[10px]"
      >
        <h3 class="text-[#993939] font-Satoshi400 leading-[37.234px] text-[18px]">
          WITHDRAWAL FROM WALLET
        </h3>
        <p
          class="text-[48px] flex flex-row justify-center gap-1 text-[#993939] font-Satoshi700"
        >
          <span class="line-through leading-[32px] text-[24px]">N</span>22,000
        </p>
        <p class="text-[#993939] text-[18px] font-Satoshi400 leading-[27.734px]">
          September 24 2023 04:30PM
        </p>
      </div>
      <div class="bg-[#fff] p-[32px] rounded-b-[10px]">
        <div class="flex justify-between flex-row">
          <p class="text-[#6C8285] text-[14px] font-Satoshi400 leading-[37.234px]">
            Status
          </p>
          <div class="flex items-center gap-2">
            <div class="h-[12px] w-[12px] bg-[#E06F6F] rounded-full"></div>
            <p
              class="text-[#01272C] capitalize font-Satoshi500 leading-[37.234px] text-[17px]"
            >
              failed
            </p>
          </div>
        </div>
        <div class="flex justify-between flex-row">
          <p class="text-[#6C8285] text-[14px] font-Satoshi400 leading-[37.234px]">
            Type
          </p>
          <p
            class="text-[#01272C] capitalize font-Satoshi500 leading-[37.234px] text-[14px]"
          >
            Withdrawal From Wallet
          </p>
        </div>
        <div class="flex justify-between flex-row">
          <p class="text-[#6C8285] text-[14px] font-Satoshi400 leading-[37.234px]">ID</p>
          <p
            class="text-[#01272C] capitalize font-Satoshi500 leading-[37.234px] text-[14px]"
          >
            7239heb82-28hdb3-09
          </p>
        </div>
        <div class="flex justify-between flex-row">
          <p class="text-[#6C8285] text-[14px] font-Satoshi400 leading-[37.234px]">
            Recipient
          </p>
          <p
            class="text-[#01272C] capitalize font-Satoshi500 leading-[37.234px] text-[14px]"
          >
            Joy Ahmed / 0920193833
          </p>
        </div>
        <div class="flex justify-end flex-row">
          <p class="text-[#6C8285] text-[17px] font-Satoshi400 leading-[37.234px]">
            Access Bank
          </p>
        </div>
      </div>
      <div
        class="pb-[32px] px-[32px] flex flex-row items-center text-[#007582] text-[16px] font-Satoshi500 gap-2 justify-end text-end rounded-t-[10px]"
      >
        <button>Download Receipt</button><DownLoadIcon />
      </div>
    </div>
  </div>
</template>
<style></style>
