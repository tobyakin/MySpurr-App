<script setup>
import UserAvater from "../../Avater/UserAvater.vue";
import { ref } from "vue";

const imageUrl = ref("");

const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    imageUrl.value = "";
  }
};
</script>
<template>
  <div class="flex flex-col justify-center items-center gap-[40px]">
    <UserAvater :imageUrl="imageUrl" />
    <div>
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
        class="btn-brand !border-none !w-full !py-3 !px-10 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span class="text-[12.067px]">Update photo</span>
      </label>
    </div>
    <p
      class="text-[14px] w-[70%] text-center leading-[18.599px] text-[#011B1F] font-Satoshi400"
    >
      On MySpurr, we require members to use their real identities, so take or upload a
      photo of yourself. Photos will be cropped automatically to a preferred circular size
    </p>
  </div>
</template>
