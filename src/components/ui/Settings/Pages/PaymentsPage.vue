<script setup>
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
</script>
<template>
  <div class="flex flex-col gap-[60px]">
    <div class="flex flex-col gap-[28px]">
      <div>
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Banking Information
        </h3>
      </div>
      <div class="flex flex-col gap-[26px]">
        <div class="flex justify-between items-center flex-row">
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            Method
          </h3>
          <button
            class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            Add Withdrawal Method
          </button>
        </div>
        <div class="flex w-full">
          <p class="text-[#000000] text-[18px] font-Satoshi400">
            Before we can pay you for a hired project, you will need to provide your
            withdrawal methods. More options for withdrawals can be found under the
            “wallet option”
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-[26px]">
      <div class="flex justify-between items-center flex-row">
        <h3
          class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
        >
          Tax Documents
        </h3>
        <button
          class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
        >
          Save
        </button>
      </div>
      <div
        class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
      >
        <GlobalInput
          inputClasses="bg-transparent border-none !px-0 !py-[4px]"
          type="text"
        />
      </div>
    </div>
    <div class="flex flex-col gap-[26px]">
      <div class="flex flex-col gap-[10px]">
        <div class="flex flex-col gap-2">
          <h3
            class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
          >
            Invoice Display Name
          </h3>
          <p class="text-[#000000] text-[18px] font-Satoshi400">
            You can add an optional company name to your invoices for reporting purposes
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-[10px]">
        <h3 class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]">
          Company Name
        </h3>

        <div class="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
          <div
            class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#254035AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
          >
            <GlobalInput
              inputClasses="bg-transparent border-none !px-0 !py-[4px]"
              type="text"
            />
          </div>

          <button
            class="btn-brand !border-none !py-[13.05px] !px-10 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
