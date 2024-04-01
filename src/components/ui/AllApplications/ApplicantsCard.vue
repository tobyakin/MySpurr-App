<template>
  <div
    :class="selected ? 'bg-[#2F929C]' : ''"
    class="border-[#2440341A] rounded-[6.919px] border-[1.794px] border-r-[#2F929C] border-r-[6.518px] relative p-4 lg:p-5"
  >
    <!-- <RatedBadge class="absolute h-[31.134px] w-[30.442px] top-0 left-0" /> -->
    <div>
      <div
        class="w-full flex lg:flex-row flex-col lg:justify-between justify-center gap-8 items-center"
      >
        <div
          class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-[19.19px]"
        >
          <div>
            <div
              class="relative h-[63.651px] flex justify-center items-center w-[63.651px] bg-brand rounded-full"
            >
              <template v-if="displayImage">
                <img
                  :src="getImageSrc()"
                  class="h-[60.651px] w-[60.651px] object-contain rounded-full"
                  @error="handleImageError"
                />
              </template>
              <template v-else>
                <h3 class="initials-container text-white text-2xl font-bold">
                  {{ initials }}
                </h3>
              </template>

              <!-- <img
              loading="lazy"
              :src="props?.talent?.image ? props?.talent?.image : Icon"
              class="h-[60.651px] w-[60.651px] object-contain rounded-full"
              alt=""
            /> -->
              <GreenIcon class="absolute top-1 right-1" />
            </div>
          </div>
          <div class="lg:text-left text-center">
            <p
              class="text-[#000000] text-[12.454px] capitalize font-Satoshi500 leading-[19.739px]"
            >
              {{ props?.talent?.first_name }} {{ props?.talent?.last_name }}
            </p>
            <p
              class="text-[#00000066] text-[10.378px] leading-[20.739px] font-Satoshi400"
            >
              {{ props?.talent?.skill_title }}
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-[9.686px] text-[#244034] font-Satoshi500">
                ${{ props?.talent?.rate }}/hr
              </p>
              <div class="h-[4px] bg-[#010101e2] w-[4px] rounded-full"></div>
              <p class="text-[#244034] text-[9.686px] font-Satoshi500">
                {{ props?.talent?.location }}
              </p>
            </div>
          </div>
        </div>
        <!-- <div>
          <div class="flex md:flex-row flex-col lg:items-start items-center gap-4">
            <div class="flex lg:justify-normal gap-4 items-center justify-center">
              <button><LoveIcon /></button><button><SearchIcon /></button>
            </div>
            <button class="btn-brand">Message</button>
          </div>
        </div> -->
      </div>
    </div>
    <div
      class="flex flex-row gap-[6px] w-full overflow-hidden mt-6 hide-scrollbar overflow-x-auto"
    >
      <img
        loading="lazy"
        v-for="item in props?.talent?.portfolio"
        :key="item.id"
        :src="item?.cover_image"
        class="h-[107.33px] w-[143.11px] flex flex-col object-cover rounded-lg"
        :alt="item?.title"
      />
    </div>
    <button
      @click="viewProfile(props?.talent?.talent_id)"
      class="flex items-center gap-4 mt-6"
    >
      <p class="text-[10.378px] font-Satoshi500 text-[#244034]">View Applicantion</p>
      <ArrowRight />
    </button>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, watch, ref } from "vue";

import RatedBadge from "@/components/icons/ratedBadge.vue";
import GreenIcon from "@/components/icons/greenIcon.vue";
import ArrowRight from "@/components/icons/arrowRight.vue";
import Icon from "@/assets/defultAvater.png";

const props = defineProps({
  talent: Object,
  selected: Boolean,
});
const emit = defineEmits(["viewProfile"]);

const viewProfile = (id) => {
  emit("viewProfile", id);
};
const imageExists = ref(false);
const initials = ref("");
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
const talentData = computed(() => {
  return props?.talent;
});

onMounted(async () => {
  await updateImageExists();
});

watch(talentData, async () => {
  await updateImageExists();
});

async function updateImageExists() {
  const hasImage = props?.talent?.image;
  if (hasImage) {
    const imageSrc = getImageSrc();
    imageExists.value = await checkImageExists(imageSrc);
    if (!imageExists.value) {
      setInitials(props?.talent?.first_name);
    }
  } else {
    imageExists.value = false;
    setInitials(talentData.value?.first_name);
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
  return props?.talent?.image;
}

function handleImageError() {
  console.error("Image loading error");
  setInitials(talentData.value?.first_name);
}

const displayImage = computed(() => imageExists.value);
</script>
