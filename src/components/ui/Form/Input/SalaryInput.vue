<template>
    <div class="salary-input-container">
      <div
        class="flex items-center gap-2 p-2.5 border-[0.509px] rounded-[9.489px] overflow-hidden bg-white"
        :class="{
          'border-[#EDEDED]': !error,
          'border-[#DA5252]': error,
        }"
      >
        <!-- Currency Symbol -->
         <transition name="fade">
             <span
               v-if="modelValue.length > 0 && currency"
               v-html="currencySymbol"
               class="opacity-[0.8029] text-[0.7rem]"
             >
             </span>
         </transition>
  
        <!-- Input Field -->
        <input
          :value="formattedValue"
          @input="handleInput"
          :placeholder="placeholder"
          type="text"
          class="w-full font-light font-Satoshi400 text-[0.8rem] flex-1 opacity-[0.8029] outline-none"
        />
      </div>
  
      <!-- Error Message -->
      <div v-if="error" class="text-red-500 text-sm mt-1">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      default: "USD",
    },
    placeholder: {
      type: String,
      default: "Enter amount",
    },
    error: {
      type: String,
      default: "",
    },
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  // Format the value with commas
  const formattedValue = computed(() => {
    return props.modelValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });
  
  // Get the currency symbol
  const currencySymbol = computed(() => {
    switch (props.currency) {
      case "USD":
        return "$";
      case "NGN":
        return "₦";
      default:
        return "";
    }
  });
  
  // Handle input changes
  const handleInput = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    emit("update:modelValue", value); // Emit the raw value to the parent
  };
  </script>
  
  <style scoped>
  .salary-input-container {
    width: 100%;
  }
  </style>