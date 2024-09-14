<script setup>
import { computed, onMounted, reactive, watch, ref } from 'vue'

import CalenderIcon from '@/components/icons/outlineCalenderIcon.vue'
import LocationIcon from '@/components/icons/locationIcon.vue'
import TimerIcon from '@/components/icons/timerIcon.vue'
import defultLogo from '@/assets/image/jobIcon.svg'
import { useNumberFomateStore } from '@/stores/numberFomate'
import { useTabStore } from '@/stores/tab'
const store = useTabStore()
let numAbbr = useNumberFomateStore()

const props = defineProps({
  job: Object
})
const jobData = computed(() => {
  return props?.job
})
const imageExists = ref(false)
const initials = ref('')
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

onMounted(async () => {
  await updateImageExists()
})

watch(jobData, async () => {
  await updateImageExists()
})

async function updateImageExists() {
  const hasImage = props?.job?.company?.company_logo
  if (hasImage) {
    const imageSrc = getImageSrc()
    imageExists.value = await checkImageExists(imageSrc)
    if (!imageExists.value) {
      setInitials(props?.job?.company?.business_name)
    }
  } else {
    imageExists.value = false
    setInitials(jobData.value?.company?.business_name)
  }
}

function setInitials(name) {
  initials.value = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function getImageSrc() {
  return jobData.value?.company?.company_logo
}

function handleImageError() {
  console.error('Image loading error')
  setInitials(jobData.value?.company?.business_name)
}

const displayImage = computed(() => imageExists.value)
</script>
<template>
  <div class="border-[#254035AB] border-[0.735px] relative rounded-[7.347px] min-h-[30vh] p-4">
    <div class="flex items-center gap-3 mb-5">
      <div>
        <div
          class="h-[40.508px] w-[40.508px] flex justify-center items-center rounded-full bg-brand"
        >
          <template v-if="displayImage">
            <img
              :src="getImageSrc()"
              class="h-[40.508px] w-[40.508px] rounded-full"
              @error="handleImageError"
            />
          </template>
          <template v-else>
            <div class="initials-container text-white font-bold">{{ initials }}</div>
          </template>

          <!-- <img
            class="h-[50px] w-[50px] rounded-full object-cover bg-brand"
            :src="
              props?.job?.company.company_logo
                ? props?.job?.company.company_logo
                : defultLogo
            "
            alt=""
          /> -->
        </div>
      </div>
      <div class="flex justify-between items-center w-full">
        <p class="text-[13.021px] font-Satoshi500 text-[#2F929C]">
          {{ props?.job?.company.business_name }}
        </p>
        <div
          class="bg-[#EDF0B8] font-Satoshi500 text-[10.708px] capitalize p-2 px-4 text-[#000000] rounded-full"
        >
          {{ props?.job?.job_type }}
        </div>
      </div>
    </div>
    <hr class="text-[#EAEAEA]" />
    <div class="flex flex-col justify-normal overflow-hidden mt-5">
      <div class="flex justify-between">
        <div class="flex flex-col w-full gap-2">
          <div class="flex flex-row justify-between gap-2">
            <p class="!text-[20.419px] font-Satoshi500 text-[#000000]">
              {{ props?.job?.job_title }}
            </p>
            <p
              class="text-[10.988px] capitalize font-Satoshi500 flex items-center text-[#244034B2]"
            >
              <span v-html="numAbbr.formatCurrency(props?.job?.currency)"></span>

              {{ store.abbr(props?.job?.salary_min) }}- {{ store.abbr(props?.job?.salary_max) }}/
              {{ props?.job?.salaray_type }}
            </p>
          </div>
          <div class="flex gap-2">
            <div class="flex gap-1 items-center text-[10.334px] text-[#DA5252] font-Satoshi500">
              <CalenderIcon /><span class="py-[0.25px]">{{ props?.job?.date_created }}</span>
            </div>
            <div class="flex items-center gap-[2px] text-[10.334px] text-[#DA5252] font-Satoshi500">
              <LocationIcon /><span class="py-[0.25px]"
                >{{ props?.job?.state }}, {{ props?.job?.country }}</span
              >
            </div>
            <!-- <div
              class="flex items-center gap-1 text-[10.334px] text-[#DA5252] font-Satoshi500"
            >
              <TimerIcon /><span class="py-[0.25px]">Anytime</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between h-full">
        <div class="flex gap-4 flex-wrap my-[17.512px]">
          <div
            v-for="i in props?.job?.skills"
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
            {{ props?.job?.applicants }} Applied

            <!-- <span class="text-[#6C8285]">of 10 Capacity</span> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
