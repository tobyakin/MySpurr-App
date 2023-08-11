<script setup>
// import { useStore } from "@/stores/user";
import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
import TabSelector from "@/components/ui/TabSelector.vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";
import SignupForm from "@/components/ui/SignupForm.vue";
const activetab = ref("1");

// const store = useStore();
// const router = useRouter();
// let loading = ref(false);

// const onFinish = async (values) => {
//     loading.value = true;

//     let dob = dayjs(formState.dob).format("YYYY-MM-DD")

//     try {
//         const res = await login(values.email, values.password, dob)
//         store.saveUser(res.data)
//         router.push({ name: "dashboard" });

//     } catch (error) {
//         console.log(error)
//     }

//     finally {
//         loading.value = false;
//     }
// };

const togglrRemember = () => {
  formState.remember = !formState.remember;
};

const formState = reactive({
  email: "",
  password: "",
  remember: false,
  dob: "",
});
const talentsTerms = [
  { content: "Get discovered by building your profile and portfolio" },
  { content: "Find new job opportunities in your field" },
  { content: "Grow by join a community of creative professionals" },
];
const businessTerms = [
  { content: "Access a diverse pool of creative talent" },
  { content: "Find the right talent for your project with ease " },
  { content: "Manage your hiring process and payment seamlessly " },
];
const steps = ref([true, false]);
const changeScreen = (from, to, type = null) => {
  steps.value[from] = false;
  steps.value[to] = true;
};
</script>

<template>
  <layout class="bg-[#E9FAFB]">
    <h1 class="md:text-[36px] font-EBGaramond500 text-2xl font-bold mb-1 md:mb-2">
      How will you use MySpurr?
    </h1>
    <p class="text-[16px] font-Satoshi400 mb-6 md:mb-4">Please select an option below.</p>

    <div
      v-if="steps[0]"
      class="justify-center w-full md:bg-white rounded-[11.315px] min-h-full p-2 lg:p-8"
    >
      <tab-selector v-model="activetab">
        <template #tab1> Creative talent content </template>
        <template #tab2> Business content </template>
        <template #view1>
          <div class="bg-[#E6F1F3] rounded-[4.181px] p-4 lg:p-8 mt-10">
            <p class="text-[12.692px] text-[#011B1F] font-Satoshi500 mb-6 md:mb-4">
              Signup as a creative talent to
            </p>
            <div v-for="item in talentsTerms" :key="item">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.4108 18.7397C15.0107 18.7397 18.7397 15.0107 18.7397 10.4108C18.7397 5.81097 15.0107 2.08203 10.4108 2.08203C5.81097 2.08203 2.08203 5.81097 2.08203 10.4108C2.08203 15.0107 5.81097 18.7397 10.4108 18.7397ZM14.4259 8.52762C14.6795 8.17887 14.6024 7.69052 14.2537 7.43688C13.9049 7.18324 13.4166 7.26035 13.1629 7.6091L9.536 12.5961L7.57939 10.6395C7.27446 10.3346 6.78007 10.3346 6.47514 10.6395C6.1702 10.9445 6.1702 11.4389 6.47514 11.7438L9.07789 14.3466C9.23936 14.508 9.46343 14.5907 9.69109 14.5729C9.91875 14.555 10.1272 14.4384 10.2615 14.2537L14.4259 8.52762Z"
                    fill="#43D0DF"
                  />
                </svg>
                <p
                  class="text-[10px] text-[#011B1F] font-Satoshi400 leading-[19.572px] mb-1"
                >
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </template>
        <template #view2>
          <div class="bg-[#E6F1F3] rounded-[4.181px] p-4 lg:p-8 mt-10">
            <p class="text-[12.692px] text-[#011B1F] font-Satoshi500 mb-6 md:mb-4">
              Signup as a business to
            </p>
            <div v-for="item in businessTerms" :key="item">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.4108 18.7397C15.0107 18.7397 18.7397 15.0107 18.7397 10.4108C18.7397 5.81097 15.0107 2.08203 10.4108 2.08203C5.81097 2.08203 2.08203 5.81097 2.08203 10.4108C2.08203 15.0107 5.81097 18.7397 10.4108 18.7397ZM14.4259 8.52762C14.6795 8.17887 14.6024 7.69052 14.2537 7.43688C13.9049 7.18324 13.4166 7.26035 13.1629 7.6091L9.536 12.5961L7.57939 10.6395C7.27446 10.3346 6.78007 10.3346 6.47514 10.6395C6.1702 10.9445 6.1702 11.4389 6.47514 11.7438L9.07789 14.3466C9.23936 14.508 9.46343 14.5907 9.69109 14.5729C9.91875 14.555 10.1272 14.4384 10.2615 14.2537L14.4259 8.52762Z"
                    fill="#43D0DF"
                  />
                </svg>
                <p
                  class="text-[10px] text-[#011B1F] font-Satoshi400 leading-[19.572px] mb-1"
                >
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </tab-selector>

      <div class="mt-4">
        <button
          @click="changeScreen(0, 1)"
          class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
        >
          NEXT
        </button>
      </div>
      <div class="mt-4 text-center">
        <p class="font-Satoshi400 text-[17.253px]">
          Have an account?
          <router-link class="text-[#31795A] border-b-[#31795A] border-b-[1px]" to="/">
            Sign In</router-link
          >
        </p>
      </div>
    </div>
    <div
      v-if="steps[1]"
      class="justify-center w-full md:bg-white rounded-[11.315px] min-h-full p-2 lg:p-8"
    >
      <tab-selector>
        <template #tab1> Creative talent content </template>
        <template #tab2> Business content </template>
        <template #view1> <SignupForm /> </template>
        <template #view2> <SignupForm /> </template>
      </tab-selector>
      <!-- form input  -->
      <div class="mt-10 hidden">
        <button
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
          <div>
            <input
              class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
              placeholder="First Name"
              type="text"
            />
          </div>
          <div>
            <input
              class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div>
            <input
              class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
              placeholder="Email Address*"
              type="email"
            />
          </div>

          <div>
            <PasswordInput placeholder="Password*" />
          </div>
          <div>
            <input
              class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
              placeholder="How did you hear about MySpurr?"
              type="text"
            />
          </div>
        </div>
        <div class="py-6">
          <div @click="togglrRemember" class="flex gap-2 items-center">
            <p
              :class="
                formState.remember
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
              <router-link
                class="text-[#31795A] border-b-[#31795A] border-b-[1px]"
                to="/"
              >
                Privacy Policy</router-link
              >
            </p>
          </div>
        </div>
        <div class="mt-4">
          <button
            class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
          >
            create my account
          </button>
        </div>
      </div>
    </div>
  </layout>
</template>
