<script setup>
import { computed, onMounted } from "vue";

const emit = defineEmits(["closeDropdown", "clickedItem"]);

// defineProps(["showDropdown", "id", "items", "class", "link"]);
// const id = id;
// const customClass = class;
const props = defineProps({
  showDropdown: Boolean,
  id: Number,
  items: Number,
  customClass: String,
});

const showFeaturesDropdown = computed(() => props.showDropdown);

// const clickedLink = (link) => {
//   emit("clickedItem", link);
// };
const onClickOutside = (element, callback) => {
  document.addEventListener("click", (e) => {
    let dropdown = document.getElementById(props.id);
    // if (!dropdown.contains(e.target)) callback();
  });
};

onMounted(() => {
  setTimeout(() => {
    onClickOutside("#feature-dropdown", () => {
      if (showFeaturesDropdown.value == true) {
        emit("closeDropdown", false);
      }
    });
  }, 600);
});
</script>
<template>
  <div :id="id" :class="customClass" class="absolute bg-white rounded py-4 shadow-lg">
    <div><slot></slot></div>
  </div>
</template>
