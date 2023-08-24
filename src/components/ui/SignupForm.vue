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
      <div class="flex gap-2 items-center">
        <p
          @click="togglrTerms()"
          role="button"
          :class="formData.terms && 'bg-brand  border-brand'"
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
    <div class="mt-4">
      <button
        @click="handleSignup()"
        class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        create my account
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import GlobalInput from "@/components/ui/GlobalInput.vue";
import { registerBusiness, registerTalent } from "@/services/Auth";
import { useStore } from "@/stores/user";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
let loading = ref(false);

const error = reactive({
  terms: "",
});

const formData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  hear_about_us: "",
  terms: false,
};
const togglrTerms = () => {
  formData.terms = !formData.terms;
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
    hear_about_us: formData.hear_about_us,
    terms: formData.terms,
  };
  try {
    const res = await registerBusiness(payload);

    router.push({ name: "login" });
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

    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
