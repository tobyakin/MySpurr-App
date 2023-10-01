<script setup>
import { useStore } from "@/stores/user";
import { ref, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
import { forgottenPassword } from "@/services/Auth";
import AuthInput from "@/components/ui/Form/Input/AuthInput.vue";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
const store = useStore();
const router = useRouter();
let loading = ref(false);
const message = ref("");
const formState = reactive({
  email: "",
});
const errors = reactive({
  email: false,
});
const errorsMsg = {
  email: "email is required",
};
const isValidEmail = computed(() => {
  return formState.email.trim() !== "";
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
    const res = await forgottenPassword(formState.email);
    message.value = res.data.message;
    // Store the email in local storage after submission
    localStorage.setItem("email", formState.email);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <layout :showLandingUrl="false" class="bg-[#00474F]">
    <div
      class="justify-center w-[80%] mx-auto md:bg-white rounded-[11.315px] p-2 my-8 lg:p-8"
    >
      <!-- form input  -->
      <div v-if="!message" class="py-3">
        <h1
          class="md:text-[22.225px] font-EBGaramond400 text-brand my-6 text-center text-2xl"
        >
          Forgot your password?
        </h1>

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

          <div></div>
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
      </div>
      <p
        v-else
        class="font-Satoshi400 text-[14.69px] overflow-hidden flex flex-wrap text-[#000]"
      >
        {{ message }}
      </p>
    </div>
  </layout>
</template>
