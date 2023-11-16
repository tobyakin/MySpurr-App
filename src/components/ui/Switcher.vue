<script setup>
import { ref } from "vue";
import XIcon from "@/components/icons/XIcon.vue";
// Define the reactive variable
let isToggled = ref(false);

// Define the toggle function
const toggle = () => {
  isToggled.value = !isToggled.value;
};

// // Expose the reactive variable and the toggle function
// defineProps(["isToggled", "toggle"]);
</script>
<template>
  <div class="">
    <button
      @click="toggle"
      class="togglebutton h-[41.813px] bg-[#2F929C] rounded-[38.855px] px-[5px] w-[73.559px]"
      :class="{ toggled: isToggled }"
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
