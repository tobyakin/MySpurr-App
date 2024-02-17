<script setup>
import { ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";
import Tab from "./Tab.vue";
import BalanceCard from "@/components/ui/Wallet/BalanceCard.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import OtpInput from "@/components/ui/Form/Input/OtpInput.vue";
import PasswordEyeIcon from "@/components/icons/PasswordEyeIcon.vue";
import PasswordSlashEyeIcon from "@/components/icons/PasswordSlashEyeIcon.vue";
import { useWalletStore } from "@/stores/wallet";
import { storeToRefs } from "pinia";
import CautionIcon from "@/components/icons/CautionIcon.vue";
import { useUserProfile } from "@/stores/profile";

const profileStore = useUserProfile();
const userDetails = computed(() => {
  return profileStore?.user?.data;
});
const maskedEmail = computed(() => {
  const email = userDetails.value.email;
  const maskedPart = "*".repeat(email.length - 14); // Mask all characters except the first 4 and last 10
  return maskedPart + email.slice(-10);
});
const walletStore = useWalletStore();
const { banks } = storeToRefs(walletStore);
let loading = ref(false);
const emit = defineEmits(["goToWallet"]);
let amount = ref(null);
const step = ref([true, false, false, false, false, false, false, false]);

const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};

const goToWallet = () => {
  emit("goToWallet");
};

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
const addBankState = reactive({
  talent_id: userDetails.value.uniqueId,
  account_number: "",
  bank_name: "",
  account_name: "",
});
const withdrawPin = ref(""); //Withdrawal Pin

const addBankAccount = async () => {
  loading.value = true;
  let payload = {
    talent_id: addBankState.talent_id,
    account_number: addBankState.account_number,
    bank_name: addBankState.bank_name,
    account_name: addBankState.account_name,
  };
  try {
    const res = await walletStore.addBank(payload);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    loading.value = false;
    changeScreen(5, 6);
  }
};

onMounted(async () => {
  await walletStore.getBanks();
  await profileStore.userProfile();
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
            <CautionIcon />
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
        <!-- Select Bank Account -->
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
              @click="changeScreen(2, 5)"
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
        <!--  Enter Your Pin -->
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
              <OtpInput :digit-count="4" :type="showPassword ? 'text' : 'password'" />
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
        <!--*********************************************** add bank account **********************************************-->
        <div v-if="step[5]" class="flex flex-col gap-[60px]">
          <div>
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Add bank account
            </h3>
          </div>
          <div
            class="flex lg:flex-row flex-col items-center p-[50px] rounded-[10px] bg-[#FBEEEE] gap-[24px]"
          >
            <CautionIcon />
            <p class="text-[#000000] text-[18px] font-Satoshi400">
              For Security Reasons, we would be sending an OTP to your registered email
              address to complete this process.
            </p>
          </div>
          <div class="flex flex-col gap-[24px] w-full">
            <div class="border-[0.737px] border-[#254035AB] rounded-[8px] p-4 py-1.5">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                >Account Number</label
              >
              <GlobalInput
                inputClasses="bg-transparent border-none"
                placeholder=""
                type="text"
                v-model="addBankState.account_number"
              />
            </div>

            <div class="border-[0.737px] border-[#254035AB] rounded-[8px] p-4 py-1.5">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Bank </label>
              <select
                v-model="addBankState.bank_name"
                class="form__input block w-full p-2 bg-transparent border-none px-1 text-sm font-Satoshi400 text-gray-800 transition duration-500 focus:outline-none rounded"
              >
                <option disabled>Select Bank</option>
                <option></option>
                <option v-for="item in banks.data" :key="item.id" :value="item.code">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="border-[0.737px] border-[#254035AB] rounded-[8px] p-4 py-1.5">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                >Beneficiary Name</label
              >
              <GlobalInput
                v-model="addBankState.account_name"
                inputClasses="bg-transparent border-none"
                placeholder=""
                type="text"
              />
            </div>
          </div>
          <div class="flex flex-row w-full">
            <button
              @click="addBankAccount"
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div>
        <!-- Setup Your Withdrawal Pin -->
        <div v-if="step[6]" class="flex flex-col gap-[60px]">
          <div>
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Setup Your Withdrawal Pin
            </h3>
          </div>

          <div
            class="flex lg:flex-row flex-col items-center p-[50px] rounded-[10px] bg-[#FBEEEE] gap-[24px]"
          >
            <CautionIcon />
            <p class="text-[#000000] text-[18px] font-Satoshi400">
              We Discovered You’ve Not Setup your Pin, Enter a 4-digit pin that will be
              using for withdrawal Subsequently.
            </p>
          </div>
          <div class="flex flex-col gap-[20px]">
            <div class="flex flex-col gap-3">
              <p
                class="text-[#254035] flex gap-4 items-center text-[18px] font-Satoshi400 leading-[24px]"
              >
                Enter 4 Digit Pin
                <button @click="toggleShowPassword">
                  <PasswordEyeIcon
                    v-model="withdrawPin"
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
                <OtpInput :digit-count="4" :type="showPassword ? 'text' : 'password'" />
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <p
                class="text-[#254035] flex gap-4 items-center text-[18px] font-Satoshi400 leading-[24px]"
              >
                Confirm Piin
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
                <OtpInput :digit-count="4" :type="showPassword ? 'text' : 'password'" />
              </div>
            </div>
          </div>

          <div class="flex flex-row w-full">
            <button
              @click="changeScreen(6, 7)"
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div>
        <!-- Add bank account -->
        <div v-if="step[7]" class="flex flex-col gap-[60px]">
          <div>
            <h3
              class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
            >
              Add bank account
            </h3>
          </div>
          <div class="flex flex-col gap-[23px]">
            <h3
              class="text-[#01181B] text-[40px] lg:text-[56px] font-EBGaramond500 leading-[63.84px]"
            >
              Verify its your account!
            </h3>
            <p class="text-[#000000] text-[18px] font-Satoshi400 leading-[24px]">
              We’ve sent a 6 digit pin to your registered email, <br />
              <span class="text-[#000000] font-Satoshi700 text-[18px]">{{
                maskedEmail
              }}</span>
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <p
              class="text-[#254035] flex gap-4 items-center text-[18px] font-Satoshi400 leading-[24px]"
            >
              Enter OTP Here
            </p>
            <div class="flex flex-row items-center rounded-[10px] gap-[24px]">
              <OtpInput :digit-count="6" :type="showPassword ? 'text' : 'password'" />
            </div>
          </div>
          <!-- <div class="flex flex-row items-center rounded-[10px]">
            <OtpInput :digit-count="6" :type="showPassword ? 'text' : 'password'" />
          </div> -->
          <div class="flex flex-row w-full">
            <button
              @click="changeScreen(7, 8)"
              :class="amount === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
              class="font-Satoshi500 text-white text-[14px] w-auto flex leading-[11.593px] rounded-full px-[65px] p-5"
            >
              Proceed
            </button>
          </div>
        </div>
        <div v-if="step[8]" class="flex flex-col gap-[60px]">
          <div class="flex flex-col gap-[30px]">
            <h3
              class="text-[#01181B] text-[40px] lg:text-[56px] font-EBGaramond500 lg:leading-[63.84px]"
            >
              Your Bank Account and Pin <br />
              has been set successfully
            </h3>
            <p class="text-[#000000] text-[18px] font-Satoshi400 leading-[24px]">
              You will be redirected to continue your transaction, If you are not
              redirected,
              <a
                class="underline-offset-8 underline"
                href=""
                @click="changeScreen(8, 2)"
                role="button"
                >Click Here</a
              >
              to Proceed
            </p>
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
