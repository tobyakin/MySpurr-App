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
      <AuthInput
        :error="errors.firstName"
        :errorsMsg="errorsMsg.firstName"
        v-model="formData.firstName"
        type="text"
        placeholder="First Name"
      />
      <AuthInput
        :error="errors.lastName"
        :errorsMsg="errorsMsg.lastName"
        v-model="formData.lastName"
        type="text"
        placeholder="Last Name"
      />
      <AuthInput
        v-if="storedTab === 'business'"
        :error="errors.business_name"
        :errorsMsg="errorsMsg.business_name"
        v-model="formData.business_name"
        type="text"
        placeholder="Business Name"
      />
      <AuthInput
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

      <!-- password reg dropdown -->
      <div
        v-if="formData.password.length && !isValidPassword"
        class="flex flex-col font-Satoshi400 text-gray-400 text-[12px] gap-2"
      >
        <div class="flex items-center gap-2">
          <div
            :class="{
              ' bg-[#55eb37]': isMinLengthMet,
              ' bg-gray-200': !isMinLengthMet,
            }"
            class="h-3 w-3 flex justify-center items-center rounded-full"
          ></div>
          <p>A minimum of 8 characters</p>
        </div>
        <div class="flex items-center gap-2">
          <div
            :class="{
              ' bg-[#55eb37]': isAtLeastOneNumber,
              ' bg-gray-200': !isAtLeastOneNumber,
            }"
            class="h-3 w-3 flex justify-center items-center rounded-full"
          ></div>
          <p>Atleast one number</p>
        </div>
        <div class="flex items-center gap-2">
          <div
            :class="{
              ' bg-[#55eb37]': isAtLeastOneSpecialChar,
              ' bg-gray-200': !isAtLeastOneSpecialChar,
            }"
            class="h-3 w-3 flex justify-center items-center rounded-full"
          ></div>
          <p>Atleast one special character</p>
        </div>
        <div class="flex items-center gap-2">
          <div
            :class="{
              ' bg-[#55eb37]': isAtLeastOneLowercase,
              ' bg-gray-200': !isAtLeastOneLowercase,
            }"
            class="h-3 w-3 flex justify-center items-center rounded-full"
          ></div>
          <p>Atleast one lowercase letter</p>
        </div>
        <div class="flex items-center gap-2">
          <div
            :class="{
              ' bg-[#55eb37]': isAtLeastOneUppercase,
              ' bg-gray-200': !isAtLeastOneUppercase,
            }"
            class="h-3 w-3 flex justify-center items-center rounded-full"
          ></div>
          <p>Atleast one uppercase letter</p>
        </div>
      </div>
      <PasswordInput
        v-if="storedTab === 'talent'"
        :error="errors.confirmPassword || !passwordsMatch"
        :errorsMsg="errorsMsg.confirmPassword"
        placeholder="Confirm Password*"
        v-model="confirmPassword"
      />
    </div>
    <div class="py-6">
      <div class="flex gap-2 items-center">
        <p
          @click="togglrTerms()"
          role="button"
          :class="terms ? 'bg-brand  ' : '  border-[#B3B3B3]'"
          class="w-[25px] h-[17px] flex justify-center items-center rounded-[3.018px] border"
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
import { ref, reactive, watch, computed, onMounted } from "vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import AuthInput from "@/components/ui/Form/Input/AuthInput.vue";
import { registerBusiness, registerTalent, authWithGoogle } from "@/services/Auth";
import { useRouter } from "vue-router";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useTabStore } from "@/stores/tab";

const store = useTabStore();
const activeTab = ref(store.activeTab);

const router = useRouter();
let loading = ref(false);
const terms = ref(false);
const storedTab = localStorage.getItem("activeTab") || "talent";

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
const isMinLengthMet = computed(() => {
  return formData.password.length >= 8;
});

const isAtLeastOneNumber = computed(() => {
  return /\d/.test(formData.password);
});

const isAtLeastOneSpecialChar = computed(() => {
  return /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(formData.password);
});

const isAtLeastOneLowercase = computed(() => {
  return /[a-z]/.test(formData.password);
});

const isAtLeastOneUppercase = computed(() => {
  return /[A-Z]/.test(formData.password);
});

const errors = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
  business_name: false,
});
// Define refs for your URL parameters and structure them
const user = reactive({
  data: {
    portfolio: false,
    token: "",
    user: {
      status: "",
      type: "",
    },
    work_details: false,
  },
  message: null,
  status: "",
});

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  // confirmPassword: "",
  // business_name: "",
});
const confirmPassword = ref("");
const business_name = ref("");
const errorsMsg = {
  firstName: "First name is required",
  lastName: "Last name is required",
  email: "Email is required",
  password: "Password is required",
  confirmPassword: "Password does not match",
  business_name: "Business name is required",
};
// Watch for changes in input fields and clear errors when input is valid
watch(formData, () => {
  clearInputErrors();
});
watch(
  () => storedTab,
  () => {}
);
const validateBusinessForm = () => {
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
    errorsMsg.password = "Password is required";
    isValid = false;
  }

  if (!formData.business_name) {
    errors.business_name = true;
    isValid = false;
  }

  return isValid;
};
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
    errorsMsg.password = "Password is required";
    isValid = false;
  }

  if (formData.password !== confirmPassword.value) {
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
  return formData.password === confirmPassword.value;
});

const togglrTerms = () => {
  terms.value = !terms.value;
  error.terms = "";
};

function handleSignup() {
  if (storedTab === "business") {
    handleBusinessSignup();
  } else if (storedTab === "talent") {
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
    const res = await authWithGoogle();
    router.push({ name: "dashboard" });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const handleTalentSignupWithGoogle = async () => {
  loading.value = true;

  try {
    const res = authWithGoogle();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  const urlString = window.location.href;
  const urlParams = new URLSearchParams(urlString);
  user.data.portfolio = urlParams.get("portfolio") === "true";
  user.data.token = urlParams.get("token") || "";
  user.data.user.status = urlParams.get("user[status]") || "";
  user.data.user.type = urlParams.get("user[type]") || "";
  user.data.work_details = urlParams.get("work_details") === "true";
  user.status = urlParams.get("status") || "";
  // Check if the user data has values and then save it to the store
  if (
    user.data.portfolio ||
    user.data.token ||
    user.data.user.status ||
    user.data.user.type ||
    user.data.work_details ||
    user.status
  ) {
    store.saveUser(user);
    // Redirect to the "dashboard" route
    router.push({ name: "dashboard" });
  }
});

const handleBusinessSignup = async () => {
  console.log("Business signup");
  loading.value = true;
  if (!validateBusinessForm()) {
    loading.value = false;
    return;
  }
  let payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    password: formData.password,
    business_name: formData.business_name,
  };
  try {
    const res = await registerBusiness(payload);
    router.push({ name: "verify", params: { email: formData.email } });
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
    email: formData.email,
    password: formData.password,
    // terms: terms,
  };
  try {
    const res = await registerTalent(payload);
    router.push({ name: "verify", params: { email: formData.email } });
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
