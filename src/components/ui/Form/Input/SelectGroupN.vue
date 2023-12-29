<template>
  <div class="w-full">
    <Label :class="labelClasses">{{ label }}</Label>
    <!-- <Select
      @update:modelValue="passInputValue"
      :value="modelValue"
      :inputClasses="inputClasses"
      :placeholder="placeholder"
      :name="name"
      :items="items"
    /> -->
    <select
      class="form__input block w-full p-2 px-1 text-sm font-Satoshi400 text-gray-800 transition duration-500 focus:outline-none rounded"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="inputClasses"
    >
      <option disabled value="">Select {{ placeholder }}</option>

      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <Label class="text-2xl text-left" :name="name" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const Select = defineAsyncComponent(() => import("./Select.vue"));
const Label = defineAsyncComponent(() => import("./Label.vue"));

const emit = defineEmits(["update:modelValue"]);

defineProps({
  type: String,
  placeholder: String,
  label: String,
  name: String,
  labelClasses: String, // Optional
  inputClasses: String, // Optional
  modelValue: String | Number,
  items: Array,
});

const passInputValue = (value) => {
  emit("update:modelValue", value);
};
</script>
