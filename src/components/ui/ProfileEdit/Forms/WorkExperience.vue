<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useUserProfile } from "@/stores/profile";
import CirclePlus from "@/components/icons/circlePlus.vue";
import EditWorkExperience from "@/components/ui/genericComponents/EditWorkExperience.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
// import dayjs from "dayjs";

const userProfile = useUserProfile();
const formState = ref({
  company_name: "",
  title: "",
  employment_type: "",
  description: "",
  start_date: "",
  end_date: "",
});
const present = ref(false); // Add a variable to track if the checkbox is checked

const step = ref([true, false, false]);
const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};
const SingleObject = ref({});
const handleOpenEdit = (index) => {
  SingleObject.value = userProfile?.user?.data?.employment[index];
  changeScreen(0, 1);
};
const handleAddNew = () => {
  changeScreen(0, 2);
};

const prefillDetails = (SingleObject) => {
  formState.value.company_name = SingleObject.company_name || "";
  formState.value.title = SingleObject.title || "";
  formState.value.employment_type = SingleObject.employment_type || "";
  formState.value.description = SingleObject.description || "";
  formState.value.start_date = SingleObject.start_date || "";
  formState.value.end_date = SingleObject.end_date || "";
};
// // Create computed properties to format and update StartDate and EndDate
// const StartDate = computed(() => {
//   return dayjs(formState.value.start_date).format("DD-MM-YYYY");
// });

// const EndDate = computed(() => {
//   return dayjs(formState.value.end_date).format("DD-MM-YYYY");
// });
// Update employment_details.value.end_date when EndDate changes
// watch(EndDate, (newEndDate) => {
//   employment_details.value.end_date = newEndDate;
// });
// Update employment_details.value.start_date when StartDate changes
// watch(StartDate, (newStartDate) => {
//   employment_details.value.start_date = newStartDate;
// });

// Define a watcher to react to changes in SingleObject
watch(SingleObject, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

onMounted(async () => {
  prefillDetails(SingleObject.value);
  await userProfile.userProfile();
});
</script>
<template>
  <div class="">
    <div v-if="step[0]" class="flex flex-col gap-[66px]">
      <div class="flex flex-row justify-between items-center gap-[21px]">
        <h4 class="text-[#000000] font-Satoshi500 text-[23.144px]">
          Add work experience
        </h4>
        <button @click="handleAddNew"><CirclePlus /></button>
      </div>
      <EditWorkExperience
        :items="userProfile?.user?.data?.employment"
        @openEdit="handleOpenEdit"
      />
    </div>

    <div v-if="step[1]">
      <div class="flex flex-row justify-between w-full gap-[21px]">
        <div
          class="flex-col flex gap-6 w-full max-h-[50vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
        >
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[10px] font-Satoshi400">Company name</label>
            <GlobalInput
              v-model="formState.company_name"
              inputClasses="bg-transparent border-none !p-0"
              placeholder="University of Nigeria, Nsuka"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400">Title</label>
            <GlobalInput
              v-model="formState.title"
              inputClasses="bg-transparent border-none !p-0"
              placeholder="Ex. Bachelor of Science - BS"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400"
              >Employment type</label
            >
            <GlobalInput
              v-model="formState.employment_type"
              inputClasses="bg-transparent border-none !p-0"
              placeholder="Computer Engineering"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <div class="w-full flex flex-col gap-1 justify-between">
              <label class="text-[#01272C] text-[12px] font-Satoshi400">Start Date</label>
              <a-date-picker
                v-model="formState.start_date"
                :bordered="false"
                :placeholder="formState.start_date"
                class="bg-transparent border-none !outline-none w-full !p-0 shadow-none"
              />
            </div>
          </div>
          <div
            :class="present ? 'opacity-30' : ''"
            class="border-[0.737px] flex flex-row border-[#254035AB] rounded-[5.897px] p-4 py-1"
          >
            <div class="w-full flex flex-col gap-1 justify-between">
              <label class="text-[#01272C] text-[12px] font-Satoshi400">End Date</label>
              <a-date-picker
                v-model="formState.end_date"
                :bordered="false"
                :placeholder="formState.end_date"
                :disabled="present"
                class="bg-transparent border-none !outline-none w-full !p-0 shadow-none"
              />
            </div>
          </div>
          <div
            class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
          >
            <div class="w-full flex flex-col gap-2 justify-between">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                >Description</label
              >
              <textarea
                v-model="formState.description"
                rows="4"
                class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
                placeholder="Give a brief description about your education"
              />
            </div>
          </div>

          <div class="flex gap-3 justify-start items-center">
            <input
              class="bg-transparent !border-[0.737px] !border-[#254035AB] rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
              type="checkbox"
              v-model="present"
            />
            <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
              >I am currently still schooling here
            </label>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center mt-8">
        <button
          @click="changeScreen(1, 0)"
          class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
        >
          Save
        </button>
      </div>
    </div>
    <div v-if="step[2]">
      <div class="flex flex-row justify-between w-full gap-[21px]">
        <div
          class="flex-col flex gap-6 w-full max-h-[50vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
        >
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[10px] font-Satoshi400">Company name</label>
            <GlobalInput
              v-model="formState.company_name"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400">Title</label>
            <GlobalInput
              v-model="formState.title"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400"
              >Employment type</label
            >
            <GlobalInput
              v-model="formState.employment_type"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <div class="w-full flex flex-col gap-1 justify-between">
              <label class="text-[#01272C] text-[12px] font-Satoshi400">Start Date</label>
              <a-date-picker
                v-model="formState.start_date"
                :bordered="false"
                :placeholder="formState.start_date"
                class="bg-transparent border-none !outline-none w-full !p-0 shadow-none"
              />
            </div>
          </div>
          <div
            :class="present ? 'opacity-30' : ''"
            class="border-[0.737px] flex flex-row border-[#254035AB] rounded-[5.897px] p-4 py-1"
          >
            <div class="w-full flex flex-col gap-1 justify-between">
              <label class="text-[#01272C] text-[12px] font-Satoshi400">End Date</label>
              <a-date-picker
                v-model="formState.end_date"
                :bordered="false"
                :placeholder="formState.end_date"
                :disabled="present"
                class="bg-transparent border-none !outline-none w-full !p-0 shadow-none"
              />
            </div>
          </div>
          <div
            class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
          >
            <div class="w-full flex flex-col gap-2 justify-between">
              <label class="text-[#01272C] text-[12px] font-Satoshi400"
                >Description</label
              >
              <textarea
                v-model="formState.description"
                rows="4"
                class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
                placeholder="Give a brief description about your work "
              />
            </div>
          </div>

          <div class="flex gap-3 justify-start items-center">
            <input
              class="bg-transparent !border-[0.737px] !border-[#254035AB] rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
              type="checkbox"
              v-model="present"
            />
            <label class="text-[#01272C] text-[12px] font-Satoshi400">
              I am currently working on this role
            </label>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center mt-8">
        <button
          @click="changeScreen(2, 0)"
          class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>