<script setup>
import { ref, computed, onMounted, watch } from "vue";

import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { useUserProfile } from "@/stores/profile";
let profile = useUserProfile();
const userDetails = computed(() => {
  return profile.user.data;
});

const formState = ref({
  name: "",
  email: "",
  subject: "",
  department: "",
  priority: "",
  postalCode: "",
  message: "",
});
const attachment = ref(null);
const prefillDetails = (SingleObject) => {
  formState.value.name =
    `${SingleObject.first_name}` + " " + ` ${SingleObject.last_name}` || "";
  formState.value.email = SingleObject.email || "";
};
const uploadedImageName = ref("");

const uploadImage = (event) => {
  const file = event.target.files[0];
  // if (file) {
  //   const imageUrl = URL.createObjectURL(file);
  //   portfolio.value.cover_image = file;
  //   uploadedImageName.value = file.name;
  // }
  if (file) {
    const reader = new FileReader();
    uploadedImageName.value = file.name;

    reader.onload = () => {
      attachment.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    attachment.value = "";
  }
};

onMounted(async () => {
  try {
    await profile.userProfile();
    prefillDetails(userDetails.value);
  } catch (error) {
    /* empty */
  } finally {
    /* empty */
  }
});
watch(userDetails, (newUserDetails) => {
  prefillDetails(newUserDetails);
});
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <h4 class="text-[#244034] font-EBGaramond500 capitalize text-[27px]">
        Open Ticket
      </h4>
      <div class="flex flex-col gap-[36px]">
        <div
          class="flex md:flex-row flex-col justify-evenly lg:gap-[60.313px] gap-[30.313px]"
        >
          <button
            class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
          >
            <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
              Sales
            </h3>
            <p
              class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]"
            >
              Sales Enquiry
            </p>
          </button>
          <button
            class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
          >
            <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
              Technical
            </h3>
            <p
              class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]"
            >
              Technical Enquiries
            </p>
          </button>
          <button
            class="bg-[#E9FAFB] rounded-[3.465px] py-10 px-5 flex flex-col gap-[11px] items-center w-full"
          >
            <h3 class="text-[#007582] text-[16.917px] font-Satoshi500 leading-[17.763px]">
              Abuse
            </h3>
            <p
              class="text-[#011B1F] text-[10.297px] font-Satoshi400 lg:leading-[12.408px]"
            >
              Network Security / Fraud Dept
            </p>
          </button>
        </div>
        <div>
          <h3
            class="text-[#63D8E4] text-[26.036px] font-Satoshi400 leading-[40.393px] underline-offset-8 underline"
          >
            Open Ticket
          </h3>
        </div>
        <div class="flex lg:flex-row flex-col gap-[34px] w-full">
          <div class="flex gap-[34px] flex-col w-full">
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label class="text-[#01272C] flex text-[10px] font-Satoshi400">Name</label>
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                type="text"
                v-model="formState.name"
              />
            </div>
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
                >Subject</label
              >
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                type="text"
                v-model="formState.subject"
              />
            </div>
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
                >Priority</label
              >
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                type="text"
                v-model="formState.priority"
              />
            </div>
          </div>
          <div class="flex gap-[34px] flex-col w-full">
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label class="text-[#01272C] flex text-[10px] font-Satoshi400">Email</label>
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                type="text"
                v-model="formState.email"
              />
            </div>
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
                >Department</label
              >
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                type="text"
                v-model="formState.department"
              />
            </div>
            <div
              class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] p-4 py-1"
            >
              <label class="text-[#01272C] flex text-[10px] font-Satoshi400"
                >ZIP/Postal Code</label
              >
              <GlobalInput
                inputClasses="bg-transparent border-none !px-0 !py-[4px]"
                type="text"
                v-model="formState.postalCode"
              />
            </div>
          </div>
        </div>
        <div
          class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] gap-1.5 h-auto p-4 py-1"
        >
          <label class="text-[#01272C] flex text-[10px] font-Satoshi400">Message</label>
          <textarea
            rows="8"
            class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 h-full p-0"
            v-model="formState.message"
          />
        </div>
      </div>
      <div class="flex flex-col gap-[23px]">
        <h3 class="text-[26.036px] !font-EBGaramond500 text-[#244034] leading-[40.393px]">
          Attachment
        </h3>
        <div
          class="border-[0.737px] border-[#254035AB] flex-col flex rounded-[5.897px] gap-1.5 h-auto p-4 py-1"
        >
          <div class="flex flex-col gap-4" f>
            <div
              v-if="attachment"
              class="w-full flex flex-row items-center justify-between rounded-[5.897px] py-[10px] px-[28px] text-[#000000] text-[16.606px] font-Satoshi400"
            >
              <p>{{ uploadedImageName }}</p>
            </div>

            <div v-else class="flex lg:flex-row flex-col gap-2 items-center">
              <input id="cover_image" hidden type="file" @change="uploadImage" />
              <label
                for="cover_image"
                class="w-full flex flex-row items-center justify-between cursor-pointer rounded-[5.897px] py-[10px] px-[28px] text-[#000000] text-[16.606px] font-Satoshi400"
                ><p>No file chosen</p></label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 w-full mt-12">
        <button
          class="bg-[#ECFAFC] text-brand font-Satoshi500 text-[14.153px] capitalize leading-[11.593px] rounded-full px-5 p-[13px] flex justify-center w-full lg:w-[20%]"
        >
          Cancel
        </button>

        <button
          class="bg-brand text-white font-Satoshi500 text-[14.153px] capitalize leading-[11.593px] rounded-full px-5 p-[13px] flex justify-center w-full lg:w-[20%]"
        >
          Save
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
