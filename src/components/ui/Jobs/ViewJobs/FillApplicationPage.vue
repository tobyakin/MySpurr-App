<script setup>
import { useStore } from "@/stores/user";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
let store = useStore();
console.log(store.getUser);
const emit = defineEmits(["back"]);
const back = () => {
  emit("back");
};
</script>

<template>
  <div>
    <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] p-10">
      <div class="flex gap-3 w-full">
        <div>
          <img
            class="h-[57.102px] w-[57.102px] rounded-full"
            src="@/assets/image/jobIcon.svg"
            alt=""
          />
        </div>
        <div class="w-full">
          <div class="flex justify-between items-center">
            <div class="">
              <p class="text-[17.435px] font-Satoshi400 flex text-[#000]">Adobe Inc.</p>
              <div class="flex mt-1 gap-1">
                <VerifyIcon class="w-4" />
                <p class="text-[12.781px] font-Satoshi700 text-[#000000B2]">
                  Verified Client.
                </p>
              </div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center justify-between w-full gap-3">
                <p class="text-[20.356px] font-Satoshi500 text-[#000000]">
                  Senior Product & Brand Design
                </p>
              </div>
              <div class="flex justify-between mt-2">
                <div class="flex gap-3 items-center">
                  <div
                    class="bg-[#2F929C] font-Satoshi500 text-[7.58px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
                  >
                    Art
                  </div>
                  <div
                    class="bg-[#2F929C] font-Satoshi500 text-[7.58px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
                  >
                    Brand identity
                  </div>
                  <div
                    class="bg-[#2F929C] font-Satoshi500 text-[7.58px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
                  >
                    UI/UI design
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-3">
              <button
                @click="back"
                class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-8 text-[#000000] rounded-full"
              >
                back
              </button>
              <button
                @click="back"
                class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-8 text-[#000000] rounded-full"
              >
                SEND ApplicatIon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[#E9FAFB] border-[0.735px] flex justify-between rounded-[17.104px] mt-10 p-6 px-10"
    >
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Salary</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">50k-60k/year</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Expertise</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">Intermediate</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Location</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">Spain, Baecelona</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Job Type</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">Fulltime</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Date</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">12 jun, 2022</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Experience</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">2 Years</p>
      </div>
    </div>
    <p class="text-[36.637px] font-Satoshi400 text-[#244034] my-6">
      Fill out your Application
    </p>
    <div class="flex flex-col gap-4 lg:flex-row mt-10 w-full">
      <div class="lg:w-[40%] flex flex-col gap-4">
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
      </div>

      <div class="lg:w-[60%] flex flex-col gap-4">
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        ></div>
      </div>
    </div>
  </div>
</template>
