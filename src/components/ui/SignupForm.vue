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
      <GlobalInput v-model="formData.firstName" type="text" placeholder="First Name" />
      <GlobalInput v-model="formData.lastName" type="text" placeholder="Last Name" />
      <GlobalInput v-model="formData.email" type="email" placeholder="Email Address*" />
      <!-- <PasswordInput v-model="formData.password" placeholder="Password*" /> -->
      <div>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password*"
            v-model="formData.password"
            class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
          />
          <div class="absolute right-3 top-3 text-[#D1D1D6]">
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
      <div>
        <div class="relative">
          <!-- TODO: fix password check for match -->
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password*"
            v-model="formData.confirmPassword"
            :class="passwordsMatch ? 'border-[#254035]' : 'border-[#ef4b4b]'"
            class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
          />
          <div class="absolute right-3 top-3 text-[#D1D1D6]">
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
      <p v-if="passwordsMatch">Passwords match!</p>
      <p v-else>Passwords do not match.</p>
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
      <div v-if="error.terms" class="text-xs my-2 text-red-500">
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
import { ref, reactive, watch } from "vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import {
  registerBusiness,
  registerTalent,
  registerBusinessWithGoogle,
  registerTalentWithGoogle,
} from "@/services/Auth";
// import { useStore } from "@/stores/user";
import { useRouter } from "vue-router";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

// const store = useStore();
const router = useRouter();
let loading = ref(false);
const showPassword = ref(false);
const terms = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const error = reactive({
  terms: "",
});

const formData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const togglrTerms = () => {
  terms.value = !terms.value;
  error.terms = "";
};
const passwordsMatch = ref(false);

const checkPasswordsMatch = () => {
  passwordsMatch.value = formData.password === formData.confirmPassword;
};

watch([() => formData.password, () => formData.confirmPassword], checkPasswordsMatch);

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
  console.log(formData);
  loading.value = true;
  if (!formData.terms) {
    return (error.terms = "Please agree to our terms and conditions");
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
  if (!formData.terms) {
    return (error.terms = "Please agree to our terms and conditions");
  }

  let payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email_address: formData.email,
    password: formData.password,
    hear_about_us: formData.hear_about_us,
    terms: formData.terms,
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
