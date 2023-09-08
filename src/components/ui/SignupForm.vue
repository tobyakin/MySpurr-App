<template>
  <div class="mt-3">
    <button
      @click="handleSignupWithGoogle"
      class="w-full flex justify-center gap-2 font-light font-Satoshi400 !p-3 border-[#E5E5E5] border-[0.687px] opacity-[0.8029] rounded-[3.698px]"
    >
      <img class="w-[7%]" src="@/assets/svg/googleIcon.svg" alt="" />
      <p class="text-[16px] font-Satoshi400">Sign up with Google</p>
    </button>
    <div class="flex gap-2 my-3">
      <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
      <p>OR</p>
      <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
    </div>
    <div class="flex flex-col gap-4">
      <GlobalInput
        :error="errors.firstName"
        :errorsMsg="errorsMsg.firstName"
        v-model="formData.firstName"
        type="text"
        placeholder="First Name"
      />
      <GlobalInput
        :error="errors.lastName"
        :errorsMsg="errorsMsg.lastName"
        v-model="formData.lastName"
        type="text"
        placeholder="Last Name"
      />
      <GlobalInput
        :error="errors.email"
        :errorsMsg="errorsMsg.email || !isValidEmail"
        v-model="formData.email"
        type="email"
        placeholder="Email Address*"
      />
      <PasswordInput
        :error="errors.password"
        :errorsMsg="errorsMsg.password || !isValidPassword"
        v-model="formData.password"
        placeholder="Password*"
      />
      <PasswordInput
        :error="errors.confirmPassword || !passwordsMatch"
        :errorsMsg="errorsMsg.confirmPassword"
        placeholder="Confirm Password*"
        v-model="formData.confirmPassword"
      />
    </div>
    <div class="py-6">
      <div class="flex gap-2 items-center">
        <p
          @click="togglrTerms()"
          role="button"
          :class="terms ? 'bg-brand ' : '  border-brand'"
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
      <div v-if="error.terms" class="text-xs my-2 font-Satoshi400 text-red-500">
        {{ error.terms }}
      </div>
    </div>
    <div class="mb-2">
      <button
        @click="handleSignup()"
        class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        <span v-if="!loading"> create my account </span>
        <WhiteLoader v-else />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import {
  registerBusiness,
  registerTalent,
  registerBusinessWithGoogle,
  registerTalentWithGoogle,
} from "@/services/Auth";
import { useRouter } from "vue-router";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

const router = useRouter();
let loading = ref(false);
const terms = ref(false);

const error = reactive({
  terms: "",
});
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
const isValidEmail = computed(() => {
  return emailRegex.test(formData.email);
});

const isValidPassword = computed(() => {
  return passwordRegex.test(formData.password);
});

const errors = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
});

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errorsMsg = {
  firstName: "first name is required",
  lastName: "last name is required",
  email: "email is required",
  password: "Password is required",
  confirmPassword: "Password does not match",
};
// Watch for changes in input fields and clear errors when input is valid
watch(formData, () => {
  clearInputErrors();
});

const validateForm = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Perform validation before submission
  let isValid = true;

  if (!terms.value) {
    error.terms = "Please agree to our terms and conditions";
    isValid = false;
  }

  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      errors[key] = true;
      isValid = false;
    }
  });
  if (!isValidEmail.value) {
    errors.email = true;
    errorsMsg.email;
    isValid = false;
  }

  if (!isValidPassword.value) {
    errors.password = true;
    errorsMsg.password = "password must contain at least one a-z,A-Z,0-9, @$!%*?&";
    isValid = false;
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = true;
    isValid = false;
  }

  return isValid;
};
// Function to clear input errors
const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  Object.keys(errorsMsg).forEach((key) => {
    errorsMsg[key] = "";
  });
};

const passwordsMatch = computed(() => {
  return formData.password === formData.confirmPassword;
});

const togglrTerms = () => {
  terms.value = !terms.value;
  error.terms = "";
};

const activeTab = ref(localStorage.getItem("activeTab") || "talent");

function handleSignup() {
  if (activeTab.value === "business") {
    handleBusinessSignup();
  } else if (activeTab.value === "talent") {
    handleTalentSignup();
  } else {
    // Handle other cases if needed
  }
}
function handleSignupWithGoogle() {
  if (activeTab.value === "business") {
    handleBusinessSignupWithGoogle();
  } else if (activeTab.value === "talent") {
    handleTalentSignupWithGoogle();
  } else {
    // Handle other cases if needed
  }
}
const handleBusinessSignupWithGoogle = async () => {
  try {
    const res = await registerBusinessWithGoogle();
    router.push({ name: "verify" });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const handleTalentSignupWithGoogle = async () => {
  try {
    const res = await registerTalentWithGoogle();
    router.push({ name: "verify" });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleBusinessSignup = async () => {
  console.log("Business signup");
  loading.value = true;
  if (!validateForm()) {
    loading.value = false;
    return;
  }
  let payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email_address: formData.email,
    password: formData.password,
    terms: terms.value,
  };
  try {
    const res = await registerBusiness(payload);
    router.push({ name: "verify" });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleTalentSignup = async () => {
  console.log("Talent signup");
  console.log(formData);
  loading.value = true;
  if (!validateForm()) {
    loading.value = false;
    return;
  }
  let payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email_address: formData.email,
    password: formData.password,
    hear_about_us: formData.hear_about_us,
    terms: terms,
  };
  try {
    const res = await registerTalent(payload);
    router.push({ name: "verify" });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
