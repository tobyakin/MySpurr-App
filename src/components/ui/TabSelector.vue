<template>
  <div>
    <div class="tabs justify-between flex">
      <a
        class="px-4"
        @click="activetab = '1'"
        :class="[activetab === '1' ? 'active' : '']"
      >
        <slot name="tab1"></slot>
      </a>
      <a @click="activetab = '2'" :class="[activetab === '2' ? 'active' : '']">
        <slot name="tab2"></slot>
      </a>
    </div>
    <!-- tabs  view  start here -->
    <div class="pt-2">
      <div v-if="activetab === '1'" class="">
        <slot name="view1"></slot>
      </div>
      <div v-if="activetab === '2'" class="">
        <slot name="view2"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// const props = defineProps({
//   defaultTab: String,
// });

// const activetab = ref(props.defaultTab);

// const emit = defineEmits();
const activetab = ref("1");

const onChange = (e) => {
  activetab.value = e.target.value;
};

// const setActiveTab = (tab) => {
//   activetab.value = tab;
//   emit("update:value", tab); // Emit the current tab value to the parent component using the proper event name
// };
</script>
