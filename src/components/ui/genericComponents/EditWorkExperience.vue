<template>
  <div class="">
    <div
      class="flex md:gap-24 gap-8 items-center justify-center flex-wrap md:flex-nowrap"
    >
      <div class="w-full flex text-[#31795A] flex-col gap-5">
        <div class="w-full font-Satoshi400 flex flex-col gap-6">
          <div v-for="(item, index) in items" :key="item" class="flex gap-3">
            <div class="">
              <div
                class="h-12 w-12 text-[#31795A] bg-[#EFF6F3] flex justify-center text-center items-center rounded-full"
              >
                {{ index + 1 }}
              </div>
              <div v-if="index + 1 != items.length" class="flex justify-center">
                <div class="h-16 bg-[#EFF6F3] my-4 w-[0.8px]"></div>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex flex-col">
                <h1
                  class="text-[14.878px] font-Satoshi500 text-[#000000] leading-[25.277px]"
                >
                  {{ item.title }}
                </h1>
                <p class="text-[16px] font-Satoshi500 text-[#31795A] leading-[23.797px]">
                  {{ item.company_name }} . {{ item.employment_type }}
                </p>

                <h1
                  class="text-[11.572px] font-Satoshi500 !mb-3 text-[#011B1F] leading-[23.797px]"
                >
                  {{ item.start_date }} -
                  {{ item.end_date }}
                </h1>
                <p class="text-[#000000BF] text-[16px] flex flex-wrap">
                  {{ item.description }}
                </p>
              </div>
              <button class="flex justify-normal">
                <EditIcon @click="openEdit(index)" class="text-[#297F88]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EditIcon from "@/components/icons/editIcon.vue";

const props = defineProps({
  sectionInfo: Array,
  text: String,
  image: String,
  list: Array,
  items: Array,
});
const emit = defineEmits("openEdit");

const openEdit = (index) => {
  emit("openEdit", index);
};
</script>

<style scoped></style>
