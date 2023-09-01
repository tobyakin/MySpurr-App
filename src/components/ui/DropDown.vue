<template>
  <div
    :id="id"
    class="absolute bg-white top-10 w-64 z-10 -left-[13rem] rounded pt-4 px-3 shadow-lg"
  >
    <div class="flex items-center gap-4 px-8 mb-4">
      <!-- <img
        class="w-[42.033px] h-[42.033px] rounded-full"
        src="@/assets/image/blogImage.png"
        alt=""
      /> -->
      <div
        role="button"
        class="h-10 w-10 flex justify-center items-center rounded-full bg-brand"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 text-gray-100 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </div>
      <div class="">
        <p class="text-[19.722px] font-Satoshi500 capitalize text-[#000]">
          {{ store.getUser.user.first_name }}
        </p>
        <p class="text-[12px] font-Satoshi500 overflow-hidden text-[#E06F6F]">
          Available
        </p>
      </div>
    </div>
    <div v-if="link" class="w-full">
      <ul class="w-full">
        <li
          :class="
            item.id === 4 || item.id === 2 ? 'border-b-[#000000] border-b-[0.5px]' : ''
          "
          class="w-full py-4 hover:bg-gray-100 px-8"
          v-for="item in items"
          :key="item.name"
        >
          <router-link
            :to="{ name: item.name }"
            class="text-left p-2 w-full font-Satoshi400"
          >
            {{ item.context }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, defineProps, defineEmits } from "vue";
import { useStore } from "@/stores/user";

let store = useStore();

const emit = defineEmits(["closeDropdown", "clickedItem"]);

const onClickOutside = (element, callback) => {
  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) callback();
  });
};

const props = defineProps({
  showDropdown: Boolean,
  id: String,
  items: Array,
  class: String,
  link: Boolean,
});

const showFeaturesDropdown = computed(() => props.showDropdown);

onMounted(() => {
  setTimeout(() => {
    const dropdown = document.getElementById(props.id);
    onClickOutside(dropdown, () => {
      if (showFeaturesDropdown.value) {
        emit("closeDropdown", false);
      }
    });
  }, 600);
});
</script>
