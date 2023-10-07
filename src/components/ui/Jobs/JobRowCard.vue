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

const redirectToJobDetails = (id) => {
  router.push({ name: "view-jobs", params: { id } });
};
defineProps({
  job: Object,
});
</script>
<template>
  <div class="border-[#254035AB] border-[0.735px] rounded-[7.347px] p-5 px-6">
    <div class="flex gap-3 w-full">
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
          <div class="flex items-center gap-14">
            <p class="text-[13.021px] font-Satoshi500 text-[#000000]">
              {{ job.job_title }}
            </p>
            <button
              class="bg-[#EDF0B8] font-Satoshi500 text-[9.708px] p-2 px-6 text-[#000000] rounded-full"
            >
              {{ job.employee_type }}
            </button>
          </div>
          <a
            v-if="job.match"
            class="font-Satoshi500 text-[11.74px] flex items-center gap-1 text-[#000000]"
          >
            <MatchIcon />You’re a Match
          </a>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div class="flex gap-4 items-center">
            <div>
              <p class="text-[17.633px] font-Satoshi500 text-[#244034B2]">
                {{ job.rate }}
              </p>
            </div>
            <div class="flex gap-2 items-center">
              <div
                class="flex gap-1 text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <CalenderIcon /><span class="py-[0.25px]">{{ job.weekly_hours }}</span>
              </div>
              <div
                class="flex gap-[2px] text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <LocationIcon /><span class="py-[0.25px]">{{ job.location }}</span>
              </div>
              <div
                class="flex gap-1 text-[14.334px] text-[#DA5252] items-center font-Satoshi500"
              >
                <TimerIcon /><span class="py-[0.25px]">Anytime</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-2">
            <div class="flex gap-3 items-center">
              <div
                v-for="skill in job.skills"
                :key="skill"
                class="bg-[#F2F3EF] font-Satoshi500 text-[12.135px] uppercase p-[4px] px-6 text-[#64665D] rounded-full"
              >
                {{ skill.name }}
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
                @click="redirectToJobDetails(1)"
                class="bg-[#43D0DF] font-Satoshi500 text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <hr class="text-[#EAEAEA]" /> -->
  </div>
</template>
