<template>
  <div>
    <div class="flex flex-row gap-[18px] lg:py-10 py-6">
      <div class="flex lg:flex-row flex-col w-[40%] gap-3">
        <div>
          <img
            class="h-[61.011px] w-[61.011px] rounded-full"
            src="@/assets/image/jobIcon.svg"
            alt=""
          />
        </div>
        <div class="w-full">
          <div class="flex lg:flex-row flex-col gap-4 justify-between">
            <div class="w-full">
              <p class="text-[22.805px] font-Satoshi400 flex text-[#000]">
                {{ JobDetails?.company?.business_name }}...
              </p>
              <div class="flex mt-1 gap-1">
                <VerifyIcon class="w-4" />
                <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">Verified Client.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full justify-between">
        <div class="flex lg:flex-row flex-col gap-6 items-center justify-between w-full lg:gap-3">
          <p class="lg:text-[26.625px] capitalize text-[19px] font-Satoshi500 text-[#000000]">
            {{ JobDetails?.job_title }}...
          </p>
        </div>
        <div class="flex justify-between lg:mt-2 mt-6">
          <div class="flex gap-3 flex-wrap items-center">
            <div
              v-for="skill in 4"
              :key="skill"
              class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
            >
              {{ skill.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[#E9FAFB] border-[0.735px] flex lg:flex-row flex-col gap-5 justify-between rounded-[17.104px] p-6 lg:px-10"
    >
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Salary</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ store.abbr(JobDetails?.data?.salary_min) }}-
          {{ store.abbr(JobDetails?.data?.salary_max) }}/
          {{ JobDetails?.data?.salaray_type }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Skill</p>
        <p class="text-[#244034] text-[17.104px] font-Satoshi500">
          {{ JobDetails?.data?.qualification }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Location</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ JobDetails?.data?.state }},
          {{ JobDetails?.data?.country }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Experience</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ JobDetails?.data?.experience }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Availabilty</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ JobDetails?.data?.job_type }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Rating</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ JobDetails?.data?.date_created }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import VerifyIcon from '@/components/icons/verifyIcon.vue'

import { useTabStore } from '@/stores/tab'
const store = useTabStore()

defineProps({ JobDetails: Object })
</script>
