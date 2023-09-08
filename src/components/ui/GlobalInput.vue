<template>
  <div>
    <input
      v-bind="$attrs"
      :class="error ? 'border-[#ef4b4b]' : 'border-[#254035]'"
      class="w-full font-light font-Satoshi400 text-[14px] !p-2 border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="text-red-600 font-Satoshi400 text-sm">{{ errorsMsg }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String | Number,
  type: String,
  placeholder: String,
  error: Boolean,
  errorsMsg: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>
