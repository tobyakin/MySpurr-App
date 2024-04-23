<template>
  <div class="min-h-screen md:h-auto bg-[#E9FAFB]">
    <AuthHeader :showLandingUrl="false" />
    <div class="flex auth_container">
      <!-- <div class="sticky lg:flex flex-shrink-0 items-center hidden top-0">
        <img class="" src="@/assets/image/Auth/AuthImage.png" alt="Auth" />
      </div> -->
      <div class="flex flex-col justify-center w-full text-center items-center lg:py-0">
        <div
          class="w-[100%] h-[80vh] overflow-y-auto py-6 overflow-hidden hide-scrollbar justify-center text-center items-center flex flex-col"
        >
          <div class="flex flex-col gap-[11px]">
            <h4 class="text-[#007582] font-Satoshi700 text-[24.176px] leading-[41.907px]">
              Enter your OTP
            </h4>
            <p class="text-[#000000] font-Satoshi400 text-[14.496px]">
              Enter the 6-digit confirmation code sent to your email.
            </p>
          </div>
          <div class="flex flex-col gap-[25px] py-[25px] justify-evenly">
            <CustomeOtpInput
              :digit-count="6"
              type="text"
              :error="errors.code"
              v-model="code"
            />
            <button
              :disabled="loading"
              :class="
                (loading ? 'cursor-not-allowed' : '',
                code.length === 6 ? 'bg-[#43D0DF]' : 'bg-gray-400 cursor-not-allowed')
              "
              @click="submitCode"
              class="font-Satoshi500 text-white justify-center text-[14px] w-full flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              <span v-if="!loading">SUBMIT</span>
              <WhiteLoader v-else />
            </button>
            <router-link
              to="/login"
              class="text-[#000000] text-[14.496px] font-Satoshi400 underline"
              >Return to Log in</router-link
            >
          </div>
        </div>
        <div>
          <p class="text-[#000000] mb-8 text-[14.496px] font-Satoshi400">
            Didn’t receive OTP via email?
            <button
              @click="resendCode"
              class="underline"
              :class="disableResendButton ? 'cursor-not-allowed' : ''"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import { ref, reactive, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { verifyLogin, RsendVerifyCode } from "@/services/Auth";
import AuthHeader from "@/components/Header/LightAuthHeader.vue";
import CustomeOtpInput from "@/components/ui/Form/Input/OtpInput.vue";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

const store = useStore();
let profile = useUserProfile();
const router = useRouter();
let loading = ref(false);
const route = useRoute();

const accountType = computed(() => {
  return store.getUser.data.user.type;
});
const email = ref(route.params.email);
let disableResendButton = ref(false);
const isOnBoarded = computed(() => profile.user);
const code = ref("");
const errors = reactive({
  code: false,
});

const validateForm = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });
  // Perform validation before submission
  let isValid = true;

  if (!code.value.length === 6) {
    errors.code = true;
    isValid = false;
  }
  return isValid; // Only return false if there are validation errors
};

const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });
};

watch(code, () => {
  clearInputErrors();
});
const submitCode = async () => {
  loading.value = true;
  if (!validateForm()) {
    loading.value = false;
    return;
  }
  try {
    let res = await verifyLogin(code.value);
    if (res.data.status === "true") {
      store.saveUser(res.data);
      await profile.userProfile();
      if (
        isOnBoarded.value &&
        !isOnBoarded.value.business_details &&
        !isOnBoarded.value.work_details
      ) {
        if (accountType.value === "talent") {
          router.push({ name: "talent-onboarding" });
        } else if (accountType.value === "business") {
          router.push({ name: "business-onboarding" });
        }
      } else {
        router.push({ name: "dashboard" });
      }
    } else {
      // Handle unsuccessful login
      console.log("Login failed:", res.data.message);
      loading.value = false;
      code.value = "";
    }
    loading.value = false;
    return res;
  } catch (error) {
    return error;
  } finally {
    loading.value = false;
  }
};
const resendCodeTimer = () => {
  try {
    disableResendButton.value = true;
    resendCode();
    setTimeout(() => {
      disableResendButton.value = true;
    }, 10 * 60 * 100);
  } catch (error) {
    /**/
  }
};
const resendCode = async () => {
  try {
    const res = await RsendVerifyCode(email.value);
    code.value = "";
    return res;
  } catch (error) {
    return error;
  } finally {
    /**/
  }
};
</script>
