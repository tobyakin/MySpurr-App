<script setup>
import { ref, onMounted } from "vue";
import { useUserProfile } from "@/stores/profile";

const userProfile = useUserProfile();
import { storeToRefs } from "pinia";

const { overview } = storeToRefs(userProfile);
let loading = ref(false);

const prefillDetails = () => {
  overview.value = userProfile.user?.data?.overview || "";
};
const onFinish = async () => {
  loading.value = true;
  try {
    const res = await userProfile.handleUpdateOverview();
    userProfile.userProfile();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
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
          v-model="overview"
          rows="8"
          class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-[0.737px] border-[#254035AB] rounded-[5.897px] p-2 py-1.5"
        />
      </div>
    </div>
    <div class="w-full flex justify-center mt-8">
      <button
        @click="onFinish"
        class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        Save
      </button>
    </div>
  </div>
</template>
