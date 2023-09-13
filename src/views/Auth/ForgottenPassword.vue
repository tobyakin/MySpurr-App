<script setup>
import { useStore } from "@/stores/user";
import { ref, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
import { login, loginWithGoogle, registerTalentWithGoogle } from "@/services/Auth";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import AuthInput from "@/components/ui/Form/Input/AuthInput.vue";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
const store = useStore();
const router = useRouter();
let loading = ref(false);
const formState = reactive({
  email: "",
  password: "",
});
const showPassword = ref(false);
const errors = reactive({
  email: false,
  password: false,
});
const errorsMsg = {
  email: "email is required",
  password: "",
};
const isValidEmail = computed(() => {
  return formState.email.trim() !== "";
});

const isValidPassword = computed(() => {
  return formState.password.trim() !== "";
});

const validateForm = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Perform validation before submission
  let isValid = true;

  if (!isValidEmail.value) {
    errors.email = true;
    errorsMsg.email = "Email is required";
    isValid = false;
  }

  if (!isValidPassword.value) {
    errors.password = true;
    errorsMsg.password = "Password is required";
    isValid = false;
  }

  return isValid; // Only return false if there are validation errors
};

const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  Object.keys(errorsMsg).forEach((key) => {
    errorsMsg[key] = "";
  });
};

watch(formState, () => {
  clearInputErrors();
});

const onFinish = async () => {
  loading.value = true;
  if (!validateForm()) {
    loading.value = false;
    return;
  }

  try {
    const res = await login(formState.email, formState.password);
    store.saveUser(res.data);
    console.log(res.data);
    console.log(res.data.portofolio);
    // if (!res.data.business_details && !res.data.work_details && !res.data.portofolio) {
    //   router.push({ name: "onboarding" });
    // } else {
    router.push({ name: "dashboard" });
    // }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const loginWithGoogleApi = async () => {
  loading.value = true;
  try {
    const res = await registerTalentWithGoogle();
    store.saveUser(res.data);
    router.push({ name: "dashboard" });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <layout :showLandingUrl="false" class="bg-[#00474F]">
    <div
      class="justify-center w-[80%] mx-auto md:bg-white rounded-[11.315px] p-2 my-8 lg:p-8"
    >
      <!-- form input  -->
      <div class="py-3">
        <h1
          class="md:text-[22.225px] font-EBGaramond400 text-brand my-6 text-center text-2xl"
        >
          Forgot your password?
        </h1>
        <!-- <button
          @click="loginWithGoogleApi"
          class="w-full flex justify-center gap-2 font-light font-Satoshi400 !p-3 border-[#E5E5E5] border-[0.687px] opacity-[0.8029] rounded-[3.698px]"
        >
          <img class="w-[7%]" src="@/assets/svg/googleIcon.svg" alt="" />
          <p class="text-[16px] font-Satoshi400">Sign in with Google</p>
        </button>
        <div class="flex gap-2 my-5">
          <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
          <p>OR</p>
          <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
        </div> -->

        <div class="flex flex-col gap-4">
          <div>
            <AuthInput
              :error="errors.email"
              :errorsMsg="errorsMsg.email || !isValidEmail"
              v-model="formState.email"
              type="email"
              placeholder="Email Address*"
            />
          </div>

          <div>
            <!-- <PasswordInput
              :error="errors.password"
              :errorsMsg="errorsMsg.password || !isValidPassword"
              v-model="formState.password"
              placeholder="Password*"
            />
 -->
            <div class="relative hidden">
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password*"
                v-model="formState.password"
                class="w-full font-light font-Satoshi400 text-[14px] !p-2 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
              />
              <div class="absolute right-3 top-2 text-[#D1D1D6]">
                <button type="button" @click="toggleShowPassword()" v-if="showPassword">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button type="button" @click="toggleShowPassword()" v-if="!showPassword">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 text-left">
          <p class="font-Satoshi400 text-[9.69px] text-[#000]">
            If you have an account with MySpurr, a reset password link has been sent to
            your email. Please click the link to verify your account.
          </p>
        </div>
        <div class="mt-4">
          <button
            @click="onFinish"
            class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
          >
            <span v-if="!loading">RESET PASSWORD</span>
            <WhiteLoader v-else />
          </button>
        </div>
        <!-- <div class="mt-4 text-center">
          <p class="font-Satoshi400 text-[13.269px] text-[#007582]">
            Need to create an account?
            <router-link class="" to="/signup"> Sign Up </router-link>
          </p>
        </div> -->
      </div>
    </div>
  </layout>
</template>