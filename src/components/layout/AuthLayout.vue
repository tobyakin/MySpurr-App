<template>
  <div class="min-h-screen md:h-auto">
    <AuthHeader :showLandingUrl="showLandingUrl" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-40 auth_container">
      <div class="sticky lg:flex flex-shrink-0 items-center hidden top-0">
        <img class="" src="@/assets/image/Auth/circleImages.png" alt="Auth" />
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
});
</script>
