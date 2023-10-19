<script setup>
import { ref, onMounted } from "vue";
import { useUserProfile } from "@/stores/profile";

const userProfile = useUserProfile();
const formState = ref({
  overview: "",
});
const prefillDetails = () => {
  formState.value.overview = userProfile.user?.data?.overview || "";
};

onMounted(async () => {
  prefillDetails();
  await userProfile.userProfile();
});
</script>
<template>
  <div>
    <div class="flex flex-row justify-between gap-[21px]">
      <div class="w-full flex flex-col gap-2 justify-between">
        <textarea
          v-model="formState.overview"
          rows="8"
          class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-[0.737px] border-[#254035AB] rounded-[5.897px] p-2 py-1.5"
        />
      </div>
    </div>
    <div class="w-full flex justify-center mt-8">
      <button
        class="btn-brand !border-none !w-[30%] mx-auto !py-3 !px-10 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        Save
      </button>
    </div>
  </div>
</template>
