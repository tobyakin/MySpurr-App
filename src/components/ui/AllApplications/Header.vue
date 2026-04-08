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
                alt=""
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
              <p class="text-[22.805px] font-normal flex text-[#000]">
                {{ props?.JobDetails?.company?.business_name }}
              </p>
              <div class="flex mt-1 gap-1">
                <VerifyIcon class="w-4" />
                <p class="text-[11.633px] font-satoshi700 text-[#000000B2]">
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
            class="lg:text-[26.625px] capitalize text-[19px] font-medium text-[#000000]"
          >
            {{ props?.JobDetails?.job_title }}
          </p>
        </div>
        <div class="flex justify-between lg:mt-2 mt-6">
          <div class="flex gap-3 flex-wrap items-center">
            <div
              v-for="skill in props?.JobDetails?.skills"
              :key="skill"
              class="bg-[#2F929C] font-medium text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
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
        <p class="text-[#244034c5] text-[17.104px] font-normal">Salary</p>
        <p class="text-[#244034] text-[14.104px] font-medium">
          {{ store.abbr(props?.JobDetails?.salary_min) }}-
          {{ store.abbr(props?.JobDetails?.salary_max) }}/
          {{ props?.JobDetails?.salaray_type }}
        </p>
      </div>
      <!-- <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-normal">Skill</p>
        <p class="text-[#244034] text-[17.104px] font-medium">
          {{ props?.JobDetails?.qualification }}
        </p>
      </div> -->
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-normal">Location</p>
        <p class="text-[#244034] text-[14.104px] font-medium">
          {{ props?.JobDetails?.state }},
          {{ props?.JobDetails?.country }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-normal">Experience</p>
        <p class="text-[#244034] text-[14.104px] font-medium">
          {{ props?.JobDetails?.experience }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-normal">Availabilty</p>
        <p class="text-[#244034] text-[14.104px] capitalize font-medium">
          {{ props?.JobDetails?.job_type }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-normal">Date</p>
        <p class="text-[#244034] text-[14.104px] font-medium">
          {{ props?.JobDetails?.date_created }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, watch, ref } from "vue";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import { useTabStore } from "@/stores/tab";

const store = useTabStore();
const imageExists = ref(false);
const initials = ref("");

const props = defineProps({ 
  JobDetails: {
    type: Object,
    default: () => ({ company: {} })
  }
});

function checkImageExists(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Simplified setInitials with safety
function setInitials(name) {
  try {
    if (!name || typeof name !== 'string') {
      initials.value = '';
      return;
    }
    
    initials.value = name
      .split(" ")
      .filter(word => word && word.length > 0)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  } catch (error) {
    console.error('Error setting initials:', error);
    initials.value = '';
  }
}

// Simplified update function
async function updateImageExists() {
  try {
    const companyLogo = props?.JobDetails?.company?.company_logo;
    const businessName = props?.JobDetails?.company?.business_name || '';
    
    if (companyLogo) {
      imageExists.value = await checkImageExists(companyLogo);
      if (!imageExists.value) {
        setInitials(businessName);
      }
    } else {
      imageExists.value = false;
      setInitials(businessName);
    }
  } catch (error) {
    console.error('Error updating image:', error);
    imageExists.value = false;
    setInitials('');
  }
}

// Watch with immediate execution
watch(() => props.JobDetails, (newVal) => {
  if (newVal) {
    updateImageExists();
  }
}, { immediate: true, deep: true });

function getImageSrc() {
  return props?.JobDetails?.company?.company_logo || '';
}

function handleImageError() {
  console.error("Image loading error");
  const businessName = props?.JobDetails?.company?.business_name;
  setInitials(businessName || '');
}

const displayImage = computed(() => imageExists.value);
</script>
