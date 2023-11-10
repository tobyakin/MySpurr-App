<script setup>
import { ref, defineAsyncComponent } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import BalanceCard from "@/components/ui/Wallet/BalanceCard.vue";
import TransactionSummary from "@/components/ui/Wallet/TransactionSummary.vue";
import RecentTransaction from "@/components/ui/Wallet/RecentTransaction.vue";
import TransactionStatement from "@/components/ui/Wallet/TransactionStatement.vue";
</script>

<template>
  <DashboardLayout>
    <div class="container flex flex-col gap-[24px] p-0 lg:p-0 lg:py-10 py-6 mb-10">
      <div class="flex flex-col lg:gap-[59px] gap-[34px]">
        <div class="flex lg:flex-row flex-col gap-[20px]">
          <BalanceCard class="lg:w-[50%] w-full h-auto" /><TransactionSummary
            class="w-full"
          />
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
  </DashboardLayout>
</template>
