<script setup>
import { computed, onMounted, reactive, watch, ref } from 'vue'
import Dropdown from '@/components/ui/Dropdown/Dropdown.vue'
import DropdownEye from '@/components/icons/DropdownEye.vue'
import DropdownDeleteIcon from '@/components/icons/DropdownDeleteIcon.vue'
import DropdownEditIcon from '@/components/icons/DropdownEditIcon.vue'
import DropdownShareIcon from '@/components/icons/DropdownShareIcon.vue'
import DropdownCloseIcon from '@/components/icons/DropdownCloseIcon.vue'
import PagePreLoader from '@/components/ui/Loader/PagePreLoader.vue'
import cancelIcon from '@/components/icons/cancelIcon.vue'
import { useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tab'
import { useJobsStore } from '@/stores/jobs'
import { useNumberFomateStore } from '@/stores/numberFomate'
import { useClipboard } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";

const toast = useToast()
const selectedOption = ref('')

let source = ''

onMounted(() => {
  source = import.meta.env.VITE_LANDING_PAGE + `job-details/` + props?.job?.slug
})

// let source = window.location.href;
const { copy, copied, isSupported } = useClipboard({ source })
const copyUrl = () => {
  if (isSupported) {
    if (copied) {
      copy(source)
      toast.success('Job Link Copied', {
        timeout: 4000
      })
    }
  } else {
    toast.error('Your browser does not support Clipboard API', {
      timeout: 4000
    })
  }
}

let numAbbr = useNumberFomateStore()

const jobsStore = useJobsStore()
const loading = ref(false)

const store = useTabStore()

const router = useRouter()
const showDocument = ref({})
const showDocumentToggle = ref(false)
const showCloseJobOptions = ref(false)

const redirectToPreviewJob = (id) => {
  router.push({ name: 'preview-job', params: { id: id } })
}
const redirectToEditJob = (id) => {
  router.push({ name: 'edit-job', params: { id: id } })
}
const props = defineProps({
  job: Object
})
const jobData = computed(() => {
  return props?.job
})
const imageExists = ref(false)
const initials = ref('')

const toggleDocument = (document) => {
  if (showDocument.value.id == document.id) {
    return (showDocumentToggle.value = !showDocumentToggle.value)
  }
  showDocument.value = document
  showDocumentToggle.value = true
}
const closeDropdown = () => {
  showDocumentToggle.value = false
}

const deleteJob = async (id) => {
  loading.value = true

  try {
    const res = await jobsStore.handelDeleteJob(id)
    await jobsStore.handleMyJobs()
    loading.value = false
    return res
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

const handleCloseJob = ()=>{
  showCloseJobOptions.value = true
}

const handleSubmitCloseJob = ()=>{
  showCloseJobOptions.value = false
}

const closeOptionModal = ()=>{
  selectedOption.value = ''
  showCloseJobOptions.value = false
}

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

onMounted(async () => {
  await updateImageExists()
})

watch(jobData, async () => {
  await updateImageExists()
})

async function updateImageExists() {
  const hasImage = props?.job?.company?.company_logo
  if (hasImage) {
    const imageSrc = getImageSrc()
    imageExists.value = await checkImageExists(imageSrc)
    if (!imageExists.value) {
      setInitials(props?.job?.company?.business_name)
    }
  } else {
    imageExists.value = false
    setInitials(jobData.value?.company?.business_name)
  }
}

function setInitials(name) {
  initials.value = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function getImageSrc() {
  return jobData.value?.company?.company_logo
}

function handleImageError() {
  console.error('Image loading error')
  setInitials(jobData.value?.company?.business_name)
}

const displayImage = computed(() => imageExists.value)
</script>
<template>
  <PagePreLoader v-if="loading" />

  <CenteredModalLarge v-if="showCloseJobOptions">
    <div class="px-10 py-8">
      <cancelIcon class="ml-auto w-[40px] h-[20px] hover:scale-110 transitionItem !mb-[2rem]" @click="closeOptionModal"/>
      <div class="closeJobStepOne">
        <h1 class="text-[#01181B] font-Satoshi400 text-[1.4rem] leading-[2.1875rem] !mb-[2rem]">You are about to close an active job, did you get a preferred candidate for the role?</h1>
        <div class="flex flex-col gap-4">
          <article class="inputField flex items-center gap-[0.5rem] cursor-pointer">
            <input
              type="radio"
              name="option"
              id="yes"
              v-model="selectedOption"
              value="yes"
              class="hidden"
            />
            <label for="yes" class="flex items-center cursor-pointer">
              <span class="custom-radio" :class="{ 'checked': selectedOption === 'yes' }"></span>
              <span class="text-[#01181B] font-Satoshi400 text-[1.3rem] leading-[2rem]">
                Yes, I did
              </span>
            </label>
          </article>

          <article class="inputField flex items-center gap-[0.5rem] cursor-pointer">
            <input
              type="radio"
              name="option"
              id="no"
              v-model="selectedOption"
              value="no"
              class="hidden"
            />
            <label for="no" class="flex items-center cursor-pointer">
              <span class="custom-radio" :class="{ 'checked': selectedOption === 'no' }"></span>
              <span class="text-[#01181B] font-Satoshi400 text-[1.3rem] leading-[2rem]">
                No, I didn’t
              </span>
            </label>
          </article>

          <div class="transitionItem" 
          :class="selectedOption === 'no'? 'h-auto mt-4': 'h-0 overflow-hidden mt-0'">
            <h3 class="text-[#6C8285] font-Satoshi400 text-[0.9rem] leading-[2rem]">
              Kindly let us know why?
            </h3>
            <input
              type="text"
              class="w-full border border-[#000000] rounded-[0.8125rem] p-[1rem]"
            />
          </div>
        </div>
        <div class="w-full grid place-items-center mt-[2rem]">
          <button 
              class="w-auto text-center bg-[#43D0DF] py-[0.69rem] px-[2rem] rounded-[1rem] font-Satoshi500 text-[0.8rem] text-white !uppercase btn-hover-1"
              @click="handleSubmitCloseJob"
              >
              <span>SUBMIT</span>
          </button>
        </div>
      </div>
      <div class="text-center px-10 premiumSucessPage hidden">
        <p class="text-[#01181B] text-[18px] font-Satoshi400 mt-4">
          Thank you, an invoice has been sent to the email provided. Once payment is confirmed, your job post will go live.
        </p>
        <div class="flex justify-center gap-4 mt-12">
          <button
            @click="back()"
            class="bg-[#43D0DF] font-Satoshi500 text-[0.88rem] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
          >
            VIEW CANDIDATES</button
          ><button
            @click="goToJobList()"
            class="bg-[#43D0DF] font-Satoshi500 text-[0.88rem] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
          >
            <span v-if="!loading">JOB LISTING </span>
            <WhiteLoader v-else />
          </button>
        </div>
      </div>
    </div>
  </CenteredModalLarge>

  <div
    class="border-[#254035AB] border-[0.4px] bg-white relative rounded-[7.347px] lg:p-5 p-4 lg:px-6"
  >
    <div class="flex lg:flex-row flex-col gap-3 w-full relative">
      <div class="h-[40.508px] w-[40.508px] flex justify-center items-center rounded-full bg-brand">
        <template v-if="displayImage">
          <img
            :src="getImageSrc()"
            class="h-[40.508px] w-[40.508px] rounded-full"
            @error="handleImageError"
          />
        </template>
        <template v-else>
          <div class="initials-container text-white font-bold">{{ initials }}</div>
        </template>
      </div>
      <div class="w-full flex flex-col gap-4 relative">
        <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-3">
          <div
            role="button"
            @click="redirectToPreviewJob(props?.job?.id)"
            class="flex items-center w-full lg:w-auto lg:justify-normal justify-between gap-14"
          >
            <p class="text-[16.467px] capitalize font-Satoshi700 text-[#244034]">
              {{ props?.job?.job_title }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-5 justify-between mt-5">
          <div class="flex lg:flex-row flex-col gap-4 items-center">
            <p
              class="text-[0.8125rem] capitalize font-Satoshi500 flex flex-row items-center text-[#244034E5]"
            >
              <span v-html="numAbbr.formatCurrency(props?.job?.currency)"></span>
              <span>
                {{ store.abbr(props?.job?.salary_min) }}- {{ store.abbr(props?.job?.salary_max) }}/
                {{ props?.job?.salaray_type }}
              </span>
            </p>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-end">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-4 text-[0.8125rem]"
            >
              <p>{{ props?.job?.date_created }}</p>
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-end">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-2 text-[0.8125rem]"
            >
              <p>{{ props?.job?.applicants }}</p>
              <span
                class="text-[17.633px] !p-2 !py-0 btn-brand !border-none !px-3 !text-[#000000E5] !bg-[#92E4EC]"
                >{{ props?.job?.recent_applicants }}</span
              >
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-end">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-1"
            >
              <div
                class="h-[8px] w-[8px] rounded-full"
                :class="{
                  'bg-[#63D8E4]': props?.job?.status == 'pending',
                  'bg-[#84B358]': props?.job?.status == 'active',
                  'bg-[#E06F6F]': props?.job?.status == 'expired'
                }"
              ></div>
              <p class="capitalize font-Satoshi500 text-[17.239px] text-[#244034E5]">
                {{ props?.job?.status }}
              </p>
            </div>
          </div>
          <div class="text-right flex justify-end cursor-pointer relative">
            <button class="px-4" @click="toggleDocument(job)">
              <svg
                class="cursor-pointer flex lg:flex-row flex-col gap-4 justify-end"
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="19"
                viewBox="0 0 5 19"
                fill="none"
              >
                <circle
                  cx="2.25781"
                  cy="16.1094"
                  r="2"
                  transform="rotate(-90 2.25781 16.1094)"
                  fill="#3F634D"
                />
                <circle
                  cx="2.25781"
                  cy="9.10938"
                  r="2"
                  transform="rotate(-90 2.25781 9.10938)"
                  fill="#3F634D"
                />
                <circle
                  cx="2.25781"
                  cy="2.10938"
                  r="2"
                  transform="rotate(-90 2.25781 2.10938)"
                  fill="#3F634D"
                />
              </svg>
            </button>

            <Dropdown
              v-if="showDocument.id == props?.job?.id && showDocumentToggle"
              :showDropdown="showDocument.id == props?.job?.id && showDocumentToggle"
              class="-bottom-[8rem] w-36 z-10 lg:-right-40"
              :link="false"
              :id="`dropdown` + props?.job?.id"
              @closeDropdown="closeDropdown"
            >
              <ul class="!mb-0">
                <li>
                  <button
                    @click="redirectToPreviewJob(props?.job?.id)"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownEye />
                    <p>View</p>
                  </button>
                </li>
                <li>
                  <button
                    @click="copyUrl"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownShareIcon />
                    <p>Share</p>
                  </button>
                </li>
                <li>
                  <button
                    @click="redirectToEditJob(props?.job?.id)"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownEditIcon />
                    <p>Edit</p>
                  </button>
                </li>
                <li>
                  <button
                    @click="handleCloseJob"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownCloseIcon />
                    <p>Close</p>
                  </button>
                </li>
                <li>
                  <button
                    @click="deleteJob(props?.job?.id)"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownDeleteIcon />
                    <p>Delete</p>
                  </button>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
