<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useUserProfile } from "@/stores/profile";
import CirclePlus from "@/components/icons/circlePlus.vue";
import EditWorkExperience from "@/components/ui/genericComponents/EditWorkExperience.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { storeToRefs } from "pinia";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useSkillsStore } from "@/stores/skills";
import dayjs from "dayjs";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import { editorConfig } from "@/config/ckeditorConfig";
import { ClassicEditor } from 'ckeditor5'

const isLayoutReady = ref(false)
const editor = ClassicEditor

const dynamicPlaceholder = ref('Write about the job in details...');

const editorConfigs = computed(() => ({
  ...editorConfig,
  placeholder: dynamicPlaceholder.value,
}));

const skillsStore = useSkillsStore();
const { skills, jobTitle } = storeToRefs(skillsStore);

const userProfile = useUserProfile();
const formState = ref({
  id: "",
  company_name: "",
  title: "",
  employment_type: "",
  description: "",
  start_date: "",
  end_date: "",
});
const present = ref(false); // Add a variable to track if the checkbox is checked
const { employment_details } = storeToRefs(userProfile);
let loading = ref(false);
const employmentType = [
  "Freelance",
  "Full-time ",
  "Part-time ",
  "Internship ",
  "Contract ",
];

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
//
// this section contain functions to handle type and search dropdown for title input section on edit view
//
let skillTitles = ref([]);
let options = ref([]);

const showJobTitleDropdown = ref(false);
const highlightedJobTitleIndex = ref(-1);

const filteredOptionsJobTitle = computed(() => {
  const searchJobTitle = formState.value.title.toLowerCase();
  return skillTitles.value.filter((option) =>
    option.name.toLowerCase().includes(searchJobTitle)
  );
});
const selectJobTitleOptions = (option) => {
  formState.value.title = option.name;
  showJobTitleDropdown.value = false;
};

const filterJobTitleOptions = () => {
  showJobTitleDropdown.value = true;
  highlightedJobTitleIndex.value = -1;
};
const highlightNextJobTitle = () => {
  if (highlightedJobTitleIndex.value < filteredOptionsJobTitle.value.length - 1) {
    highlightedJobTitleIndex.value++;
  }
};
const highlightPreviousJobTitle = () => {
  if (highlightedJobTitleIndex.value > 0) {
    highlightedJobTitleIndex.value--;
  }
};
const selectHighlightedJobTitleOption = () => {
  if (highlightedJobTitleIndex.value >= 0) {
    selectJobTitleOptions(filteredOptionsJobTitle.value[highlightedJobTitleIndex.value]);
  }
};
//
// this section contain functions to handle type and search dropdown for title input section on  add view
//

const filteredOptionsJobTitleADD = computed(() => {
  const searchJobTitle = employment_details.value.title.toLowerCase();
  return skillTitles.value.filter((option) =>
    option.name.toLowerCase().includes(searchJobTitle)
  );
});
const selectJobTitleOptionsADD = (option) => {
  employment_details.value.title = option.name;
  showJobTitleDropdown.value = false;
};

const filterJobTitleOptionsADD = () => {
  showJobTitleDropdown.value = true;
  highlightedJobTitleIndex.value = -1;
};
const highlightNextJobTitleADD = () => {
  if (highlightedJobTitleIndex.value < filteredOptionsJobTitle.value.length - 1) {
    highlightedJobTitleIndex.value++;
  }
};
const highlightPreviousJobTitleADD = () => {
  if (highlightedJobTitleIndex.value > 0) {
    highlightedJobTitleIndex.value--;
  }
};
const selectHighlightedJobTitleOptionADD = () => {
  if (highlightedJobTitleIndex.value >= 0) {
    selectJobTitleOptionsADD(
      filteredOptionsJobTitle.value[highlightedJobTitleIndex.value]
    );
  }
};

const handleAddNew = () => {
  changeScreen(0, 2);
};
const updateEducationDetails = async () => {
  loading.value = true;
  let workDetailID = formState.value.id;
  let payload = {
    company_name: formState.value.company_name,
    title: formState.value.title,
    employment_type: formState.value.employment_type,
    description: formState.value.description,
    start_date: StartDate.value,
    end_date: EndDate.value,
    currently_working_here: formState.value.currently_working_here,
  };

  try {
    const res = await userProfile.handleUpdateEmploymentDetails(workDetailID, payload);
    await userProfile.userProfile();
    changeScreen(1, 0);
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const onFinish = async () => {
  loading.value = true;
  try {
    const res = await userProfile.handleAddWorkDetails();
    changeScreen(2, 0);
    await userProfile.userProfile();
    loading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const prefillDetails = (SingleObject) => {
  formState.value.id = SingleObject.id || "";
  formState.value.company_name = SingleObject.company_name || "";
  formState.value.title = SingleObject.title || "";
  formState.value.employment_type = SingleObject.employment_type || "";
  formState.value.description = SingleObject.description || "";
  formState.value.start_date = SingleObject.start_date || "";
  formState.value.end_date = SingleObject.end_date || "";
};

const currentlyWorkingingHere = computed(() => {
  return present.value ? "till date" : "no"; //
});

// Create computed properties to format and update StartDate and EndDate
const StartDate = computed(() => {
  return dayjs(formState.value.start_date).format("DD-MM-YYYY");
});

const EndDate = computed(() => {
  return present.value
    ? "11-11-1111"
    : dayjs(formState.value.end_date).format("DD-MM-YYYY");
});
// Update employment_details.value.end_date when EndDate changes
watch(EndDate, (newEndDate) => {
  employment_details.value.end_date = newEndDate;
});
// Update employment_details.value.start_date when StartDate changes
watch(StartDate, (newStartDate) => {
  employment_details.value.start_date = newStartDate;
});

// Define a watcher to react to changes in SingleObject
watch(SingleObject, (newSingleObject) => {
  prefillDetails(newSingleObject);
});
watch(currentlyWorkingingHere, (newcurrentlyWorkingingHere) => {
  employment_details.value.currently_working_here = newcurrentlyWorkingingHere;
});

onMounted(async () => {
  prefillDetails(SingleObject.value);
  await userProfile.userProfile();
  await skillsStore.getskills();
  await skillsStore.getJobTitles();
  options.value = skills.value.data;
  skillTitles.value = jobTitle.value.data;

  isLayoutReady.value = true
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

      <div class="overflow-y-auto hide-scrollbar h-[24vh]">
        <EditWorkExperience
          :items="userProfile?.user?.data?.employment"
          @openEdit="handleOpenEdit"
        />
      </div>
    </div>
    <!-- edit work experience view  -->
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
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
            <label class="text-[#01272C] text-[12px] font-Satoshi400">Title</label>
            <GlobalInput
              v-model="formState.title"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
              @input="filterJobTitleOptions"
              @keydown.down="highlightNextJobTitle"
              @keydown.up="highlightPreviousJobTitle"
              @keydown.enter="selectHighlightedJobTitleOption"
            />
            <ul
              v-if="showJobTitleDropdown"
              class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
            >
              <li
                v-for="(option, index) in filteredOptionsJobTitle"
                :key="option.id"
                @click="selectJobTitleOptions(option)"
                :class="{ highlighted: index === highlightedJobTitleIndex }"
                class="hover:bg-brand hover:text-white"
              >
                {{ option.name }}
              </li>
            </ul>
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400"
              >Employment type</label
            >
            <SelectGroup
              v-model="formState.employment_type"
              DropdownItem=""
              :items="employmentType"
              placeholder=""
              name=""
              class="bg-transparent bg-none border-none"
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
          <div class="flex flex-row rounded-[5.897px ] py-1.5">
            <div class="w-full flex flex-col justify-between">
              <label class="text-[#01272C] px-4 mb-2 text-[12px] font-Satoshi400"
                >Description</label
              >
              <ckeditor
                v-if="isLayoutReady"
                v-model="formState.description"
                :editor="editor"
                :config="editorConfigs"
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
          @click="updateEducationDetails()"
          class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
        >
          <span v-if="!loading">Save</span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
    <!-- add work experience view  -->

    <div v-if="step[2]">
      <div class="flex flex-row justify-between w-full gap-[21px]">
        <div
          class="flex-col flex gap-6 w-full max-h-[50vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
        >
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[10px] font-Satoshi400">Company name</label>
            <GlobalInput
              v-model="employment_details.company_name"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400">Title</label>
            <!-- <GlobalInput
              v-model="employment_details.title"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
            /> -->
            <GlobalInput
              v-model="employment_details.title"
              inputClasses="bg-transparent border-none !p-0"
              type="text"
              @input="filterJobTitleOptionsADD"
              @keydown.down="highlightNextJobTitleADD"
              @keydown.up="highlightPreviousJobTitleADD"
              @keydown.enter="selectHighlightedJobTitleOptionADD"
            />
            <ul
              v-if="showJobTitleDropdown"
              class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
            >
              <li
                v-for="(option, index) in filteredOptionsJobTitleADD"
                :key="option.id"
                @click="selectJobTitleOptionsADD(option)"
                :class="{ highlighted: index === highlightedJobTitleIndex }"
                class="hover:bg-brand hover:text-white"
              >
                {{ option.name }}
              </li>
            </ul>
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <label class="text-[#01272C] text-[12px] font-Satoshi400"
              >Employment type</label
            >
            <SelectGroup
              v-model="employment_details.employment_type"
              DropdownItem=""
              :items="employmentType"
              placeholder=""
              name=""
              class="bg-transparent bg-none border-none"
            />
          </div>
          <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1">
            <div class="w-full flex flex-col gap-1 justify-between">
              <label class="text-[#01272C] text-[12px] font-Satoshi400">Start Date</label>
              <a-date-picker
                v-model:value="formState.start_date"
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
                v-model:value="formState.end_date"
                :bordered="false"
                :placeholder="formState.end_date"
                :disabled="present"
                class="bg-transparent border-none !outline-none w-full !p-0 shadow-none"
              />
            </div>
          </div>
          <div class="flex flex-row rounded-[5.897px] py-1.5">
            <div class="w-full flex flex-col justify-between">
              <label class="text-[#01272C] px-4 mb-2 text-[12px] font-Satoshi400"
                >Description</label
              >
              <ckeditor
                v-if="isLayoutReady"
                v-model="employment_details.description"
                :editor="editor"
                :config="editorConfigs"
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
          @click="onFinish()"
          class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
        >
          <span v-if="!loading">Save</span>
          <WhiteLoader v-else />
        </button>
      </div>
    </div>
  </div>
</template>
