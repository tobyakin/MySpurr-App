<template>
  <CenteredModalLarge class=""
    ><div class="p-4">
      <header
        class="flex flex-row items-center justify-between border-b-[#000000] pb-[35px] mb-[35px] border-b-[1px]"
      >
        <h4 class="text-[32px] font-EBGaramond500 text-[#244034]">{{ formTitle }}</h4>
        <button @click="closeModal"><CloseEditModalIcon /></button>
      </header>
      <component :is="view" />
    </div>
  </CenteredModalLarge>
</template>

<script setup>
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import CloseEditModalIcon from "@/components/icons/CloseEditModalIcon.vue";
defineProps({
  view: null,
  formTitle: String,
});
const emit = defineEmits("closeModal");

const closeModal = () => {
  emit("closeModal");
};
</script>
