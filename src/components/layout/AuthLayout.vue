<template>
  <div class="">
    <AuthHeader />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-40 auth_container">
      <div class="sticky md:flex items-center hidden top-0">
        <img
          class="relative md:block"
          src="@/assets/image/Auth/AuthImage.png"
          alt="Auth"
        />
      </div>
      <div
        class="flex min-h-screen md:h-auto overflow-y-auto justify-center items-center lg:py-10"
      >
        <div class="w-[100%]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthHeader from "@/components/Header/AuthHeader.vue";
</script>
