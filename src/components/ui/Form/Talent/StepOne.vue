<template>
  <HomeView>
    <CenteredModalLarge>
      <div class="my-8">
        <header class="">
          <h1 class="text-[#000000] text-center text-[20px] font-Satoshi700">
            Complete your talent profile
          </h1>
        </header>
        <div class="my-4 font-Satoshi400 text-center">
          Please give us some information to set up your talent dashboard. <br />
          It'll take less than 3 mins
        </div>
        <div class="flex justify-center">
          <button
            @click="next"
            class="bg-brand text-center font-Satoshi400 rounded-md px-6 text-gray-100 py-3 btn-hover-2"
          >
            Proceed
          </button>
        </div>
      </div>
    </CenteredModalLarge>
  </HomeView>
</template>

<script setup>
import HomeView from "@/views/HomeView.vue";
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useOnboardingStore } from "@/stores/onBoarding";
import { storeToRefs } from "pinia";

const OnboardingStore = useOnboardingStore();

const { step } = storeToRefs(OnboardingStore);
const emit = defineEmits(["next"]);

// const route = useRoute();

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

const accountType = computed(() => {
  return userStore.getUser.data.user.type;
});

// const checkRoute = computed(() => {
//   const param = `dashboard`;
//   return route.fullPath.includes(param);
// });

// const goToVerificationPage = () => {
//   if (accountType.value.toLowerCase() === "talent") {
//     return router.push({
//       name: "talent-onboarding",
//     });
//   } else if (accountType.value.toLowerCase() === "business") {
//     return router.push({
//       name: "business-onboarding",
//     });
//   }
// };
const next = () => {
  if (isOnBoarded.value.work_details) {
    return router.push({ name: "dashboard" });
  } else {
    emit("next", step.value + 1);
  }
};
onMounted(async () => {
  await profile.userProfile();
});
onMounted(async () => {
  try {
    await profile.userProfile();
    if (isOnBoarded.value.work_details) {
      return router.push({ name: "dashboard" });
    }
  } catch (error) {
    /* empty */
  } finally {
    /* empty */
  }
});
</script>
