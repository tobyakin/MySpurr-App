<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import { storeToRefs } from 'pinia'
import SearchIcon from '@/components/icons/circleSearchIcon.vue'
import VerifyIcon from '@/components/icons/verifyIcon.vue'
import { useNumberFomateStore } from '@/stores/numberFomate'
import ShortLoader from '@/components/ui/Loader/ShortLoader.vue'

import WhiteLoader from '@/components/ui/WhiteLoader.vue'
import { useQuery } from 'vue-query'
import { useJobsStore } from '@/stores/jobs'
import { useTabStore } from '@/stores/tab'
import { useUserProfile } from '@/stores/profile'
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import cancelIcon from '@/components/icons/cancelIcon.vue'

let numAbbr = useNumberFomateStore()

const store = useTabStore()
const jobsStore = useJobsStore()
const profile = useUserProfile()
const { JobDetailsById } = storeToRefs(jobsStore)
const showCloseJobOptions = ref(false)
const selectedOption = ref('')
const reason = ref('')

const { user } = storeToRefs(profile)

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const closeJob = async (slug) => {
  loading.value = true
  try {
    const res = await jobsStore.handelCloseJob(slug)
    if (res.status === 'true') {
      loading.value = false
      router.push({ name: 'job-lists' })
      // redirect to job-lists
    }
    return res
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

const gotoApplications = (slug, id) => {
  router.push({ name: 'applications', params: { businessname: formattedBusinessName.value, slug: slug, id: id} })
}
const getJobDetails = async () => {
  let response = await jobsStore.handleGetJobDetailsById(route.params.id)
  return response
}
const fetchData = async () => {
  await Promise.all([getJobDetails()])
}

fetchData()
const { isLoading } = useQuery(['JobDetails', route.params.id], getJobDetails, {
  retry: 10,
  staleTime: 10000,
  onSuccess: (data) => {
    JobDetailsById.value = data
  }
})
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}
const imageExists = ref(false)
const initials = ref('')

onMounted(async () => {
  await updateImageExists()
})

watch(JobDetailsById, async () => {
  await updateImageExists()
})

async function updateImageExists() {
  const hasImage = JobDetailsById.value?.data?.company?.company_logo
  if (hasImage) {
    const imageSrc = getImageSrc()
    imageExists.value = await checkImageExists(imageSrc)
    if (!imageExists.value) {
      setInitials(JobDetailsById.value?.data?.company?.business_name)
    }
  } else {
    imageExists.value = false
    setInitials(JobDetailsById.value?.data?.company?.business_name)
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
  return JobDetailsById.value?.company?.company_logo
}

function handleImageError() {
  console.error('Image loading error')
  setInitials(JobDetailsById.value?.company?.business_name)
}

const formattedBusinessName = computed(() => {
  return user.value?.data?.business_name
    ?.toLowerCase()
    .replace(/\s+/g, '');
});

const handleCloseJob = ()=>{
  showCloseJobOptions.value = true
}

const handleSubmitCloseJob = async ()=>{
  let payload = {}
  loading.value = true
  if(selectedOption.value === 'yes'){
    payload = {
      "get_candidate": 1,
      "reason": ""
    }
    await jobsStore.handelCloseJob(JobDetailsById.value?.data?.id, payload, payload)
  } else if(selectedOption.value === "no"){
    payload = {
      "get_candidate": 0,
      "reason": reason.value
    }
    await jobsStore.handelCloseJob(JobDetailsById.value?.data?.id, payload, payload)
  }
  await jobsStore.handleMyJobs()
  loading.value = false
  showCloseJobOptions.value = false
  router.push({ name: 'job-lists' })
}

const closeOptionModal = ()=>{
  selectedOption.value = ''
  showCloseJobOptions.value = false
}

const displayImage = computed(() => imageExists.value)
</script>

<template>
  <DashboardLayout>
    <ShortLoader v-if="isLoading" />
    <div v-else class="container p-0 lg:p-6 lg:py-3 py-4 mb-5">
      <CenteredModalLarge v-if="showCloseJobOptions">
        <div class="px-10 py-8 msgMob:p-4">
          <cancelIcon class="ml-auto w-[40px] h-[20px] hover:scale-110 transitionItem !mb-[2rem]" @click="closeOptionModal"/>
          <div class="closeJobStepOne">
            <h1 class="text-[#01181B] font-Satoshi400 text-[1.4rem] leading-[2.1875rem] !mb-[2rem] msgTab4:text-[1.2rem] msgTab4:leading-[1.9rem]">You are about to close an active job, did you get a preferred candidate for the role?</h1>
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
                  <span class="text-[#01181B] font-Satoshi400 text-[1.3rem] leading-[2rem] msgTab4:text-[1.2rem]">
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
                  <span class="text-[#01181B] font-Satoshi400 text-[1.3rem] leading-[2rem] msgTab4:text-[1.2rem]">
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
                  v-model="reason"
                />
              </div>
            </div>
            <div class="w-full grid place-items-center mt-[2rem]">
              <button 
                  class="w-auto text-center bg-[#43D0DF] py-[0.69rem] px-[2rem] rounded-[1rem] font-Satoshi500 text-[0.8rem] text-white !uppercase btn-hover-1"
                  @click="handleSubmitCloseJob"
                  >
                  <span v-if="!loading">SUBMIT</span>
                  <WhiteLoader v-else />
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
      <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] lg:p-10 p-6">
        <div class="flex lg:flex-row flex-col gap-3 w-full">
          <div>
            <div
              class="h-[61.011px] w-[61.011px] flex justify-center object-contain items-center rounded-full bg-brand"
            >
              <template v-if="displayImage">
                <img
                  :src="getImageSrc()"
                  class="h-[61.011px] w-[61.011px] object-cover rounded-full"
                  @error="handleImageError"
                  alt=""
                />
              </template>
              <template v-else>
                <div class="initials-container text-2xl text-white object-cover font-bold">
                  {{ initials }}
                </div>
              </template>
              <!-- <img
              class="h-[61.011px] w-[61.011px] rounded-full"
              :src="JobDetailsById?.data?.company?.company_logo"
              alt=""
            /> -->
            </div>
          </div>
          <div class="w-full">
            <div class="flex lg:flex-row flex-col gap-4 justify-between">
              <div class="">
                <p class="text-[22.805px] font-Satoshi400 flex text-[#000]">
                  {{ JobDetailsById?.data?.company?.business_name }}
                </p>
                <div class="flex mt-1 gap-1">
                  <VerifyIcon class="w-4" />
                  <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">Verified Client.</p>
                </div>
              </div>
              <div>
                <div class="flex gap-2">
                  <button class="">
                    <SearchIcon class="lg:w-[54.215px] lg:h-[54.215px] h-[40px] w-[40px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div class="flex lg:flex-row flex-col gap-6 items-center justify-between w-full lg:gap-3">
            <p class="lg:text-[26.625px] capitalize text-[19px] font-Satoshi500 text-[#000000]">
              {{ JobDetailsById?.data?.job_title }}
            </p>
            <button
              @click="gotoApplications(JobDetailsById?.data?.slug, JobDetailsById?.data?.id)"
              class="bg-[#43D0DF] font-Satoshi500 text-[10.2px] capitalize p-3 px-12 text-white btn-hover-1 rounded-full"
            >
              View applicants
            </button>

            <!-- <button
              @click="closeJob(JobDetailsById?.data?.slug)"
              :disabled="loading"
              :class="loading ? 'cursor-not-allowed' : ''"
              class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
            >
              <span v-if="!loading"> Close job </span>
              <WhiteLoader v-else />
            </button> -->
          </div>
          <div class="flex justify-between lg:mt-2 mt-6">
            <div class="flex gap-3 flex-wrap items-center">
              <div
                v-for="skill in JobDetailsById?.data?.skills"
                :key="skill"
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                {{ skill.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-[#E9FAFB] border-[0.735px] flex lg:flex-row flex-col gap-5 justify-between rounded-[17.104px] mt-10 p-6 lg:px-10"
      >
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Salary</p>
          <p class="text-[#244034] text-[17.104px] flex items-center font-Satoshi500">
            <span v-html="numAbbr.formatCurrency(JobDetailsById?.data?.currency)"></span>

            {{ store.abbr(JobDetailsById?.data?.salary_min) }}-
            {{ store.abbr(JobDetailsById?.data?.salary_max) }}/
            {{ JobDetailsById?.data?.salaray_type }}
          </p>
        </div>
        <!-- <div class="flex flex-col gap-2">
        <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Expertise</p>
        <p class="text-[#244034] text-[17.104px] font-Satoshi500">
          {{ JobDetailsById?.data?.qualification }}
        </p>
      </div> -->
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Location</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.state }},
            {{ JobDetailsById?.data?.country }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Job Type</p>
          <p class="text-[#244034] capitalize text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.job_type }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Date</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.date_created }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Experience</p>
          <p class="text-[#244034] text-[14.104px] font-Satoshi500">
            {{ JobDetailsById?.data?.experience }}
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row mt-10 w-full gap-8">
        <div class="lg:w-[60%] flex flex-col gap-6 justify-between p-4">
          <div>
            <p
              v-if="JobDetailsById?.data?.description"
              class="text-[16.236px] text-[#000] font-Satoshi500 !mb-4"
            >
              Job Description
            </p>

            <div
              v-html="JobDetailsById?.data?.description"
              class="descr"
            ></div>

            <p class="text-[1.034rem] text-[#000] font-Satoshi500 !mb-4 mt-6">Responsibilities</p>
            <div
              v-html="JobDetailsById?.data?.responsibilities"
              class="responsibilitie text-[#000]/[0.75] font-Satoshi400 editor text-[1.034rem] mt-4 leading-[1.543rem]"
            ></div>

            <p class="text-[1.034rem] text-[#000] font-Satoshi500 !mb-4 mt-6">Required Skills:</p>
            <div
              v-html="JobDetailsById?.data?.required_skills"
              class="req_skills text-[#000]/[0.75] font-Satoshi400 editor text-[1.034rem] mt-4 leading-[1.543rem]"
            ></div>

            <p
              v-if="JobDetailsById?.data?.benefits"
              class="text-[1.034rem] text-[#000] editor font-Satoshi500 !mb-4 mt-6"
            >
              Benefits:
            </p>
            <div
              v-html="JobDetailsById?.data?.benefits"
              class="req_skills text-[#000]/[0.75] font-Satoshi400 editor text-[1.034rem] mt-4 leading-[1.543rem]"
            ></div>
          </div>
        </div>
        <div class="lg:w-[40%]">
          <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] p-6">
            <p class="font-Satoshi700 text-[17.104px] text-[#31795A]/[0.70]">About the Company</p>
            <div class="flex mt-8 gap-4">
              <div>
                <div
                  class="h-[61.011px] w-[61.011px] flex justify-center items-center rounded-full bg-brand"
                >
                  <template v-if="displayImage">
                    <img
                      :src="getImageSrc()"
                      class="h-[61.011px] w-[61.011px] rounded-full"
                      @error="handleImageError"
                    />
                  </template>
                  <template v-else>
                    <div class="initials-container text-2xl text-white font-bold">
                      {{ initials }}
                    </div>
                  </template>

                  <!-- <img
                  class="h-[61.011px] w-[61.011px] rounded-full"
                  :src="JobDetailsById?.data?.company?.company_logo"
                  alt=""
                /> -->
                </div>
              </div>
              <div>
                <div class="flex gap-2 items-center">
                  <p class="text-[20.166px] font-Satoshi400 flex text-[#000]">
                    {{ JobDetailsById?.data?.company.business_name }}
                  </p>
                  <div class="flex mt-1 gap-1">
                    <VerifyIcon class="w-4" />
                    <p class="text-[10.646px] font-Satoshi700 text-[#000000B2]">Verified Client.</p>
                  </div>
                </div>
                <div class="flex gap-3 flex-wrap mt-2 items-center">
                  <div
                    v-for="skill in JobDetailsById?.data?.company?.industry"
                    :key="skill"
                    class="bg-[#2F929C] font-Satoshi500 text-[8.552px] capitalize p-[4px] px-4 text-[#fff] rounded-full"
                  >
                    {{ skill.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-html="JobDetailsById?.data?.company.about_business"
              class="text-[#000]/[0.75] editor font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]"
            ></div>
            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]">
              <p>{{ JobDetailsById?.data?.total_opened_jobs }} Jobs opened</p>
            </div>

            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div class="flex rounded-[17.104px] mb-4 gap-6">
              <div class="flex flex-col gap-2">
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">Completed Jobs</p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  {{ JobDetailsById?.data?.completed_jobs }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Hired Jobs</p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  {{ JobDetailsById?.data?.hired_jobs }}
                </p>
              </div>
            </div>
            <button
              class="bg-[#31795A] rounded-full p-2 px-10 font-Satoshi500 text-[16.646px] text-white"
            >
              Message
            </button>
          </div>
        </div>
      </div>
      <div class="flex lg:flex-row flex-col gap-6 items-start mt-20 justify-start">
        <!-- <button
          @click="gotoApplications(JobDetailsById?.data?.slug)"
          class="bg-[#43D0DF] font-Satoshi500 uppercase text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
        >
          VIEW APPLICANTS
        </button> -->
        <button
          @click="handleCloseJob"
          :disabled="loading"
          :class="loading ? 'cursor-not-allowed' : ''"
          class="bg-[#43D0DF] font-Satoshi500 capitalize text-[10.2px] p-3 px-12 text-white btn-hover-1 rounded-full"
        >
          <span v-if="!loading"> Close job </span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
