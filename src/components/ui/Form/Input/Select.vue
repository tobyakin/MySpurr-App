<template>
  <select
    v-bind="$attrs"
    class="form__input block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none rounded"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option disabled value="">Select {{ placeholder }}</option>

    <option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: String | Number,
  items: Array,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>
