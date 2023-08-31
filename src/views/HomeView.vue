<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import LogoIcon from "@/components/icons/logoIcon.vue";
import JobCard from "@/components/ui/JobCard.vue";
import MyApplicationCard from "@/components/ui/MyApplicationCard.vue";
import CommunityCard from "@/components/ui/CommunityCard.vue";
import CourseCard from "@/components/ui/CourseCard.vue";
import ArticleCard from "@/components/ui/ArticleCard.vue";
import { useStore } from "@/stores/user";
let store = useStore();
console.log(store.getUser);
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <span class="font-EBGaramond500 text-[#244034] text-[27.673px]"
        >Hi {{ store.getUser.user.first_name }} ,</span
      >
      <div class="flex lg:flex-row flex-col flex-grow gap-4 mt-6 w-full">
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
      <!-- jobs -->
      <div class="mt-12">
        <div class="flex justify-between mb-4">
          <p class="text-[17.633px] font-Satoshi400 text-[#244034]">
            Top job picks for you
          </p>

          <router-link
            class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
            to=""
            >View all jobs</router-link
          >
        </div>

        <div class="flex gap-3 overflow-x-auto hide-scrollbar my-8">
          <JobCard class="min-w-[95%] lg:min-w-[45%]" v-for="item in 4" :key="item" />
        </div>
      </div>
      <div class="mt-10 flex gap-3 overflow-x-auto">
        <div class="my-8">
          <p class="text-[17.633px] font-Satoshi400 mb-8 text-[#244034]">
            My Applications
          </p>

          <MyApplicationCard class="min-w-[95%] lg:min-w-[70%]" />
        </div>
        <div class="my-8">
          <div class="flex justify-between mb-8">
            <p class="text-[17.633px] font-Satoshi400 text-[#244034]">My Courses</p>

            <router-link
              class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
              to=""
              >View all courses</router-link
            >
          </div>

          <div class="grid grid-cols-2 gap-3">
            <CourseCard v-for="item in 4" :key="item" />
          </div>
        </div>
      </div>
      <!-- community -->
      <div class="my-8">
        <div class="flex justify-between mb-4">
          <p class="text-[17.633px] font-Satoshi400 text-[#244034]">Communities</p>

          <router-link
            class="text-[#011B1F] border-b-[1px] flex items-center border-b-[#011B1F] font-Satoshi500 text-[12.299px]"
            to=""
            >View all communies</router-link
          >
        </div>
        <div class="flex gap-3 overflow-x-auto hide-scrollbar my-8">
          <CommunityCard class="" v-for="item in 6" :key="item" />
        </div>
      </div>
      <!-- articles -->
      <div class="mt-10 overflow-x-auto">
        <p class="text-[17.633px] font-Satoshi400 mb-8 text-[#244034]">
          MySpurr Articles
        </p>
        <div class="grid grid-cols-2 gap-3">
          <ArticleCard class="" v-for="item in 4" :key="item" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
