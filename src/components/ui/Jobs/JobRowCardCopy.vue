<script setup>
import CalenderIcon from "@/components/icons/outlineCalenderIcon.vue";
import LocationIcon from "@/components/icons/locationIcon.vue";
import TimerIcon from "@/components/icons/timerIcon.vue";
import CircleBookMarkIcon from "@/components/icons/circleBookMarkIcon.vue";
import SearchIcon from "@/components/icons/circleSearchIcon.vue";
import MatchIcon from "@/components/icons/matchIcon.vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useTabStore } from "@/stores/tab";
import { useNumberFomateStore } from "@/stores/numberFomate";
let numAbbr = useNumberFomateStore();

const store = useTabStore();

const redirectToJobDetails = (id) => {
  router.push({ name: "view-jobs", params: { id } });
};
defineProps({
  job: Object,
});
</script>
<template>
  <div
    class="border-[#254035AB] border-[0.735px] bg-white rounded-[7.347px] lg:p-5 p-4 lg:px-6"
  >
  
    <div class="flex lg:flex-row flex-col gap-3 w-full">

      <div class="h-[3.4rem] w-[3.4rem] rounded-[100%] overflow-hidden">
        <img
          v-if="job?.company?.logo !== null"
          class=" object-cover h-full w-full"
          :src="job?.company?.logo"
          alt="Company Logo"
        />
        <img
          v-else
          class="h-full w-full"
          src="@/assets/image/jobIcon.svg"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="flex items-center gap-1">
          <p class="text-[13.021px] font-Satoshi500 flex text-[#2F929C]">
            {{ job?.company?.business_name }}
          </p>
          <div v-if="job?.verify" class="flex mt-1 gap-1">
            <VerifyIcon class="w-4" />
            <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
              Verified Client.
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-3">
          <div
            class="flex items-center w-full lg:w-auto lg:justify-normal justify-between gap-14"
          >
            <p class="text-[13.021px] font-Satoshi500 text-[#000000]">
              {{ job?.job_info?.job_title }}
            </p>
            <button
              class="bg-[#EDF0B8] font-Satoshi500 capitalize lg:text-[9.708px] text-[6px] p-2 lg:px-6 text-[#000000] rounded-full"
            >
              {{ job?.job_info?.job_type }}
            </button>
          </div>
          <a
            v-if="job?.match"
            class="font-Satoshi500 text-[11.74px] flex items-center gap-1 text-[#000000]"
          >
            <MatchIcon />You’re a Match
          </a>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div class="flex lg:flex-row flex-col gap-4 items-center">
            <div>
              <!-- {{ job }} -->
              <p class="text-[1.102rem] font-Satoshi500 text-[#244034B2]">
                <span v-html="numAbbr.formatCurrency(job?.job_info?.currency)"></span> {{ store.abbr(job?.job_info?.salary_min) }}-{{
                  store.abbr(job?.job_info?.salary_max)
                }}/
                {{ job?.job_info?.salaray_type }}
              </p>
            </div>
            <div class="flex gap-2 items-center">
              <div
                class="flex gap-1 text-[0.625rem] lg:text-[0.89rem] text-[#DA5252] items-center font-Satoshi500"
              >
                <CalenderIcon /><span class="py-[0.25px]">{{
                  // job?.job_info?.weekly_hours
                  job?.job_info?.created_at
                }}</span>
              </div>
              <div
                class="flex gap-1 text-[0.625rem] lg:text-[0.89rem] text-[#DA5252] items-center font-Satoshi500"
              >
                <LocationIcon /><span class="py-[0.25px]"
                  >{{ job?.job_info?.state_id }}, {{ job?.job_info?.country_id }}</span
                >
              </div>
              <!-- <div
                class="flex gap-1 text-[10px] lg:text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <TimerIcon /><span class="py-[0.25px]"></span>
              </div> -->
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-between mt-2">
            <div class="flex flex-wrap gap-3 items-center">
              <div
                v-for="skill in job?.job_info?.skills"
                :key="skill"
                class="bg-[#F2F3EF] font-Satoshi500 text-[0.625rem] lg:text-[0.758rem] uppercase p-[4px] lg:px-6 px-4 text-[#64665D] rounded-full"
              >
                {{ skill.name }}
              </div>
            </div>

            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-4"
            >
              <div class="flex items-center gap-4">
                <button class="">
                  <CircleBookMarkIcon class="hover:text-[#2F929C] transition" />
                </button>
                <button class="">
                  <SearchIcon class="hover:!text-[#2F929C] transition" />
                </button>
              </div>
              <button
                class="bg-[#43D0DF] font-Satoshi500 capitalize text-[0.638rem] p-3 px-12 text-white rounded-full"
              >
                {{ job?.status }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <hr class="text-[#EAEAEA]" /> -->
  </div>
</template>
