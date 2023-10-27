<script setup>
import { ref, onMounted } from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import LinkdeinIcon from "@/components/icons/linkdeinIcon.vue";
import InstagramIcon from "@/components/icons/instagramIcon.vue";
import BeIcon from "@/components/icons/beIcon.vue";
import TwitterIcon from "@/components/icons/twitterIcon.vue";
import FacebookIcon from "@/components/icons/facebookIcon.vue";
import { useUserProfile } from "@/stores/profile";
import { storeToRefs } from "pinia";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

const profileStore = useUserProfile();
const { bioInfo } = storeToRefs(profileStore);
let loading = ref(false);

const userProfile = useUserProfile();
const prefillDetails = () => {
  bioInfo.value.first_name = userProfile.user?.data?.first_name || "";
  bioInfo.value.last_name = userProfile.user?.data?.last_name || "";
  bioInfo.value.skill_title = userProfile.user?.data?.skill_title || "";
  bioInfo.value.rate = userProfile.user?.data?.rate || "";
  bioInfo.value.location = userProfile.user?.data?.location || "";
  bioInfo.value.linkedin = userProfile.user?.data?.linkedin || "";
  bioInfo.value.instagram = userProfile.user?.data?.instagram || "";
  bioInfo.value.twitter = userProfile.user?.data?.twitter || "";
  bioInfo.value.behance = userProfile.user?.data?.behance || "";
  bioInfo.value.facebook = userProfile.user?.data?.facebook || "";
};
const onFinish = async () => {
  loading.value = true;
  try {
    const res = await profileStore.handleUpdateBio();
    profileStore.userProfile();
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
    <div class="flex md:flex-row flex-col justify-between gap-[21px]">
      <div class="flex flex-col md:w-[50%] gap-[20px]">
        <p class="text-[24px] text-[#244034] font-Satoshi400 leading-[40.393px]">
          Basic Info
        </p>
        <div class="flex-col flex gap-[19px]">
          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label class="text-[#01272C] text-[10px] flex font-Satoshi400"
              >First Name</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.first_name"
              type="text"
            />
          </div>

          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Last Name
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.last_name"
              type="text"
            />
          </div>
          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Skill Title</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.skill_title"
              type="text"
            />
          </div>

          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Rate /hr</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.rate"
              type="text"
            />
          </div>
          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Location</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.location"
              type="text"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col md:w-[50%] gap-[20px]">
        <p class="text-[24px] text-[#244034] font-Satoshi400 leading-[40.393px]">
          Your online profiles
        </p>
        <div class="flex-col flex gap-[19px]">
          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label
              class="text-[#01272C] text-[10px] flex flex-row gap-[10px] font-Satoshi400"
              ><LinkdeinIcon class="w-[11.414px] h-[10.78px]" />LinkedIn</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.linkedin"
              type="text"
            />
          </div>

          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label
              class="text-[#01272C] text-[10px] flex flex-row gap-[10px] font-Satoshi400"
              ><InstagramIcon class="w-[11.508px] h-[11.508px]" />Instagram
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.instagram"
              type="text"
            />
          </div>
          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label
              class="text-[#01272C] text-[10px] flex flex-row gap-[10px] font-Satoshi400"
              ><TwitterIcon class="w-[14.036px] h-[11.229px]" />X</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.twitter"
              type="text"
            />
          </div>

          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label
              class="text-[#01272C] text-[10px] flex flex-row gap-[10px] font-Satoshi400"
              ><BeIcon class="w-[16.289px] h-[10.859px]" />Behance</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.behance"
              type="text"
            />
          </div>
          <div
            class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
          >
            <label
              class="text-[#01272C] text-[10px] flex flex-row gap-[10px] font-Satoshi400"
              ><FacebookIcon class="h-[13px] w-[13px]" />Facebook</label
            >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              v-model="bioInfo.facebook"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center mt-8">
      <button
        @click="onFinish"
        class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader v-if="loading" />
      </button>
    </div>
  </div>
</template>
