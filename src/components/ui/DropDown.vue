<template>
  <div
    :id="id"
    class="absolute bg-white top-12 w-64 z-10 lg:-left-[13rem] -left-[12rem] rounded pt-4 px-3 shadow-lg"
  >
    <div class="flex items-center gap-4 px-8 mb-4">
      <div>
        <div
          role="button"
          class="h-10 w-10 flex justify-center items-center rounded-full bg-brand"
        >
          <template v-if="userDetails?.image || userDetails?.company_logo">
            <template v-if="displayImage">
              <img
                :src="getImageSrc()"
                class="h-10 w-10 bg-[#0A090991] rounded-full"
                @error="handleImageError"
                alt=""
              />
            </template>
            <template v-else>
              <div class="initials-container text-white font-bold">
                {{ initials }}
              </div>
            </template>
          </template>
          <template v-else>
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
          </template>
        </div>
      </div>
      <div class="">
        <p class="text-[19.722px] font-Satoshi500 capitalize text-[#000]">
          {{
            accountType === "talent"
              ? userDetails?.first_name
              : userDetails?.business_name
          }}
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
import {
  ref,
  computed,
  onMounted,
  defineProps,
  defineEmits,
  onUpdated,
  watch,
} from "vue";
import { useUserProfile } from "@/stores/profile";
import { useStore } from "@/stores/user";

let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  return accountType;
});

let profile = useUserProfile();
onMounted(async () => {
  await profile.userProfile();
});
onUpdated(() => {
  return userDetails.value?.image;
});

const userDetails = computed(() => {
  return profile.user.data;
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
    onClickOutside(dropdown, () => {
      if (showFeaturesDropdown.value) {
        emit("closeDropdown", false);
      }
    });
  }, 600);
});
const imageExists = ref(false);
const initials = ref("");

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

watch([userDetails, accountType], async () => {
  const hasImage = userDetails.value?.image || userDetails.value?.company_logo;
  if (hasImage) {
    const imageSrc = getImageSrc();
    imageExists.value = await checkImageExists(imageSrc);
    if (!imageExists.value) {
      setInitials(userDetails.value?.business_name);
    }
  } else {
    imageExists.value = false;
    setInitials(userDetails.value?.business_name);
  }
});

function setInitials(name) {
  initials.value = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getImageSrc() {
  return accountType.value === "talent"
    ? userDetails.value?.image
    : userDetails.value?.company_logo;
}

function handleImageError() {
  console.error("Image loading error");
  setInitials(userDetails.value?.business_name);
}
const displayImage = computed(() => imageExists.value);
</script>
