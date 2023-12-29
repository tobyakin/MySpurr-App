<script setup>
import { ref, computed, onMounted, watch } from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import { useUserSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";
import { useUserProfile } from "@/stores/profile";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useSkillsStore } from "@/stores/skills";

const skillsStore = useSkillsStore();
const { contriesCode } = storeToRefs(skillsStore);

let loading = ref(false);
let profile = useUserProfile();
const userDetails = computed(() => {
  return profile.user.data;
});
const userSettingsStore = useUserSettingsStore();
const { settingsData } = storeToRefs(userSettingsStore);
const currency = ["USD", "NGN"];

// const addLanguage = () => {
//   settingsData.value.language.push({ language: "", proficiency: "" });
// };

// const getJsonOutput = () => {
//   return JSON.stringify(
//     settingsData.value.language.map(({ language, proficiency }) => ({
//       language,
//       proficiency,
//     })),
//     null,
//     2
//   );
// };
const prefillDetails = (SingleObject) => {
  settingsData.value.talent_id = SingleObject.id || "";
  settingsData.value.first_name = SingleObject.first_name || "";
  settingsData.value.last_name = SingleObject.last_name || "";
  settingsData.value.email = SingleObject.email || "";
  settingsData.value.location = SingleObject.location || "";
  settingsData.value.currency = SingleObject.currency || "";
  settingsData.value.application_lin = SingleObject.application_lin || "";
  settingsData.value.country_code = SingleObject.country_code || "";
  settingsData.value.phone_number = SingleObject.phone_number || "";
  settingsData.value.billing_address.country = SingleObject.country || "";
  settingsData.value.billing_address.state = SingleObject.state || "";
  settingsData.value.billing_address.address_1 = SingleObject.address_1 || "";
  settingsData.value.billing_address.address_2 = SingleObject.address_2 || "";
  settingsData.value.billing_address.city = SingleObject.city || "";
  settingsData.value.billing_address.zip_code = SingleObject.zip_code || "";
  // settingsData.value.language = SingleObject.language || "";
};
watch(userDetails, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

const onFinish = async () => {
  loading.value = true;
  try {
    const res = await userSettingsStore.userSettings();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await profile.userProfile();
  await skillsStore.getCountriesCode();
  prefillDetails(userDetails.value);
});
onMounted(async () => {
  await skillsStore.getCountriesCode();
});
</script>
<template>
  <div class="flex flex-col gap-[60px]">
    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Account Info
        </h3>
      </div>
      <div class="flex flex-col gap-[23px]">
        <h3 class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]">
          General
        </h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >First Name
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.first_name"
            />
          </div>

          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Last Name
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.last_name"
            />
          </div>

          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Email Address
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.email"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Location
        </h3>
      </div>
      <div class="flex flex-col gap-[26px]">
        <div class="flex w-full gap-8">
          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              placeholder="Abuja, Federal Capital City, Nigeria"
              v-model="settingsData.location"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Region/Language
        </h3>
      </div>
      <div class="flex flex-col gap-[26px]">
        <h3 class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]">
          Billing Address
        </h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Country
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.billing_address.country"
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400">State </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.billing_address.state"
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Address 1
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.billing_address.address_1"
            />
          </div>
          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Address 2
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.billing_address.address_2"
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400">City </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.billing_address.city"
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >ZIP/Postal Code
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="settingsData.billing_address.zip_code"
            />
          </div>
        </div>
      </div>
      <!-- <div class="flex hidden flex-col gap-[26px]">
        <div class="flex justify-between items-center flex-row">
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            Language
          </h3>
          <button
            class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
            @click="addLanguage"
          >
            Add Language
          </button>
        </div>
        <div
          v-for="(lang, index) in settingsData.language"
          :key="index"
          class="grid grid-cols-1 lg:grid-cols-2 w-full gap-8"
        >
          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Primary Language
            </label>
            <GlobalInput
              v-model="lang.language"
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Proficiency Level
            </label>
            <GlobalInput
              v-model="lang.proficiency"
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
            />
          </div>
        </div>
        <pre>{{ getJsonOutput() }}</pre>
      </div> -->
      <div class="flex flex-col gap-[26px]">
        <h3 class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]">
          Currency
        </h3>
        <div class="flex w-full gap-8">
          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <SelectGroup
              DropdownItem=""
              :items="currency"
              placeholder="currency"
              name=""
              labelClasses="!hidden"
              class="bg-transparent border-none"
              v-model="settingsData.currency"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[0px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Applications
        </h3>
      </div>
      <div class="flex flex-col gap-[26px]">
        <p class="text-[18px] !font-Satoshi400 text-[#244034] lg:leading-[35.39px]">
          Add an optional link to your job applications, directing to your preferred
          calendar scheduling tool
        </p>
        <div class="flex w-full gap-8">
          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="url"
              placeholder="Link URL"
              v-model="settingsData.application_lin"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Mobile Number
        </h3>
      </div>
      <div class="flex flex-col gap-[26px]">
        <div class="flex w-full gap-8">
          <div
            class="w-full flex font-light font-Satoshi400 p-4 gap-3 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <select
              v-model="settingsData.country_code"
              class="bg-transparent w-[8%] !border-r-[1px] text-left !border-r-[#254035AB]"
            >
              <option v-for="code in contriesCode.data" :key="code" :value="code.code">
                {{ code.code }}
              </option>
            </select>
            <!-- <SelectGroup
              DropdownItem=""
              :items="currency"
              placeholder="currency"
              name=""
              labelClasses="!hidden"
              class="bg-transparent w-[4%] border-none"
            /> -->
            <GlobalInput
              inputClasses="bg-transparent !w-full border-none !px-0 !py-[4px]"
              type="tel"
              placeholder="123456789"
              v-model="settingsData.phone_number"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center mt-20 gap-[50px]">
      <button
        class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#00474F] !bg-[#ECFAFC] text-center"
      >
        Cancel
      </button>
      <button
        @click="onFinish"
        class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading">Save</span>
        <WhiteLoader v-else />
      </button>
    </div>
  </div>
</template>
