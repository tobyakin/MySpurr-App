<template>
  <div
    :class="inputClasses"
    class="relative h-[126.955px] w-[126.955px] bg-[#2F929C] rounded-full"
  >
    <img
      :class="inputClasses"
      :src="imageUrl ? imageUrl : Avater"
      class="h-[126.955px] w-[126.955px] bg-[#0A090991] opacity-40 rounded-full"
    /><button @click="toggleModal" class="absolute top-8 text-[#FFFFFF] right-8">
      <EditIcon />
    </button>
  </div>
</template>
<script setup>
import EditIcon from "@/components/icons/editIcon.vue";
import Avater from "@/assets/svg/avater.svg";

defineProps({
  inputClasses: String,
  imageUrl: String,
});
const emit = defineEmits("toggleModal");

const toggleModal = () => {
  emit("toggleModal");
};
</script>
