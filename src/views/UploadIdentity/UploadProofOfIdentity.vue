<script setup>
import { ref, defineAsyncComponent } from 'vue'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
const SelectGroup = defineAsyncComponent(() => import('@/components/ui/Form/Input/SelectGroup.vue'))

import { useStore } from '@/stores/user'
let store = useStore()

const steps = ref([true, false])

const changeScreen = (from, to, type = null) => {
  steps.value[from] = false
  steps.value[to] = true
}
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[79.735px] gap-[40px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <div class="mt-10">
        <p class="lg:text-[40.705px] text-[23px] font-Satoshi400 text-center text-[#244034]">
          Upload a proof of your identity
        </p>
        <p class="lg:text-[25.382px] text-[15px] font-Satoshi400 text-center text-[#244034]">
          MySpurr requires a valid government issue ID (drivers license, passport, national ID)
        </p>
      </div>
      <div class="flex lg:flex-row flex-col gap-10">
        <SelectGroup
          labelClasses="font-Satoshi500 text-[15.606px]"
          label="Your Country"
          name="Name"
          :items="['Nigeria', 'UK', 'US']"
          placeholder="your country"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
        ></SelectGroup>
        <SelectGroup
          labelClasses="font-Satoshi500 text-[15.606px]"
          label="Document Type"
          name="Name"
          :items="['Drivers license', 'Passport', 'National ID']"
          placeholder="a document type"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
        ></SelectGroup>
      </div>
      <div class="flex lg:flex-row flex-col w-full gap-10">
        <div
          class="bg-[#EDF0B8] w-full border-dashed border-[#254035AB] items-center justify-center min-h-[268.976px] border-[1.789px] p-2 py-6 flex flex-col gap-10 text-center relative rounded-[5.982px] mt-3"
        >
          <div>
            <p class="font-Satoshi500 text-[25.744px] text-[#000]">Front side of your document</p>
            <p class="text-[#000000] text-[13.314px] font-Satoshi500">
              Upload the front side of your document. <br />
              Supports JPG, PNG, PDF
            </p>
          </div>
          <label
            class="border-[#254035AB] py-5 px-10 text-center cursor-pointer rounded-full font-Satoshi500 border-[1.563px]"
            for="front_side_upload_file"
            >Choose a file
          </label>
          <input type="file" hidden id="front_side_upload_file" />
        </div>
        <div
          class="bg-[#EDF0B8] w-full border-dashed border-[#254035AB] items-center justify-center min-h-[268.976px] border-[1.789px] p-2 py-6 flex flex-col gap-10 text-center relative rounded-[5.982px] mt-3"
        >
          <div>
            <p class="font-Satoshi500 text-[25.744px] text-[#000]">Back side of your document</p>
            <p class="text-[#000000] text-[13.314px] font-Satoshi500">
              Upload the front side of your document. <br />
              Supports JPG, PNG, PDF
            </p>
          </div>

          <label
            class="border-[#254035AB] py-5 px-10 cursor-pointer text-center font-Satoshi500 rounded-full border-[1.563px]"
            for="back_side_upload_file"
            >Choose a file
          </label>
          <input type="file" hidden id="back_side_upload_file" />
        </div>
      </div>
      <div class="flex gap-3 justify-start items-center">
        <input
          class="bg-transparent !border-[0.737px] !border-[#254035AB] rounded-[5px] p-4 h-[31.935px] w-[35.408px] py-1.5"
          type="checkbox"
        />
        <label class="text-[#244034] px-2 lg:text-[25.382px] text-[13px] font-Satoshi400"
          >I Confirm that I uploaded valid government-issued photo ID. This ID include my picture,
          signature, name, date of birth, and address
        </label>
      </div>
      <div class="w-full justify-center flex items-center">
        <button
          class="font-Satoshi500 text-white text-[14px] uppercase w-[70%] mx-auto bg-[#2F929C] leading-[11.593px] rounded-full p-5"
        >
          Continue
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
