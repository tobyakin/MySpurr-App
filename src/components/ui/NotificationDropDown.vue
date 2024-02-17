<template>
  <div
    class="absolute bg-white top-12 w-64 z-10 lg:-left-[13rem] -left-[12rem] rounded pt-4 px-3 shadow-lg"
  >
    <div class="w-full">
      <ul class="w-full">
        <li
          :class="item.id === 0 ? 'border-b-[#000000] border-b-[0.5px]' : ''"
          class="w-full py-4 hover:bg-gray-100 px-4 text-left"
          v-for="item in items"
          :key="item.name"
        >
          <span class="text-left p-2 w-full font-Satoshi400">
            {{ item.context }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from "vue";
import { useUserProfile } from "@/stores/profile";

let profile = useUserProfile();
onMounted(() => {
  return profile.userProfile();
});
const emit = defineEmits(["closeDropdown", "clickedItem"]);

const onClickOutside = (element, callback) => {
  document.addEventListener("click", (e) => {
    if (!element.value.contains(e.target)) callback();
  });
};

const props = defineProps({
  showDropdown: Boolean,
  id: String,
  items: Array,
  class: String,
  link: Boolean,
});
const dropdown = ref(null);

const showFeaturesDropdown = computed(() => props.showDropdown);

onMounted(() => {
  setTimeout(() => {
    dropdown.value = document.getElementById(props.id);
    // const dropdown = document.getElementById(props.id);
    onClickOutside(dropdown, () => {
      if (showFeaturesDropdown.value) {
        emit("closeDropdown", false);
      }
    });
  }, 600);
});
</script>
