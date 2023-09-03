<script setup>
import SensorDoorIcon from "@/components/icons/sensorDoorIcon.vue";
import PersonIcon from "@/components/icons/personIcon.vue";
import { useStore } from "@/stores/user";
// let store = useStore();
</script>
<template>
  <div class="border-[#254035AB] border-[0.735px] rounded-[4.467px]">
    <div class="bg-[#F0F6EB] rounded-[4.467px] opacity-[0.8029] p-4">
      <p class="text-[13.635px] font-Satoshi500 overflow-hidden text-[#01272C]">
        Graphic Designers Hangout
      </p>
    </div>
    <div
      class="bg-[#84B358] rounded-b-[4.467px] justify-between flex opacity-[0.8029] p-4"
    >
      <div>
        <p class="text-[9.885px] font-Satoshi500 text-[#FBFBEE] flex items-cente">
          <PersonIcon />147
        </p>
        <p class="text-[9.885px] font-Satoshi500 text-[#FBFBEE]">Members</p>
      </div>
      <div><SensorDoorIcon /></div>
    </div>
  </div>
</template>
