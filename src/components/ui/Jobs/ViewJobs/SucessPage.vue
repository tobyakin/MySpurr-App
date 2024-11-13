<script setup>
import { defineAsyncComponent } from "vue";
const FormGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/FormGroup.vue")
);

import { useStore } from "@/stores/user";
let store = useStore();
</script>

<template>
  <div class="p-0 lg:p-6 lg:py-3 py-4 mb-5">
    <p class="text-[#244034] text-[4.7rem] mt-8 leading-[113%] font-EBGaramond50 msgTab4:text-[3rem] msgMob:text-[2.5rem]">
      Your application has<br />
      been received.
    </p>
    <p class="text-[#244034] text-[17.633px] mt-10 leading-[27.356px] font-Satoshi400 lg:w-[70%]">
      Seat back and relax while the recruiter takes a look at your resume and portfolio.
      We will keep you updated about position of this job.
    </p>
    <p class="text-[#244034] text-[17.633px] mt-6 leading-[27.356px] font-Satoshi400">
      Cheers <br />
      The MySpurr Team
    </p>
    <div class="bg-[#297F88] py-[2.64rem] px-[4rem] rounded-[7.973px] dashBreak:p-8 dashBreak:gap-8 mt-12 grid grid-cols-temp3 msgTab4:grid-cols-1 lg:gap-[4rem]">
      <div>
        <div class="w-full h-full rounded-[7.973px] overflow-hidden">
          <img src="@/assets/image/softwareDevs.png" class="w-full h-full object-cover" alt="">
        </div>
      </div>
      <div>
        <h1 class="text-[#FBFBEE] font-Satoshi500 text-[2.2rem] leading-[2.7rem]">Join the MySpurr Community</h1>
        <p class="text-[#FBFBEE] font-Satoshi500 text-[1rem] leading-[1.4rem] !my-4">Get the latest job posts, and access to mentorship, resources and updates from MySpurr</p>
        <button class="bg-[#00474F] rounded-[2.31rem] px-[1.55rem] py-[0.85rem] text-[#ECFAFC] font-Satoshi400 leading-[0.91rem] text-[0.91rem] hover:shadow-lg transitionItem msgTab4:mt-8">
          <a href="https://chat.whatsapp.com/J5QwboAPIQj5vUM5J69Cya" target="_blank" rel="noopener noreferrer">
            Join Community
          </a>
        </button>
      </div>
      
    </div>
  </div>
</template>
