<script setup>
import { onMounted } from "vue";
import CalenderIcon from "@/components/icons/outlineCalenderIcon.vue";
import LocationIcon from "@/components/icons/locationIcon.vue";
import TimerIcon from "@/components/icons/timerIcon.vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import CircleBookMarkIcon from "@/components/icons/circleBookMarkIcon.vue";
import SearchIcon from "@/components/icons/circleSearchIcon.vue";
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
  source = import.meta.env.VITE_LANDING_PAGE + `job-details/` + props?.job.slug;
});

// let source = window.location.href;
const { copy, copied, isSupported } = useClipboard({ source });
const copyUrl = () => {
  if (isSupported) {
    if (copied) {
      copy(source);
      toast.success("Job link copied", {
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
  <div class="border-[#254035AB] bg-white border-[0.735px] rounded-[7.347px] p-4">
    <div class="flex gap-3 mb-5">
      <img src="@/assets/image/jobIcon.svg.logo" alt="" />
      <div>
        <p class="text-[13.021px] font-Satoshi500 text-[#2F929C]">
          {{ props?.job?.company?.business_name }}
        </p>
        <p class="text-[13.021px] font-Satoshi500 text-[#000000]">
          {{ props?.job?.job_title }}
        </p>
        <div class="flex flex-wrap items-center mt-2 gap-2">
          <div
            class="flex gap-1 items-center text-[10.334px] text-[#DA5252] font-Satoshi500"
          >
            <CalenderIcon /><span class=""> {{ props?.job?.date_created }} </span>
          </div>
          <div
            class="flex gap-[2px] items-center text-[10.334px] text-[#DA5252] font-Satoshi500"
          >
            <LocationIcon /><span class=""
              >{{ props?.job?.state }}, {{ props?.job?.country }}</span
            >
          </div>
          <!-- <div
            class="flex gap-1 items-center text-[10.334px] text-[#DA5252] font-Satoshi500"
          >
            <TimerIcon /><span class="">Anytime</span>
          </div> -->
        </div>
      </div>
    </div>
    <hr class="text-[#EAEAEA]" />
    <div class="flex flex-col justify-between mt-5">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-[17.633px] font-Satoshi500 text-[#244034B2]">
            {{ store.abbr(props?.job?.salary_min) }}-
            {{ store.abbr(props?.job?.salary_max) }}/
            {{ props?.job?.salaray_type }}
          </p>
          <div class="flex mt-1 gap-1">
            <VerifyIcon class="" />
            <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
              Verified Client.
            </p>
          </div>
        </div>
        <div>
          <div
            class="bg-[#EDF0B8] font-Satoshi500 flex items-center text-[9.708px] p-2 px-6 text-[#000000] rounded-full"
          >
            {{ props?.job?.job_type }}
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-7">
        <button
          @click="redirectToJobDetails(job?.id)"
          :disabled="props?.job.application_status === 'applied'"
          :class="
            props?.job?.application_status === 'applied'
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#43D0DF] btn-hover-1'
          "
          class="font-Satoshi500 capitalize text-[9.708px] p-3 px-7 text-white rounded-full"
        >
          <span v-if="props?.job?.application_status === 'applied'">
            {{ props?.job?.application_status }}
          </span>
          <span v-else>Apply</span>
        </button>

        <div class="flex gap-2 flex-row">
          <button class="">
            <CircleBookMarkIcon />
          </button>
          <button @click="copyUrl" class="">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
