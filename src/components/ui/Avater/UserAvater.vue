<template>
  <div
    :class="inputClasses"
    class="relative h-[126.955px] bg-[#2F929C] object-contain w-[126.955px] rounded-full"
  >
    <img
      :class="inputClasses"
      :src="imageUrl ? imageUrl : Avater"
      class="h-[126.955px] w-[126.955px] object-cover rounded-full"
    />
  </div>
</template>
<script setup>
import Avater from "@/assets/defultAvater.png";
defineProps({
  inputClasses: String,
  imageUrl: String,
});
</script>
