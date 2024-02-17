<template>
  <div
    class="p-4 px-6 flex flex-row gap-3 justify-between items-center rounded-[4.533px] w-full bg-[#FFF] border-[0.567px] border-[#254035AB]"
  >
    <h4
      class="text-[#244034] text-[50.044px] font-Satoshi500 leading-[77.64px] text-center"
    >
      {{ digit }}
    </h4>
    <div class="flex flex-col gap-4">
      <p class="leading-[17.642px] text-[14.397px] text-[#244034] font-Satoshi500">
        {{ title }}
      </p>
      <button
        class="rounded-full text-[#4B7226] uppercase border-[0.8px] text-[9.798px] w-full font-Satoshi500 border-[#4B7226] py-3 px-5"
      >
        {{ buttonPlaceholder }}
      </button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  digit: Number,
  buttonPlaceholder: String,
  buttonLink: String,
});
</script>
