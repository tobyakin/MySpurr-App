<script setup></script>
<template>
  <div class="border-[#254035AB] border-[0.735px] rounded-[7.347px] p-4">
    <div class="" v-for="item in 3" :key="item">
      <div class="flex flex-row justify-between gap-3 my-5">
        <div class="flex gap-3">
          <img src="@/assets/image/jobIcon.svg" alt="" />
          <div class="">
            <p class="text-[13.021px] font-Satoshi500 text-[#000000]">
              Developer in java c++
            </p>
            <p class="text-[13.021px] font-Satoshi500 text-[#2F929C]">
              MySpurr <span class="pl-2">Abuja, Nigeria.</span>
            </p>
          </div>
        </div>
        <router-link
          :to="{ name: 'view-jobs', params: { id: 1 } }"
          class="bg-[#43D0DF] font-Satoshi500 lg:text-[7.708px] text-[5px] items-center overflow-hidden flex lg:p-2 lg:px-4 px-2 text-[#000000] rounded-full"
        >
          IN REVIEW
        </router-link>
      </div>
      <hr v-if="item < 3" class="text-[#EAEAEA]" />
    </div>
  </div>
</template>
