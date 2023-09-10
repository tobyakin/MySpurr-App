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
            <PasswordInput
              :error="errors.password"
              :errorsMsg="errorsMsg.password || !isValidPassword"
              placeholder="Password*"
            />
          </div>

          <div>
            <PasswordInput
              :error="errors.confirmPassword || !passwordsMatch"
              :errorsMsg="errorsMsg.confirmPassword"
              placeholder="Confirm Password*"
            />
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
            <span v-if="!loading">update PASSWORD</span>
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
