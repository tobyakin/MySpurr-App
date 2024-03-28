<script setup>
import CalenderIcon from "@/components/icons/outlineCalenderIcon.vue";
import LocationIcon from "@/components/icons/locationIcon.vue";
import TimerIcon from "@/components/icons/timerIcon.vue";
import defultLogo from "@/assets/image/jobIcon.svg";
import { useNumberFomateStore } from "@/stores/numberFomate";
import { useTabStore } from "@/stores/tab";
const store = useTabStore();
let numAbbr = useNumberFomateStore();

defineProps({
  job: Object,
});
</script>
<template>
  <div
    class="border-[#254035AB] border-[0.735px] relative rounded-[7.347px] h-[54vh] p-4"
  >
    <div class="flex items-center gap-3 mb-5">
      <div class="w-[50px] h-[50px] bg-[#EAEAEA] rounded-full object-contain">
        <img
          class="h-[50px] w-[50px] rounded-full object-cover bg-brand"
          :src="job?.company.company_logo ? job?.company.company_logo : defultLogo"
          alt=""
        />
      </div>
      <div class="flex justify-between items-center w-full">
        <p class="text-[13.021px] font-Satoshi500 text-[#2F929C]">
          {{ job?.company.business_name }}
        </p>
        <div
          class="bg-[#EDF0B8] font-Satoshi500 text-[10.708px] capitalize p-2 px-4 text-[#000000] rounded-full"
        >
          {{ job?.job_type }}
        </div>
      </div>
    </div>
    <hr class="text-[#EAEAEA]" />
    <div class="flex flex-col justify-normal lg:h-[35vh] overflow-hidden mt-5">
      <div class="flex justify-between">
        <div class="flex flex-col w-full gap-2">
          <div class="flex flex-row justify-between gap-2">
            <p class="!text-[20.419px] font-Satoshi500 text-[#000000]">
              {{ job?.job_title }}
            </p>
            <p
              class="text-[10.988px] capitalize font-Satoshi500 flex items-center text-[#244034B2]"
            >
              <span v-html="numAbbr.formatCurrency(job?.currency)"></span>

              {{ store.abbr(job?.salary_min) }}- {{ store.abbr(job?.salary_max) }}/
              {{ job?.salaray_type }}
            </p>
          </div>
          <div class="flex gap-2">
            <div
              class="flex gap-1 items-center text-[10.334px] text-[#DA5252] font-Satoshi500"
            >
              <CalenderIcon /><span class="py-[0.25px]">{{ job?.date_created }}</span>
            </div>
            <div
              class="flex items-center gap-[2px] text-[10.334px] text-[#DA5252] font-Satoshi500"
            >
              <LocationIcon /><span class="py-[0.25px]"
                >{{ job?.state }}, {{ job?.country }}</span
              >
            </div>
            <div
              class="flex items-center gap-1 text-[10.334px] text-[#DA5252] font-Satoshi500"
            >
              <TimerIcon /><span class="py-[0.25px]">Anytime</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between h-full">
        <div class="flex gap-4 flex-wrap my-[17.512px]">
          <div
            v-for="i in job?.skills"
            :key="i"
            class="bg-[#FBEEEE] font-Satoshi500 text-[9.708px] p-2 px-4 text-[#000000] rounded-full"
          >
            {{ i.name }}
          </div>
        </div>
        <div class="flex flex-col gap-2 text-left mt-[2px]">
          <!-- <div class="bg-[#E6F1F3] rounded-lg w-full">
          <div
            :style="`width: ${parseInt((50 / 100) * 100)}%`"
            class="h-[7px] rounded-lg bg-[#2B8C97]"
          ></div>
        </div> -->
          <p class="text-[10.252px] font-Satoshi500 leading-[15.6px] text-[#000000]">
            {{ job?.applicants }} Applied

            <!-- <span class="text-[#6C8285]">of 10 Capacity</span> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
