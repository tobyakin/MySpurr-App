<template>
  <div class="flex flex-col pb-[128px] gap-[36px]">
    <div class="flex justify-between items-center flex-row">
      <button
        class="text-[28.087px] !font-EBGaramond500 flex items-center gap-[5px] text-[#244034] leading-[35.39px]"
      >
        <ArrowLeft /> <span> Preview Invoice </span>
      </button>
    </div>
    <div class="flex flex-col gap-[18px]">
      <div
        class="rounded-[11.367px] border-[#254035AB] border-[1px] lg:p-[34px] p-[20px] bg-white"
      >
        <div class="flex justify-between lg:items-center lg:flex-row gap-[20px] flex-col">
          <div class="bg-[#ECFAFC] rounded-[20px] h-[180px] lg:w-[180px] w-full"></div>
          <div class="lg:text-right text-left flex flex-col gap-[10px]">
            <h3 class="text-[#00474F] text-[18px] font-Satoshi700">
              Trigon Media Limited
            </h3>
            <div class="text-[#00000080] text-[16px] font-Satoshi400">
              <p>No 4, Thumbe Mobil Road, off</p>
              <p>TY Danjuma Street, Asokoro</p>
              <p>FCT, Nigeria</p>
              <p>+2348192837399</p>
            </div>
            <h3 class="text-[#007582] leading-[24px] text-[14px] font-Satoshi400">
              Edit Business Address
            </h3>
          </div>
        </div>
        <hr class="lg:my-[36px] my-8 border-[#96C6CC] opacity-[0.3] border-[3px]" />
        <div class="flex justify-between gap-[20px] flex-col-reverse lg:flex-row">
          <div class="flex flex-col lg:w-[40%] gap-[12px]">
            <h3 class="text-[#000000] text-[17.792px] font-Satoshi500">
              Client’s Information
            </h3>
            <div
              class="text-[#00000080] text-[16px] flex flex-col gap-[10px] font-Satoshi400"
            >
              <GlobalInput
                inputClasses="bg-transparent placeholder:italic  border-[#E5E5E5] border-[1.542px] text-[18.979px] !px-[20px] !rounded-[9.489px] !py-[17px]"
                placeholder="Client’s Name"
                type="text"
              />
              <GlobalInput
                inputClasses="bg-transparent placeholder:italic border-[#E5E5E5] border-[1.542px] text-[18.979px] !px-[20px] !rounded-[9.489px] !py-[17px]"
                placeholder="Email Address"
                type="text"
              />
              <GlobalInput
                inputClasses="bg-transparent placeholder:italic border-[#E5E5E5] border-[1.542px] text-[18.979px] !px-[20px] !rounded-[9.489px] !py-[17px]"
                placeholder="Billing Address"
                type="text"
              />
            </div>
          </div>
          <div class="lg:text-right text-left flex flex-col gap-[10px]">
            <h3 class="text-[#000000] invisible text-[17.792px] font-Satoshi500"></h3>

            <p class="text-[#254035AB] text-[14px] leading-[24px]">Invoice No</p>

            <h3 class="text-[#00474F] uppercase text-[24px] font-Satoshi400">
              INV-283749
            </h3>
          </div>
        </div>
      </div>
      <div
        class="rounded-[11.367px] border-[#254035AB] flex flex-col gap-[36px] border-[1px] lg:p-[34px] p-[20px] bg-white"
      >
        <div class="flex lg:flex-row flex-col gap-[20px] items-center">
          <FormGroup
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Description"
            name="Name"
            placeholder="Enter an Item"
            type="text"
            inputClasses="lg:w-[334px] w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
          ></FormGroup>
          <FormGroup
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Quantity"
            name="Name"
            placeholder="0"
            type="number"
            inputClasses="lg:w-[100px] w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
          ></FormGroup>
          <FormGroup
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Price"
            name="Name"
            placeholder="₦"
            type="number"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
          ></FormGroup>
          <FormGroup
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Amount"
            name="Name"
            placeholder="₦"
            type="number"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
          ></FormGroup
          ><button>
            <TrashIcon class="mt-[19px]" />
          </button>
        </div>
        <div class="flex lg:flex-row flex-col gap-[20px] items-center">
          <button>+ Add New Item</button>
        </div>
        <div class="flex flex-row gap-[40px] items-center lg:justify-end">
          <p class="text-[#254035AB] text-[14px] font-Satoshi400">Subtotal</p>
          <h3 class="text-[26px] font-EBGaramond500 leading-[32.76px]">₦ 0</h3>
        </div>
      </div>
      <div class="rounded-[11.367px] border-[#254035AB] border-[1px] p-[34px] bg-white">
        <div class="flex justify-between gap-[20px] flex-col-reverse lg:flex-row">
          <div class="flex flex-col lg:w-[30%] justify-between gap-[53px]">
            <div class="flex-col flex rounded-[5.897px] w-full h-auto">
              <label class="text-[#01272C] flex font-Satoshi500 text-[17.792px]"
                >Notes / Terms</label
              >
              <textarea
                rows="8"
                class="w-full mt-2 font-light bg-white outline-none font-Satoshi400 !p-2 border-[#b6b5b5] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
              />
            </div>

            <SelectGroup
              labelClasses="font-Satoshi500 text-[17.792px]"
              label="Account to Pay"
              name="Name"
              :items="['Freelance', 'Full Time', 'Part Time']"
              placeholder="account"
              type="text"
              inputClasses="w-full mt-2 font-light bg-white font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
            ></SelectGroup>
          </div>
          <div class="flex flex-col w-[31%] justify-between gap-[12px]">
            <div class="flex flex-row gap-[20px] justify-end items-center">
              <label class="text-[#01272C] font-Satoshi500 text-[14.792px]"
                >Discount(%)</label
              >

              <FormGroup
                labelClasses="font-Satoshi500 !hidden !text-[17.792px]"
                label="Price"
                name="Name"
                placeholder="0"
                type="number"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
              ></FormGroup>
            </div>
            <div class="flex flex-row gap-[20px] w-full justify-end items-center">
              <label class="text-[#01272C] w-full font-Satoshi500 text-[14.792px]">
                Value Add Tax(%)
              </label>
              <FormGroup
                labelClasses="font-Satoshi500 !hidden !text-[17.792px]"
                label="Price"
                name="Name"
                placeholder="0"
                type="number"
                inputClasses=" w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
              ></FormGroup>
            </div>
            <div class="flex flex-row gap-[40px] items-center lg:justify-between">
              <p class="text-[#254035AB] text-[14px] font-Satoshi7400">5% Commissions</p>
              <h3 class="text-[26px] font-EBGaramond500">0</h3>
            </div>
            <div class="flex flex-row gap-[40px] items-center lg:justify-between">
              <p class="text-[#254035AB] text-[14px] font-Satoshi700">Net Total</p>
              <h3 class="text-[26px] font-EBGaramond500">₦0</h3>
            </div>

            <div class="flex flex-row gap-[20px] justify-end items-center">
              <label class="text-[#01272C] w-full font-Satoshi500 text-[14.792px]"
                >Amount Due</label
              >

              <FormGroup
                labelClasses="font-Satoshi500 !hidden !text-[17.792px]"
                label="Price"
                name="Name"
                placeholder="0"
                type="number"
                inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
              ></FormGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex lg:flex-row flex-col justify-between gap-4 w-full mt-12">
      <div class="flex w-full gap-4">
        <button
          class="text-brand border-brand border-[1px] font-Satoshi500 text-[14.153px] capitalize rounded-full px-5 p-[13px] w-full lg:w-[34%]"
        >
          Save as Draft
        </button>
      </div>

      <div class="flex justify-end w-full gap-4">
        <button
          @click="Preview"
          class="text-brand border-brand border-[1px] font-Satoshi500 text-[14.153px] capitalize rounded-full px-5 p-[13px] w-full lg:w-[24%]"
        >
          Preview
        </button>

        <button
          class="text-white bg-brand font-Satoshi500 text-[14.153px] capitalize rounded-full px-5 p-[13px] w-full lg:w-[24%]"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
const emit = defineEmits(["Preview"]);

const Preview = () => {
  emit("Preview");
};
</script>

<style></style>
