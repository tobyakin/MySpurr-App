<script setup></script>
<template>
  <div
    v-if="applications && applications.length"
    class="border-[#254035AB] border-[0.735px] max-h-[37vh] bg-white rounded-[7.347px] p-4"
  >
    <div class="" v-for="item in applications" :key="item">
      <div class="flex flex-row justify-between gap-3.5 my-5">
        <div class="flex gap-3">
          <img src="@/assets/image/jobIcon.svg" alt="" />
          <div class="">
            <p class="text-[13.021px] font-Satoshi500 text-[#000000]">
              {{ item.job_info.job_title }}
            </p>
            <p class="text-[13.021px] font-Satoshi500 text-[#2F929C]">
              {{ item.company.business_name }}
              <span class="pl-2"> {{ item.job_info.location }}</span>
            </p>
          </div>
        </div>
        <!--           :to="{ name: 'view-jobs', params: { id: 1 } }"
 -->
        <router-link
          to="/"
          class="bg-[#43D0DF] font-Satoshi500 uppercase lg:text-[7.708px] text-[5px] items-center overflow-hidden flex lg:p-2 lg:px-4 px-2 text-[#000000] rounded-full"
        >
          {{ item.status }}
        </router-link>
      </div>
      <hr v-if="item < 3" class="text-[#EAEAEA]" />
    </div>
  </div>
  <div v-else>
    <div class="h-[39vh] flex justify-center items-center">
      <div class="">
        <p class="text-center my-2">You do not have any ongoing applications yet</p>
        <div class="flex justify-center mt-10">
          <router-link
            :to="{ name: 'jobs' }"
            class="border-brand py-2 rounded-lg px-6 border text-brand font-Satoshi400"
          >
            Apply now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  applications: Object,
});
</script>
