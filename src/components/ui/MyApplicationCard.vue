<script setup></script>
<template>
  <div
    v-if="applications && applications?.data?.length"
    :class="applications?.data?.length > 3 ? 'h-[calc(100%-43px)]' : 'h-auto'"
    class="border-[#254035AB] border-[0.735px] overflow-hidden w-full overflow-y-auto rounded-[7.347px]"
  >
  <div id="wrapper" class=" bg-white p-4 flex flex-col gap-[20px]">
    <div class="w-full flex flex-col" v-for="item in applications?.data" :key="item">
      <div class="flex flex-row justify-between w-full gap-3.5 pr-[0.2rem]">
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
        <div class="flex items-center">
          <span
            class="bg-[#43D0DF] font-Satoshi500 capitalize lg:text-[7.708px] text-[5px] items-center overflow-hidden flex p-3 lg:px-4 px-2 text-white rounded-full"
          >
            {{ item.status }}
          </span>
        </div>
      </div>
      <hr class="mt-6 text-[#EAEAEA] w-full" />
    </div>
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
  applications: Object
})
</script>

<style scoped>
</style>
