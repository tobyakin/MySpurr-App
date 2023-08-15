<template>
  <div
    :id="id"
    class="absolute bg-white top-10 w-44 z-10 -left-[8rem] rounded py-4 px-4 shadow-lg"
  >
    <div v-if="link">
      <ul>
        <li v-for="item in items" :key="item.name">
          <router-link
            :to="{ name: item.name }"
            class="text-left p-2 hover:bg-gray-100 w-full font-Satoshi400"
          >
            {{ item.context }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in items" :key="item.name">
          <a
            @click="clickedLink(item)"
            href="javascript:void(0)"
            class="text-left p-2 hover:bg-gray-100 w-full font-Satoshi400"
          >
            {{ item.context }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, defineProps, defineEmits } from "vue";

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

const clickedLink = (link) => {
  emit("clickedItem", link);
};

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
