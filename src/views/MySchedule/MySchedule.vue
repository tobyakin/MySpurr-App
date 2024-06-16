<script setup>
import { onMounted, computed } from "vue";

import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import ComingSoon from "@/components/ui/ComingSoon/ComingSoon.vue";
import { useTabStore } from "@/stores/tab";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import { storeToRefs } from "pinia";

const router = useRouter();

let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  return accountType;
});

const profileStore = useUserProfile();

const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);

const isOnBoarded = computed(() => profileStore.user);

onMounted(() => {
  return accountType;
});
onMounted(async () => {
  try {
    await profileStore.userProfile();
    if (
      isOnBoarded.value &&
      !isOnBoarded.value.business_details &&
      !isOnBoarded.value.work_details
    ) {
      if (accountType.value === "talent") {
        router.push({ name: "talent-onboarding" });
      } else if (accountType.value === "business") {
        router.push({ name: "business-onboarding" });
      }
    }
  } catch (error) {
    /* empty */
  } finally {
    isLoading.value = !isLoading.value;
  }
});
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-0 lg:py-10 py-6 mb-10">
      <ComingSoon title="My Schedule" />
    </div>
  </DashboardLayout>
</template>
