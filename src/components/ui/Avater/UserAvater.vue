<template>
  <div :class="inputClasses" class="relative h-[126.955px] w-[126.955px] rounded-full">
    <img
      :class="inputClasses"
      :src="imageUrl ? imageUrl : imgAlt"
      class="h-[126.955px] w-[126.955px] rounded-full"
    />
  </div>
</template>
<script setup>
import imgAlt from "@/assets/image/icon.webp";
defineProps({
  inputClasses: String,
  imageUrl: String,
});
</script>
