<script setup>
import useHelpStore from "@/stores/helpCenter";
const store = useHelpStore();

const toogleHelp = (index) => {
  store.help[index].showContent = !store.help[index].showContent;
};
</script>
<template>
  <div class="w-full">
    <ul class="flex flex-col w-full gap-[26px] font-Satoshi500 text-[#404041]">
      <li v-for="(help, index) in store.help" :key="help" class="w-full">
        <div
          @click="toogleHelp(index)"
          class="flex justify-between items-center bg-[#EBF3F3] w-full rounded-[9px] py-[8px] px-[37px] cursor-pointer font-Satoshi400 text-[16px]"
        >
          <p>{{ help.name }}</p>
        </div>

        <div v-if="help.showContent" class="p-4">
          <div class="text-sm font-Satoshi400 mb-4" v-html="help.content"></div>
          <!-- <ul>
            <li class="lg:flex mb-4" v-for="list in help.sub_content" :key="list">
              <h3 class="font-Satoshi700 lg:mr-2">{{ list.heading }}</h3>
              <p class="font-Satoshi400">{{ list.content }}</p>
            </li>
          </ul> -->
        </div>
      </li>
    </ul>
  </div>
</template>
