<script setup>
import { ref, onMounted, watch, onUpdated, computed } from "vue";
import { useUserProfile } from "@/stores/profile";
import CirclePlus from "@/components/icons/circlePlus.vue";
import EditCertificate from "@/components/ui/genericComponents/EditCertificate.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";

const profileStore = useUserProfile();
const { certificateDetails } = storeToRefs(profileStore);
let loading = ref(false);

const userProfile = useUserProfile();
const present = ref(false); // Add a variable to track if the checkbox is checked

const step = ref([true, false, false]);
const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};
const SingleCertificateObject = ref({});
const handleOpenEdit = (index) => {
  SingleCertificateObject.value = userProfile?.user?.data.certificate[index];
  changeScreen(0, 1);
};
const handleAddNew = () => {
  changeScreen(0, 2);
};
const formState = ref({
  id: "",
  title: "",
  institute: "",
  certificate_year: "",
  certificate_link: "",
  currently_working_here: "",
  certificate_date: "",
});

const prefillDetails = (SingleObject) => {
  formState.value.id = SingleObject.id || "";
  formState.value.title = SingleObject.title || "";
  formState.value.institute = SingleObject.institute || "";
  formState.value.certificate_link = SingleObject.certificate_link || "";
  formState.value.currently_working_here = SingleObject.currently_working_here || "no";
  formState.value.certificate_date = SingleObject.certificate_date || "";
  formState.value.certificate_year = SingleObject.certificate_year || "";
};
const addNewCertificate = async () => {
  loading.value = true;
  try {
    const res = await profileStore.handleAddCertificate();
    changeScreen(2, 0);
    await profileStore.userProfile();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const updateCertificateDetails = async () => {
  loading.value = true;
  let certificateID = formState.value.id;
  let payload = {
    title: formState.value.title,
    institute: formState.value.institute,
    currently_working_here: formState.value.currently_working_here,
    certificate_date: certificatDate.value,
    certificate_year: certificateYear.value,
  };

  try {
    const res = await profileStore.handleUpdateCertificate(certificateID, payload);
    await profileStore.userProfile();
    changeScreen(1, 0);
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const currentlySchoolingHere = computed(() => {
  return present.value ? "till date" : "no"; //
});

// Create computed properties to format and update certificatDate and certificateYear
const certificatDate = computed(() => {
  return dayjs(formState.value.certificate_date).format("DD-MM-YYYY");
});

const certificateYear = computed(() => {
  return present.value ? "0000" : dayjs(formState.value.certificate_year).format("YYYY");
});
// Update employment_details.value.certificate_year when certificateYear changes
watch(certificateYear, (newcertificateYear) => {
  certificateDetails.value.certificate_year = newcertificateYear;
});
// Update employment_details.value.certificate_date when certificatDate changes
watch(certificatDate, (newcertificatDate) => {
  certificateDetails.value.certificate_date = newcertificatDate;
});

// Define a watcher to react to changes in SingleObject
watch(SingleCertificateObject, (newSingleObject) => {
  prefillDetails(newSingleObject);
});
watch(currentlySchoolingHere, (newCurrentlySchoolingHere) => {
  certificateDetails.value.currently_working_here = newCurrentlySchoolingHere;
});

onMounted(async () => {
  prefillDetails(SingleCertificateObject.value);
  await userProfile.userProfile();
});
</script>
<template>
  <div class="">
    <div v-if="step[0]" class="flex flex-col gap-[66px]">
      <div class="flex flex-row justify-between items-center gap-[21px]">
        <h4 class="text-[#000000] font-Satoshi500 text-[23.144px]">Add certificate</h4>
        <button @click="handleAddNew"><CirclePlus /></button>
      </div>
      <div class="overflow-y-auto w-full hide-scrollbar h-[24vh]">
        <EditCertificate
          :items="userProfile?.user?.data?.certificate"
          @openEdit="handleOpenEdit"
        />
      </div>
    </div>
    <!-- edit certificate details -->
    <div v-if="step[1]">
      <div class="flex flex-row justify-between w-full gap-[21px]">
        <div
          class="flex-col flex gap-6 w-full max-h-[50vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
        >
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[10px] font-Satoshi400">Title</label>
            <GlobalInput
              v-model="formState.title"
              inputClasses="bg-transparent border-none !p-0"
              placeholder="University of Nigeria, Nsuka"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[10px] font-Satoshi400"
              >Institution obtained from
            </label>
            <GlobalInput
              v-model="formState.institute"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            />
          </div>
          <div
            class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
          >
            <div class="w-full flex flex-col gap-2 justify-between">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"> Date</label>
              <a-date-picker
                :bordered="false"
                v-model="formState.certificate_date"
                :placeholder="formState.certificate_date"
                class="bg-transparent border-none !outline-none w-full shadow-none"
              />
            </div>
            <div class="w-full flex flex-col gap-2 justify-between">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Year</label>
              <a-date-picker
                picker="year"
                :bordered="false"
                v-model="formState.certificate_year"
                :placeholder="formState.certificate_year"
                class="bg-transparent border-none !outline-none w-full shadow-none"
              />
            </div>
          </div>

          <div
            class="border-[0.737px] flex flex-row border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
          >
            <div class="w-full flex flex-col justify-between">
              <label class="text-[#01272C] text-[10px] font-Satoshi400"
                >Link to Certificate (Optional)</label
              >
              <GlobalInput
                v-model="formState.certificate_link"
                inputClasses="bg-transparent border-none !p-0"
                type="text"
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
          @click="updateCertificateDetails"
          class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
        >
          <span v-if="!loading">Save</span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
    <!-- add new Certificate Details -->
    <div v-if="step[2]">
      <div class="flex flex-row justify-between w-full gap-[21px]">
        <div
          class="flex-col flex gap-6 w-full max-h-[50vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
        >
          new
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[10px] font-Satoshi400">Title</label>
            <GlobalInput
              v-model="certificateDetails.title"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400"
              >Institution obtained from
            </label>
            <GlobalInput
              v-model="certificateDetails.institute"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
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

          <div
            class="border-[0.737px] flex flex-row ju border-[#254035AB] rounded-[5.897px] p-4 py-1.5"
          >
            <div class="w-full flex flex-col justify-between">
              <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
                >Link to Certificate (Optional)</label
              >
              <GlobalInput
                v-model="certificateDetails.certificate_link"
                inputClasses="bg-transparent border-none !p-0"
                type="text"
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
          @click="addNewCertificate"
          class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
        >
          <span v-if="!loading">Save</span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
  </div>
</template>
