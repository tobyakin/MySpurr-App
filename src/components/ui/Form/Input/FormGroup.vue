<template>
  <div class="form__group">
    <Label :class="labelClasses">{{ label }}</Label>
    <Input
      @update:modelValue="passInputValue"
      :value="modelValue"
      :class="inputClasses"
      :placeholder="placeholder"
      :type="type"
      :name="name"
    />
    <Label class="text-error text-2xl text-left" :name="name" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const Input = defineAsyncComponent(() => import("./Input.vue"));
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
});

const passInputValue = (value) => {
  emit("update:modelValue", value);
};
</script>

<style lang="scss" scoped></style>
