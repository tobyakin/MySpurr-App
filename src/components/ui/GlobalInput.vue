<template>
  <div>
    <input
      v-bind="$attrs"
      class="w-full font-light font-Satoshi400 text-[14px] !p-2 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String | Number,
  type: String,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>
