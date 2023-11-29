<script setup>
import { defineAsyncComponent } from "vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);
const currency = ["US Dollar", "NGN Naira"];
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
      <div class="flex flex-col gap-[26px]">
        <div class="flex justify-between items-center flex-row">
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            Language
          </h3>
          <button
            class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            Add Language
          </button>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
          <div
            class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
              >Primary Language
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
              >Proficiency Level
            </label>
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
            />
          </div>
        </div>
      </div>
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
            <select class="bg-transparent w-[8%] !border-r-[1px] !border-r-[#254035AB]">
              <option value="">+234</option>
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
        class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
      >
        Save
      </button>
    </div>
  </div>
</template>
