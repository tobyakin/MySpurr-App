<script setup>
import { defineAsyncComponent, ref, computed, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import SelectGroup from '@/components/ui/Form/Input/SelectGroup.vue'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import { useStore } from '@/stores/user'
import JobRowCard from '@/components/ui/Jobs/JobRowCard.vue'
import Arrow from '@/components/icons/paginationArrow.vue'
import Tabs from '@/components/ui/Jobs/Tabs.vue'
import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const { Job } = storeToRefs(jobsStore)

const FormGroup = defineAsyncComponent(() => import('@/components/ui/Form/Input/FormGroup.vue'))
const Label = defineAsyncComponent(() => import('@/components/ui/Form/Input/Label.vue'))

let store = useStore()
</script>

<template>
  <DashboardLayout>
    <div class="container lg:py-3 py-4 mb-20">
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[20px]">Job Details</h4>
      <div class="mt-8 flex flex-col gap-8">
        <FormGroup
          labelClasses="font-Satoshi500 !text-[17.792px]"
          label="Job Title*"
          name="Name"
          placeholder="Ex: Product Designer"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
        ></FormGroup>
        <div class="flex flex-row w-full gap-8">
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Job Category"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Job Category"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Job Type"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Job Type"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
        </div>
        <div class="flex flex-row w-full gap-8">
          <div class="lg:w-[50%]">
            <SelectGroup
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Salary*"
              name="Name"
              :items="['Monthly', 'Yearly', 'Hourly']"
              placeholder="Job Category"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></SelectGroup>
          </div>
          <div class="lg:w-[50%] flex flex-row gap-9">
            <FormGroup
              labelClasses=" invisible"
              label="Min"
              name="Min"
              placeholder="Min"
              type="number"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-[10px] border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
            <FormGroup
              labelClasses=" invisible"
              label="Max "
              name="Max"
              placeholder="Max"
              type="number"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-[10px] border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
          </div>
        </div>
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
        Skills & Experience
      </h4>
      <div class="mt-8 flex flex-col gap-8">
        <FormGroup
          labelClasses="font-Satoshi500 !text-[17.792px]"
          label="Skills*"
          name="Name"
          placeholder="Add Skills"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
        ></FormGroup>
        <div class="flex flex-row w-full gap-8">
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Experience*"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Experience"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Qualification*"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Qualification"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
        </div>
        <div class="flex flex-row w-full gap-8">
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Industry*"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Industry"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Career Level*"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Career Level"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
        </div>
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
        Address & Location
      </h4>
      <div class="mt-8 flex flex-col gap-8">
        <FormGroup
          labelClasses="font-Satoshi500 !text-[17.792px]"
          label="Address*"
          name="Name"
          placeholder="Address of Job resident"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
        ></FormGroup>
        <div class="flex flex-row w-full gap-8">
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Country*"
            name="Name"
            :items="['Nigeria', 'Uk', 'Niger']"
            placeholder="Country"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="City*"
            name="Name"
            :items="['', '', '']"
            placeholder="City"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="State*"
            name="Name"
            :items="['Lagos', 'Abuja', 'Uyo']"
            placeholder="State"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
        </div>
      </div>
      <div class="flex gap-4 mt-12">
        <button
          class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-auto"
        >
          review</button
        ><button
          class="bg-[#fff] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-auto"
        >
          CANCEL
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
<style></style>
