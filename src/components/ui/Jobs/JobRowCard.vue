<script setup>
import { onMounted } from "vue";
import CalenderIcon from "@/components/icons/outlineCalenderIcon.vue";
import LocationIcon from "@/components/icons/locationIcon.vue";
import TimerIcon from "@/components/icons/timerIcon.vue";
import CircleBookMarkIcon from "@/components/icons/circleBookMarkIcon.vue";
import SearchIcon from "@/components/icons/circleSearchIcon.vue";
import MatchIcon from "@/components/icons/matchIcon.vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import { useRouter } from "vue-router";
import { useTabStore } from "@/stores/tab";
import { useClipboard } from "@vueuse/core";
import { useToast } from "vue-toastification";
const toast = useToast();

const store = useTabStore();

const router = useRouter();

const redirectToJobDetails = (id) => {
  router.push({ name: "view-jobs", params: { id } });
};
const props = defineProps({
  job: Object,
});
let source = "";

onMounted(() => {
  source = import.meta.env.VITE_LANDING_PAGE + `job-details/` + props?.job?.id;
});

// let source = window.location.href;
const { copy, copied, isSupported } = useClipboard({ source });
const copyUrl = () => {
  if (isSupported) {
    if (copied) {
      copy(source);
      toast.success("Link Copied", {
        timeout: 4000,
      });
    }
  } else {
    toast.error("Your browser does not support Clipboard API", {
      timeout: 4000,
    });
  }
};
</script>
<template>
  <div
    class="border-[#254035AB] border-[0.735px] bg-white rounded-[7.347px] lg:p-5 p-4 lg:px-6"
  >
    <div
      class="flex lg:flex-row flex-col lg:justify-normal justify-center lg:items-start items-center gap-3 w-full"
    >
      <div>
        <div
          class="h-[3.81rem] w-[3.81rem] object-contain flex justify-center items-center rounded-full"
        >
          <img
            class="h-full w-full object-cover rounded-full"
            :src="props?.job?.company?.logo"
            :alt="props?.job?.company?.business_name"
          />
        </div>
      </div>
      <div class="w-full">
        <div class="flex lg:justify-start justify-center items-center gap-1">
          <p class="text-[0.81rem] font-Satoshi500 flex text-[#2F929C]">
            {{ props?.job?.company?.business_name }}
          </p>
          <div v-if="props?.job?.verify" class="flex mt-1 gap-1">
            <VerifyIcon class="w-4" />
            <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
              Verified Client.
            </p>
          </div>
        </div>
        <div
          class="flex flex-col lg:flex-row items-center lg:justify-between justify-center w-full gap-3"
        >
          <div
            class="flex items-center w-full lg:w-auto lg:justify-normal justify-center gap-2 lg:gap-14"
          >
            <p class="text-[0.81rem] font-Satoshi500 text-[#000000]">
              {{ props?.job?.job_title }}
            </p>
            <button
              class="bg-[#EDF0B8] font-Satoshi500 capitalize lg:text-[9.708px] text-[6px] p-2 lg:px-6 text-[#000000] rounded-full"
            >
              {{ props?.job?.job_type }}
            </button>
          </div>
          <a
            v-if="props?.job?.match"
            class="font-Satoshi500 text-[11.74px] flex items-center gap-1 text-[#000000]"
          >
            <MatchIcon />You’re a Match
          </a>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div class="flex lg:flex-row flex-col gap-4 items-center">
            <div>
              <p class="text-[1.1rem] font-Satoshi500 text-[#244034B2]">
                {{ props?.job?.currency }}
                {{ store.abbr(props?.job?.salary_min, 1) }}-
                {{ store.abbr(props?.job?.salary_max, 1) }}/
                {{ props?.job?.salaray_type || props?.job?.salary_type }}
              </p>
            </div>
            <div class="flex lg:flex-row flex-col gap-2 items-center">
              <div
                class="flex gap-1 text-[0.625rem] lg:text-[0.9rem] text-[#DA5252] items-center font-Satoshi500"
              >
                <CalenderIcon /><span class="py-[0.25px]">
                  {{ props?.job?.date_created }}
                </span>
              </div>
              <div
                class="flex gap-1 text-[0.625rem] lg:text-[0.9rem] text-[#DA5252] items-center font-Satoshi500"
              >
                <LocationIcon /><span class="py-[0.25px]"
                  >{{ props?.job?.state }}, {{ props?.job?.country }}</span
                >
              </div>
              <!-- <div
                class="flex gap-1 text-[0.625rem] lg:text-[0.9rem] text-[#DA5252] items-center font-Satoshi500"
              >
                <TimerIcon /><span class="py-[0.25px]">{{
                  props?.job.date_created
                }}</span>
              </div> -->
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-between mt-2">
            <div
              class="flex flex-wrap gap-3 lg:justify-normal justify-center items-center"
            >
              <div
                v-for="skill in props?.job?.skills"
                :key="skill"
                class="bg-[#F2F3EF] font-Satoshi500 text-[0.625rem] lg:text-[0.76rem] uppercase p-[4px] lg:px-6 px-4 text-[#64665D] rounded-full"
              >
                {{ skill?.name }}
              </div>
            </div>

            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-4"
            >
              <div class="flex items-center gap-4">
                <button class="">
                  <CircleBookMarkIcon class="hover:!text-[#2F929C] transition" />
                </button>
                <button @click="copyUrl" class="">
                  <SearchIcon class="hover:!text-[#2F929C] transition" />
                </button>
              </div>
              <button
                :disabled="props?.job?.application_status === 'applied'"
                @click="redirectToJobDetails(props?.job?.id)"
                :class="
                  props?.job?.application_status === 'applied'
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#43D0DF] btn-hover-1'
                "
                class="font-Satoshi500 text-[9.708px] p-3 px-12 text-white rounded-full capitalize"
              >
                <span v-if="props?.job?.application_status === 'applied'">
                  {{ props?.job?.application_status }}
                </span>
                <span v-else>Apply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <hr class="text-[#EAEAEA]" /> -->
  </div>
</template>
