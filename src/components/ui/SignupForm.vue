<template>
  <div class="mt-10">
    <button
      @click="signupWithGoogle"
      class="w-full flex justify-center gap-2 font-light font-Satoshi400 !p-3 border-[#E5E5E5] border-[0.687px] opacity-[0.8029] rounded-[3.698px]"
    >
      <img class="w-[7%]" src="@/assets/svg/googleIcon.svg" alt="" />
      <p class="text-[16px] font-Satoshi400">Signup with Google</p>
    </button>
    <div class="flex gap-2 my-5">
      <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
      <p>OR</p>
      <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
    </div>
    <div class="flex flex-col gap-4">
      <GlobalInput v-model="formData.firstName" type="text" placeholder="First Name" />
      <GlobalInput v-model="formData.lastName" type="text" placeholder="Last Name" />
      <GlobalInput v-model="formData.email" type="email" placeholder="Email Address*" />
      <PasswordInput v-model="formData.password" placeholder="Password*" />
      <GlobalInput
        v-model="formData.hear_about_us"
        type="text"
        placeholder="How did you hear about MySpurr?"
      />
    </div>
    <div class="py-6">
      <div @click="togglrRemember" class="flex gap-2 items-center">
        <p
          :class="
            formData.remember
              ? 'border-[0.764px] border-[#B3B3B3]'
              : 'bg-brand  border-brand'
          "
          class="w-4 h-4 flex justify-center items-center rounded-[1.018px] border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3 h-3 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </p>
        <p class="font-Satoshi400 text-[12.129px]">
          By hitting the "Register" button, you agree to the
          <router-link class="text-[#31795A] border-b-[#31795A] border-b-[1px]" to="/"
            >Terms conditions</router-link
          >
          &
          <router-link class="text-[#31795A] border-b-[#31795A] border-b-[1px]" to="/">
            Privacy Policy</router-link
          >
        </p>
      </div>
    </div>
    <div class="mt-4">
      <button
        @click="submit"
        class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        create my account
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import GlobalInput from "@/components/ui/GlobalInput.vue";

const formData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  hear_about_us: "",
  remember: false,
};
const togglrRemember = () => {
  formData.remember = !formData.remember;
};

console.log(formData);
const emit = defineEmits(["submit", "signupWithGoogle"]);
const submit = () => {
  emit("submit");
};
const signupWithGoogle = () => {
  emit("signupWithGoogle");
};
</script>
