<script setup>
import { ref, computed, onMounted } from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import Switcher from "@/components/ui/Switcher.vue";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import { useUserSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";
import { useUserProfile } from "@/stores/profile";
const userSettingsStore = useUserSettingsStore();
const { resetPasswordData } = storeToRefs(userSettingsStore);
let loading = ref(false);

let isToggled = ref(false);
let showModal = ref(false);
let profile = useUserProfile();
const userDetails = computed(() => {
  return profile.user.data;
});

const updateIsToggled = () => {
  isToggled.value = !isToggled.value;
};
const closeModal = () => {
  showModal.value = !showModal.value;
};

const reset = async () => {
  loading.value = true;
  try {
    const res = await userSettingsStore.handleResetpassowrd();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const deleteAccount = async () => {
  loading.value = true;
  try {
    const res = await userSettingsStore.handleDeleteAccount(userDetails.value?.id);
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
});
</script>
<template>
  <div class="flex flex-col gap-[60px]">
    <CenteredModalLarge v-if="showModal">
      <div class="py-[30px] relative">
        <button @click="closeModal" class="absolute right-1 top-1">X</button>

        <div class="flex flex-col text-center gap-[20px]">
          <div class="flex flex-row justify-center items-center gap-[21px]">
            <h4 class="text-[#dc3545] font-Satoshi500 text-[23.144px]">Delete Account</h4>
          </div>
          <p>Are you sure you want to delete your account ?</p>
        </div>
        <div class="w-full flex justify-center gap-[10px] mt-8">
          <button
            disabled
            @click="deleteAccount"
            class="btn-brand !border-none !w-[30%] !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#dc3545]"
          >
            <span v-if="!loading">Confirm</span>
            <WhiteLoader v-else />
          </button>
        </div>
      </div>
    </CenteredModalLarge>
    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Password
        </h3>
      </div>
      <div class="flex flex-col gap-[23px]">
        <div class="flex justify-between items-center flex-row">
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            Set Password
          </h3>
          <button
            @click="reset"
            class="btn-brand !border-none lg:!py-3 !py-2 lg:!px-5 !px-2 lg:text-[16.599px] text-[12px] !text-[#FFFFFF] text-center !bg-[#2F929C]"
          >
            <span v-if="!loading"> Set new password </span>
            <WhiteLoader v-else />
          </button>
        </div>
        <div class="grid grid-cols-1 w-full gap-8">
          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Old Password
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="resetPasswordData.old_password"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >New Password
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="resetPasswordData.new_password"
            />
          </div>

          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Confirm Password
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
              v-model="resetPasswordData.confirm_password"
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
          Two-factor authentication
        </h3>
      </div>
      <div class="">
        <Switcher :isToggled="isToggled" @update:isToggled="updateIsToggled" />
      </div>
    </div>

    <div class="flex flex-col gap-[61px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Privacy
        </h3>
      </div>

      <div class="flex flex-col gap-[10px]">
        <div class="flex flex-col gap-2">
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            My Account
          </h3>
          <h3
            class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
          >
            Delete my account
          </h3>
        </div>
        <div class="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
          <p class="text-[#000000] text-[18px] font-Satoshi400">
            MySpurr makes it easy to delete your account and all the associated data with
            it.
          </p>

          <button
            @click="closeModal"
            class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            <span v-if="!loading"> Delete account</span>
            <WhiteLoader v-else />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
