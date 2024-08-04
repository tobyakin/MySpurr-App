<template>
  <div
    class="absolute bg-white top-12 w-64 z-10 lg:-left-[13rem] -left-[12rem] rounded pt-4 px-3 shadow-lg"
  >
    <div v-if="props.itemNum > 0" class="w-full">
      <ul class="w-full">
        <li
          class="w-full py-4 hover:bg-gray-100 px-4 text-left border-b-[#000000] border-b-[0.5px]"
        >
        <router-link :to="{name: 'messages'}">
          <span class="text-left p-2 w-full font-Satoshi400">
            You have {{ props.itemNum }} unread Messages
          </span>
        </router-link>
        </li>
      </ul>
    </div>
    <div v-else class="w-full">
      <ul class="w-full">
        <li
          class="w-full py-4 hover:bg-gray-100 px-4 text-left border-b-[#000000] border-b-[0.5px]"
        >
        <span class="text-left p-2 w-full font-Satoshi400">
          You have no Notifications at this moment
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

const props = defineProps(['items', 'itemNum'])
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
