<script setup>
// import { useStore } from "@/stores/user";
import { ref, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
import { resetPassword } from "@/services/Auth";
import PasswordInput from "@/components/ui/Form/Input/PasswordInput.vue";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
// const store = useStore();
const router = useRouter();
let loading = ref(false);
// Create a function to parse the URL and get the token value
const getTokenFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("token") || "";
};
// Create a function to retrieve the email from local storage
const getEmailFromLocalStorage = () => {
  return localStorage.getItem("email") || "";
};
const formState = reactive({
  token: getTokenFromURL(), // Get the token value from the URL
  email: getEmailFromLocalStorage(), // Get the email value from local storage
  password: "",
  confirmPassword: "",
});
const errors = reactive({
  confirmPassword: false,
  password: false,
});
const errorsMsg = {
  confirmPassword: "Password does not match",
  password: "",
};

const isValidPassword = computed(() => {
  return formState.password.trim() !== "";
});
const passwordsMatch = computed(() => {
  return formState.password === formState.confirmPassword;
});

const validateForm = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Perform validation before submission
  let isValid = true;

  if (!isValidPassword.value) {
    errors.password = true;
    errorsMsg.password = "Password is required";
    isValid = false;
  }
  if (formState.password !== formState.confirmPassword) {
    errors.confirmPassword = true;
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
    const res = await resetPassword(
      formState.token,
      formState.email,
      formState.password,
      formState.confirmPassword
    );
    router.push({ name: "login" });
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <layout class="bg-[#00474F]">
    <div
      class="justify-center w-[80%] mx-auto md:bg-white rounded-[11.315px] p-2 my-8 lg:p-8"
    >
      <!-- form input  -->
      <div class="py-3">
        <h1
          class="md:text-[22.225px] font-EBGaramond400 text-brand my-6 text-center text-2xl"
        >
          Reset your password
        </h1>

        <div class="flex flex-col gap-4">
          <div>
            <PasswordInput
              :error="errors.password"
              :errorsMsg="errorsMsg.password || !isValidPassword"
              placeholder="Password*"
              v-model="formState.password"
            />
          </div>

          <div>
            <PasswordInput
              :error="errors.confirmPassword || !passwordsMatch"
              :errorsMsg="errorsMsg.confirmPassword"
              placeholder="Confirm Password*"
              v-model="formState.confirmPassword"
            />
          </div>
        </div>
        <div class="mt-4 text-left">
          <p class="font-Satoshi400 text-[12.69px] text-[#000]">
            If you have an account with MySpurr, a reset password link has been sent to
            your email. Please click the link to verify your account.
          </p>
        </div>
        <div class="mt-4">
          <button
            @click="onFinish"
            class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
          >
            <span v-if="!loading">update PASSWORD</span>
            <WhiteLoader v-else />
          </button>
        </div>
      </div>
    </div>
  </layout>
</template>
