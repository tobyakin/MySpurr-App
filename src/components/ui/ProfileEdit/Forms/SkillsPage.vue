<script setup>
import { ref, onMounted, computed, onUpdated } from 'vue'
import { useUserProfile } from '@/stores/profile'
import GlobalInput from '@/components/ui/Form/Input/GlobalInput.vue'
import { useSkillsStore } from '@/stores/skills'
import { storeToRefs } from 'pinia'
import WhiteLoader from '@/components/ui/WhiteLoader.vue'

const skillsStore = useSkillsStore()
const { skills } = storeToRefs(skillsStore)
const userProfile = useUserProfile()
const { top_skills } = storeToRefs(userProfile)
let loading = ref(false)

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

const formState = ref({
  overview: ''
})
let options = ref([])
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
  return top_skills.value.length >= 5 ? '' : 'select your top skills Ex. Graphics Design'
})
const shouldDisplayInput = computed(() => {
  return top_skills.value.length < 5
})

const selectOption = (option) => {
  search.value = ''
  showDropdown.value = false
  highlightedIndex.value = -1
  top_skills.value.push(option)
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
  // Create an array of all IDs in options and top_skills
  const allIds = [
    ...options.value.map((option) => parseInt(option.id)),
    ...top_skills.value.map((option) => parseInt(option.id))
  ]

  const maxId = Math.max(...allIds)

  // If there are no skills in top_skills and options, start with ID 1
  if (isNaN(maxId)) {
    return '1'
  }

  // Find the next available ID that is not in options or top_skills
  for (let i = maxId + 1; i <= maxId + 100; i++) {
    if (!allIds.includes(i)) {
      return i.toString()
    }
  }

  // If no available ID is found, you can handle the error here.
  throw new Error('No available ID found.')
}

// const getNextId = () => {
//   const ids = options.value.map((option) => parseInt(option.id));
//   const maxId = Math.max(...ids);
//   return (maxId + 1).toString();
// };

const selectHighlightedOption = () => {
  if (highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value])
  } else if (search.value && !filteredOptions.value.length) {
    // If no options match the search term, add the typed item to the list
    const nextId = getNextId()

    selectOption({ id: nextId, name: search.value })
  }
}

const prefillDetails = () => {
  formState.value.overview = userProfile.user?.data?.overview || ''
  top_skills.value = userProfile.user?.data?.top_skills || []
}
const onFinish = async () => {
  loading.value = true
  try {
    const res = await userProfile.handleAddSkills()
    await userProfile.userProfile()
    closeModal()
    return res
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
onUpdated(async () => {
  await userProfile.userProfile()
})

onMounted(async () => {
  prefillDetails()
  await userProfile.userProfile()
  await skillsStore.getskills()
  options.value = skills.value.data
})
</script>
<template>
  <div>
    <div class="flex flex-row justify-between gap-[21px] w-full">
      <div class="border-[0.737px] border-[#254035AB] w-full rounded-[5.897px] p-4 py-1.5">
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
              v-model="search"
              @input="filterOptions"
              @keydown.down="highlightNext"
              @keydown.up="highlightPrevious"
              @keydown.enter="selectHighlightedOption"
              ref="searchInput"
              inputClasses="bg-transparent !border-none"
              placeholder="select your top skills"
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
    </div>
    <div class="w-full flex justify-center mt-8">
      <button
        @click="onFinish"
        class="btn-brand !border-none !w-[30%] mx-auto !py-3 lg:!px-10 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader class="my-1" v-if="loading" />
      </button>
    </div>
  </div>
</template>
