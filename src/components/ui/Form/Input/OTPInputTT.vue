<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { withDefaults, defineProps, defineEmits } from "vue";

const props = withDefaults(defineProps({
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: "*"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputCount: {
    type: Number,
    default: 4
  },
  modelValue: {
    type: [Array, Number],
    default: () => []
  },
  autoFocus: {
    type: Boolean,
    default: true
  }
}), {});

const emit = defineEmits(["update:modelValue"]);

const inputRefsHolder = ref(new Array(props.inputCount).fill(""));
const inputRefsHolderCopy = ref(new Array(props.inputCount).fill(""));

const otpValue = computed(() => {
  return inputRefsHolderCopy.value.map((otp) => (otp == null ? "" : otp));
});

function focusNext(currentIndex) {
  for (let i = currentIndex + 1; i < inputRefsHolder.value.length; i++) {
    if (inputRefsHolder.value[i] !== "") {
      if (inputRefsHolder.value[i].disabled) {
        continue;
      }
      inputRefsHolder.value[i].focus();
      return;
    }
  }
}

function focusPrev(currentIndex) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (inputRefsHolder.value[i] !== "") {
      if (inputRefsHolder.value[i].disabled) {
        continue;
      }
      inputRefsHolder.value[i].setSelectionRange(1, 2);
      inputRefsHolder.value[i].focus();
      return;
    }
  }
}

// handle Input
function handleInput(e, index) {
  const targetValue = e.target.value;
  const temporalOtp = [...inputRefsHolderCopy.value];
  temporalOtp[index] = targetValue.substring(targetValue.length - 1);
  inputRefsHolderCopy.value = temporalOtp;
  emit("update:modelValue", otpValue.value);
}

// handle key up
function handleKeyUp(e, index) {
  if (inputRefsHolder.value[index].value) {
    focusNext(index);
  }
  if (e.key === "ArrowRight") {
    focusNext(index);
  }
  if (e.key === "ArrowLeft") {
    focusPrev(index);
  }
  if (e.key === "Backspace") {
    focusPrev(index);
  }
}

function handleSpaceBar(e, index) {
  e.preventDefault();
  if (e.key == " ") {
    focusNext(index);
  }
}

watchEffect(() => {
  const updatedOtpList = props.modelValue?.slice(0, props.inputCount);
  inputRefsHolderCopy.value = [
    ...(updatedOtpList as Array<string> | Array<number>),
  ];
});

function autoFocus() {
  if (props.autoFocus) {
    inputRefsHolder.value[0].focus();
  }
}

onMounted(() => {
  autoFocus();
});
</script>

<template>
  <div class="flex items-center gap-x-[22px]">
    <input
      :type="type"
      :ref="(e) => (inputRefsHolder[index] = e)"
      :value="inputRefsHolderCopy[index]"
      @input="(e) => handleInput(e, index)"
      @keyup="(e) => handleKeyUp(e, index)"
      @keydown.space="(e) => handleSpaceBar(e, index)"
      v-for="(input, index) in inputCount"
      :key="input"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-12 h-12 px-1 py-2 text-center disabled:cursor-not-allowed outline-none ring-[1px] ring-[#CEE3FF] focus:ring-[2px] focus:ring-Noja/Primary/600 transition-all duration-200 ease rounded text-lg text-Noja/Font/Black placeholder:text-Noja/Font/Black"
    />
  </div>
</template>
