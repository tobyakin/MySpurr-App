<script setup>
import { computed, onMounted, reactive, watch, ref } from "vue";
import Dropdown from "@/components/ui/Dropdown/Dropdown.vue";
import DropdownEye from "@/components/icons/DropdownEye.vue";
import DropdownDeleteIcon from "@/components/icons/DropdownDeleteIcon.vue";
import DropdownEditIcon from "@/components/icons/DropdownEditIcon.vue";
import DropdownShareIcon from "@/components/icons/DropdownShareIcon.vue";
// import GreenLoader from "@/components/ui/GreenLoader.vue";
import PagePreLoader from "@/components/ui/Loader/PagePreLoader.vue";
import { useRouter } from "vue-router";
import { useTabStore } from "@/stores/tab";
import { useJobsStore } from "@/stores/jobs";
import { useNumberFomateStore } from "@/stores/numberFomate";
let numAbbr = useNumberFomateStore();

const jobsStore = useJobsStore();
const loading = ref(false);

const store = useTabStore();

const router = useRouter();
const showDocument = ref({});
const showDocumentToggle = ref(false);

const redirectToPreviewJob = (id) => {
  router.push({ name: "preview-job", params: { id: id } });
};
const redirectToEditJob = (id) => {
  router.push({ name: "edit-job", params: { id: id } });
};
const props = defineProps({
  job: Object,
});
const jobData = computed(() => {
  return props?.job;
});
const imageExists = ref(false);
const initials = ref("");

const toggleDocument = (document) => {
  if (showDocument.value.id == document.id) {
    return (showDocumentToggle.value = !showDocumentToggle.value);
  }
  showDocument.value = document;
  showDocumentToggle.value = true;
};
const closeDropdown = () => {
  showDocumentToggle.value = false;
};

const deleteJob = async (id) => {
  loading.value = true;

  try {
    const res = await jobsStore.handelDeleteJob(id);
    await jobsStore.handleMyJobs();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
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

watch(jobData, async () => {
  await updateImageExists();
});

async function updateImageExists() {
  const hasImage = props?.job?.company?.company_logo;
  if (hasImage) {
    const imageSrc = getImageSrc();
    imageExists.value = await checkImageExists(imageSrc);
    if (!imageExists.value) {
      setInitials(props?.job?.company?.business_name);
    }
  } else {
    imageExists.value = false;
    setInitials(jobData.value?.company?.business_name);
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
  return jobData.value?.company?.company_logo;
}

function handleImageError() {
  console.error("Image loading error");
  setInitials(jobData.value?.company?.business_name);
}

const displayImage = computed(() => imageExists.value);
</script>
<template>
  <PagePreLoader v-if="loading" />

  <div
    class="border-[#254035AB] border-[0.4px] bg-white relative rounded-[7.347px] lg:p-5 p-4 lg:px-6"
  >
    <div class="flex lg:flex-row flex-col gap-3 w-full relative">
      <div
        class="h-[40.508px] w-[40.508px] flex justify-center items-center rounded-full bg-brand"
      >
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
        <!-- <img
          v-if="props?.job?.company.logo !== null"
          class="h-[40.508px] w-[40.508px] rounded-full"
          :src="props?.job?.company.logo"
          alt=""
        />
        <img
          v-else
          class="h-[40.508px] w-[40.508px] rounded-full"
          src="@/assets/image/jobIcon.svg"
          alt=""
        /> -->
      </div>
      <div class="w-full flex flex-col gap-4 relative">
        <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-3">
          <div
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
              class="text-[13px] capitalize font-Satoshi500 flex flex-row items-center text-[#244034E5]"
            >
              <span v-html="numAbbr.formatCurrency(props?.job?.currency)"></span>
              <span>
                {{ store.abbr(props?.job?.salary_min) }}-
                {{ store.abbr(props?.job?.salary_max) }}/
                {{ props?.job?.salaray_type }}
              </span>
            </p>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-end">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-4"
            >
              <p>{{ props?.job?.date_created }}</p>
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-end">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-2"
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
                  'bg-[#E06F6F]': props?.job?.status == 'expired',
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
