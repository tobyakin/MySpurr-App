<template>
  <div
    class="flex w-full hover:border-[0.041px] justify-between flex-row cursor-pointer p-4 py-2 rounded-lg hover:bg-[#F0F6EB] hover:border-[#7E9294CC]"
  >
    <div class="flex items-center gap-4">
      <DebitIcon v-if="items.type === 'debit'" />
      <CreditIcon v-if="items.type === 'credit'" />
      <div>
        <p class="text-[#000000] font-Satoshi400 text-[17px]">Top Up</p>
        <div class="flex items-center gap-2">
          <div
            :class="{
              'bg-[#84B358]': items.status === 'completed',
              'bg-[#E06F6F]': items.status === 'failed',
              'bg-[#DAE06F]': items.status === 'pending',
            }"
            class="h-[12px] w-[12px] rounded-full"
          ></div>
          <p
            class="text-[#7E9294CC] capitalize font-Satoshi500 leading-[37.234px] text-[16px]"
          >
            {{ items.status }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end justify-end text-right gap-4">
      <p
        class="text-[20px] flex flex-row gap-1 text-[#01181B] text-right font-Satoshi700"
      >
        <span class="line-through text-[12px]">N</span>12,090
      </p>
      <p class="text-[#7E9294CC] font-Satoshi400 text-right text-[17px]">Sept 27, 2023</p>
    </div>
  </div>
</template>

<script setup>
import CreditIcon from "@/components/icons/CreditIcon.vue";
import DebitIcon from "@/components/icons/DebitIcon.vue";
defineProps({
  items: Object,
});
</script>

<style></style>
