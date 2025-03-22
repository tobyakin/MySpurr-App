<script setup>
import { onMounted, computed } from "vue";

import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import Tab from "@/components/ui/MyApplications/Tab.vue";
import InvitesView from "@/components/ui/MyApplications/InvitesView.vue";
import Applications from "@/components/ui/MyApplications/Applications/Applications.vue";
import JobOffers from "@/components/ui/MyApplications/JobOffers.vue";
import MyJobs from "@/components/ui/MyApplications/MyJobs/MyJobs.vue";
import Invoices from "@/components/ui/MyApplications/Invoice/InvoicePage.vue";
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
  <DashboardLayout
    ><div class="container mb-20">
      <Tab>
        <template #tab1> Invites </template>
        <template #tab2> Applications </template>
        <template #tab3> Job Offers </template>
        <template #tab4> My Jobs </template>
        <template #tab5> Invoices </template>
        <template #tab6> Help </template>
        <template #view1>
          <ComingSoon title="Job invites" />
          <InvitesView class="hidden" />
        </template>
        <template #view2><Applications /></template>
        <template #view3
          ><JobOffers class="hidden" /> <ComingSoon title="Job Offers" />
        </template>
        <template #view4>
          <ComingSoon title="My jobs" />
          <MyJobs class="hidden" />
        </template>
        <template #view5>
          <ComingSoon title="Invoices" class="hidden"/>
          <Invoices class="" />
        </template>
      </Tab>
    </div>
  </DashboardLayout>
</template>
