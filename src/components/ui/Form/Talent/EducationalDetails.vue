<script setup>
import { ref, computed, defineAsyncComponent, onMounted } from "vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import Input from "@/components/ui/Form/Input/Input.vue";
import { storeToRefs } from "pinia";
const SelectGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/SelectGroup.vue")
);

const OnboardingStore = useOnboardingStore();

const { step } = storeToRefs(OnboardingStore);
let store = useStore();
console.log(store.getUser);
let loading = ref(false);
const years = ref([]);
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

onMounted(() => {
  // Populate the years array with a range of years, e.g., from 2000 to the current year.
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    years.value.push(year.toString());
  }
});

const emit = defineEmits("next");
const formState = ref({
  school: "",
  degree: "",
  field_of_study: "",
  start_date: { date: "", year: "" },
  end_date: { date: "", year: "" },
});
const isFormValid = computed(() => {
  return (
    formState.value.school.trim() !== "" &&
    formState.value.degree.trim() !== "" &&
    formState.value.field_of_study.trim() !== "" &&
    formState.value.start_date.trim() !== "" &&
    formState.value.end_date.trim() !== ""
  );
});

const next = () => {
  emit("next", step.value + 1);
};
const onFinish = async () => {
  loading.value = true;
  let payload = {
    school: formState.value.school,
    degree: formState.value.degree,
    field_of_study: formState.value.field_of_study,
    start_date: formState.value.start_date,
    end_date: formState.value.end_date,
    availability: formState.value.availability,
  };
  try {
    // const res = await OnboardingStore.submitTalentWorkDetails(payload);
    console.log(payload);
    next();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Educational details
      </h1>
      <p
        class="text-[16px] text-[#011B1F] leading-[27.734px] font-Satoshi400 my-4 md:mb-8"
      >
        Please provide details fo your most recent educational detail. You will have a
        chance to add to this when your onboarding as been completed.
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">School</label>
          <GlobalInput
            v-model="formState.school"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Degree</label>
          <GlobalInput
            v-model="formState.degree"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Field of Study</label
          >
          <GlobalInput
            v-model="formState.field_of_study"
            class="bg-transparent border-none"
            placeholder=""
            type="text"
            required
          />
        </div>
        <div
          class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
              >Start Date</label
            >
            <SelectGroup
              class="bg-transparent border-none"
              placeholder="month"
              :items="monthNames"
              required
              name=""
            />
          </div>
          <div
            class="border-l-[0.737px] border-l-[#254035AB] flex h-full mt-6 py-4"
          ></div>
          <div class="w-full">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Year</label>
            <SelectGroup
              class="bg-transparent border-none"
              placeholder="year"
              :items="years"
              required
              name=""
            />
          </div>
        </div>
        <div
          class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
        >
          <div class="w-full">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
              >End Date</label
            >
            <SelectGroup
              placeholder="month"
              required
              name=""
              :items="monthNames"
              class="bg-transparent border-none"
            />

            <!-- <GlobalInput
              v-model="formState.end_date.date"
              class="bg-transparent border-none"
              placeholder=""
              type=""
              required
            /> -->
          </div>
          <div
            class="border-l-[0.737px] border-l-[#254035AB] flex h-full mt-6 py-4"
          ></div>
          <div class="w-full">
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Year</label>
            <SelectGroup
              class="bg-transparent border-none"
              placeholder="year"
              :items="years"
              required
              name=""
            />
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <Input
            class="bg-transparent !border-[0.737px] !border-[#254035AB] rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
            placeholder=""
            type="checkbox"
            required
          />
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >I am currently still schooling here
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="onFinish"
        type="submit"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Next
      </button>
    </div>
  </form>
</template>
