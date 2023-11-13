<script setup>
import { ref, reactive, onMounted } from "vue";
import Tab from "./Tab.vue";
import BalanceCard from "@/components/ui/Wallet/BalanceCard.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import OtpInput from "@/components/ui/Form/Input/OtpInput.vue";
import PasswordEyeIcon from "@/components/icons/PasswordEyeIcon.vue";
import PasswordSlashEyeIcon from "@/components/icons/PasswordSlashEyeIcon.vue";
import { useWalletStore } from "@/stores/wallet";
import { storeToRefs } from "pinia";

const walletStore = useWalletStore();
const { banks } = storeToRefs(walletStore);

const emit = defineEmits("goToWallet");
let amount = ref(null);
const step = ref([true, false, false, false, false]);

const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};

const goToWallet = () => {
  emit("goToWallet");
};
const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
});

const digits = reactive([]);

if (props.default && props.default.length === 4) {
  for (let i = 0; i < 4; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < 4; i++) {
    digits[i] = null;
  }
}
const otpCont = ref(null);
const handleKeyDown = function (event, index) {
  if (event.key !== "Tab" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    return;
  }

  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }
  }
};
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
onMounted(async () => {
  await walletStore.getBanks();
  console.log(banks.value);
});
</script>
<template>
  <div>
    <div>
      <button
        @click="goToWallet"
        class="flex items-center gap-3 text-[#2C4C50] font-Satoshi400 text-[16px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_3130_11959)">
            <path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#007582"
            />
          </g>
          <defs>
            <clipPath id="clip0_3130_11959">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Back
      </button>
    </div>
    <Tab>
      <template #tab1> Withdraw </template>
      <template #tab2> Add Funds </template>
      <template #tab3> Settings </template>
      <template #view1>
        <div v-if="step[0]" class="flex flex-col gap-[60px]">
          <div>
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Withdraw Funds
            </h3>
          </div>
          <div class="flex lg:flex-row flex-col items-center gap-[100px]">
            <BalanceCard :hide="false" class="lg:w-[90%] w-full h-auto" />
            <div class="w-full">
              <div class="flex flex-col gap-[12px]">
                <label
                  class="!text-[#254035] px-2 text-[16px] leading-[37.234px] font-Satoshi400"
                  >How much are you withdrawing?</label
                >
                <GlobalInput
                  inputClasses="bg-transparent !py-3 placeholder:text-[#000000]"
                  placeholder="Type Amount Here"
                  type="number"
                  v-model="amount"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row w-full">
            <button
              @click="changeScreen(0, 1)"
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div>
        <div v-if="step[1]" class="flex flex-col gap-[60px]">
          <div>
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Select Bank Account
            </h3>
          </div>
          <div
            class="flex lg:flex-row flex-col items-center p-[50px] rounded-[10px] bg-[#FBEEEE] gap-[24px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
            >
              <path
                d="M2.91539 32.2117L18.2407 4.20632C18.4133 3.89028 18.6678 3.62654 18.9775 3.44281C19.2872 3.25907 19.6406 3.16211 20.0007 3.16211C20.3608 3.16211 20.7143 3.25907 21.0239 3.44281C21.3336 3.62654 21.5881 3.89028 21.7607 4.20632L37.0861 32.2117C37.2529 32.5166 37.3374 32.8598 37.3312 33.2074C37.325 33.555 37.2283 33.895 37.0506 34.1938C36.8729 34.4926 36.6204 34.74 36.318 34.9114C36.0156 35.0829 35.6737 35.1726 35.3261 35.1716H4.67539C4.32774 35.1726 3.98585 35.0829 3.68344 34.9114C3.38102 34.74 3.12852 34.4926 2.95085 34.1938C2.77318 33.895 2.67646 33.555 2.67024 33.2074C2.66402 32.8598 2.74852 32.5166 2.91539 32.2117ZM22.1341 21.833L23.2087 15.385C23.2405 15.1941 23.2303 14.9985 23.1788 14.8119C23.1274 14.6253 23.0359 14.4522 22.9108 14.3045C22.7857 14.1568 22.63 14.0382 22.4544 13.9567C22.2788 13.8753 22.0876 13.8331 21.8941 13.833H18.1074C17.9138 13.8331 17.7226 13.8753 17.5471 13.9567C17.3715 14.0382 17.2157 14.1568 17.0906 14.3045C16.9655 14.4522 16.8741 14.6253 16.8226 14.8119C16.7712 14.9985 16.761 15.1941 16.7927 15.385L17.8674 21.833H22.1341ZM22.9341 26.8996C22.9341 26.1217 22.625 25.3756 22.0749 24.8255C21.5248 24.2754 20.7787 23.9663 20.0007 23.9663C19.2228 23.9663 18.4767 24.2754 17.9265 24.8255C17.3764 25.3756 17.0674 26.1217 17.0674 26.8996C17.0674 27.6776 17.3764 28.4237 17.9265 28.9738C18.4767 29.5239 19.2228 29.833 20.0007 29.833C20.7787 29.833 21.5248 29.5239 22.0749 28.9738C22.625 28.4237 22.9341 27.6776 22.9341 26.8996Z"
                fill="#DA5252"
              />
            </svg>
            <p class="text-[#000000] text-[18px] font-Satoshi400">
              We observed that you have not setup any beneficiary account. Being your
              first time, we would have to run few verification step to add your bank
              account.
            </p>
          </div>
          <div class="flex flex-row w-full">
            <button
              @click="changeScreen(1, 2)"
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed to Add My Bank Account
            </button>
          </div>
        </div>
        <div v-if="step[2]" class="flex flex-col gap-[60px]">
          <div class="flex flex-col gap-[13px]">
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Select Bank Account
            </h3>
            <p class="text-[#000000] text-[18px] font-Satoshi400 leading-[24px]">
              Select a bank you want to transfer to from your previous beneficiaries
            </p>
          </div>
          <div
            class="flex flex-col items-center p-[20px] lg:p-[50px] rounded-[10px] border-[0.8px] border-[#254035AB] bg-[#FFFFFF] gap-[24px]"
          >
            <div
              class="border-[0.737px] w-full border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
            >
              <GlobalInput
                v-model="rate"
                inputClasses="bg-transparent border-none placeholder:text-[#000]"
                placeholder="Search Here"
                type="text"
              />
            </div>
            <div
              class="flex md:flex-row flex-col justify-between w-full h-[35vh] overflow-y-auto bank_list gap-[21px]"
            >
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-[22px] w-full">
                <div
                  v-for="i in banks.data"
                  :key="i"
                  class="bg-[#E9FAFB] rounded-[7.277px] p-5 w-full"
                >
                  {{ i.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-5 justify-between w-full">
            <button
              class="font-Satoshi500 text-[#43D0DF] text-center border-[#43D0DF] justify-center border-[1px] text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Add New Bank
            </button>
            <button
              @click="changeScreen(2, 3)"
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-center items-center justify-center text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div>
        <div v-if="step[3]" class="flex flex-col gap-[60px]">
          <div class="flex flex-col gap-[13px]">
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Enter Your Pin
            </h3>
            <p class="text-[#000000] text-[18px] font-Satoshi400 leading-[24px]">
              This is the 4 digit pin you use for withdrawal
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <p
              class="text-[#254035] flex gap-4 items-center text-[18px] font-Satoshi400 leading-[24px]"
            >
              Enter 4 Digit Pin
              <button @click="toggleShowPassword">
                <PasswordEyeIcon
                  class="h-[20px] w-[20px] text-[#2B8C97]"
                  v-if="showPassword"
                />
                <PasswordSlashEyeIcon
                  class="h-[20px] w-[20px] text-[#2B8C97]"
                  v-if="!showPassword"
                />
              </button>
            </p>
            <div class="flex flex-row items-center rounded-[10px] gap-[24px]">
              <OtpInput :type="showPassword ? 'text' : 'password'" />
            </div>
          </div>

          <div class="flex flex-row justify-between w-full">
            <button
              @click="changeScreen(3, 4)"
              class="font-Satoshi500 bg-[#43D0DF] text-[#ECFAFC] text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div>
        <div v-if="step[4]" class="flex flex-col gap-[60px]">
          <div class="flex flex-col gap-[23px]">
            <h3 class="text-[#01181B] text-[56px] font-EBGaramond500 leading-[63.84px]">
              Your Money is on its way!
            </h3>
            <p class="text-[#000000] text-[18px] font-Satoshi400 leading-[24px]">
              Your Transaction has been completed an your bank account will be credited as
              soon as possible
            </p>
          </div>

          <div class="flex flex-row justify-start gap-8 w-full">
            <button
              @click="goToWallet"
              class="font-Satoshi500 bg-[#43D0DF] text-[#ECFAFC] text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              My Dashboard
            </button>
            <button
              class="font-Satoshi500 text-[#2F929C] bg-[#fff] text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </template>
      <template #view2>oo</template>
      <template #view3>ooo</template>
    </Tab>
  </div>
</template>
<style>
.digit-box {
  height: 4rem;
  width: 2rem;
  border: 2px solid black;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  padding: 15px;
  font-size: 3rem;
  color: black;
}

.digit-box:focus {
  outline: 3px solid black;
}
.password-input::part(eye)::before {
  /* change the default password eye from . to * */
  content: "*";
}
.password-input::part(eye)::after {
  /* change the default password eye from . to * */
  content: "*";
}
input[type="password"] {
  -webkit-text-security: square !important;
}
</style>
