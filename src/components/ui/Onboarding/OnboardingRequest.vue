<template>
  <CenteredModalLarge
    v-if="
      getUser &&
      !getUser.business_details &&
      !getUser.work_details &&
      !getUser.portfolio &&
      checkRoute
    "
  >
    <div class="my-8">
      <header class="">
        <h1 class="text-[#000000] text-center text-[20px] font-Satoshi700">
          Complete Profile and working detailes
        </h1>
      </header>
      <div class="my-4 font-Satoshi400 text-center">
        You are required to complete your porfolio for Compliance
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
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const userStore = useStore();
const router = useRouter();
const route = useRoute();
const getUser = computed(() => {
  return userStore.getUser;
});

const accountType = computed(() => {
  return userStore.getUser.user.type;
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
