<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import LogoIcon from "@/components/icons/logoIcon.vue";
import JobCard from "@/components/ui/JobCard.vue";
</script>

<template>
  <DashboardLayout>
    <div class="container py-4">
      <span class="font-EBGaramond500 text-[#244034] text-[27.673px]">Hi Dave,</span>
      <div class="flex flex-row flex-grow gap-4 mt-6 w-full">
        <div
          class="p-4 px-10 flex flex-col justify-between rounded-[4.533px] w-full bg-[#EDF0B8] border-[0.567px] border-[#254035AB]"
        >
          <div>
            <div
              class="text-[25.739px] gap-2 font-EBGaramond500 leading-[44.616px] flex text-[#244034]"
            >
              <p>Welcome to</p>
              <LogoIcon class="my-2" />
            </div>
            <p class="text-[#011B1F] text-[12.299px] leading-[16.707px] font-Satoshi400">
              You now have full access to our network of job openings and thriving
              community. Are you ready to take on new opportunities?
            </p>
          </div>
          <div class="flex gap-4 mt-6">
            <router-link
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to=""
              >Find jobs</router-link
            >
            <router-link
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to=""
              >Take courses</router-link
            >
            <router-link
              class="text-[#011B1F] font-Satoshi500 border-b-[1px] border-b-[#011B1F] text-[12.299px] underline-offset-4"
              to=""
              >Community</router-link
            >
          </div>
        </div>
        <div
          class="p-4 px-6 flex flex-col justify-between rounded-[4.533px] w-full bg-[#EDF0B8] border-[0.567px] border-[#254035AB]"
        >
          <div>
            <p class="text-[#244034] text-[28.2px] font-Satoshi500">
              Verify your account details
            </p>
            <p class="text-[#011B1F] text-[12.299px] font-Satoshi400">
              In order for you to receive payments, we need to verify your identity.
            </p>
          </div>
          <button
            class="text-[12.299px] font-Satoshi500 text-white bg-[#43D0DF] p-3 px-[20px] w-[60%] rounded-full"
          >
            Verify Identity
          </button>
        </div>
      </div>
      <div class="mt-10">
        <p class="text-[17.633px] font-Satoshi400 mb-8 text-[#244034]">
          Top job picks for you
        </p>
        <div class="flex space-x-6 overflow-x-auto hide-scrollbar my-8">
          <JobCard class="min-w-[95%] lg:min-w-[45%]" v-for="item in 4" :key="item" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
