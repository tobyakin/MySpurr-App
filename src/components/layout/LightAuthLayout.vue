<template>
  <div class="min-h-screen md:h-auto">
    <AuthHeader :showLandingUrl="true" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-40 auth_container">
      <div class="sticky lg:flex flex-shrink-0 items-center hidden top-0">
        <img class="bg-transparent" src="@/assets/LogoComp2.gif" alt="Auth" />
        <!-- <iframe src="@/assets/LogoAnimatedWhite.gif" frameborder="0"></iframe> -->
      </div>
      <div class="flex justify-center items-center lg:py-0">
        <div
          class="w-[100%] h-[85vh] overflow-y-auto py-6 overflow-hidden hide-scrollbar items-center flex"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthHeader from "@/components/Header/LightAuthHeader.vue";
</script>
