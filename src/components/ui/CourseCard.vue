<script setup>
import PeopleIcon from "@/components/icons/PeopleIcon.vue";
import ThumbsUp from "@/components/icons/thumbsUp.vue";
</script>
<template>
  <div
    class="border-[#254035AB] bg-[#F0F3C4] border-[0.735px] rounded-[7.347px] p-4 py-[1.1rem]"
  >
    <div class="">
      <div class="flex gap-3 mb-3">
        <div class="">
          <p class="text-[13.837px] font-Satoshi500 overflow-hidden text-[#000000]">
            The Art of Sketching: Transform <br />
            Your Doodles into Art
          </p>
          <p class="text-[9.224px] font-Satoshi500 text-[#993939]">
            MySpurr <span class="pl-2">Abuja, Nigeria.</span>
          </p>
        </div>
        <div class="font-Satoshi500 text-[16.708px] p-2 px-0 text-[#000000] rounded-full">
          $9.98
        </div>
      </div>
      <div class="flex justify-between gap-3">
        <div class="flex gap-3 items-center">
          <p class="text-[6.228px] font-Satoshi500 flex items-center">
            <PeopleIcon /> 12000
          </p>
          <p class="text-[6.228px] font-Satoshi500 flex items-center"><ThumbsUp /> 67%</p>
        </div>
        <button
          class="bg-transparent border-[#4B7226] border-[0.769px] font-Satoshi500 text-[7.495px] p-2 px-6 text-[#000000] rounded-full"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>
