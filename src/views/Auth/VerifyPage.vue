<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import layout from "@/components/layout/LightAuthLayout.vue";
import ErrorOutline from "@/components/icons/errorOutline.vue";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

import { resendEmail } from "@/services/Auth";
let loading = ref(false);

const email = ref(route.params.email);
const handleResendEmail = async () => {
  loading.value = true;
  try {
    const res = await resendEmail(email.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <layout class="bg-[#E9FAFB]">
    <div class="w-[80%] mx-auto">
      <div
        class="justify-center w-full md:bg-white rounded-[11.315px] min-h-full p-2 lg:p-8"
      >
        <h1
          class="md:text-[28px] font-EBGaramond400 text-[30px] text-[#007582] leading-[32.182px]"
        >
          Check your inbox and confirm your email address
        </h1>
        <p
          class="text-[11.303px] font-Satoshi400 my-4 md:mb-8 overflow-hidden text-[#01181B]"
        >
          We’ve sent a confirmation email to
          <span class="font-Satoshi700">{{ email }}</span>
        </p>
        <p
          class="text-[11.303px] flex items-center gap-2 font-Satoshi400 my-4 md:mb-8 text-[#DA5252]"
        >
          <ErrorOutline /> Didn't receive an email?
        </p>
        <p class="text-[11.303px] font-Satoshi400 my-4 md:mb-8 text-[#01181B]">
          If you can't find the email in your inbox or spam folder, please click below and
          we will send you a new one.
        </p>
        <div class="mt-8 flex justify-between gap-6">
          <button
            @click="handleResendEmail"
            class="bg-[#43D0DF] font-Satoshi500 text-[10.14px] uppercase leading-[11.593px] rounded-full p-3 w-full"
          >
            <span v-if="!loading">RESEND EMAIL</span>
            <WhiteLoader v-else />
          </button>
          <router-link
            to="/login"
            class="bg-[#43D0DF] font-Satoshi500 text-[10.14px] uppercase flex items-center justify-center leading-[11.593px] rounded-full p-3 w-full"
          >
            LOG IN
          </router-link>
        </div>
      </div>
    </div>
  </layout>
</template>
