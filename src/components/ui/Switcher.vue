<script setup>
import XIcon from "@/components/icons/XIcon.vue";
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
      class="togglebutton h-[41.813px] rounded-[38.855px] px-[5px] w-[73.559px]"
      :class="props.isToggled ? 'bg-[#2F929C] toggled' : 'bg-[#B2ECF2]'"
    >
      <div
        class="slider absolute top-1 flex items-center justify-center w-[34.928px] bg-white rounded-full h-[34.928px]"
      >
        <XIcon />
      </div>
    </button>
  </div>
</template>
<style scoped>
.togglebutton {
  position: relative;
  /* width: 60px; */
  /* height: 30px; */
  /* background-color: #ccc;
  border: none;
  border-radius: 15px; */
  cursor: pointer;
}

.slider {
  /* position: absolute;
  width: 30px;
  height: 30px; */
  /* background-color: #fff; */
  /* border-radius: 50%; */
  transition: transform 0.3s ease-in-out;
}

.toggled .slider {
  transform: translateX(30px);
}
</style>
