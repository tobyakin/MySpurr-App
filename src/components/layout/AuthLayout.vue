<template>
  <div class="min-h-screen md:h-auto">
    <AuthHeader :showLandingUrl="showLandingUrl" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-40 auth_container">
      <div class="sticky lg:flex flex-shrink-0 items-center hidden top-0">
        <img
          v-if="!showWelcomeMsg"
          class=""
          src="@/assets/image/Auth/circleImages.png"
          alt="Auth"
        />
        <div v-if="showWelcomeMsg">
          <p class="text-white text-[36.161px] leading-[41.994px] font-EBGaramond500">
            Thank you for verifying your email
          </p>
          <p
            class="text-white mt-4 text-[36.161px] leading-[41.994px] font-EBGaramond500"
          >
            Log in to finish creating your account
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center lg:py-0">
        <div
          class="w-[100%] h-[80vh] overflow-y-auto my-4 items-center hide-scrollbar flex"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthHeader from "@/components/Header/AuthHeader.vue";
defineProps({
  showLandingUrl: Boolean,
  showWelcomeMsg: Boolean,
});
</script>
