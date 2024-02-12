<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import TalentPublicProfile from "@/components/ui/FindTalents/TalentPublicProfile.vue";
import { useTalentsStore } from "@/stores/talents";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const talentsStore = useTalentsStore();
const { singleTalent } = storeToRefs(talentsStore);
const route = useRoute();

onMounted(async () => {
  await talentsStore.handleGetSingleTalent(route.params.uuid);
});
</script>
<template>
  <DashboardLayout><TalentPublicProfile :talent="singleTalent?.data" /></DashboardLayout>
</template>
