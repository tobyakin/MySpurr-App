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
    const res = await profileStore.handleUpdateBio();
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
  <div>
    <div class="flex flex-col h-[45vh] overflow-y-auto hide-scrollbar gap-[21px]">
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
                v-model="businessDeatils.first_name"
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
                v-model="businessDeatils.last_name"
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
                v-model="businessDeatils.business_name"
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
                v-model="businessDeatils.rate"
                type="text"
              />
            </div>
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] py-1"
            >
              <label class="text-[#01272C] flex px-3 text-[10px] font-Satoshi400"
                >Experience Level</label
              >
              <!-- <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                v-model="businessDeatils.experienceLevel"
                type="text"
              /> -->
              <div class="flex w-full items-center">
                <a-select
                  placeholder="experience level"
                  :bordered="false"
                  :show-arrow="false"
                  class="w-full !px-0"
                  show-search
                  v-model:value="businessDeatils.experienceLevel"
                >
                  <a-select-option disabled>experience level</a-select-option>
                  <a-select-option v-for="i in Experience" :key="i.name" :value="i.name">
                    {{ i.name }}
                  </a-select-option>
                </a-select>
              </div>
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
                v-model="businessDeatils.linkedin"
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
                v-model="businessDeatils.instagram"
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
                v-model="businessDeatils.twitter"
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
                v-model="businessDeatils.behance"
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
                v-model="businessDeatils.facebook"
                type="text"
              />
            </div>
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label
                class="text-[#01272C] text-[10px] flex flex-row gap-[10px] font-Satoshi400"
                ><CalendlyIcon class="h-[13px] w-[13px]" />Calendly booking link</label
              >
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                v-model="businessDeatils.calendlylink"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full mt-[16px] gap-[15px]">
        <p class="text-[24px] text-[#244034] font-Satoshi400 leading-[40.393px]">
          Location
        </p>
        <div class="md:flex-row flex-col justify-between flex gap-[19px]">
          <div
            class="border-[0.737px] w-full border-[#254035AB] flex-col flex rounded-[5.897px] p-0 py-1"
          >
            <label class="text-[#01272C] px-3 flex text-[10px] font-Satoshi400"
              >Country</label
            >
            <div class="flex w-full items-center">
              <a-select
                :placeholder="prefillCountry"
                :bordered="false"
                :show-arrow="false"
                class="w-full !px-0"
                show-search
                v-model:value="selectedCountry"
              >
                <a-select-option disabled>country or region</a-select-option>
                <a-select-option
                  v-for="country in contriesCode?.data"
                  :key="country.id"
                  :value="country.name"
                >
                  {{ country.name }}
                </a-select-option>
              </a-select>
            </div>

            <!-- <GlobalInput
            inputClasses="bg-transparent border-none !px-0 !py-[4px]"
            v-model="businessDeatils.location"
            type="text"
          /> -->
          </div>

          <div
            class="border-[0.737px] w-full border-[#254035AB] flex-col flex rounded-[5.897px] p-0 py-1"
          >
            <label class="text-[#01272C] px-3 flex text-[10px] font-Satoshi400"
              >State</label
            >
            <!-- <GlobalInput
            inputClasses="bg-transparent border-none !px-0 !py-[4px]"
            v-model="businessDeatils.location"
            type="text"
          /> -->
            <div class="flex w-full items-center">
              <a-select
                :placeholder="prefillState"
                :show-arrow="false"
                :bordered="false"
                class="w-full !px-0"
                show-search
                v-model:value="selectedState"
              >
                <a-select-option disabled>state or city</a-select-option>
                <a-select-option
                  v-for="state in states?.data"
                  :key="state.id"
                  :value="state.name"
                >
                  {{ state.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center mt-8">
      <button
        @click="onFinish"
        :disabled="loading"
        class="btn-brand !border-none !w-[30%] flex items-center justify-center mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader class="my-1" v-if="loading" />
      </button>
    </div>
  </div>
</template>
