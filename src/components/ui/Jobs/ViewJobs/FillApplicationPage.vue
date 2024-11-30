<script setup>
import { onMounted, reactive, ref, computed, watch, nextTick } from "vue";
import { useJobsStore } from "@/stores/jobs";
import VerifyIcon from "@/components/icons/verifyIcon.vue";
import LinkIcon from "@/components/icons/linkIcon.vue";
import CloudUploadIcon from "@/components/icons/cloudUploadIcon.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import AuthInput from "@/components/ui/Form/Input/AuthInput.vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useUserProfile } from "@/stores/profile";
import { useTabStore } from "@/stores/tab";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useNumberFomateStore } from "@/stores/numberFomate";
import { editorConfig } from "@/config/ckeditorConfig";
import { ClassicEditor } from 'ckeditor5'

const isLayoutReady = ref(false)
const editor = ClassicEditor

const dynamicPlaceholder = ref('');

const editorConfigs = computed(() => ({
  ...editorConfig,
  placeholder: dynamicPlaceholder.value,
}));

const JobsStore = useJobsStore();
const { singleJob } = storeToRefs(JobsStore);
const route = useRoute();
let numAbbr = useNumberFomateStore();

const store = useTabStore();
let loading = ref(false);
let loadPage = ref(false);
const valideRateError = ref(false);
const valideRateErrorMsg = ref("");
const emit = defineEmits(["back", "next"]);
let profile = useUserProfile();
const userDetails = computed(() => {
  return profile.user.data;
});
const showDateInput = ref(false);
const jobApplicationForm = reactive({
  job_id: route.params.id,
  rate: "",
  available_start: "",
  resume: `https://www.myspurr.net/${userDetails.value?.first_name}/${userDetails.value?.uniqueId}`,
  other_file: null,
  question_answers: Array.from(
    { length: singleJob.value?.data?.questions.length },
    () => ({
      answer: "",
      talent_id: `${userDetails.value?.id}`,
      job_id: route.params.id,
    })
  ),
});

const toggleDateInput = () => {
  jobApplicationForm.available_start = "";
  showDateInput.value = !showDateInput.value;
};
const handleButtonClick = (value) => {
  showDateInput.value = false;
  jobApplicationForm.available_start = value;
};

function formatNumber(value) {
  if (value === '') return '';
  return new Intl.NumberFormat().format(value);
}

const checkAmountValidity = (e) => {
  let value = e.target.value;
  value = value.replace(/[^0-9]/g, ''); 
  jobApplicationForm.rate = formatNumber(value)
  const amount = parseFloat(jobApplicationForm.rate.replace(/,/g, ''));
  const minSalary = parseFloat(singleJob.value?.data?.salary_min);
  const maxSalary = parseFloat(singleJob.value?.data?.salary_max);
  if(value){
    if (amount >= minSalary && amount <= maxSalary) {
      valideRateError.value = false;
      valideRateErrorMsg.value = "Amount is within the salary range.";
    } else {
      valideRateError.value = true;
      valideRateErrorMsg.value = "Amount is outside the salary range.";
    }
  } else {
    valideRateError.value = false;
      valideRateErrorMsg.value = "";
  }
};

const uploadedImageName = ref("");
const maxEditorHeight = ref([]); 
const quillContainer = ref([]); 

const uploadFile = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      jobApplicationForm.other_file = reader.result; // Extract base64 data
      uploadedImageName.value = file.name;
    };

    reader.readAsDataURL(file);
  } else {
    jobApplicationForm.other_file = "";
  }
};
const isFormValid = computed(() => {
  return (
    jobApplicationForm.job_id !== "" &&
    jobApplicationForm.rate.trim() !== "" &&
    jobApplicationForm.available_start !== "" &&
    jobApplicationForm.resume !== "" &&
    jobApplicationForm.other_file !== null &&
    jobApplicationForm.question_answers.length >= 0
    // valideRateError.value === false
  );
});

const handleJobApplication = async () => {
  loading.value = true;
  let payload = {
    job_id: jobApplicationForm.job_id,
    rate: jobApplicationForm.rate.replace(/,/g, '').toString(),
    available_start: jobApplicationForm.available_start,
    resume: jobApplicationForm.resume,
    other_file: jobApplicationForm.other_file,
    question_answers: jobApplicationForm.question_answers,
  };
  try {
    const res = await JobsStore.applyForJob(payload);
    if (res.status === true) {
      next();
      loading.value = false;
    }
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const mainContainer = ref(null)
const customHeight = ref(0)
const questionLength = ref(0)
const back = () => {
  emit("back");
};
const next = () => {
  emit("next");
};
onMounted(async () => {
  loadPage.value = true;
  try {
    await JobsStore.getSingleJob(route.params.id);
    await profile.userProfile();
    loadPage.value = false;
  } catch (error) {
    console.error;
    loadPage.value = false;
  }
  await nextTick()
  let contHeight = mainContainer.value.clientHeight
  questionLength.value = quillContainer.value.length
  customHeight.value = contHeight/questionLength.value

  isLayoutReady.value = true
});
</script>

<template>
  <ShortLoader v-if="loadPage" />
  <div v-else>
    <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] lg:p-10 p-6">
      <div class="flex lg:flex-row flex-col gap-3 w-full">
        <div>
          <img
            class="h-[57.102px] w-[57.102px] object-cover rounded-full"
            :src="singleJob?.data?.company?.company_logo"
            alt=""
          />
        </div>
        <div class="w-full">
          <div class="flex lg:flex-row flex-col gap-4 justify-between">
            <div class="">
              <p class="text-[17.435px] font-Satoshi400 flex text-[#000]">
                {{ singleJob?.data?.company?.business_name }}
              </p>
              <div class="flex mt-1 gap-1">
                <VerifyIcon class="w-4" />
                <p class="text-[12.781px] font-Satoshi700 text-[#000000B2]">
                  Verified Client.
                </p>
              </div>
            </div>
            <div class="flex flex-col justify-between">
              <div
                class="flex lg:flex-row flex-col gap-6 items-center justify-between w-full lg:gap-3"
              >
                <p class="lg:text-[26.625px] text-[19px] font-Satoshi500 text-[#000000]">
                  {{ singleJob?.data?.job_title }}
                </p>
              </div>
              <div class="flex justify-between lg:mt-2 mt-6">
                <div class="flex gap-3 flex-wrap items-center">
                  <div
                    v-for="skill in singleJob?.data?.skills"
                    :key="skill"
                    class="bg-[#2F929C] font-Satoshi500 text-[7.58px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
                  >
                    {{ skill.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="items-center flex">
              <div class="flex flex-row gap-3">
                <button
                  @click="back"
                  class="bg-[#43D0DF] font-Satoshi500 capitalize lg:w-auto w-full text-[10.2px] p-3 lg:px-8 text-white btn-hover-1 rounded-full"
                >
                  back
                </button>
                <button
                  :disabled="!isFormValid"
                  @click="handleJobApplication()"
                  :class="
                    !isFormValid
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#43D0DF] btn-hover-1'
                  "
                  class="font-Satoshi500 text-[10.2px] p-3 lg:px-8 lg:w-auto w-full text-white rounded-full"
                >
                  <span v-if="!loading">Send</span>
                  <WhiteLoader v-else />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[#E9FAFB] border-[0.735px] flex lg:flex-row flex-col gap-5 justify-between rounded-[17.104px] mt-10 p-6 lg:px-10"
    >
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Salary</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">
          <!-- <span v-html="numAbbr.formatCurrency(singleJob?.data?.currency)"></span> -->

          {{ singleJob?.data?.currency }}
          {{ store.abbr(singleJob?.data?.salary_min) }}-
          {{ store.abbr(singleJob?.data?.salary_max) }}/
          {{ singleJob?.data?.salaray_type }}
        </p>
      </div>
      <!-- <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Expertise</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">Intermediate</p>
      </div> -->
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Location</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">
          {{ singleJob?.data?.state }},
          {{ singleJob?.data?.country }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Job Type</p>
        <p class="text-[#244034] text-[13.076px] capitalize font-Satoshi500">
          {{ singleJob?.data?.job_type }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Date</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">
          {{ singleJob?.data?.date_created }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[13.076px] font-Satoshi400">Experience</p>
        <p class="text-[#244034] text-[13.076px] font-Satoshi500">
          {{ singleJob?.data?.experience }}
        </p>
      </div>
    </div>
    <p class="text-[36.637px] font-Satoshi400 text-[#244034] my-6">
      Fill out your Application
    </p>
    <div class="flex flex-col gap-4 lg:flex-row mt-10 w-full">
      <div class="lg:w-[40%] flex flex-col gap-6">
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        >
          <p class="text-[17.887px] font-Satoshi500 text-[#000]">Profile URL</p>
          <div
            class="bg-[#EDF0B8] p-2 flex relative overflow-hidden rounded-[5.982px] mt-3"
          >
            <span
              class="text-[15.495px] font-Satoshi500 text-[#01272C] flex overflow-x-hidden"
              >https://www.myspurr.net/{{
                userDetails?.first_name.substring(0, 4) + ".."
              }}/{{ userDetails?.uniqueId.substring(0, 4) + ".." }}</span
            >
            <a
              target="_blank"
              :href="
                `https://www.myspurr.net/` +
                `${userDetails?.first_name}` +
                `/` +
                `${userDetails?.uniqueId}`
              "
              class="bg-[#2C4C50] p-2 absolute right-1 top-1 flex items-start rounded-full"
            >
              <LinkIcon />
            </a>
          </div>
        </div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        >
          <p class="text-[17.887px] font-Satoshi500 text-[#000] leading-[22.621px]">
            What is your
            <span class="lowercase">{{ singleJob?.data?.salaray_type }}</span> rate for
            this job?
          </p>
          <span class="text-[#DA5252] text-[13.165px] font-Satoshi500 leading-[25.232px]"
            >Client budget:
            <span v-html="numAbbr.formatCurrency(singleJob?.data?.currency)"></span>
            {{ store.abbr(singleJob?.data?.salary_min, 2) }}-{{
              store.abbr(singleJob?.data?.salary_max, 2)
            }}
          </span>
          <div class="flex-col justify-between gap-2 w-full">
            <div 
            class="border-[1.261px] w-full font-Satoshi500 text-[#2540358C] text-[14.26px] rounded-[6.303px] overflow-hidden flex items-center"
            :class="valideRateError ? '!border-[#DA5252]' : 'border-[#25403559]'"
            >
              <span
              v-if="jobApplicationForm.rate.length > 0"
               v-html="numAbbr.formatCurrency(singleJob?.data?.currency)" class="pl-2"></span>
              <AuthInput
                inputClasses="w-full !border-none font-Satoshi500 text-[#2540358C] text-[14.26px]p-2"
                type="text"
                v-model="jobApplicationForm.rate"
                class="flex-1"
                :error="valideRateError" @input="checkAmountValidity"
                
              />
            </div>
              <!-- <span v-if="errors.rateError" class="text-[#993939] font-Satoshi400 text-sm">{{
                errorsMsg.rat
              }}</span> -->
            

            <span v-if="valideRateError" class="text-[#993939] font-Satoshi400 text-sm">{{
              valideRateErrorMsg
            }}</span>
          </div>
        </div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] p-4"
        >
          <p class="text-[17.887px] font-Satoshi500 text-[#000] leading-[22.621px]">
            When are you available to start?
          </p>
          <div class="flex gap-3 justify-between mt-4">
            <button
              @click="handleButtonClick('Right away')"
              :class="{
                'bg-brand text-white':
                  jobApplicationForm.available_start === 'Right away',
              }"
              class="border-[1.261px] w-full border-[#25403559] font-Satoshi500 text-[#2540358C] text-[14.26px] rounded-[6.303px] p-2"
            >
              Right away
            </button>
            <button
              @click="handleButtonClick('After 2 weeks')"
              :class="{
                'bg-brand text-white':
                  jobApplicationForm.available_start === 'After 2 weeks',
              }"
              class="border-[1.261px] w-full border-[#25403559] font-Satoshi500 text-[#2540358C] text-[14.26px] rounded-[6.303px] p-2"
            >
              After 2 weeks
            </button>
          </div>
          <div class="flex gap-3 justify-between mt-4">
            <button
              @click="toggleDateInput"
              :class="{
                'bg-brand !text-white': showDateInput,
              }"
              class="border-[1.261px] w-full border-[#25403559] font-Satoshi500 text-[#2540358C] text-[14.26px] rounded-[6.303px] p-2"
            >
              After this specific date
            </button>
          </div>
          <GlobalInput
            v-if="showDateInput"
            v-model="jobApplicationForm.available_start"
            type="date"
            class="mt-2"
          />
        </div>
        <div
          class="border-[1.137px] bg-[#FFFFFD] rounded-[11.367px] border-[#254035]/[0.6] py-10 p-4"
        >
          <p class="text-[17.887px] font-Satoshi500 text-[#000]">
            Attach relevant files or specific portfolio?
          </p>
          <label
            for="upload_file"
            class="bg-[#EDF0B8] border-dashed cursor-pointer border-[#254035AB] border-[1.789px] p-2 py-6 flex flex-col text-center relative rounded-[5.982px] mt-3"
          >
            <div class="flex flex-col" v-if="!jobApplicationForm.other_file">
              <p class="font-Satoshi500 text-[12.3px] text-[#000]">
                Drag and Drop file or <span class="underline">Browse</span>
              </p>
              <p class="text-[#000000] text-[8.516px] font-Satoshi500">
                Attach up to 3 files, max 10MB each. A cover letter is not required
              </p>
              <CloudUploadIcon class="mx-auto mt-4" />
            </div>
            <span v-else>{{ uploadedImageName }} </span>
          </label>
          <input
            type="file"
            name=""
            @change="uploadFile"
            ref="previewImage"
            accept=".pdf"
            hidden
            id="upload_file"
          />
        </div>
      </div>

      <div class="lg:w-[60%] lg:min-h-auto min-h-[20vh] flex flex-col gap-4 overflow-y-auto" ref="mainContainer">
        <p 
        v-if="questionLength > 0"
        class="text-[17.887px] font-Satoshi500 text-[#000]">
            Answer the following Client question(s)
          </p>
        <div
          v-for="(question, index) in singleJob?.data?.questions"
          :key="question"
          class="quillContainer border-[1.137px] bg-[#FFFFFD] h-full w-full rounded-[11.367px] border-[#254035]/[0.6] p-4"
          :class="questionLength <= 1? 'hide-scrollbar overflow-hidden': 'scroller overflow-y-auto'"
          ref="quillContainer"
          :style="{ maxHeight: `${customHeight}px`}"
        >
          <div class="w-full editor !mt-0 application !mb-2">
            <p
              v-html="question.question"
              class="text-[1.02rem] font-Satoshi500 text-[#000]"
            ></p>
          </div>
            <ckeditor
              v-if="isLayoutReady"
              v-model="jobApplicationForm.question_answers[index].answer"
              :editor="editor"
              :config="editorConfigs"
            />
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
