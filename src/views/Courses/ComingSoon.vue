<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
let store = useStore();
console.log(store.getUser);
</script>

<template>
  <DashboardLayout>
    <div class="container lg:py-0 py-5 mb-5">
      <p class="text-[#244034] text-[75.221px] mt-8 leading-[113%] font-EBGaramond500">
        MySpurr Courses are <br />
        yet to go live.
      </p>
      <p class="text-[#244034] text-[17.633px] mt-10 leading-[27.356px] font-Satoshi400">
        We are still building your talent dashboard, and we are yet to launch our courses.
        <br />
        Is there anything you were looking for? please send us an email to
        hello@myspurr.net
      </p>
      <p class="text-[#244034] text-[17.633px] mt-6 leading-[27.356px] font-Satoshi400">
        We also love amazing partnerships, so if you can help to making MySpurr courses
        work, <br />
        be sure to get in touch.
      </p>
      <p class="text-[#244034] text-[17.633px] mt-6 leading-[27.356px] font-Satoshi400">
        Cheers <br />
        The MySpurr Team
      </p>
      <div class="bg-[#84B358] p-14 rounded-[7.973px] mt-12">
        <p class="text-[#FBFBEE] text-[47.239px] mt-6 leading-[56.484px] font-Satoshi500">
          Join our email community
        </p>
        <p class="text-[#FBFBEE] text-[21.714px] mt-4 leading-[25.964px] font-Satoshi500">
          Get the latest news and updates from MySpurr
        </p>
        <div class="flex gap-6 mt-4">
          <div class="w-full">
            <label class="font-Satoshi500 text-[15.606px]" for=""> Name </label>
            <input
              class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              type="text"
            />
          </div>
          <div class="w-full">
            <label class="font-Satoshi500 text-[15.606px]" for=""> Email </label>
            <input
              class="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
              type="email"
            />
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
