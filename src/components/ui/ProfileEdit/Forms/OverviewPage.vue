<script setup>
import { ref, onMounted, onUpdated } from "vue";
import { useUserProfile } from "@/stores/profile";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

const userProfile = useUserProfile();
import { storeToRefs } from "pinia";

const { overview } = storeToRefs(userProfile);
let loading = ref(false);
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
const prefillDetails = () => {
  overview.value = userProfile.user?.data?.overview || "";
};
const onFinish = async () => {
  loading.value = true;
  try {
    const res = await userProfile.handleUpdateOverview();
    await userProfile.userProfile();
    closeModal();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
onUpdated(async () => {
  await userProfile.userProfile();
});

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
        :disabled="loading"
        class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader class="my-1" v-if="loading" />
      </button>
    </div>
  </div>
</template>
