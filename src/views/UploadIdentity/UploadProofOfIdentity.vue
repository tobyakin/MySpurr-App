<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import SelectGroupN from "@/components/ui/Form/Input/SelectGroupN.vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { storeToRefs } from "pinia";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import CloseEditModalIcon from "@/components/icons/CloseEditModalIcon.vue";
import { useRouter } from "vue-router";

const userOnboardingStore = useOnboardingStore();
const { verifyIdentityData } = storeToRefs(userOnboardingStore);
import { useSkillsStore } from "@/stores/skills";
const router = useRouter();

const skillsStore = useSkillsStore();
const { contriesCode } = storeToRefs(skillsStore);

const frontDocsName = ref("");
const backDocsName = ref("");
let loading = ref(false);
const errors = reactive({
  country: false,
  document_type: false,
  front: false,
  back: false,
  confirm: false,
});
const errorsMsg = {
  country: "",
  document_type: "",
  front: "",
  back: "",
  confirm: "",
};

const validate = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Perform validation before submission
  let isValid = true;
  Object.entries(verifyIdentityData.value).forEach(([field, value]) => {
    if (!value) {
      errors[field] = true;
      errorsMsg[field] = `Please input your ${field.replace("_", " ")}`;
      isValid = false;
    }
  });
  return isValid; // Only return false if there are validation errors
};
const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  Object.keys(errorsMsg).forEach((key) => {
    errorsMsg[key] = "";
  });
};

watch(verifyIdentityData.value, () => {
  clearInputErrors();
});

const uploadFrontDocs = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    frontDocsName.value = file.name;

    reader.onload = () => {
      verifyIdentityData.value.front = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    verifyIdentityData.value.front = "";
  }
};
const uploadBackDocs = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    backDocsName.value = file.name;

    reader.onload = () => {
      verifyIdentityData.value.back = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    verifyIdentityData.value.back = "";
  }
};
const removeUploadBackDocs = () => {
  verifyIdentityData.value.back = null;
  backDocsName.value = "";
};
const removeUploadFrontDocs = () => {
  verifyIdentityData.value.front = null;
  frontDocsName.value = "";
};
const onFinish = async () => {
  loading.value = true;
  if (!validate()) {
    loading.value = false;
    return;
  }
  try {
    const res = await userOnboardingStore.handleVerifyIdentity();
    loading.value = false;
    router.push({ name: "dashboard" });
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await skillsStore.getCountriesCode();
});
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[79.735px] gap-[40px] p-0 lg:p-6 lg:py-10 py-6 mb-10"
    >
      <div class="mt-10">
        <p
          class="lg:text-[40.705px] text-[23px] font-Satoshi400 text-center text-[#244034]"
        >
          Upload a proof of your identity
        </p>
        <p
          class="lg:text-[25.382px] text-[15px] font-Satoshi400 text-center text-[#244034]"
        >
          MySpurr requires a valid government issue ID (drivers license, passport,
          national ID)
        </p>
      </div>
      <div class="flex lg:flex-row flex-col gap-10">
        <SelectGroupN
          v-model="verifyIdentityData.country"
          labelClasses="font-Satoshi500 text-[15.606px]"
          label="Your Country"
          name="Name"
          :items="contriesCode.data"
          :error="errors.country"
          :errorsMsg="errorsMsg.country"
          placeholder="your country"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
        ></SelectGroupN>
        <SelectGroup
          v-model="verifyIdentityData.document_type"
          :error="errors.document_type"
          :errorsMsg="errorsMsg.document_type"
          labelClasses="font-Satoshi500 text-[15.606px]"
          label="Document Type"
          name="Name"
          :items="['Drivers license', 'Passport', 'National ID']"
          placeholder="a document type"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[6.828px] text-[12.68px]"
        ></SelectGroup>
      </div>
      <div class="flex lg:flex-row flex-col w-full gap-10">
        <div
          :class="errors.front ? 'border-[#ef4b4b]' : 'border-[#254035AB] '"
          class="bg-[#EDF0B8] w-full border-dashed border-[#254035AB] items-center justify-center min-h-[268.976px] border-[1.789px] p-2 py-6 flex flex-col gap-10 text-center relative rounded-[5.982px] mt-3"
        >
          <button
            v-if="verifyIdentityData.front"
            class="absolute top-3 right-3 font-Satoshi900 text-red-600"
            @click="removeUploadFrontDocs"
          >
            <CloseEditModalIcon />
          </button>
          <img
            v-if="verifyIdentityData.front"
            :src="verifyIdentityData?.front"
            class="rounded-[5.982px] object-contain h-[268.976px]"
          />

          <div v-if="!verifyIdentityData.front">
            <p class="font-Satoshi500 text-[25.744px] text-[#000]">
              Front side of your document
            </p>
            <p class="text-[#000000] text-[13.314px] font-Satoshi500">
              Upload the front side of your document. <br />
              Supports JPG, PNG, PDF
            </p>
          </div>
          <label
            v-if="!verifyIdentityData.front"
            class="border-[#254035AB] py-5 px-10 text-center cursor-pointer rounded-full font-Satoshi500 border-[1.563px]"
            for="front_side_upload_file"
            >Choose a file
          </label>
          <input
            type="file"
            @change="uploadFrontDocs"
            hidden
            id="front_side_upload_file"
          />
        </div>
        <div
          :class="errors.back ? 'border-[#ef4b4b]' : 'border-[#254035AB] '"
          class="bg-[#EDF0B8] w-full border-dashed border-[#254035AB] items-center justify-center min-h-[268.976px] border-[1.789px] p-2 py-6 flex flex-col gap-10 text-center relative rounded-[5.982px] mt-3"
        >
          <button
            v-if="verifyIdentityData.back"
            class="absolute top-3 right-3 font-Satoshi900 text-red-600"
            @click="removeUploadBackDocs"
          >
            <CloseEditModalIcon />
          </button>
          <img
            v-if="verifyIdentityData.back"
            :src="verifyIdentityData?.back"
            class="rounded-[5.982px] object-contain h-[268.976px]"
          />

          <div v-if="!verifyIdentityData.back">
            <p class="font-Satoshi500 text-[25.744px] text-[#000]">
              Back side of your document
            </p>
            <p class="text-[#000000] text-[13.314px] font-Satoshi500">
              Upload the front side of your document. <br />
              Supports JPG, PNG, PDF
            </p>
          </div>

          <label
            v-if="!verifyIdentityData.back"
            class="border-[#254035AB] py-5 px-10 cursor-pointer text-center font-Satoshi500 rounded-full border-[1.563px]"
            for="back_side_upload_file"
            >Choose a file
          </label>
          <input type="file" hidden id="back_side_upload_file" @change="uploadBackDocs" />
        </div>
      </div>
      <div class="flex gap-3 justify-start items-center">
        <input
          v-model="verifyIdentityData.confirm"
          class="bg-transparent !border-[0.737px] !border-[#254035AB] rounded-[5px] p-4 h-[31.935px] w-[35.408px] py-1.5"
          type="checkbox"
        />
        <label
          :class="{ '!text-red-500': errors.confirm }"
          class="text-[#244034] px-2 lg:text-[20.382px] text-[13px] font-Satoshi400"
          >I Confirm that I uploaded valid government-issued photo ID. This ID include my
          picture, signature, name, date of birth, and address
        </label>
      </div>
      <div class="w-full justify-center flex items-center">
        <button
          @click="onFinish"
          :disabled="loading"
          class="font-Satoshi500 text-white text-[14px] uppercase w-[70%] mx-auto bg-[#2F929C] leading-[11.593px] rounded-full p-5"
        >
          <span v-if="!loading">Continue</span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
