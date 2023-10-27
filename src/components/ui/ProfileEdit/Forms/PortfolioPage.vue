<script setup>
import { ref, onMounted } from "vue";
import { useUserProfile } from "@/stores/profile";
import CirclePlus from "@/components/icons/circlePlus.vue";
import SampleThree from "@/assets/image/sampleThree.webp";
import PortfolioCard from "@/components/ui/ProfileEdit/PorfolioCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const blogPost = [
  {
    slug: 1,
    cover_image: SampleThree,
    title: "How to Build a Successful Career in the Creative Industry",
    blog_category: "career development",
    blog_description: "trdfgfg",
    created_at: "16 Jul 2018",
  },
];

const userProfile = useUserProfile();

const SingleObject = ref({});
const handleOpenEdit = (index) => {
  SingleObject.value = userProfile?.user?.data?.employment[index];
};
const redirectToSinglePortfolio = () => {
  router.push({ name: "single-portfolio", params: { id: 1 } });
};

onMounted(async () => {
  await userProfile.userProfile();
});
</script>
<template>
  <div class="">
    <div class="flex flex-col gap-[31px]">
      <div class="flex flex-row justify-between items-center gap-[21px]">
        <h4 class="text-[#000000] font-Satoshi500 text-[23.144px]">Add portfolio</h4>
        <button @click="redirectToSinglePortfolio"><CirclePlus /></button>
      </div>
      <div
        class="flex lg:grid-cols-4 lg:grid flex-row gap-3 hide-scrollbar overflow-x-auto w-full"
      >
        <PortfolioCard
          v-for="blog in blogPost"
          :key="blog"
          :image="blog.cover_image"
          :heading="blog.title"
          :text="blog.blog_description"
          :date="blog.created_at"
          :blog_category="blog.blog_category"
          :blog="blog"
        />
      </div>
    </div>
  </div>
</template>
