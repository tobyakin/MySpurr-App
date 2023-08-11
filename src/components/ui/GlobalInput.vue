<template>
  <div>
    <input
      class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
      :placeholder="placeholder"
      :type="type"
    />
  </div>
</template>

<script setup>
const { placeholder, type } = defineProps(["placeholder", "type"]);
</script>
