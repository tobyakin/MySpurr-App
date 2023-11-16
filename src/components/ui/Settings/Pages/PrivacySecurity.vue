<script setup>
import {} from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import Switcher from "@/components/ui/Switcher.vue";
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
            class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
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
        <Switcher />
      </div>
    </div>

    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Privacy
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
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400">State </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
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
            />
          </div>

          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400">City </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
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
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[61px]">
        <div>
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            My Account
          </h3>
          <p class="text-[#000000] text-[18px] mt-3 font-Satoshi400">
            Add an optional link to your job applications, directing to your preferred
            calendar scheduling tool
          </p>
        </div>
        <div class="flex w-full gap-8">
          <button
            class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            Delete account
          </button>
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
        class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
      >
        Save
      </button>
    </div>
  </div>
</template>
