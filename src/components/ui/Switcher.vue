<script setup>
import XIcon from "@/components/icons/XIcon.vue";
import TickIcon from "@/components/icons/TickIcon.vue";
const props = defineProps({
  isToggled: Boolean,
});
const emits = defineEmits(["update:isToggled"]);

// Define the toggle function
const handleToggle = () => {
  emits("update:isToggled", props.isToggled);
};
</script>
<template>
  <div class="">
    <button
      @click="handleToggle"
      class="relative cursor-pointer h-[38px] rounded-[38.855px] px-[5px] w-[70px]"
      :class="props.isToggled ? 'bg-[#2F929C] toggled' : 'bg-[#B2ECF2]'"
    >
      <div
        class="slider absolute top-1 flex items-center justify-center w-[30px] bg-white rounded-full h-[30px]"
      >
        <TickIcon v-if="props.isToggled" />
        <XIcon v-else />
      </div>
    </button>
  </div>
</template>
<style scoped>
.slider {
  transition: transform 0.3s ease-in-out;
}

.toggled .slider {
  transform: translateX(30px);
}
</style>
