<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import BalanceCard from "@/components/ui/Wallet/BalanceCard.vue";
import ComingSoon from "@/components/ui/ComingSoon/ComingSoon.vue";
import TransactionSummary from "@/components/ui/Wallet/TransactionSummary.vue";
import RecentTransaction from "@/components/ui/Wallet/RecentTransaction.vue";
import TransactionStatement from "@/components/ui/Wallet/TransactionStatement.vue";
import WithdrawFund from "../../components/ui/Wallet/WithdrawFund/WithdrawFund.vue";
import { useWalletStore } from "@/stores/wallet";
import { storeToRefs } from "pinia";
const walletStore = useWalletStore();
const { walletData } = storeToRefs(walletStore);
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import { useRouter } from "vue-router";

const router = useRouter();

const step = ref([true, false]);

const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};
const handleWithdrawal = () => {
  changeScreen(0, 1);
};
const handleGoToWallet = () => {
  changeScreen(1, 0);
};
onMounted(async () => {
  // await walletStore.walletDetails();
});
import { useTabStore } from "@/stores/tab";
let store = useStore();
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  return accountType;
});

const profileStore = useUserProfile();

const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);

const isOnBoarded = computed(() => profileStore.user);

onMounted(() => {
  return accountType;
});
onMounted(async () => {
  try {
    await profileStore.userProfile();
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
    }
  } catch (error) {
    /* empty */
  } finally {
    isLoading.value = !isLoading.value;
  }
});
</script>

<template>
  <DashboardLayout>
    <div class="container p-0 lg:p-0 lg:py-10 py-6 mb-10">
      <!-- <ComingSoon title="Wallet" /> -->

      <div v-if="step[0]" class="flex flex-col gap-[24px]">
        <div class="flex flex-col lg:gap-[59px] gap-[34px]">
          <div class="flex lg:flex-row flex-col lg:max-h-[326px] h-full gap-[20px]">
            <BalanceCard
              :balance="walletData.data"
              :hide="true"
              @goToWithdraw="handleWithdrawal"
              class="lg:w-[574px] w-full h-auto"
            /><TransactionSummary class="w-full lg:h-[326px] h-full" />
          </div>
          <div class="flex lg:flex-row flex-col gap-[20px]">
            <RecentTransaction class="w-full" /><TransactionStatement
              class="lg:w-[59%] w-full"
            />
          </div>
        </div>
        <div>
          <p class="text-[#2C4C50] text-right font-[16px] font-Satoshi500">
            Download Transaction Statement
          </p>
        </div>
      </div>
      <WithdrawFund class="hidden" @goToWallet="handleGoToWallet" v-if="step[1]" />
    </div>
  </DashboardLayout>
</template>
