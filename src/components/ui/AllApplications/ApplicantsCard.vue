<template>
  <div
    class="border-[#2440341A] rounded-[6.919px] border-[1.794px] border-r-[#2F929C] border-r-[6.518px] relative p-4 lg:p-5"
  >
    <RatedBadge class="absolute h-[31.134px] w-[30.442px] top-0 left-0" />
    <div>
      <div
        class="w-full flex lg:flex-row flex-col lg:justify-between justify-center gap-8 items-center"
      >
        <div
          class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
        >
          <div class="relative h-[63.651px] w-[63.651px] rounded-full">
            <img
              loading="lazy"
              :src="talent?.image ? talent?.image : Icon"
              class="h-[63.651px] w-[63.651px] object-contain rounded-full"
              alt=""
            />
            <GreenIcon class="absolute top-1 right-1" />
          </div>
          <div class="lg:text-left text-center">
            <p
              class="text-[#000000] text-[12.454px] capitalize font-Satoshi500 leading-[19.739px]"
            >
              {{ talent?.first_name }} {{ talent?.last_name }}
            </p>
            <p
              class="text-[#00000066] text-[10.378px] leading-[20.739px] font-Satoshi400"
            >
              {{ talent?.skill_title }}
            </p>
            <div class="flex items-center gap-2">
              <p class="text-[9.686px] text-[#244034] font-Satoshi500">
                ${{ talent?.rate }}/hr
              </p>
              <div class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"></div>
              <p class="text-[#244034] text-[9.686px] font-Satoshi500">
                {{ talent?.location }}
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
        v-for="item in talent?.portfolio"
        :key="item.id"
        :src="item?.cover_image"
        class="h-[107.333px] flex flex-col w-auto object-cover rounded-lg"
        :alt="item?.title"
      />
    </div>
    <button @click="viewProfile(talent?.talent_id)" class="flex items-center gap-4 mt-6">
      <p class="text-[10.378px] font-Satoshi500 text-[#244034]">View Profile</p>
      <ArrowRight />
    </button>
  </div>
</template>
<script setup>
import RatedBadge from "@/components/icons/ratedBadge.vue";
import GreenIcon from "@/components/icons/greenIcon.vue";
import ArrowRight from "@/components/icons/arrowRight.vue";
import Icon from "@/assets/defultAvater.png";

defineProps({
  talent: Object,
});
const emit = defineEmits(["viewProfile"]);

const viewProfile = (id) => {
  emit("viewProfile", id);
};
</script>
