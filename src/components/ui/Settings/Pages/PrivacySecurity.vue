<script setup>
import { ref } from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import Switcher from "@/components/ui/Switcher.vue";
let isToggled = ref(false);
const updateIsToggled = () => {
  isToggled.value = !isToggled.value;
};
</script>
<template>
  <div class="flex flex-col gap-[60px]">
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
            class="btn-brand !border-none lg:!py-3 !py-2 lg:!px-5 !px-2 lg:text-[16.599px] text-[12px] !text-[#FFFFFF] text-center !bg-[#2F929C]"
          >
            Set new password
          </button>
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
            class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
