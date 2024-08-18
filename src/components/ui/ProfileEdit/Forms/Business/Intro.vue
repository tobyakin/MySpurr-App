<script setup>
import { ref, onMounted, watch, computed } from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import LinkdeinIcon from "@/components/icons/linkdeinIcon.vue";
import InstagramIcon from "@/components/icons/instagramIcon.vue";
import BeIcon from "@/components/icons/beIcon.vue";
import TwitterIcon from "@/components/icons/twitterIcon.vue";
import FacebookIcon from "@/components/icons/facebookIcon.vue";
import { useUserProfile } from "@/stores/profile";
import { storeToRefs } from "pinia";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useSkillsStore } from "@/stores/skills";
import CalendlyIcon from "@/components/icons/CalendlyIcon.vue";
const skillsStore = useSkillsStore();
const { contriesCode, states } = storeToRefs(skillsStore);

const profileStore = useUserProfile();
const { businessDeatils } = storeToRefs(profileStore);
let loading = ref(false);
// Split the location string by comma
const prefillCountry = ref("l");
const prefillState = ref("l");

const userProfile = useUserProfile();
const Experience = [
  { name: "Beginner ", year: "(1-2 yrs)" },
  { name: "Intermediate ", year: "(3-5 yrs)" },
  { name: "Expert ", year: "(6-10 yrs)" },
  { name: "More than", year: " 10yrs" },
];

const prefillDetails = () => {
  businessDeatils.value.first_name = userProfile.user?.data?.first_name || "";
  businessDeatils.value.last_name = userProfile.user?.data?.last_name || "";
  businessDeatils.value.business_name = userProfile.user?.data?.business_name || "";
  businessDeatils.value.location = userProfile.user?.data?.location || "";
  businessDeatils.value.industry = userProfile.user?.data?.industry || "";
  businessDeatils.value.about_business = userProfile.user?.data?.about_business || "";
  businessDeatils.value.website = userProfile.user?.data?.website || "";
  businessDeatils.value.business_service = userProfile.user?.data?.business_service || "";
  businessDeatils.value.business_email = userProfile.user?.data?.business_email || "";
  businessDeatils.value.company_logo = userProfile.user?.data?.company_logo || "";
  businessDeatils.value.company_type = userProfile.user?.data?.company_type || "";
  businessDeatils.value.social_media = userProfile.user?.data?.social_media || "";
  businessDeatils.value.social_media_two = userProfile.user?.data?.social_media_two || "";
  businessDeatils.value.siso = userProfile.user?.data?.siso || "";
  businessDeatils.value.ciso = userProfile.user?.data?.ciso || "";
};
const emit = defineEmits(["closeModal"]);
const selectedCountry = ref("");
const selectedState = ref("");
const selectedIso2 = computed(() => {
  const foundCountry = contriesCode?.value?.data?.find(
    (country) => country.name.toLowerCase() === selectedCountry.value.toLowerCase()
  );
  return foundCountry ? foundCountry.iso2 : null;
});
// computed property to find the state ISO code
const selectedsiso = computed(() => {
  const foundState = states?.value?.data?.find(
    (state) => state.name.toLowerCase() === selectedState.value.toLowerCase()
  );
  return foundState ? foundState.iso2 : null;
});

const vidUrl = ref('')
const maxSize = 10
const vidType = ref('')
const vidName = ref('')
const EmbedLink = ref('')

const previewFile = (event) => {
    const file = event.target.files[0];
    console.log(file)

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fileSizeMB = file.size / (1024 * 1024);
        vidUrl.value = reader.result
        vidType.value = file.type
        vidName.value = file.name
        console.log(fileSizeMB, vidType.value, vidUrl.value)
        businessDeatils.value.intro_video = reader.result
      };

      reader.readAsDataURL(file);
     
    } else {
      console.log(file)
    }
  };

// watchers to update the selectedIso2 and selectedsiso
watch(selectedIso2, async (newInput) => {
  // businessDeatils.value.siso = "";
  await skillsStore.handleGetStates(newInput);
});
// watchers to update the selectedIso2 and selectedsiso
watch(selectedIso2, async (newInput) => {
  businessDeatils.value.ciso = newInput;
});
//watchers to update the selectedsiso
watch(selectedsiso, async (newInput) => {
  businessDeatils.value.siso = newInput;
});
//watchers to update the introVideo
watch(vidUrl, async (newInput) => {
  businessDeatils.value.intro_video = newInput;
});
// Function to split the location string into state and country
const splitLocation = (location) => {
  const parts = location.split(",").map((part) => part.trim());
  if (parts.length === 2) {
    selectedState.value = parts[0];
    selectedCountry.value = parts[1];
  }
};

const closeModal = () => {
  emit("closeModal");
};

const onFinish = async () => {
  loading.value = true;
  try {
    const res = await profileStore.handleUpdateBusinessDeatils();
    await profileStore.userProfile();
    closeModal();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  prefillDetails();
  splitLocation(userProfile.user?.data?.location);
  await userProfile.userProfile();
  await skillsStore.getCountriesCode();
});
</script>
<template>
   <div class="flex flex-col gap-[20px]">
    <div
        class="border-[0.737px] border-[#254035AB] flex rounded-[5.897px] p-4 py-1 justify-between items-start"
    >
        <label class="text-[#01272C] flex px-3 text-[10px] font-Satoshi400"
        >Upload the video introduction of your company</label
        >
        <div class="px-0 py-4 pr-8">
          <label for="upload_vid" class="text-[#01272C] text-[0.8rem] flex font-Satoshi500 underline leading-[1.05231rem] cursor-pointer">Choose a file</label>
          <input
            type="file"
            id="upload_vid"
            hidden
            @change="previewFile"
            accept="video/mp4, video/webm, video/ogg"
          />
        </div>
        
    </div>
    <div
      class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
    >
      <label
        class="text-[#01272C] flex px-3 text-[10px] font-Satoshi400"
        >Enter link from YoutTube</label
      >
      <GlobalInput
        inputClasses="bg-transparent border-none !px-0 !py-[4px]"
        v-model="businessDeatils.intro_video"
        type="text"
      />
    </div>
    <div class="preview_vid" v-if="vidName.length > 0">
        <video width="600" height="300" controls>
            <source :src="vidUrl" :type="vidType">
        </video>
        <h3>{{ vidName }}</h3>
    </div>
    <div v-if="EmbedLink.length > 0">  
        <iframe 
        width="100%" 
        height="300" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
        </iframe>
    </div>
    <div class="w-full flex justify-center mt-8">
      <button
        @click="onFinish"
        :disabled="loading"
        class="btn-brand !border-none !w-[30%] flex items-center justify-center mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C] btn-hover-2"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader class="my-1" v-if="loading" />
      </button>
    </div>
   </div>
</template>

<style scoped>

</style>