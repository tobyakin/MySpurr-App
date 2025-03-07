<template>
  <Tab @currentTab="setActiveTab">
    <template #tab1> Open applications </template>
    <template #tab2> Closed applications </template>
    <template #view1>
      <ShortLoader v-if="applicationsLoading"/>
      <div v-else>
        <div class="w-full h-full grid place-items-center p-12" v-if="selectedApplications.length < 1">
          <h3>There are no opened jobs at this moment</h3>
        </div>
        <div class="mt-14 flex flex-col gap-8" v-else>
          <JobRowCard
            class="min-w-[95%] lg:min-w-[45%]"
            v-for="item in selectedApplications"
            :key="item"
            :job="item"
          />
        </div>
      </div>
    </template>
    <template #view2>
      <ShortLoader v-if="applicationsLoading"/>
      <div v-else>
        <div class="w-full h-full grid place-items-center p-12" v-if="selectedApplications.length < 1">
          <h3>There are no closed jobs at this moment</h3>
        </div>
        <div class="mt-14 flex flex-col gap-8" v-else>
          <JobRowCard
            class="min-w-[95%] lg:min-w-[45%]"
            v-for="item in selectedApplications"
            :key="item"
            :job="item"
          />
        </div>
      </div>
    </template>
  </Tab>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import Tab from "./Tab.vue";
import { useJobsStore } from "@/stores/jobs";
const JobsStore = useJobsStore();
import { storeToRefs } from "pinia";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import JobRowCard from "@/components/ui/Jobs/JobRowCardCopy.vue";

const { myJobsApplications } = storeToRefs(JobsStore);
const applicationsLoading = ref(false)
const activeTab = ref("open_applications");
const selectedApplications = ref([])

const setActiveTab = (tab)=>{
  activeTab.value = tab
}

const getApplications = async ()=>{
  applicationsLoading.value = true
  try {
    await JobsStore.handleMyJobApplications(); 
    if(myJobsApplications.value?.data?.length > 0){
      if(activeTab.value === "open_applications"){
        selectedApplications.value = myJobsApplications.value?.data?.filter((item)=>item?.type === "open")
      } else {
        selectedApplications.value = myJobsApplications.value?.data?.filter((item)=>item?.type === "closed")
      }
    }
    applicationsLoading.value = false
  } catch (error) {
    console.log(error)
    applicationsLoading.value = false
  }
}

watch(
  () => activeTab.value,
  async (newTab) => {
    if (newTab) {
      activeTab.value = newTab;
      await getApplications()
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await getApplications()
});
</script>

<style></style>
