<template>
  <div class="relative">
    <input
      :class="error ? '!border-[#DA5252]' : 'border-[#254035]'"
      class="w-full font-light font-Satoshi400 text-[14px] !p-2 opacity-[0.8029] rounded-[4.074px] text-sm border"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="emit('update:modelValue', $event.target.value)"
    />
    <errorInputIcon v-if="error" class="absolute top-1 right-1" />
    <!-- <greenInputTick v-if="modelValue.length && !error" class="absolute top-1 right-1" /> -->
    <!-- <span v-if="error" class="text-[#993939] font-Satoshi400 text-sm">{{
      errorsMsg
    }}</span> -->
  </div>
</template>

<script setup>
import errorInputIcon from "@/components/icons/errorInputIcon.vue";

defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  error: {
    type: Boolean,
    default: false
  },
  errorsMsg: {
    type: String,
    default: null
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
