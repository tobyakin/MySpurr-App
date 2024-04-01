<script setup>
import { onUnmounted } from 'vue'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import TalentPublicProfile from '@/components/ui/FindTalents/TalentPublicProfile.vue'
import { useTalentsStore } from '@/stores/talents'
import { storeToRefs } from 'pinia'
import { useQuery } from 'vue-query'
import { useRoute } from 'vue-router'
const talentsStore = useTalentsStore()
const { singleTalent } = storeToRefs(talentsStore)
const route = useRoute()
const getTallentsDetails = async () => {
  let response = await talentsStore.handleGetSingleTalent(route.params.uuid)
  return response
}
const fetchData = async () => {
  await Promise.all([getTallentsDetails()])
}

fetchData()

const { isLoading } = useQuery(['myJobs'], getTallentsDetails, {
  retry: 10,
  staleTime: 10000,
  onSuccess: (data) => {
    singleTalent.value = data
  }
})
onUnmounted(() => {
  singleTalent.value = null
})
// onMounted(async () => {
//   await talentsStore.handleGetSingleTalent(route.params.uuid);
// });
</script>
<template>
  <DashboardLayout>
    <ShortLoader v-if="isLoading" />
    <TalentPublicProfile v-else :talent="singleTalent?.data"
  /></DashboardLayout>
</template>
