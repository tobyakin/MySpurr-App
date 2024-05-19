<script setup>
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useSkillsStore } from "@/stores/skills";

const userProfile = useUserProfile();
const OnboardingStore = useOnboardingStore();
const { user } = storeToRefs(userProfile);
const { step, businessDetails, ciso, siso } = storeToRefs(OnboardingStore);
const router = useRouter();
const skillsStore = useSkillsStore();
const { contriesCode, states, industries } = storeToRefs(skillsStore);

// let store = useStore();
const emit = defineEmits(["next"]);
const userDetails = computed(() => {
  return userProfile.user.data;
});
const isOnBoarded = computed(() => userProfile.user);

const isFormValid = computed(() => {
  return (
    businessDetails.value.business_name.trim() !== "" &&
    siso.value.trim() !== "" &&
    ciso.value.trim() !== "" &&
    businessDetails.value.industry.length >= 0 &&
    businessDetails.value.website.trim() !== "" &&
    businessDetails.value.business_service.trim() !== "" &&
    businessDetails.value.business_email.trim() !== "" &&
    businessDetails.value.about_business.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
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
let options = ref([
  { name: "Design" },
  { name: "UI" },
  { name: "Digital" },
  { name: "Graphics" },
  { name: "Developer" },
  { name: "Product" },
  { name: "Microsoft" },
  { name: "Brand" },
  { name: "Photoshop" },
  { name: "Business" },
  { name: "IT & Technology" },
  { name: "Branding" },
  { name: "Finance" },
]);
// multi select
const search = ref("");
const showDropdown = ref(false);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return industries.value.filter((option) =>
    option.name.toLowerCase().includes(searchTerm)
  );
});

const filterOptions = () => {
  showDropdown.value = true;
  highlightedIndex.value = -1;
};
const placeholderText = computed(() => {
  return businessDetails.value.industry.length >= 3 ? "" : "select your industry areas";
});
const shouldDisplayInput = computed(() => {
  return businessDetails.value.industry.length < 3;
});

const selectOption = (option) => {
  if (businessDetails.value.industry.length < 3) {
    search.value = "";
    showDropdown.value = false;
    highlightedIndex.value = -1;
    businessDetails.value.industry.push(option);
  }
};

const removeSelectedItem = (index) => {
  businessDetails.value.industry.splice(index, 1);
};

const highlightNext = () => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
  }
};

const highlightPrevious = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
};
const getNextId = () => {
  const ids = options.value.map((option) => parseInt(option.id));
  const maxId = Math.max(...ids);
  return (maxId + 1).toString();
};

const selectHighlightedOption = () => {
  if (highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value]);
  } else if (search.value && !filteredOptions.value.length) {
    // If no options match the search term, add the typed item to the list
    // const nextId = getNextId();

    selectOption({ name: search.value });
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
        </div>
        <div
          class="border-[0.737px] flex lg:flex-row flex-col items-center border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
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
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Select your industry areas</label
          >
          <div>
            <div class="selected-items p-2 gap-2">
              <div
                v-for="(selectedItem, index) in businessDetails.industry"
                :key="selectedItem.id"
                class="selected-item bg-brand text-sm font-Satoshi400 p-[5px] text-white rounded-[5px]"
              >
                {{ selectedItem.name }}
                <span
                  @click="removeSelectedItem(index)"
                  class="remove-btn text-black hover:text-white"
                  >x</span
                >
              </div>
            </div>
            <div>
              <GlobalInput
                v-if="shouldDisplayInput"
                v-model="search"
                @input="filterOptions"
                @keydown.down="highlightNext"
                @keydown.up="highlightPrevious"
                @keydown.enter="selectHighlightedOption"
                ref="searchInput"
                inputClasses="bg-transparent !border-none"
                :placeholder="placeholderText"
                type="text"
              />

              <ul
                v-if="showDropdown"
                class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
              >
                <li
                  v-for="(option, index) in filteredOptions"
                  :key="option.id"
                  @click="selectOption(option)"
                  :class="{ highlighted: index === highlightedIndex }"
                  class="hover:bg-brand hover:text-white"
                >
                  {{ option.name }}
                </li>
              </ul>
            </div>
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
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF] btn-hover-1'"
        @click="next"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Update work details
      </button>
    </div>
  </section>
</template>
