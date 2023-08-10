<template>
                <div class="tabs justify-between flex ">
                  <a
                    class="px-4"
                    @click.stop="setActiveTab('1')"
                     :class="{ 'active': activetab === '1' }">
                    <slot name="tab1"></slot>
                  </a>
                  <a
                    @click.stop="setActiveTab('2')"
                   :class="{ 'active': activetab === '2' }"
                  >
                    <slot name="tab2"></slot>
                  </a>
                  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
    value: String,
});

const activetab = ref(props.value);

const emit = defineEmits();

const setActiveTab = (tab) => {
  activetab.value = tab;
  emit('update:value', tab); // Emit the current tab value to the parent component using the proper event name
};
</script>
