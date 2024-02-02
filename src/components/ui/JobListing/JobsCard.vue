<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import Dropdown from "@/components/ui/Dropdown/Dropdown.vue";
import DropdownEye from "@/components/icons/DropdownEye.vue";
import DropdownDeleteIcon from "@/components/icons/DropdownDeleteIcon.vue";
import DropdownEditIcon from "@/components/icons/DropdownEditIcon.vue";
import DropdownShareIcon from "@/components/icons/DropdownShareIcon.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showDocument = ref({});
const showDocumentToggle = ref(false);
const reason = ref("");

const redirectToJobDetails = (id) => {
  router.push({ name: "view-jobs", params: { id } });
};
defineProps({
  job: Object,
});
const toggleDocument = (document) => {
  if (showDocument.value.id == document.id) {
    return (showDocumentToggle.value = !showDocumentToggle.value);
  }
  showDocument.value = document;
  reason.value = document.reason;
  showDocumentToggle.value = true;
};
</script>
<template>
  <div
    class="border-[#254035AB] border-[0.4px] bg-white relative rounded-[7.347px] lg:p-5 p-4 lg:px-6"
  >
    <div class="flex lg:flex-row flex-col gap-3 w-full relative">
      <div>
        <img
          v-if="job.company.logo !== null"
          class="h-[40.508px] w-[40.508px] rounded-full"
          :src="job.company.logo"
          alt=""
        />
        <img
          v-else
          class="h-[40.508px] w-[40.508px] rounded-full"
          src="@/assets/image/jobIcon.svg"
          alt=""
        />
      </div>
      <div class="w-full flex flex-col gap-4 relative">
        <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-3">
          <div
            class="flex items-center w-full lg:w-auto lg:justify-normal justify-between gap-14"
          >
            <p class="text-[16.467px] capitalize font-Satoshi700 text-[#244034]">
              {{ job.job_title }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-5 justify-between mt-5">
          <div class="flex lg:flex-row flex-col gap-4 items-center">
            <div>
              <p class="text-[17.633px] font-Satoshi500 text-[#244034E5]">
                {{ job.salary_min }}-{{ job.salary_max }}
              </p>
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-center mt-2">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-4"
            >
              <p>.</p>
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-center mt-2">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-4"
            >
              <p>.</p>
            </div>
          </div>
          <div class="flex lg:flex-row flex-col gap-4 justify-center mt-2">
            <div
              class="flex lg:justify-normal lg:flex-row flex-col justify-between items-center gap-1"
            >
              <div
                class="h-[8px] w-[8px] rounded-full"
                :class="{
                  'bg-[#63D8E4]': job.status == 'pending',
                  'bg-[#84B358]': job.status == 'active',
                  'bg-[#E06F6F]': job.status == 'expired',
                }"
              ></div>
              <p class="capitalize font-Satoshi500 text-[17.239px] text-[#244034E5]">
                {{ job.status }}
              </p>
            </div>
          </div>
          <div class="text-right flex justify-end cursor-pointer relative pr-4">
            <svg
              class="cursor-pointer flex lg:flex-row flex-col gap-4 justify-end"
              @click="toggleDocument(job)"
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
            <Dropdown
              v-if="showDocument.id == job.id && showDocumentToggle"
              :showDropdown="showDocument.id == job.id && showDocumentToggle"
              :link="false"
              class="-bottom-[8rem] w-36 z-10 lg:-right-40"
              :items="items"
              :id="`dropdown` + job.id"
            >
              <ul class="!mb-0">
                <li>
                  <router-link
                    to="/"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownEye />
                    <p>View</p>
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownShareIcon />
                    <p>Share</p>
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownEditIcon />
                    <p>Edit</p>
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/"
                    class="text-left p-2 flex items-center px-[20px] gap-[12px] hover:bg-gray-100 w-full"
                  >
                    <DropdownDeleteIcon />
                    <p>Delete</p>
                  </router-link>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
