<script setup>
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useSkillsStore } from "@/stores/skills";

import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
const userProfile = useUserProfile();
const OnboardingStore = useOnboardingStore();
const { user } = storeToRefs(userProfile);
const { step, businessDetails, ciso, siso } = storeToRefs(OnboardingStore);
const router = useRouter();
const skillsStore = useSkillsStore();
const { contriesCode, states } = storeToRefs(skillsStore);

// let store = useStore();
const emit = defineEmits(["next"]);
const userDetails = computed(() => {
  return userProfile.user.data;
});
const isOnBoarded = computed(() => userProfile.user);
const industry = ["Freelance", "Full-time ", "Part-time ", "Internship ", "Contract "];
// let selectedCountry = ref("");
// const selectedStates = ref("");

// const formState = ref({
//   business_name: "",
//   top_skills: "",
//   location: "",
//   industry: "",
//   website: "",
//   business_service: "",
//   business_email: "",
//   about_business: "",
// });

const isFormValid = computed(() => {
  return (
    businessDetails.value.business_name.trim() !== "" &&
    siso.value.trim() !== "" &&
    ciso.value.trim() !== "" &&
    businessDetails.value.industry.trim() !== "" &&
    businessDetails.value.website.trim() !== "" &&
    businessDetails.value.business_service.trim() !== "" &&
    businessDetails.value.business_email.trim() !== "" &&
    businessDetails.value.about_business.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
// const onFinish = async () => {
//   console.log(formState);
//   let payload = {
//     business_name: formState.value.business_name,
//     // top_skills: formState.top_skills,
//     location: formState.value.location,
//     industry: formState.value.industry,
//     website: formState.value.website,
//     business_service: formState.value.business_service,
//     business_email: formState.value.business_email,
//     about_business: formState.value.about_business,
//   };
//   try {
//     const res = await OnboardingStore.submitBusinessDetails(payload);
//     next();
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
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
  siso.value = "";
  await skillsStore.handleGetStates(newInput);
});
// watchers to update the selectedIso2 and selectedsiso
watch(selectedIso2, async (newInput) => {
  ciso.value = newInput;
});
//watchers to update the selectedsiso
watch(selectedsiso, async (newInput) => {
  siso.value = newInput;
});

const prefillDetails = (SingleObject) => {
  businessDetails.value.business_name = SingleObject.business_name || "";
  businessDetails.value.business_email = SingleObject.email || "";
};
watch(userDetails, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

onMounted(async () => {
  await userProfile.userProfile();
  prefillDetails(userDetails.value);
});
onMounted(async () => {
  try {
    await userProfile.userProfile();
    if (isOnBoarded.value.business_details) {
      return router.push({ name: "dashboard" });
    }
  } catch (error) {
    /* empty */
  } finally {
    /* empty */
  }
});
let options = ref([]);
let industryOption = ref([
  { name: "Certificate" },
  { name: "Bachelors" },
  { name: "Masters" },
  { name: "Doctorate" },
]);

const showIndustryDropdown = ref(false);
const highlightedIndustryIndex = ref(-1);
const filteredOptionsIndustry = computed(() => {
  const searchJobTitle = businessDetails.value.industry.toLowerCase();
  return industryOption.value.filter((option) =>
    option.name.toLowerCase().includes(searchJobTitle)
  );
});
const selectIndustryOptions = (option) => {
  businessDetails.value.industry = option.name;
  showIndustryDropdown.value = false;
};

const filterIndustryOptions = () => {
  showIndustryDropdown.value = true;
  highlightedIndustryIndex.value = -1;
};
const highlightNextIndustry = () => {
  if (highlightedIndustryIndex.value < filteredOptionsIndustry.value.length - 1) {
    highlightedIndustryIndex.value++;
  }
};
const highlightPreviousIndustry = () => {
  if (highlightedIndustryIndex.value > 0) {
    highlightedIndustryIndex.value--;
  }
};

const selectHighlightedIndustryOption = () => {
  if (highlightedIndustryIndex.value >= 0) {
    selectIndustryOptions(filteredOptionsIndustry.value[highlightedIndustryIndex.value]);
  }
};
onMounted(async () => {
  await skillsStore.getCountriesCode();
});
</script>

<template>
  <section class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your business details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide your business details, they will be used to
        <br class="lg:block hidden" />
        complete your profile on MySpurr.
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto py-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] text-[12px] px-2 font-Satoshi400"
            >Business name</label
          >
          <input
            class="w-full font-light font-Satoshi400 text-left text-[14px] !p-2 bg-transparent border-none opacity-[0.8029] rounded-[4.074px] text-sm"
            type="button"
            :value="businessDetails.business_name"
          />
          <!-- <GlobalInput
            v-model="formState.business_name"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
          /> -->
        </div>
        <div
          class="border-[0.737px] hidden border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">
            Top skills</label
          >
          <GlobalInput
            v-model="businessDetails.top_skills"
            inputClasses="bg-transparent border-none"
            placeholder=""
          />
        </div>
        <div
          class="border-[0.737px] flex lg:flex-row flex-col items-center border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <!-- <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Location</label>
          <GlobalInput
            v-model="businessDetails.location"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
          /> -->
          <div class="w-full">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Country</label>
            <div class="flex w-full items-center">
              <a-select
                placeholder="country or region"
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
          </div>
          <a-divider class="lg:hidden" style="height: 2px; background-color: #254035ab" />
          <a-divider
            class="lg:flex hidden"
            style="height: 5vh; background-color: #254035ab"
            type="vertical"
          />

          <div class="w-full">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">State</label>
            <div class="flex w-full items-center">
              <a-select
                placeholder="state or city"
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
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Industry</label>
          <!-- <GlobalInput
            v-model="businessDetails.industry"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
          /> -->
          <div class="relative">
            <GlobalInput
              v-model="businessDetails.industry"
              @input="filterIndustryOptions"
              @keydown.down="highlightNextIndustry"
              @keydown.up="highlightPreviousIndustry"
              @keydown.enter="selectHighlightedIndustryOption"
              ref="searchInput"
              inputClasses="bg-transparent !border-none"
              placeholder="Graphics Designer"
              type=""
            />

            <ul
              v-if="showIndustryDropdown"
              class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
            >
              <li
                v-for="(option, index) in filteredOptionsIndustry"
                :key="option.id"
                @click="selectIndustryOptions(option)"
                :class="{ highlighted: index === highlightedIndustryIndex }"
                class="hover:bg-brand hover:text-white"
              >
                {{ option.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >About your business</label
          >
          <textarea
            v-model="businessDetails.about_business"
            rows="4"
            class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
            required
            placeholder="Give a brief description about your business"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Website</label>
          <GlobalInput
            v-model="businessDetails.website"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="url"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Business services</label
          >
          <GlobalInput
            v-model="businessDetails.business_service"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
            :key="true"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">E-mail</label>
          <!-- <GlobalInput
            v-model="formState.business_email"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="email"
          /> -->
          <input
            class="w-full font-light font-Satoshi400 text-left text-[14px] !p-2 bg-transparent border-none opacity-[0.8029] rounded-[4.074px] text-sm"
            type="button"
            :value="businessDetails.business_email"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-5">
      <button
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        @click="next"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
      </button>
    </div>
  </section>
</template>
