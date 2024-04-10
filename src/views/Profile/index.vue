<template>
  <BusinessProfilePage v-if="accountType === 'business'" />
  <ProfilePage v-if="accountType === 'talent'" />
</template>
<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import BusinessProfilePage from "./BusinessProfilePage.vue";
import ProfilePage from "./ProfilePage.vue";
import { useStore } from "@/stores/user";

let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  return accountType;
});
</script>
