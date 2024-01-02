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
          </div>
        </div>
        <div class="flex justify-between gap-[13px] flex-col">
          <div class="lg:text-right text-left flex flex-col gap-[10px]">
            <p class="text-[#254035AB] text-[14px] leading-[24px]">Invoice No</p>

            <h3 class="text-[#00474F] uppercase text-[24px] font-Satoshi400">
              INV-283749
            </h3>
          </div>
          <div class="flex flex-col lg:w-[40%] gap-[12px]">
            <h3 class="text-[#000000] text-[12px] font-Satoshi500">
              Client’s Information
            </h3>
          </div>
        </div>
        <div class="flex flex-col mt-[12px] gap-[10px]">
          <h3 class="text-[#244034] text-[27px] font-EBGaramond500">Jhone Doe.</h3>
          <div class="text-[#00000080] text-[16px] font-Satoshi400">
            <p>Managing Director, Company Ltf</p>
            <p>Phone: +123 456 6789</p>
            <p>FCT, Nigeria</p>
            <p>Email: example@xyz.com</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex lg:flex-row flex-col justify-end gap-4 w-full mt-12">
      <div class="flex justify-end w-full gap-4">
        <button
          class="text-brand border-brand border-[1px] font-Satoshi500 text-[14.153px] capitalize rounded-full px-5 p-[13px] w-full lg:w-[18%]"
        >
          Save as Draft
        </button>

        <button
          class="text-white bg-brand font-Satoshi500 text-[14.153px] capitalize rounded-full px-5 p-[13px] w-full lg:w-[14%]"
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
</script>

<style></style>
