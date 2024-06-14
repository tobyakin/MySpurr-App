<template>
  <BusinessProfilePage v-if="accountType === 'business'" />
  <ProfilePage v-else />
</template>
<script setup>
import { computed, onMounted } from "vue";
import BusinessProfilePage from "./BusinessProfilePage.vue";
import ProfilePage from "./ProfilePage.vue";
import { useStore } from "@/stores/user";
import { useTabStore } from "@/stores/tab";
import { useRouter } from "vue-router";
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

onMounted(() => {
  return accountType;
});
</script>
