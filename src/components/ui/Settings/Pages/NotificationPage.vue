<script setup>
import { ref } from "vue";

import Switcher from "@/components/ui/Switcher.vue";
let isToggled = ref(false);
const updateIsToggled = () => {
  isToggled.value = !isToggled.value;
};
</script>
<template>
  <div class="flex flex-col gap-[44px]">
    <div class="flex flex-row justify-between items-center gap-8">
      <h3
        class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
      >
        Notifications
      </h3>
      <p class="text-[#000000] text-[20px] font-Satoshi400">Email</p>
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              New jobs match to your saved filter criteria
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              You have been invited to a job
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              You must add banking information
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              Chat messages
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              Job referral opportunitites
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              Your application deleted due to openings removal
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
    <div class="w-full flex flex-col gap-[10px]">
      <div class="flex flex-col gap-[28px] w-full">
        <div class="flex flex-col gap-[26px]">
          <div class="flex justify-between items-center flex-row">
            <h3
              class="lg:text-[24px] text-[14px] !font-Satoshi400 text-[#000000] leading-[35.39px]"
            >
              New comment on portfolio
            </h3>
            <div class="">
              <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#00000014] border-[1px]" />
    </div>
  </div>
</template>
