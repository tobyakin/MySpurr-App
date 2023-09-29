<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from "vue";
import layout from "@/components/layout/LightAuthLayout.vue";
import TabSelector from "@/components/ui/TabSelector.vue";
import SignupForm from "@/components/ui/SignupForm.vue";

const talentsTerms = [
  { content: "Get discovered by building your profile and portfolio" },
  { content: "Find new job opportunities in your field" },
  { content: "Grow by join a community of creative professionals" },
];
const businessTerms = [
  { content: "Access a diverse pool of creative talent" },
  { content: "Find the right talent for your project with ease " },
  { content: "Manage your hiring process and payment seamlessly " },
];
const steps = ref([true, false]);

const changeScreen = (from, to, type = null) => {
  steps.value[from] = false;
  steps.value[to] = true;
};
</script>

<template>
  <layout class="bg-[#E9FAFB]">
    <div class="xl:w-[80%] w-full mx-auto" v-if="steps[0]">
      <h1 class="md:text-[36px] font-EBGaramond500 text-2xl font-bold">
        How will you use MySpurr?
      </h1>
      <p class="text-[16px] font-Satoshi400 my-4 md:mb-8">
        Please select an option below.
      </p>

      <div
        class="justify-center w-full md:bg-white rounded-[11.315px] min-h-full p-2 lg:p-8"
      >
        <tab-selector>
          <template #tab1> Creative talent </template>
          <template #tab2> Business </template>
          <template #view1>
            <div class="bg-[#E6F1F3] rounded-[4.181px] p-4 lg:p-8 mt-10">
              <p class="text-[12.692px] text-[#011B1F] font-Satoshi500 mb-6 md:mb-4">
                Signup as a creative talent to
              </p>
              <div v-for="item in talentsTerms" :key="item">
                <div class="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.4108 18.7397C15.0107 18.7397 18.7397 15.0107 18.7397 10.4108C18.7397 5.81097 15.0107 2.08203 10.4108 2.08203C5.81097 2.08203 2.08203 5.81097 2.08203 10.4108C2.08203 15.0107 5.81097 18.7397 10.4108 18.7397ZM14.4259 8.52762C14.6795 8.17887 14.6024 7.69052 14.2537 7.43688C13.9049 7.18324 13.4166 7.26035 13.1629 7.6091L9.536 12.5961L7.57939 10.6395C7.27446 10.3346 6.78007 10.3346 6.47514 10.6395C6.1702 10.9445 6.1702 11.4389 6.47514 11.7438L9.07789 14.3466C9.23936 14.508 9.46343 14.5907 9.69109 14.5729C9.91875 14.555 10.1272 14.4384 10.2615 14.2537L14.4259 8.52762Z"
                      fill="#43D0DF"
                    />
                  </svg>
                  <p
                    class="text-[10px] text-[#011B1F] font-Satoshi400 leading-[19.572px] mb-1"
                  >
                    {{ item.content }}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button
                @click="changeScreen(0, 1)"
                class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
              >
                NEXT
              </button>
            </div>
            <div class="mt-4 text-center">
              <p class="font-Satoshi400 text-[17.253px]">
                Have an account?
                <router-link
                  class="text-[#31795A] border-b-[#31795A] border-b-[1px]"
                  to="/login"
                >
                  Sign In</router-link
                >
              </p>
            </div>
          </template>
          <template #view2>
            <div class="bg-[#E6F1F3] rounded-[4.181px] p-4 lg:p-8 mt-10">
              <p class="text-[12.692px] text-[#011B1F] font-Satoshi500 mb-6 md:mb-4">
                Signup as a business to
              </p>
              <div v-for="item in businessTerms" :key="item">
                <div class="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.4108 18.7397C15.0107 18.7397 18.7397 15.0107 18.7397 10.4108C18.7397 5.81097 15.0107 2.08203 10.4108 2.08203C5.81097 2.08203 2.08203 5.81097 2.08203 10.4108C2.08203 15.0107 5.81097 18.7397 10.4108 18.7397ZM14.4259 8.52762C14.6795 8.17887 14.6024 7.69052 14.2537 7.43688C13.9049 7.18324 13.4166 7.26035 13.1629 7.6091L9.536 12.5961L7.57939 10.6395C7.27446 10.3346 6.78007 10.3346 6.47514 10.6395C6.1702 10.9445 6.1702 11.4389 6.47514 11.7438L9.07789 14.3466C9.23936 14.508 9.46343 14.5907 9.69109 14.5729C9.91875 14.555 10.1272 14.4384 10.2615 14.2537L14.4259 8.52762Z"
                      fill="#43D0DF"
                    />
                  </svg>
                  <p
                    class="text-[10px] text-[#011B1F] font-Satoshi400 leading-[19.572px] mb-1"
                  >
                    {{ item.content }}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button
                @click="changeScreen(0, 1)"
                class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
              >
                NEXT
              </button>
            </div>
            <div class="mt-4 text-center">
              <p class="font-Satoshi400 text-[17.253px]">
                Have an account?
                <router-link
                  class="text-[#31795A] border-b-[#31795A] border-b-[1px]"
                  to="/login"
                >
                  Sign In</router-link
                >
              </p>
            </div>
          </template>
        </tab-selector>
      </div>
    </div>
    <div
      v-if="steps[1]"
      class="justify-center lg:w-[80%] w-full mx-auto md:bg-white rounded-[11.315px] min-h-auto p-2 lg:px-8"
    >
      <tab-selector>
        <template #tab1title> Sign up as a Creative Talent </template>
        <template #tab2title>Sign up as a Business</template>
        <template #tab1> Creative talent </template>
        <template #tab2> Business </template>
        <template #view1> <SignupForm /> </template>
        <template #view2> <SignupForm /> </template>
      </tab-selector>
    </div>
  </layout>
</template>
