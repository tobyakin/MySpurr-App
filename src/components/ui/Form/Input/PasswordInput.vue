<template>
  <div class="relative">
    <input
      :type="showPassword ? 'text' : 'password'"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :value="modelValue"
      :class="error ? 'border-[#ef4b4b]' : 'border-[#254035]'"
      class="w-full font-light font-Satoshi400 text-[14px] !p-2 border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
    />
    <div class="absolute right-3 top-2 text-[#D1D1D6]">
      <button type="button" @click="toggleShowPassword()" v-if="showPassword">
        <PasswordEyeIcon />
      </button>
      <button type="button" @click="toggleShowPassword()" v-if="!showPassword">
        <PasswordSlashEyeIcon class="text-[]" />
      </button>
    </div>
    <span v-if="error" class="text-red-600 font-Satoshi400 text-sm">{{ errorsMsg }}</span>
  </div>
</template>
<script setup>
import { ref } from "vue";
import PasswordEyeIcon from "@/components/icons/PasswordEyeIcon.vue";
import PasswordSlashEyeIcon from "@/components/icons/PasswordSlashEyeIcon.vue";
defineProps({
  placeholder: String,
  modelValue: String,
  error: Boolean,
  errorsMsg: null,
});
defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
