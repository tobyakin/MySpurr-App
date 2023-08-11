<template>
  <div class="py-6">
    <div @click="toggleRemember" class="flex gap-2 items-center">
      <p
        :class="
          props.remember ? 'border-[0.764px] border-[#B3B3B3]' : 'bg-brand  border-brand'
        "
        class="w-4 h-4 flex justify-center items-center rounded-[1.018px] border"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-3 h-3 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </p>
      <p class="font-Satoshi400 text-[12.129px]">
        By hitting the "Register" button, you agree to the
        <router-link class="text-[#31795A] border-b-[#31795A] border-b-[1px]" to="/"
          >Terms conditions</router-link
        >
        &amp;
        <router-link class="text-[#31795A] border-b-[#31795A] border-b-[1px]" to="/">
          Privacy Policy</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  remember: Boolean,
});

function toggleRemember() {
  props.remember = !props.remember;
}
</script>
