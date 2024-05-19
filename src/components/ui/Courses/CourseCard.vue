<template>
  <div class="w-full lg:w-[65%]">
    <p class="text-[18px] font-Satoshi400 !mb-8 text-[#244034]">Courses</p>
    <div class="flex flex-col w-full gap-3">
      <div
        v-for="i in course"
        :key="i"
        class="border-[#254035AB] w-full flex justify-between bg-[#F0F3C4] border-[0.735px] h-[121.94px] rounded-[7.347px]"
      >
        <div class="flex flex-col gap-3 w-full justify-between h-full p-4 py-[1.1rem]">
          <div>
            <h3 class="text-[#244034] text-[17.11px] leading-[16.62px] font-Satoshi500">
              {{ i.heading }}
            </h3>
            <span
              class="text-[9.57px] font-Satoshi700 text-[#993939] uppercase leading-[8.54px ]"
              >{{ i.type }} COURSE</span
            >
          </div>
          <div>
            <button
              @click="redirectToLink(i.link)"
              class="btn-brand !bg-[#43D0DF] !text-[10.49px] !border-0 !px-3 !py-1 !text-white btn-hover-1"
            >
              {{ i.type === "free" ? `Start Free Course` : `Register now` }}
            </button>
          </div>
        </div>
        <div
          class="objec-contain h-full w-[130%] relative flex justify-end overflow-hidden"
        >
          <img class="object-cover w-full" :src="i.image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import cousresOne from "@/assets/image/courses1.png";
import cousresTwo from "@/assets/image/courses2.png";
const redirectToLink = (url) => {
  window.open(url, "_blank");
};

const course = ref([
  {
    heading: `Learn Design with Canva`,
    type: "free",
    image: cousresOne,
    link: `https://superpeer.com/brandvillr/collection/design-for-socials-with-canva`,
  },
  {
    heading: `Learn Data
Analytics`,
    type: "paid",
    image: cousresTwo,
    link: ``,
  },
]);
</script>
