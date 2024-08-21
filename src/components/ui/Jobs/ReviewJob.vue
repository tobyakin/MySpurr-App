<script setup>
  import { onMounted, ref, computed, reactive, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useJobsStore } from "@/stores/jobs";
  import { useNumberFomateStore } from "@/stores/numberFomate";
  import { useUserProfile } from "@/stores/profile";
  import WhiteLoader from "@/components/ui/WhiteLoader.vue";
  import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
  import { useRouter } from "vue-router";
  import checkIcon from "@/components/icons/checkIcon.vue"
  import VerifyIcon from "@/components/icons/verifyIcon.vue";


  let numAbbr = useNumberFomateStore();
  let loading = ref(false);
  let payLoading = ref(false);
  let showModal = ref(false);
  let showOption = ref(false)
  const userProfile = useUserProfile();
  const userDetails = computed(() => {
    return userProfile.user.data;
  });
  const isHighlighted = ref(false);
  const router = useRouter();
  const jobsStore = useJobsStore();
  const { postJobsValue, ciso, siso } = storeToRefs(jobsStore);
  const emit = defineEmits(["back"]);
  const getSuccessStatusFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("success");
    return successParam === "true"; // Convert the value to a boolean
  };
  const imageExists = ref(false);
  const initials = ref("");
  
  const state = reactive({
    status: getSuccessStatusFromURL(),
  });
  
  const back = () => {
    emit("back");
    resetForm()
  };
  const hasSubscriptedToPostJob = computed(() => {
    return userProfile?.user?.data?.posted_job;
  });
  const landingUrl = import.meta.env.VITE_DASHBOARD + `post-job?success=true`;
  
  const isFormValid = computed(() => {
    return (
      postJobsValue.value.job_title !== null &&
      postJobsValue.value.job_type.trim() !== "" &&
      postJobsValue.value.description !== null &&
      postJobsValue.value.responsibilities.trim() !== "" &&
      postJobsValue.value.required_skills !== null &&
      postJobsValue.value.benefits !== null &&
      postJobsValue.value.salaray_type !== null &&
      postJobsValue.value.salary_min !== null &&
      postJobsValue.value.salary_max !== null &&
      postJobsValue.value.skills !== null &&
      postJobsValue.value.experience !== null &&
      postJobsValue.value.qualification !== null &&
      postJobsValue.value.questions !== null &&
      postJobsValue.value.currency !== null &&
      ciso.value !== null &&
      siso.value.trim() !== ""
    );
  });
  const resetForm = () => {
      (postJobsValue.value.job_title = ""),
      (postJobsValue.value.job_type = ""),
      (postJobsValue.value.description = ""),
      (postJobsValue.value.responsibilities = ""),
      (postJobsValue.value.required_skills = ""),
      (postJobsValue.value.benefits = ""),
      (postJobsValue.value.salaray_type = ""),
      (postJobsValue.value.salary_min = ""),
      (postJobsValue.value.salary_max = ""),
      (postJobsValue.value.skills = ""),
      (postJobsValue.value.experience = ""),
      (postJobsValue.value.qualification = ""),
      (postJobsValue.value.questions = ""),
      (postJobsValue.value.currency = ""),
      (postJobsValue.state_id = ""),
      (postJobsValue.country_id = ""),
      (ciso.value = ""),
      (siso.value = "");
  };
  // handlejobPayment;
  const postJob = async () => {
    loading.value = true;
    try {
      const res = await jobsStore.handlePostJob();
      if (res.status === "true") {
        loading.value = false;
        showOption.value = false
        showModal.value = true
        resetForm();
      } else {
        loading.value = false;
        back();
      }
      loading.value = false;
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
  const handlejobPayment = async () => {
    payLoading.value = true;
    let isHighlightedValue = isHighlighted.value === true ? 1 : 0;
    try {
      const res = await jobsStore.handlejobPayment(
        userDetails?.value?.id,
        userDetails?.value?.business_email,
        5000,
        landingUrl,
        isHighlightedValue
      );
      window.location.href = res.url;
      if (res.status === "true") {
        payLoading.value = false;
        showModal.value = true;
        resetForm();
      } else {
        payLoading.value = false;
        back();
      }
      payLoading.value = false;
      return res;
    } catch (error) {
      console.log(error);
      back();
    } finally {
      payLoading.value = false;
      resetForm();
      back();
    }
  };
  const handleJobPosting = () => {
    postJob();
  };

  const handleSelectOption = ()=>{
    showOption.value = true
  }

  const goToJobList = () => {
    router.push({ name: "job-lists" });
  };

  onMounted(async () => {
    await userProfile.userProfile();
  });

  onMounted(() => {
    if (state.status === true) {
      showModal.value = true;
    }
  });

  function checkImageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
  
  onMounted(async () => {
    await updateImageExists();
  });
  
  watch(userDetails, async () => {
    await updateImageExists();
  });
  
  async function updateImageExists() {
    const hasImage = userDetails.value?.company_logo;
    if (hasImage) {
      const imageSrc = getImageSrc();
      imageExists.value = await checkImageExists(imageSrc);
      if (!imageExists.value) {
        setInitials(userDetails.value?.business_name);
      }
    } else {
      imageExists.value = false;
      setInitials(userDetails.value?.business_name);
    }
  }
  
  function setInitials(name) {
    initials.value = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  
  function getImageSrc() {
    return userDetails.value?.company_logo;
  }
  
  function handleImageError() {
    console.error("Image loading error");
    setInitials(userDetails.value?.business_name);
  }
  
  const displayImage = computed(() => imageExists.value);
  </script>
  
  <template>
    <div>
      <CenteredModalLarge v-if="showOption"
        >
        <div class="text-center rounded-[17.104px] lg:p-10 p-6">
          <div class="w-[90%] mx-auto mb-[2.54rem]">
            <h3 class="font-Satoshi700 text-[1.78rem] leading-[2.78rem] text-[#01181B]">Choose Your Job Post Option</h3>
            <p class="text-[#00474F] font-Satoshi400 text-[1.37rem] leading-[1.6rem]">Unlock premium features and find the best talent faster with our paid option or opt for our free standard post.</p>
          </div>
          <div class="flex justify-center gap-[1.28rem] mb-[2.66rem]">
            <article class="bg-[#00474F] rounded-[1rem] p-[1.5rem]">
              <h3 class="text-[#FFF] font-Satoshi700 text-[1rem] leading-[1.5rem] text-left">Premium Job Post <br>(15% Fee)</h3>
              <div class="w-full mt-[1rem] mb-[1.5rem] text-left flex flex-col gap-[0.7rem]">
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Enhanced visibility</h3>
                </div>
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Priority support</h3>
                </div>
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Advanced filtering and matching</h3>
                </div>
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Access to exclusive talent pool</h3>
                </div>
              </div>
              <button 
              class="w-full text-center bg-[#43D0DF] py-[0.69rem] px-[2rem] rounded-[1rem] font-Satoshi500 text-[0.8rem] text-white !uppercase btn-hover-1"
              @click="handlejobPayment"
              >
              <span v-if="!payLoading">premium Job Post</span>
              <WhiteLoader v-else />
            </button>
            </article>
            <article class="bg-[#00474F] rounded-[1rem] p-[1.5rem]">
              <h3 class="text-[#FFF] font-Satoshi700 text-[1rem] leading-[1.5rem] text-left">Standard Job Post <br>(Free)</h3>
              <div class="w-full mt-[1rem] mb-[1.5rem] text-left flex flex-col gap-[0.7rem]">
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Standard visibility</h3>
                </div>
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">General support</h3>
                </div>
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Basic filtering and matching</h3>
                </div>
                <div class="flex items-center w-full gap-[0.7rem]">
                  <checkIcon />
                  <h3 class="flex-1 text-[#E6F1F3] font-Satoshi400 text-[0.9rem] leading-[1.16rem]">Access to general talent pool</h3>
                </div>
              </div>
              <button 
                class="w-full text-center bg-[#43D0DF] py-[0.69rem] px-[2rem] rounded-[1rem] font-Satoshi500 text-[0.8rem] text-white !uppercase btn-hover-1"
                @click="handleJobPosting"
                >
                <span v-if="!loading">standard Job Post</span>
                <WhiteLoader v-else />
                
              </button>
            </article>
          </div>
          <div class="w-full">
            <p class="font-Satoshi400 text-[#000000b3] text-[0.875rem] leading-[1.5rem] text-left">By choosing the 15% fee option, employers significantly improve their chances of quickly finding the right talent for their projects, supported by enhanced features and dedicated support. This model ensures that both employers and talents have a superior experience on MySpurr.</p>
          </div>
  
        </div>
    </CenteredModalLarge>
      <CenteredModalLarge v-if="showModal"
        ><div class="text-center px-10 py-10">
          <h4 class="text-[#01181B] font-Satoshi700 text-[28.537px] mt-[20px]">
            Congratulations! Your job has been successfully posted on MySpurr!
          </h4>
          <p class="text-[#01181B] text-[18px] font-Satoshi400 mt-4">
            Now, talented creatives can discover and apply for your exciting opportunity.
            Stay tuned for applications and manage your job seamlessly from your dashboard.
          </p>
          <div class="flex justify-center gap-4 mt-12">
            <button
              @click="back()"
              class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%]"
            >
              VIEW CANDIDATES</button
            ><button
              @click="goToJobList()"
              class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%]"
            >
              <span v-if="!loading">JOB LISTING </span>
              <WhiteLoader v-else />
            </button>
          </div></div
      ></CenteredModalLarge>
      <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] lg:p-10 p-6">
        <div class="flex lg:flex-row flex-col gap-3 w-full">
          <div>
            <div
              class="h-[61.011px] w-[61.011px] flex justify-center items-center rounded-full bg-brand"
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
                <div class="initials-container text-white text-3xl font-bold">
                  {{ initials }}
                </div>
              </template>
            </div>
            <!-- <img
              class="h-[61.011px] w-[61.011px] object-cover rounded-full"
              :src="userDetails?.company_logo"
              :alt="userDetails?.business_name"
            /> -->
          </div>
          <div class="w-full">
            <div class="flex lg:flex-row flex-col gap-4 justify-between">
              <div class="">
                <p class="text-[22.805px] font-Satoshi400 flex text-[#000]">
                  {{ userDetails?.business_name }}
                </p>
                <div class="flex mt-1 gap-1">
                  <VerifyIcon class="w-4" />
                  <p class="text-[11.633px] font-Satoshi700 text-[#000000B2]">
                    Verified Client.
                  </p>
                </div>
              </div>
              <div>
                <!-- <div class="flex gap-2">
                  <button class="">
                    <CircleBookMarkIcon
                      class="lg:w-[54.215px] lg:h-[54.215px] h-[40px] w-[40px]"
                    />
                  </button>
                  <button class="">
                    <SearchIcon class="lg:w-[54.215px] lg:h-[54.215px] h-[40px] w-[40px]" />
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between mt-5">
          <div
            class="flex lg:flex-row flex-col gap-6 items-center justify-between w-full lg:gap-3"
          >
            <p
              class="lg:text-[26.625px] capitalize text-[19px] font-Satoshi500 text-[#000000]"
            >
              {{ postJobsValue.job_title }}
            </p>
            <button
              @click="handleSelectOption"
              :disabled="!isFormValid"
              :class="
                !isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF] btn-hover-1'
              "
              class="font-Satoshi500 text-[9.708px] uppercase p-3 px-12 text-white rounded-full"
            >
              <span>Post</span>
              <!-- <WhiteLoader v-else /> -->
            </button>
          </div>
          <div class="flex justify-between lg:mt-2 mt-6">
            <div class="flex gap-3 flex-wrap items-center">
              <div
                v-for="skill in postJobsValue.skills"
                :key="skill"
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                {{ skill.name }}
              </div>
              <!-- <div
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                Brand identity
              </div>
              <div
                class="bg-[#2F929C] font-Satoshi500 text-[13.24px] capitalize p-[4px] px-6 text-[#fff] rounded-full"
              >
                UI/UI design
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-[#E9FAFB] border-[0.735px] flex lg:flex-row flex-col gap-5 justify-between rounded-[17.104px] mt-10 p-6 lg:px-10"
      >
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Salary</p>
          <p
            v-if="postJobsValue.salary_min || postJobsValue.salary_max"
            class="text-[#244034] text-[17.104px] flex items-center font-Satoshi500"
          >
            <span v-html="numAbbr.formatCurrency(postJobsValue.currency)"></span>
            {{ numAbbr.abbr(postJobsValue.salary_min) }}-{{
              numAbbr.abbr(postJobsValue.salary_max)
            }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Expertise</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">
            {{ postJobsValue.qualification }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Location</p>
          <p
            v-if="postJobsValue.state_id || postJobsValue.country_id"
            class="text-[#244034] text-[17.104px] font-Satoshi500"
          >
            {{ postJobsValue.state_id }},{{ postJobsValue.country_id }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Job Type</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">
            {{ postJobsValue.job_type }}
          </p>
        </div>
        <!-- <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Date</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">12 jun, 2022</p>
        </div> -->
        <div class="flex flex-col gap-2">
          <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Experience</p>
          <p class="text-[#244034] text-[17.104px] font-Satoshi500">
            {{ postJobsValue.experience }}
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row mt-10 w-full">
        <div class="lg:w-[60%] p-4">
          <p
            v-if="postJobsValue.description"
            class="text-[16.236px] text-[#000] font-Satoshi500"
          >
            Job Description
          </p>
  
          <div
            v-html="postJobsValue.description"
            class="text-[#000]/[0.75] font-Satoshi400 editor text-[12.546px] mt-4 leading-[24.689px]"
          ></div>
  
          <p
            v-if="postJobsValue.responsibilities"
            class="text-[16.236px] text-[#000] font-Satoshi500 !mb-4 mt-6"
          >
            Responsibilities
          </p>
          <div
            v-html="postJobsValue.responsibilities"
            class="text-[#000]/[0.75] font-Satoshi400 editor text-[12.546px] mt-4 leading-[24.689px]"
          ></div>
  
          <p
            v-if="postJobsValue.required_skills"
            class="text-[16.236px] text-[#000] editor font-Satoshi500 !mb-4 mt-6"
          >
            Required Skills:
          </p>
          <div
            v-html="postJobsValue.required_skills"
            class="text-[#000]/[0.75] font-Satoshi400 editor text-[12.546px] leading-[24.689px]"
          ></div>
  
          <p
            v-if="postJobsValue.benefits"
            class="text-[16.236px] text-[#000] editor font-Satoshi500 !mb-4 mt-6"
          >
            Benefits:
          </p>
          <div
            v-html="postJobsValue.benefits"
            class="text-[#000]/[0.75] editor font-Satoshi400 text-[12.546px] leading-[24.689px]"
          ></div>
          <div>
            <!-- <button
              @click="apply"
              class="bg-[#43D0DF] font-Satoshi500 text-[9.708px] p-3 px-12 text-[#000000] rounded-full"
            >
              APPLY
            </button> -->
          </div>
        </div>
        <div class="lg:w-[40%] flex flex-col gap-5">
          <div class="bg-[#E9FAFB] border-[0.735px] rounded-[17.104px] p-6">
            <p class="font-Satoshi700 text-[17.104px] text-[#31795A]/[0.70]">
              About the Company
            </p>
            <div class="flex mt-8 gap-4">
              <div>
                <div
                  class="h-[61.011px] w-[61.011px] flex justify-center items-center rounded-full bg-brand"
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
                    <div class="initials-container text-white text-3xl font-bold">
                      {{ initials }}
                    </div>
                  </template>
                </div>
  
                <!-- <img
                  class="h-[61.011px] w-[61.011px] object-cover rounded-full"
                  :src="userDetails?.company_logo"
                  :alt="userDetails?.business_name"
                /> -->
              </div>
              <div>
                <div class="flex gap-2 items-center">
                  <p class="text-[20.166px] font-Satoshi400 flex text-[#000]">
                    {{ userDetails?.business_name }}
                  </p>
                  <div class="flex mt-1 gap-1">
                    <VerifyIcon class="w-4" />
                    <p class="text-[10.646px] font-Satoshi700 text-[#000000B2]">
                      Verified Client.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3 flex-wrap mt-2 items-center">
                  <div
                    v-for="skill in userDetails?.industry"
                    :key="skill"
                    class="bg-[#2F929C] font-Satoshi500 text-[8.552px] capitalize p-[4px] px-4 text-[#fff] rounded-full"
                  >
                    {{ skill.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]"
            >
              <p>
                {{ userDetails?.about_business }}
              </p>
            </div>
            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div
              class="text-[#000]/[0.75] font-Satoshi400 text-[12.546px] mt-6 leading-[24.689px]"
            >
              <p>{{ userDetails?.total_opened_jobs }} Jobs opened</p>
            </div>
  
            <hr class="border-[#2C4C50] border-[1.14px] my-[26px]" />
            <div class="flex rounded-[17.104px] mb-4 gap-6">
              <div class="flex flex-col gap-2">
                <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">
                  Completed Jobs
                </p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  {{ userDetails?.completed_jobs }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-[#244034c5] text-[17.104px] font-Satoshi400">Hired Jobs</p>
                <p class="text-[#244034] text-[17.104px] font-Satoshi500">
                  {{ userDetails?.hired_jobs }}
                </p>
              </div>
            </div>
            <!-- <button
              class="bg-[#31795A] rounded-full p-2 px-10 font-Satoshi500 text-[16.646px] text-white"
            >
              Message
            </button> -->
          </div>
          <div
            v-if="hasSubscriptedToPostJob"
            class="bg-[#E9FAFB] hidden border-[0.735px] rounded-[17.104px] p-6"
          >
            <p class="font-Satoshi700 text-[17.104px] text-[#DA5252]">
              Upgrade your job listing
            </p>
            <div class="flex mt-8 flex-col gap-4">
              <div>
                <div class="flex gap-1 justify-start items-center">
                  <input
                    class="bg-transparent !border-[0.737px] cursor-pointer !border-[#97A6A8] accent-brand rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
                    type="checkbox"
                    v-model="isHighlighted"
                  />
                  <label class="text-[#000000] text-[13px] font-Satoshi700">
                    Highlight job listing for ₦ 5,000.00
                  </label>
                </div>
                <p
                  class="font-Satoshi400 text-[10.53px] leading-[14.04px] mt-1 text-[#00474F]"
                >
                  Highlighted listing have a red tag in the list so they stand our against
                  the others
                </p>
              </div>
  
              <div>
                <div class="flex gap-1 justify-start items-center">
                  <input
                    class="bg-transparent !border-[0.737px] cursor-pointer !border-[#97A6A8] accent-brand rounded-[5px] p-4 h-[23.965px] w-[25.729px] py-1.5"
                    type="checkbox"
                  />
                  <label class="text-[#000000] text-[13px] font-Satoshi700">
                    Automatically renew my job post for ₦5,000.00
                  </label>
                </div>
                <p
                  class="font-Satoshi400 text-[10.53px] leading-[14.04px] mt-1 text-[#00474F]"
                >
                  Your job will automatically be renewed each 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between gap-4 mt-12">
        <button
          @click="back"
          class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] leading-[11.593px] rounded-full px-8 p-3 w-auto text-white btn-hover-1"
        >
          Back</button
        ><button
          @click="handleSelectOption"
          :disabled="!isFormValid"
          :class="
            !isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF] btn-hover-1'
          "
          class="font-Satoshi500 text-[14px] leading-[11.593px] rounded-full px-8 p-3 w-auto text-white"
        >
          <span>Post</span>
          <!-- <WhiteLoader v-else /> -->
        </button>
      </div>
    </div>
  </template>
  