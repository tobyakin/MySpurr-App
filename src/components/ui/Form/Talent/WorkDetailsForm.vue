<script setup>
import { ref, onMounted, watch, computed, defineAsyncComponent, reactive } from 'vue'
import { useOnboardingStore } from '@/stores/onBoarding'
// import { useStore } from "@/stores/user";
import { useSkillsStore } from '@/stores/skills'
import GlobalInput from '@/components/ui/Form/Input/GlobalInput.vue'
import { storeToRefs } from 'pinia'
import Multiselect from 'vue-multiselect'
const skillsStore = useSkillsStore()
const { skills, jobTitle } = storeToRefs(skillsStore)

const OnboardingStore = useOnboardingStore()
const SelectGroup = defineAsyncComponent(() => import('@/components/ui/Form/Input/SelectGroup.vue'))

const {
  step,
  skill_title,
  highest_education,
  overview,
  location,
  rate,
  availability,
  top_skills,
  employment_type
} = storeToRefs(OnboardingStore)
// let store = useStore();
//
// let loading = ref(false);
const availabilityData = ['Immediately', 'One week']
const employmentType = ['Freelance', 'Full-time ', 'Part-time ', 'Internship ', 'Contract ']
let options = ref([])
let skillTitles = ref([])

const educationLevel = ['Certificate', 'Bachelors', 'Masters ', 'Doctorate ']

// const addTag = (newTagName) => {
//   const tag = {
//     name: newTagName,
//   };
//   options.value.push(tag);
//   top_skills.value.push(tag);
// };

// const years = ref([]);

// onMounted(() => {
//   // Populate the years array with a range of years, e.g., from 2000 to the current year.
//   const currentYear = new Date().getFullYear();
//   for (let year = currentYear; year >= 1950; year--) {
//     years.value.push(year.toString());
//   }
//   console.log("options", skills.value.data);
// });

const emit = defineEmits('next')
const isFormValid = computed(() => {
  return (
    // skill_title.value.trim() !== "" &&
    top_skills.value.length >= 0 && // Check if top_skills is not empty
    highest_education.value.trim() !== '' &&
    overview.value.trim() !== '' &&
    location.value.trim() !== '' &&
    rate.value.trim() !== '' &&
    employment_type.value.trim() !== '' &&
    availability.value.trim() !== ''
  )
})

const next = () => {
  emit('next', step.value + 1)
}
onMounted(async () => {
  await skillsStore.getskills()
  await skillsStore.getJobTitles()
  options.value = skills.value.data
  skillTitles.value = jobTitle.value.data
})

const showJobTitleDropdown = ref(false)
const highlightedJobTitleIndex = ref(-1)

const filteredOptionsJobTitle = computed(() => {
  const searchJobTitle = skill_title.value.toLowerCase()
  return skillTitles.value.filter((option) => option.name.toLowerCase().includes(searchJobTitle))
})

const filterJobTitleOptions = () => {
  showJobTitleDropdown.value = true
  highlightedJobTitleIndex.value = -1
}

const selectJobTitleOptions = (option) => {
  skill_title.value = option.name
  showJobTitleDropdown.value = false
}

const highlightNextJobTitle = () => {
  if (highlightedJobTitleIndex.value < filteredOptionsJobTitle.value.length - 1) {
    highlightedJobTitleIndex.value++
  }
}

const highlightPreviousJobTitle = () => {
  if (highlightedJobTitleIndex.value > 0) {
    highlightedJobTitleIndex.value--
  }
}

const selectHighlightedJobTitleOption = () => {
  if (highlightedJobTitleIndex.value >= 0) {
    selectJobTitleOptions(filteredOptionsJobTitle.value[highlightedJobTitleIndex.value])
  }
}
// multi select
const search = ref('')
const showDropdown = ref(false)
const highlightedIndex = ref(-1)

const filteredOptions = computed(() => {
  const searchTerm = search.value.toLowerCase()
  return options.value.filter((option) => option.name.toLowerCase().includes(searchTerm))
})

const filterOptions = () => {
  showDropdown.value = true
  highlightedIndex.value = -1
}
const placeholderText = computed(() => {
  return top_skills.value.length >= 3 ? '' : 'select your top skills Ex. Graphics Design'
})
const shouldDisplayInput = computed(() => {
  return top_skills.value.length < 3
})

const selectOption = (option) => {
  if (top_skills.value.length < 3) {
    search.value = ''
    showDropdown.value = false
    highlightedIndex.value = -1
    top_skills.value.push(option)
  }
}

const removeSelectedItem = (index) => {
  top_skills.value.splice(index, 1)
}

const highlightNext = () => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++
  }
}

const highlightPrevious = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  }
}
const getNextId = () => {
  const ids = options.value.map((option) => parseInt(option.id))
  const maxId = Math.max(...ids)
  return (maxId + 1).toString()
}

const selectHighlightedOption = () => {
  if (highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value])
  } else if (search.value && !filteredOptions.value.length) {
    // If no options match the search term, add the typed item to the list
    const nextId = getNextId()

    selectOption({ id: nextId, name: search.value })
  }
}
</script>

<template>
  <div class="lg:w-[40%] animate__animated animate__fadeIn">
    <div class="w-auto">
      <h1 class="md:text-[36px] text-[#011B1F] font-EBGaramond500 text-2xl font-bold">
        Your work details
      </h1>
      <p class="text-[16px] text-[#011B1F] leading-[23.734px] font-Satoshi400 !my-4 md:!mb-8">
        Please provide details to your most recent work detail. You will have a chance to add to
        this when your onboarding as been completed
      </p>
      <div
        class="flex-col flex gap-6 max-h-[60vh] overflow-y-auto pb-12 hide-scrollbar overflow-hidden"
      >
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Skill title</label>
          <div class="relative">
            <GlobalInput
              v-model="skill_title"
              @input="filterJobTitleOptions"
              @keydown.down="highlightNextJobTitle"
              @keydown.up="highlightPreviousJobTitle"
              @keydown.enter="selectHighlightedJobTitleOption"
              ref="searchInput"
              inputClasses="bg-transparent !border-none"
              placeholder="Graphics Designer"
              type=""
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

          <!-- <multiselect
            v-model="skill_title"
            :options="skillTitles"
            placeholder="Ex. Graphics Designer"
            @tag="addTag"
            :searchable="true"
            :close-on-select="false"
            :show-labels="false"
          >
          </multiselect> -->
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-3.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Overview</label>
          <textarea
            v-model="overview"
            rows="4"
            class="bg-transparent font-Satoshi400 w-full outline-none text-sm border-0 p-2 py-1.5"
            placeholder="Give a brief description about yourself"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Location</label>
          <GlobalInput
            v-model="location"
            inputClasses="bg-transparent border-none"
            placeholder=""
            type="text"
          />
        </div>

        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >Select your top 3 skills</label
          >
          <!-- <multiselect
            v-model="top_skills"
            :options="options"
            :multiple="true"
            :taggable="true"
            :max="5"
            placeholder=""
            track-by="name"
            label="name"
            @tag="addTag"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
          >
          </multiselect> -->
          <div>
            <div class="selected-items p-2 gap-2">
              <div
                v-for="(selectedItem, index) in top_skills"
                :key="selectedItem.id"
                class="selected-item bg-brand text-sm font-Satoshi400 p-[5px] text-white rounded-[5px]"
              >
                {{ selectedItem.name }}
                <span
                  @click="removeSelectedItem(index)"
                  class="remove-btn text-black hover:text-white"
                  >x</span
                >
              </div>
            </div>
            <div>
              <GlobalInput
                v-if="shouldDisplayInput"
                v-model="search"
                @input="filterOptions"
                @keydown.down="highlightNext"
                @keydown.up="highlightPrevious"
                @keydown.enter="selectHighlightedOption"
                ref="searchInput"
                inputClasses="bg-transparent !border-none"
                :placeholder="placeholderText"
                type="text"
              />

              <!-- <input
              v-model="search"
              @input="filterOptions"
              @keydown.down="highlightNext"
              @keydown.up="highlightPrevious"
              @keydown.enter="selectHighlightedOption"
              ref="searchInput"
              placeholder="Type to add or select..."
            /> -->
              <ul
                v-if="showDropdown"
                class="dropdown max-h-[20vh] overflow-y-auto pb-12 hide-scrollbar text-[12px] border-t font-Satoshi400 overflow-hidden"
              >
                <li
                  v-for="(option, index) in filteredOptions"
                  :key="option.id"
                  @click="selectOption(option)"
                  :class="{ highlighted: index === highlightedIndex }"
                  class="hover:bg-brand hover:text-white"
                >
                  {{ option.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400"
            >What is your highest level of education?</label
          >
          <SelectGroup
            v-model="highest_education"
            DropdownItem="level of education"
            placeholder=""
            :items="educationLevel"
            name=""
            class="w-full flex border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Employment type </label>
          <SelectGroup
            v-model="employment_type"
            DropdownItem=""
            :items="employmentType"
            placeholder="Employment type"
            name=""
            class="bg-transparent border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Availability </label>
          <SelectGroup
            v-model="availability"
            DropdownItem=""
            :items="availabilityData"
            placeholder="Availability"
            name=""
            class="bg-transparent border-none"
          />
        </div>
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <label class="text-[#01272C] px-2 text-[12px] font-Satoshi400">Rate /hr ($)</label>
          <GlobalInput
            v-model="rate"
            inputClasses="bg-transparent border-none"
            placeholder="$100"
            type="number"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-5 pb-8 mt-5">
      <button
        @click="next"
        :disabled="!isFormValid"
        :class="!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#43D0DF]'"
        class="font-Satoshi500 text-white text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
      >
        Next
      </button>
    </div>
  </div>
</template>
<style>
.multiselect {
  @apply font-Satoshi400;
}
.multiselect__tag {
  @apply !bg-brand text-sm font-Satoshi400;
}
.multiselect__tags-wrap {
  @apply w-full;
}
.multiselect__tags {
  @apply border-none p-2 pr-0;
}
.multiselect__select {
  @apply !p-3 !py-3 !w-0;
}
.multiselect__option:hover {
  @apply !bg-brand;
}
.multiselect__option:active {
  @apply !bg-brand;
}
.multiselect__option--highlight {
  @apply !bg-brand;
}
.selected-items {
  display: flex;
  flex-wrap: wrap;
}

.selected-item {
  border-radius: 3px;
  display: flex;
  align-items: center;
}

.remove-btn {
  cursor: pointer;
  margin-left: 5px;
}

.dropdown {
  list-style: none;
  padding: 0;
  margin: 0;
}
.drop_down_section {
  position: absolute;
  top: 70px;
  transform-origin: center top;
  z-index: 2003;
  padding: 12px;
  overflow: auto;
}
.dropdown li {
  padding: 10px;
  cursor: pointer;
}

.dropdown li.highlighted {
  background-color: #f0f0f0;
}
</style>
