<script setup>
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
const emit = defineEmits(["goToAccount"]);

const goToAccount = () => {
  emit("goToAccount");
};
// const goToGettingStarted = () => {
//   emit("goToWithdraw");
// };
</script>
<template>
  <div class="w-full flex flex-col lg:gap-[81.97px] gap-[41.97px]">
    <div
      class="lg:flex lg:py-[108px] py-[70px] px-[57px] justify-between bg-[#E6F1F3] rounded-[13.076px] border-[0.872px] border-[#F6F6F6] gap-12 mt-6"
    >
      <div
        class="w-full mt-2 font-light font-Satoshi400 p-4 py-1.5 border-[#000000AB] border-[0.737px] opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px]"
      >
        <GlobalInput
          inputClasses="bg-transparent border-none !px-0 !py-[3px] !text-[#000000] text-center text-[18.811px] !placeholder:text-[#31795A00] "
          type="text"
          placeholder="Enter a question here to search our knowledgebase for Answers "
        />
      </div>
    </div>
    <div class="flex flex-col justify-evenly lg:gap-[60.313px] gap-[30.313px]">
      <div
        class="flex md:flex-row flex-col justify-evenly lg:gap-[60.313px] gap-[30.313px]"
      >
        <button
          @click="goToAccount"
          class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
        >
          <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
            Account and Profile
          </h3>
          <p class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]">
            Account Creation, Profile Management, Password and Security
          </p>
        </button>
        <button
          class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
        >
          <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
            Getting Started
          </h3>
          <p class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]">
            Onboarding Process, Platform Navigation, First Project Setup
          </p>
        </button>
        <button
          class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
        >
          <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
            Job Management
          </h3>
          <p class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]">
            Posting a Job, Bidding and Proposals, Managing Jobs
          </p>
        </button>
      </div>
      <div
        class="flex md:flex-row flex-col justify-evenly lg:gap-[60.313px] gap-[30.313px]"
      >
        <button
          class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
        >
          <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
            Payments and Billing
          </h3>
          <p class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]">
            Payment Methods, Billing Issues, Transaction History
          </p>
        </button>
        <button
          class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
        >
          <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
            Policies and Guidelines
          </h3>
          <p class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]">
            Terms of Service, Community Guidelines, Privacy Policy
          </p>
        </button>
        <button
          class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
        >
          <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
            Communication
          </h3>
          <p class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]">
            Messaging System, Notifications, Alerts and Updates
          </p>
        </button>
      </div>
    </div>
    <div>
      <h3
        class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
      >
        Open Ticket
      </h3>
    </div>
    <div class="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
      <p class="text-[#000000] text-[18px] font-Satoshi400">
        Couldn’t find whay you are looking for?
      </p>
      <button
        class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
      >
        Open Ticket
      </button>
    </div>
  </div>
</template>

<style></style>
