<template>
  <div class="w-full">
    <div
      ref="horizontalDiv"
      v-if="job && job?.data?.length"
      class="overflow-hidden flex flex-row w-full gap-3 hide-scrollbar overflow-x-auto"
    >
      <JobCard
        class="min-w-[380px] lg:min-w-[50%] xl:min-w-[376.66px] md:min-w-[60%]"
        v-for="item in job?.data"
        :key="item.id"
        :job="item"
      />
    </div>
    <div v-else class="w-full">
      <div class="h-[39vh] flex justify-center items-center">
        <div class="">
          <p class="text-center my-2">No top picks job yet</p>
          <div class="flex justify-center mt-10">
            <router-link
              :to="{ name: 'jobs' }"
              class="border-brand py-2 rounded-lg px-6 border text-brand font-Satoshi400"
            >
              View Jobs
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-3 w-full">
      <Scroller :element="horizontalDiv" :distance="horizontalDiv?.clientWidth" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import JobCard from "@/components/ui/Jobs/JobCard.vue";
import Scroller from "@/components/ui/Scroller.vue";
const horizontalDiv = ref();

defineProps({
  job: null,
});
</script>
