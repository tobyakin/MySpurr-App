<script setup>
import UserAvater from "../../Avater/UserAvater.vue";
import { ref, onMounted, computed } from "vue";
import { useUserProfile } from "@/stores/profile";
import { storeToRefs } from "pinia";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

const profileStore = useUserProfile();
const { profileImage } = storeToRefs(profileStore);

let loading = ref(false);
const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    profileImage.value = "";
  }
};
const onFinish = async () => {
  loading.value = true;
  try {
    const res = await profileStore.handleUpdateProfilePhoto();
    profileStore.userProfile();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const userDetails = computed(() => {
  return profileStore.user.data.image;
});

onMounted(() => {
  return profileStore.userProfile();
});

onMounted(async () => {
  await profileStore.userProfile();
});
</script>
<template>
  <div class="flex flex-col justify-center items-center gap-[40px]">
    <UserAvater :imageUrl="profileImage ? profileImage : userDetails" />
    <div class="flex lg:flex-row flex-col w-[60%] lg:gap-[31px] gap-4">
      <input
        type="file"
        id="upload_image"
        hidden
        @change="previewImage"
        accept="image/*"
      />
      <label
        for="upload_image"
        role="button"
        class="btn-brand !border-none w-full !py-3 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span class="text-[12.067px]">Add photo</span>
      </label>
      <button
        @click="onFinish"
        role="button"
        class="btn-brand !border-none !w-full !py-3 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader v-if="loading" />
      </button>
    </div>
    <p
      class="text-[14px] lg:w-[70%] text-center leading-[18.599px] text-[#011B1F] font-Satoshi400"
    >
      On MySpurr, we require members to use their real identities, upload a square photo
      of yourself. Photos will be cropped automatically to a preferred circular size
    </p>
  </div>
</template>
