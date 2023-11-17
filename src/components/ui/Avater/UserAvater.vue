<template>
  <div
    :class="inputClasses"
    class="relative h-[126.955px] bg-[#2F929C] w-[126.955px] rounded-full"
  >
    <img
      :class="inputClasses"
      :src="imageUrl ? imageUrl : Avater"
      class="h-[126.955px] w-[126.955px] rounded-full"
    />
  </div>
</template>
<script setup>
import Avater from "@/assets/svg/avater.svg";
defineProps({
  inputClasses: String,
  imageUrl: String,
});
</script>
