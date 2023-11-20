<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import { useStore } from '@/stores/user'
import CircleBookMarkIcon from '@/components/icons/circleBookMarkIcon.vue'
import SearchIcon from '@/components/icons/circleSearchIcon.vue'
import CircleTick from '@/components/icons/circleTick.vue'
import VerifyIcon from '@/components/icons/verifyIcon.vue'
import ViewJobDetailsPage from '@/components/ui/Jobs/ViewJobs/ViewJobDetailsPage.vue'
import FillApplicationPage from '@/components/ui/Jobs/ViewJobs/FillApplicationPage.vue'
import SucessPage from '@/components/ui/Jobs/ViewJobs/SucessPage.vue'
let store = useStore()

const steps = ref([true, false])

const changeScreen = (from, to, type = null) => {
  steps.value[from] = false
  steps.value[to] = true
}
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-6 lg:py-10 py-4 mb-5">
      <ViewJobDetailsPage @apply="changeScreen(0, 1)" v-if="steps[0]" />
      <FillApplicationPage @back="changeScreen(1, 0)" @next="changeScreen(1, 2)" v-if="steps[1]" />
      <SucessPage v-if="steps[2]" />
      <div class="bg-[#E9FAFB] hidden border-[0.735px] rounded-[17.104px] p-10">
        <div class="flex gap-3 w-full">
          <div>
            <img
              class="h-[61.011px] w-[61.011px] rounded-full"
              src="@/assets/image/jobIcon.svg"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="flex justify-between">
              <div class="">
                <p class="text-[22.805px] font-Satoshi400 flex text-[#000]">Adobe Inc.</p>
                <div class="flex mt-1 gap-1">
                  <VerifyIcon class="w-4" />
                  <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">Verified Client.</p>
                </div>
              </div>
              <div>
                <div class="flex gap-2">
                  <button class="">
                    <CircleBookMarkIcon class="w-[54.215px] h-[54.215px]" />
                  </button>
                  <button class="">
                    <SearchIcon class="w-[54.215px] h-[54.215px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div class="flex items-center justify-between w-full gap-3">
            <p class="text-[26.625px] font-Satoshi500 text-[#000000]">
              Senior Product & Brand Design
            </p>
            <button
              class="bg-[#43D0DF] font-Satoshi500 text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
            >
              APPLY
            </button>
          </div>
          <div class="flex justify-between mt-2">
            <div class="flex gap-3 items-center">
              <div
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                Art
              </div>
              <div
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                Brand identity
              </div>
              <div
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                UI/UI design
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-[#E9FAFB] hidden border-[0.735px] flex justify-between rounded-[17.104px] mt-10 p-6 px-10"
      >
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Salary</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">50k-60k/year</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Expertise</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">Intermediate</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Location</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">Spain, Baecelona</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Job Type</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">Fulltime</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Date</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">12 jun, 2022</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Experience</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">2 Years</p>
        </div>
      </div>
      <div class="flex flex-col hidden lg:flex-row mt-10 w-full">
        <div class="lg:w-[60%] p-4">
          <p class="text-[16.236px] text-[#000] font-Satoshi500">Job Description</p>

          <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-4 leading-[24.689px]">
            <p>
              As a Product Designer at WillowTree, you’ll give form to ideas by being the voice and
              owner of product decisions. You’ll drive the design direction, and then make it
              happen!
            </p>
            <p class="mt-4">
              We understand our responsibility to create a diverse, equitable, and inclusive place
              within the tech industry, while pushing to make our industry more representative.
            </p>
          </div>

          <p class="text-[16.236px] text-[#000] font-Satoshi500 mb-4 mt-6">Responsibilities</p>
          <div class="flex flex-col gap-3">
            <div v-for="item in 5" :key="item" class="flex gap-3 w-full">
              <div><CircleTick class="mt-2" /></div>
              <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] leading-[24.689px]">
                <p>
                  Collaborate daily with a multidisciplinary team of Software Engineers,
                  Researchers, Strategists, and Project Managers.
                </p>
              </div>
            </div>
          </div>

          <p class="text-[16.236px] text-[#000] font-Satoshi500 mb-4 mt-6">Required Skills:</p>
          <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] leading-[24.689px]">
            <ul class="pl-8">
              <li v-for="item in 5" :key="item" class="list-disc pb-3">
                You’ve been designing digital products for 2+ years.
              </li>
            </ul>
          </div>

          <p class="text-[16.236px] text-[#000] font-Satoshi500">Benefits:</p>
          <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] leading-[24.689px]">
            <ul class="pl-8">
              <li v-for="item in 5" :key="item" class="list-disc pb-3">
                You’ve been designing digital products for 2+ years.
              </li>
            </ul>
          </div>
          <div>
            <button
              class="bg-[#43D0DF] font-Satoshi500 text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
            >
              APPLY
            </button>
          </div>
        </div>
        <div class="lg:w-[40%]">
          <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] p-6">
            <p class="font-Satoshi700 text-[17.104px] text-[#31795A]/[0.70]">About the Company</p>
            <div class="flex mt-8 gap-4">
              <div>
                <img
                  class="h-[61.011px] w-[61.011px] rounded-full"
                  src="@/assets/image/jobIcon.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="flex gap-2 items-center">
                  <p class="text-[20.166px] font-Satoshi400 flex text-[#000]">Adobe Inc.</p>
                  <div class="flex mt-1 gap-1">
                    <VerifyIcon class="w-4" />
                    <p class="text-[10.646px] font-Satoshi700 text-[#000000B2]">Verified Client.</p>
                  </div>
                </div>
                <div class="flex gap-3 items-center">
                  <div
                    class="bg-[#2F929C] font-Satoshi500 text-[8.552px] capitalize p-[4px] px-4 text-[#fff] rounded-full"
                  >
                    Creative Agency
                  </div>
                  <div
                    class="bg-[#2F929C] font-Satoshi500 text-[8.552px] capitalize p-[4px] px-4 text-[#fff] rounded-full"
                  >
                    Design
                  </div>
                </div>
              </div>
            </div>
            <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]">
              <p>
                Vibratique hubis a full service creative agency at WillowTree, you’ll give form to
                ideas by being the voice and owner of product decisions. You’ll drive the design
                direction, and then make it happen!
              </p>
              <p class="mt-4">
                We understand our responsibility to create a diverse, equitable, and inclusive place
                within the tech industry, while pushing to make our industry more representative.
              </p>
            </div>
            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]">
              <p>2 Jobs opened</p>
            </div>

            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div class="flex rounded-[17.104px] mb-4 gap-6">
              <div class="flex flex-col gap-2">
                <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Completed Jobs</p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">5</p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Hired Jobs</p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">28</p>
              </div>
            </div>
            <button
              class="bg-[#31795A] rounded-full p-2 px-10 font-Satoshi500 text-[16.646px] text-white"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
