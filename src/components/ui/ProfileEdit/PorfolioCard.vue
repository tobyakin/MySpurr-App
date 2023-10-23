<template>
  <div class="w-full font-Satoshi400" :class="{ 'md:w-[45%]': two, 'md:w-[31%]': three }">
    <div class="">
      <router-link :to="{ name: 'single-portfolio', params: { id: 1 } }">
        <img class="w-full h-auto max-h-[283.472px] rounded-lg" :src="image" />
      </router-link>
      <div>
        <div class="flex items-center justify-between gap-2 py-[13px]">
          <button @click="redirectToSinglePortfolio">
            <EditIcon class="text-[#297F88] h-[16.193px] w-[16.193px]" />
          </button>

          <div class="flex items-center gap-2">
            <div class="flex items-center gap-[1px] font-Satoshi500">
              <EyeIcon class="h-[13.613px] w-[13.613px]" />
              <span class="text-[8.377px] text-[#00000066] font-Satoshi400">1234</span>
            </div>
            <div class="flex items-center gap-[1px] font-Satoshi500">
              <CommentIcon class="h-[10.783px] w-[10.783px]" />
              <span class="text-[8.377px] text-[#00000066] font-Satoshi400">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EyeIcon from "@/components/icons/eyeIcon.vue";
import CommentIcon from "@/components/icons/commentIcon.vue";
import EditIcon from "@/components/icons/editIcon.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  image: String,
  heading: String,
  text: String,
  two: Boolean,
  three: Boolean,
  date: String,
  blog_category: String,
  blog: Object,
});
const redirectToSinglePortfolio = () => {
  router.push({ name: "single-portfolio", params: { id: 1 } });
};
</script>

<style scoped></style>
