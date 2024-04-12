<template>
  <div class="w-full lg:w-[65%]">
    <p class="text-[18px] font-Satoshi400 !mb-8 text-[#244034]">Courses</p>
    <div class="flex flex-row w-full gap-3">
      <!-- {{ currentCourse }} -->

      <!-- <transition-group name="slide" tag="div"> -->
      <!-- {{ currentCourse }} -->
      <div
        v-if="currentCourse"
        :key="currentCourse.heading"
        class="border-[#254035AB] w-full flex justify-between bg-[#F0F3C4] border-[0.735px] h-[121.94px] rounded-[7.347px]"
      >
        <div class="flex flex-col gap-3 w-full justify-between h-full p-4 py-[1.1rem]">
          <div>
            <h3 class="text-[#244034] text-[17.11px] leading-[16.62px] font-Satoshi500">
              {{ currentCourse?.heading }}
            </h3>
            <span
              class="text-[9.57px] font-Satoshi700 text-[#993939] uppercase leading-[8.54px ]"
              >{{ currentCourse?.type }} COURSE</span
            >
          </div>
          <div>
            <button
              class="btn-brand !bg-[#43D0DF] !text-[10.49px] !text-[#000000] !border-0 !px-3 !py-1"
            >
              {{ currentCourse.type === "free" ? `Start Free Course` : `Register now` }}
            </button>
          </div>
        </div>
        <div
          class="objec-contain h-full w-[130%] relative flex justify-end overflow-hidden"
        >
          <img
            class="object-cover w-full"
            loading="lazy"
            :src="currentCourse.image"
            alt=""
          />
        </div>
      </div>
      <!-- </transition-group> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import cousresOne from "@/assets/image/courses1.png";
import cousresTwo from "@/assets/image/courses2.png";

const course = reactive([
  { heading: `Learn Design with Canva`, type: "free", image: cousresOne },
  { heading: `Learn Data Analytics`, type: "paid", image: cousresTwo },
]);

const currentCourse = ref(null);

onMounted(() => {
  let index = 0;

  const updateCurrentCourse = () => {
    if (index >= course.length) {
      index = 0;
    }
    currentCourse.value = course[index];
    index++;
    setTimeout(() => {
      if (currentCourse.value) {
        currentCourse.value = null; // Hide after a certain time if currentCourse exists
      }
      updateCurrentCourse();
    }, 3000); // Adjust the delay as needed
  };

  updateCurrentCourse();
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
