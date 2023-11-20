<template>
  <CenteredModalLarge>
    <div class="my-8">
      <header class="">
        <h1
          v-if="accountType === 'talent'"
          class="text-[#000000] text-center text-[20px] font-Satoshi700"
        >
          Complete your talent profile
        </h1>
        <h1 v-else class="text-[#000000] text-center text-[20px] font-Satoshi700">
          Complete your business profile
        </h1>
      </header>
      <div v-if="accountType == 'talent'" class="my-4 font-Satoshi400 text-center">
        Please give us some information to set up your talent dashboard. <br />
        It'll take less than 3 mins
      </div>
      <div v-else class="my-4 font-Satoshi400 text-center">
        Please give us some information to set up your business dashboard (It'll take less
        than 3 mins)
      </div>
      <div class="flex justify-center">
        <button
          @click="goToVerificationPage"
          class="bg-brand text-center font-Satoshi400 rounded-md px-6 text-gray-100 py-3"
        >
          Proceed
        </button>
      </div>
    </div>
  </CenteredModalLarge>
</template>

<script setup>
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const userStore = useStore();
const router = useRouter();
let profile = useUserProfile();
onMounted(() => {
  return profile.userProfile();
});
onMounted(() => {
  return accountType;
});
const isOnBoarded = computed(() => profile.user);
onMounted(async () => {
  await profile.userProfile();
});

const route = useRoute();

const accountType = computed(() => {
  return userStore.getUser.data.user.type;
});

const checkRoute = computed(() => {
  const param = `dashboard`;
  return route.fullPath.includes(param);
});

const goToVerificationPage = () => {
  if (accountType.value.toLowerCase() === "talent") {
    return router.push({
      name: "talent-onboarding",
    });
  } else if (accountType.value.toLowerCase() === "business") {
    return router.push({
      name: "business-onboarding",
    });
  }
};
</script>
