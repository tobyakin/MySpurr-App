<template>
  <div>
    <div class="flex flex-row gap-[18px] lg:py-10 py-6">
      <div class="flex lg:flex-row flex-col w-[40%] gap-3">
        <div>
          <div
            class="h-[61.011px] w-[61.011px] flex justify-center items-center rounded-full bg-brand"
          >
            <template v-if="displayImage">
              <img
                :src="getImageSrc()"
                class="h-[61.011px] w-[61.011px] rounded-full"
                @error="handleImageError"
              />
            </template>
            <template v-else>
              <div class="initials-container text-white text-2xl font-bold">
                {{ initials }}
              </div>
            </template>

            <!-- <img
              class="h-[61.011px] w-[61.011px] rounded-full"
              :src="props?.JobDetails?.company?.company_logo"
              alt=""
            /> -->
          </div>
        </div>
        <div class="w-full">
          <div class="flex lg:flex-row flex-col gap-4 justify-between">
            <div class="w-full">
              <p class="text-[22.805px] font-Satoshi400 flex text-[#000]">
                {{ props?.JobDetails?.company?.business_name }}
              </p>
              <div class="flex mt-1 gap-1">
                <VerifyIcon class="w-4" />
                <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
                  Verified Client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full justify-between">
        <div
          class="flex lg:flex-row flex-col gap-6 items-center justify-between w-full lg:gap-3"
        >
          <p
            class="lg:text-[26.625px] capitalize text-[19px] font-Satoshi500 text-[#000000]"
          >
            {{ props?.JobDetails?.job_title }}
          </p>
        </div>
        <div class="flex justify-between lg:mt-2 mt-6">
          <div class="flex gap-3 flex-wrap items-center">
            <div
              v-for="skill in props?.JobDetails?.skills"
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
          {{ store.abbr(props?.JobDetails?.salary_min) }}-
          {{ store.abbr(props?.JobDetails?.salary_max) }}/
          {{ props?.JobDetails?.salaray_type }}
        </p>
      </div>
      <!-- <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Skill</p>
        <p class="text-[#244034] text-[17.104px] font-Satoshi500">
          {{ props?.JobDetails?.qualification }}
        </p>
      </div> -->
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Location</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ props?.JobDetails?.state }},
          {{ props?.JobDetails?.country }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Experience</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ props?.JobDetails?.experience }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Availabilty</p>
        <p class="text-[#244034] text-[14.104px] capitalize font-Satoshi500">
          {{ props?.JobDetails?.job_type }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Rating</p>
        <p class="text-[#244034] text-[14.104px] font-Satoshi500">
          {{ props?.JobDetails?.date_created }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, watch, ref } from "vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import { useTabStore } from "@/stores/tab";
const store = useTabStore();
const imageExists = ref(false);
const initials = ref("");

const props = defineProps({ JobDetails: Object });
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
const jobData = computed(() => {
  return props?.JobDetails;
});

onMounted(async () => {
  await updateImageExists();
});

watch(jobData, async () => {
  await updateImageExists();
});

async function updateImageExists() {
  const hasImage = props?.JobDetails?.company?.company_logo;
  if (hasImage) {
    const imageSrc = getImageSrc();
    imageExists.value = await checkImageExists(imageSrc);
    if (!imageExists.value) {
      setInitials(props?.JobDetails?.company?.business_name);
    }
  } else {
    imageExists.value = false;
    setInitials(jobData.value?.company?.business_name);
  }
}

function setInitials(name) {
  initials.value = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getImageSrc() {
  return jobData.value?.company?.company_logo;
}

function handleImageError() {
  console.error("Image loading error");
  setInitials(jobData.value?.company?.business_name);
}

const displayImage = computed(() => imageExists.value);
</script>
