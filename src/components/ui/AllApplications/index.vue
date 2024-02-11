<template>
  <div class="flex flex-col gap-[45px]">
    <Header />
    <div class="flex flex-row gap-4">
      <div class="w-[40%]">
        <h4 class="text-[#00000066] text-[12.032px] font-Satoshi400">
          All <span class="text-[#000000] font-Satoshi500">45</span> Applicants
        </h4>
        <div class="w-full flex flex-col gap-[14px] mt-[44px]">
          <ApplicantsCard v-for="i in 2" :key="i" />
        </div>
      </div>
      <div class="w-full"><ApplicantProfile /></div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/ui/AllApplications/Header.vue";
import ApplicantsCard from "@/components/ui/AllApplications/ApplicantsCard.vue";
import ApplicantProfile from "@/components/ui/AllApplications/ApplicantProfile.vue";
</script>

<style></style>
