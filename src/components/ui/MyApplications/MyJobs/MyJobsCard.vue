<script setup>
import { ref, defineAsyncComponent } from "vue";
import CalenderIcon from "@/components/icons/outlineCalenderIcon.vue";
import LocationIcon from "@/components/icons/locationIcon.vue";
import TimerIcon from "@/components/icons/timerIcon.vue";
import CircleBookMarkIcon from "@/components/icons/circleBookMarkIcon.vue";
import SearchIcon from "@/components/icons/circleSearchIcon.vue";
import CopyIcon from "@/components/icons/copyIcon.vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import { useRouter } from "vue-router";
import VueSlider from "vue-slider-component";
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);

const router = useRouter();
const value = ref(0);
const redirectToJobDetails = (id) => {
  router.push({ name: "view-jobs", params: { id } });
};
defineProps({
  job: Object,
});
</script>
<template>
  <div class="border-[#254035AB] border-[0.735px] bg-white rounded-[7.347px] p-5 px-6">
    <div class="flex lg:flex-row flex-col gap-3 w-full">
      <div>
        <img
          v-if="job.company_image !== null"
          class="h-[61.011px] w-[61.011px] rounded-full"
          :src="job.company_image"
          alt=""
        />
        <img
          v-else
          class="h-[61.011px] w-[61.011px] rounded-full"
          src="@/assets/image/jobIcon.svg"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="flex items-center gap-1">
          <p class="text-[13.021px] font-Satoshi500 flex text-[#2F929C]">
            {{ job.company_name }}
          </p>
          <div v-if="job.verify" class="flex mt-1 gap-1">
            <VerifyIcon class="w-4" />
            <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
              Verified Client.
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between w-full gap-3">
          <div class="flex lg:items-center justify-between gap-14">
            <p class="lg:text-[20.128px] text-[13px] font-Satoshi700 text-[#000000]">
              {{ job.job_title }}
            </p>
            <button
              class="bg-[#EDF0B8] font-Satoshi500 text-[9.708px] p-2 lg:px-6 px-2 text-[#000000] rounded-full"
            >
              {{ job.employee_type }}
            </button>
          </div>
          <!-- <a
            v-if="job.match"
            class="font-Satoshi500 text-[11.74px] flex items-center gap-1 text-[#000000]"
          >
            <MatchIcon />You’re a Match
          </a> -->
        </div>
        <div class="flex flex-col justify-between mt-2">
          <div class="flex lg:flex-row flex-col gap-4 items-center">
            <div>
              <p class="text-[17.239px] font-Satoshi500 text-[#244034E5]">
                {{ job.rate }}
              </p>
            </div>
            <div class="flex gap-2 items-center">
              <div
                class="flex gap-1 text-[10px] lg:text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <CalenderIcon /><span class="py-[0.25px]">{{ job.weekly_hours }}</span>
              </div>
              <div
                class="flex gap-1 text-[10px] lg:text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <LocationIcon /><span class="py-[0.25px]">{{ job.location }}</span>
              </div>
              <div
                class="flex gap-1 text-[10px] lg:text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <TimerIcon /><span class="py-[0.25px]">Anytime</span>
              </div>
            </div>
          </div>

          <vue-slider class="w-full mt-8" v-model="value" :tooltip="'always'">
            <template v-slot:tooltip="{ value, focus }">
              <div
                class="bg-[#84B358] px-[9.33px] py-[4.2px] text-[#FBFBEE] font-Satoshi700 text-[14.331px] rounded-full"
                :class="['custom-tooltip', { focus }]"
              >
                {{ value }}%
              </div>
            </template>
          </vue-slider>
          <hr class="text-[#EAEAEA] my-[23px]" />

          <div class="flex lg:flex-row flex-col gap-8">
            <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Project Status"
              name="Name"
              :items="['In Progress', 'Pending Approval', 'On Hold']"
              placeholder="Project Status"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
            ></SelectGroup>
            <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Deadline"
              name="Name"
              placeholder="Deadline Date"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
            ></SelectGroup>
            <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Payment Status"
              name="Name"
              :items="['Paid', 'Pending Payment', 'Milestone 1']"
              placeholder="Payment Status"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
            ></SelectGroup>
          </div>
          <div
            class="flex lg:flex-row flex-col items-center justify-between gap-4 mt-[39.94px]"
          >
            <button
              class="bg-[#43D0DF] font-Satoshi500 text-[11.573px] p-3 px-[15.58px] uppercase text-[#000000] rounded-full"
            >
              Message business
            </button>
            <div class="flex flex-wrap items-center gap-[12px]">
              <h4 class="text-[#000000] text-[16.142px] font-Satoshi500">Document</h4>
              <button class="">
                <CopyIcon />
              </button>
              <button class="">
                <CopyIcon />
              </button>
              <button class="">
                <CopyIcon />
              </button>
              <button class="">
                <CopyIcon />
              </button>
              <button class="">
                <CopyIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <hr class="text-[#EAEAEA]" /> -->
  </div>
</template>
<style>
.custom-tooltip {
  transform: translateY(5px);
}
.custom-tooltip.focus {
  font-weight: bold;
}
</style>
