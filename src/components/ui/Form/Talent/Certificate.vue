<script setup>
import { ref, computed, watch } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useUserProfile } from "@/stores/profile";
const OnboardingStore = useOnboardingStore();
let profile = useUserProfile();

const { step, certificate } = storeToRefs(OnboardingStore);
let store = useStore();
console.log(store.getUser);
let loading = ref(false);

const emit = defineEmits("next", "prev");
const formState = ref({
  certificate_date: "",
  certificate_year: "",
});
const isFormValid = computed(() => {
  return (
    certificate.value.title.trim() !== "" &&
    certificate.value.institute.trim() !== "" &&
    certificate.value.certificate_date.trim() !== "" &&
    certificate.value.certificate_year.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
const prev = () => {
  emit("prev", step.value - 1);
};

const onFinish = async () => {
  loading.value = true;
  try {
    const res = await OnboardingStore.submitTalentWorkDetails();
    profile.userProfile();
    console.log(res);
    next();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const CertificateDate = computed(() => {
  return dayjs(formState.value.certificate_date).format("YYYY-MM-DD");
});
const CertificateYear = computed(() => {
  return dayjs(formState.value.certificate_year).format("YYYY");
});

watch(CertificateDate, (newCertificateDate) => {
  certificate.value.certificate_date = newCertificateDate;
});
watch(CertificateYear, (newCertificateYear) => {
  certificate.value.certificate_year = newCertificateYear;
});
</script>

<template>
  <form class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Certificate
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[23.734px] font-Satoshi400 my-4 md:!mb-8"
      >
        Please provide details fo your most recent certificate. You will have a chance to
        add to this when your onboarding as been completed
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Title</label>
          <GlobalInput
            v-model="certificate.title"
            inputClasses="bg-transparent border-none"
            placeholder="Diploma in Graphic Design"
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Institution obtained from
          </label>
          <GlobalInput
            v-model="certificate.institute"
            inputClasses="bg-transparent border-none"
            placeholder="Cousera"
            type="text"
            required
          />
        </div>

        <div
          class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"> Date</label>
            <a-date-picker
              :bordered="false"
              v-model:value="formState.certificate_date"
              class="bg-transparent border-none !outline-none w-full shadow-none"
            />
          </div>
          <div class="w-full flex flex-col gap-2 justify-between">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Year</label>
            <a-date-picker
              picker="year"
              :bordered="false"
              v-model:value="formState.certificate_year"
              class="bg-transparent border-none !outline-none w-full shadow-none"
            />
          </div>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Link to certificate (optional)</label
          >
          <GlobalInput
            v-model="certificate.certificate_link"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="link"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="prev"
        class="font-Satoshi500 text-white text-[14px] uppercase bg-[#43D0DF] leading-[11.593px] rounded-full p-5 w-full"
      >
        prev
      </button>
      <button
        @click="onFinish"
        type="submit"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Submit
      </button>
    </div>
  </form>
</template>
