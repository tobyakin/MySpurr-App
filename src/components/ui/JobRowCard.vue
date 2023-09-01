<script setup>
import CalenderIcon from "@/components/icons/outlineCalenderIcon.vue";
import LocationIcon from "@/components/icons/locationIcon.vue";
import TimerIcon from "@/components/icons/timerIcon.vue";
import CircleBookMarkIcon from "@/components/icons/circleBookMarkIcon.vue";
import SearchIcon from "@/components/icons/circleSearchIcon.vue";
import MatchIcon from "@/components/icons/matchIcon.vue";
</script>
<template>
  <div class="border-[#254035AB] border-[0.735px] rounded-[7.347px] p-4 px-10">
    <div class="flex gap-3 mb-5 w-full">
      <img src="@/assets/image/jobIcon.svg" alt="" />
      <div class="w-full">
        <p class="text-[13.021px] font-Satoshi500 text-[#2F929C]">MySpurr</p>
        <div class="flex items-center justify-between w-full gap-3">
          <div class="flex items-center gap-14">
            <p class="text-[13.021px] font-Satoshi500 text-[#000000]">
              Developer in java c++kk
            </p>
            <button
              class="bg-[#EDF0B8] font-Satoshi500 text-[9.708px] p-2 px-6 text-[#000000] rounded-full"
            >
              FREELANCE
            </button>
          </div>
          <a
            class="font-Satoshi500 text-[11.74px] flex items-center gap-1 text-[#000000]"
          >
            <MatchIcon />You’re a Match
          </a>
        </div>
      </div>
    </div>
    <hr class="text-[#EAEAEA]" />
    <div class="flex flex-col justify-between mt-5">
      <div class="flex gap-4 items-center">
        <div>
          <p class="text-[17.633px] font-Satoshi500 text-[#244034B2]">$30-$50/hour</p>
        </div>
        <div class="flex gap-3">
          <button
            class="bg-[#FBEEEE] font-Satoshi500 text-[6.708px] uppercase p-2 px-6 text-[#000000] rounded-full"
          >
            Brand identity
          </button>
          <button
            class="bg-[#FBEEEE] font-Satoshi500 text-[6.708px] uppercase p-2 px-6 text-[#000000] rounded-full"
          >
            UI/UI design
          </button>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <div class="flex gap-1 text-[10.334px] text-[#DA5252] font-Satoshi500">
            <CalenderIcon /><span class="py-[0.25px]">30 hrs/week</span>
          </div>
          <div class="flex gap-[2px] text-[10.334px] text-[#DA5252] font-Satoshi500">
            <LocationIcon /><span class="py-[0.25px]">Work from anywhere</span>
          </div>
          <div class="flex gap-1 text-[10.334px] text-[#DA5252] font-Satoshi500">
            <TimerIcon /><span class="py-[0.25px]">Anytime</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="">
            <CircleBookMarkIcon />
          </button>
          <button class="">
            <SearchIcon />
          </button>
          <button
            class="bg-[#43D0DF] font-Satoshi500 text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
