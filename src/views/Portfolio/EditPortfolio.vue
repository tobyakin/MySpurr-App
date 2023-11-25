<script setup>
import { defineAsyncComponent, ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import "vue-slider-component/theme/antd.css";
import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useUserProfile } from "@/stores/profile";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const OnboardingStore = useOnboardingStore();
const { portfolio } = storeToRefs(OnboardingStore);

const userProfile = useUserProfile();

const FormGroup = defineAsyncComponent(() =>
  import("@/components/ui/Form/Input/FormGroup.vue")
);
const Label = defineAsyncComponent(() => import("@/components/ui/Form/Input/Label.vue"));
let store = useStore();

// add tag
let options = ref([
  { name: "Design" },
  { name: "UI" },
  { name: "Digital" },
  { name: "Graphics" },
  { name: "Developer" },
  { name: "Product" },
  { name: "Microsoft" },
  { name: "Brand" },
  { name: "Photoshop" },
  { name: "Business" },
  { name: "IT & Technology" },
  { name: "Branding" },
  { name: "Finance" },
]);
let loading = ref(false);
const SingleCertificateObject = ref({});
const portfolioID = ref(route.params.id);

const search = ref("");
const showDropdown = ref(false);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return options.value.filter((option) => option.name.toLowerCase().includes(searchTerm));
});

const filterOptions = () => {
  showDropdown.value = true;
  highlightedIndex.value = -1;
};
const placeholderText = computed(() => {
  return portfolio.value.tags.length >= 5 ? "" : "Type or select tags";
});
const shouldDisplayInput = computed(() => {
  return portfolio.value.tags.length < 5;
});

const selectOption = (option) => {
  if (portfolio.value.tags.length < 5) {
    search.value = "";
    showDropdown.value = false;
    highlightedIndex.value = -1;
    portfolio.value.tags.push(option);
  }
};

const removeSelectedItem = (index) => {
  portfolio.value.tags.splice(index, 1);
};

const highlightNext = () => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
  }
};

const highlightPrevious = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
};
const getNextId = () => {
  const ids = options.value.map((option) => parseInt(option.id));
  const maxId = Math.max(...ids);
  return (maxId + 1).toString();
};

const selectHighlightedOption = () => {
  if (highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value]);
  } else if (search.value && !filteredOptions.value.length) {
    // If no options match the search term, add the typed item to the list
    const nextId = getNextId();

    selectOption({ id: nextId, name: search.value });
  }
};
// end tag ends here
// upload image
const uploadedImageName = ref("");

const uploadImage = (event) => {
  const file = event.target.files[0];
  // if (file) {
  //   const imageUrl = URL.createObjectURL(file);
  //   portfolio.value.cover_image = file;
  //   uploadedImageName.value = file.name;
  // }
  if (file) {
    const reader = new FileReader();
    uploadedImageName.value = file.name;

    reader.onload = () => {
      portfolio.value.cover_image = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    portfolio.value.cover_image = "";
  }
};

const removeImage = () => {
  portfolio.value.cover_image = null;
  uploadedImageName.value = "";
};
const onFinish = async () => {
  loading.value = true;
  // let portfolioID = route.params.id;
  let payload = {
    title: portfolio.value.title,
    client_name: portfolio.value.client_name,
    job_type: portfolio.value.job_type,
    location: portfolio.value.location,
    rate: portfolio.value.rate,
    tags: portfolio.value.tags,
    cover_image: portfolio.value.cover_image,
    body: portfolio.value.body,
  };
  try {
    const res = await userProfile.handleUpdatePortfolio(portfolioID.value, payload);
    userProfile.userProfile();
    // router.push({ name: "profile" });
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    (portfolio.value.title = ""),
      (portfolio.value.client_name = ""),
      (portfolio.value.job_type = ""),
      (portfolio.value.location = ""),
      (portfolio.value.rate = ""),
      (portfolio.value.tags = []),
      (portfolio.value.cover_imag = null),
      (portfolio.value.body = ""),
      (portfolio.value.max = ""),
      (portfolio.value.min = "");

    router.push({ name: "profile" });
  }
};

const formState = ref({
  id: 3,
  title: "",
  client_name: "",
  job_type: "Full Time",
  location: "dfgh",
  rate: "45-66",
  tags: [{ name: "Photoshop" }],
  cover_image: "",
  body: "",
});
const prefillDetails = (SingleObject) => {
  portfolio.value.title = SingleObject.title || "";
  portfolio.value.client_name = SingleObject.client_name || "";
  portfolio.value.job_type = SingleObject.job_type || "";
  portfolio.value.location = SingleObject.location || "";
  portfolio.value.rate = SingleObject.rate || "";
  portfolio.value.cover_image = SingleObject.cover_image || null;
  portfolio.value.tags = SingleObject.tags || "";
  portfolio.value.body = SingleObject.body || "";
};
watch(SingleCertificateObject, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

// let IIindex = ref(route.params.id - 1);
onMounted(async () => {
  prefillDetails(SingleCertificateObject.value);
  SingleCertificateObject.value =
    userProfile?.user?.data?.portfolio[portfolioID.value - 1];
  await userProfile.userProfile();
});
</script>

<template>
  <DashboardLayout>
    <div class="container lg:py-3 py-4 mb-20">
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[20px]">
        Project details
      </h4>
      <div class="mt-8 flex flex-col gap-[49px]">
        <FormGroup
          v-model="portfolio.title"
          labelClasses="font-Satoshi500 !text-[17.792px]"
          label="Title"
          name="Name"
          placeholder="Vino brand identity"
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
        ></FormGroup>
        <div class="flex lg:flex-row flex-col w-full gap-8">
          <SelectGroup
            v-model="portfolio.client_name"
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Creative work"
            name="Name"
            :items="['Brand Identity Design ', 'Logo Design', 'Graphic Design']"
            placeholder="Creative work"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
          <SelectGroup
            v-model="portfolio.job_type"
            labelClasses="font-Satoshi500 text-[15.606px]"
            label="Employment type"
            name="Name"
            :items="['Freelance', 'Full Time', 'Part Time']"
            placeholder="Employment type"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-2 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
          ></SelectGroup>
        </div>
        <div class="flex lg:flex-row flex-col w-full gap-8">
          <div class="lg:w-[50%]">
            <FormGroup
              v-model="portfolio.location"
              labelClasses="font-Satoshi500 text-[15.606px]"
              label="Location"
              placeholder="Lagos, Nigeria"
              type="text"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
          </div>
          <div class="lg:w-[50%] flex flex-row gap-9">
            <FormGroup
              v-model="portfolio.min"
              labelClasses=" "
              label="Rate (Optional)"
              name="Min"
              placeholder="Min"
              type="number"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-[10px] border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
            <FormGroup
              v-model="portfolio.max"
              labelClasses=" invisible"
              label="Max "
              name="Max"
              placeholder="Max"
              type="number"
              inputClasses="w-full mt-2 font-light font-Satoshi400 !p-[10px] border-[#EDEDED] border-[0.509px] opacity-[0.8029] rounded-[9.489px] text-[12.68px]"
            ></FormGroup>
          </div>
        </div>
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
        Start building your project
      </h4>
      <div class="mt-8 flex flex-col h-[58vh]">
        <QuillEditor
          v-model:content="portfolio.body"
          class=""
          theme="snow"
          toolbar="full"
          placeholder="Write about the job in details..."
          contentType="html"
        />
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">Tags</h4>
      <div class="mt-8 flex flex-col gap-8">
        <div class="border-[0.737px] border-[#254035AB] rounded-[9.489px] p-4 py-1.5">
          <div>
            <p class="text-[#00000080] p-2 text-[18.979px] font-Satoshi400">
              Add up 4 Tags
            </p>
            <div class="selected-items p-2 gap-2">
              <div
                v-for="(selectedItem, index) in portfolio.tags"
                :key="selectedItem.id"
                class="selected-item bg-[#31795A1A] text-sm font-Satoshi400 gap-2 px-4 p-[5px] text-[#0000008A] !rounded-full"
              >
                {{ selectedItem.name }}
                <span
                  @click="removeSelectedItem(index)"
                  class="remove-btn text-black hover:text-red-500"
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
      <h4 class="text-[#2B7551] font-Satoshi500 text-[28.468px] mt-[64.05px]">
        Featured image
      </h4>
      <div class="mt-8 flex flex-col gap-8">
        <Label class="font-Satoshi500 text-[15.606px]">File Attachment*</Label>
        <div class="flex flex-col gap-4" f>
          <div
            v-if="portfolio.cover_image"
            class="w-full bg-[#EDF2F7] flex flex-row items-center justify-between rounded-[5.897px] py-[20px] px-[28px] text-[#000000] text-[16.606px] font-Satoshi400"
          >
            <p>{{ uploadedImageName }}</p>
            <button
              @click="removeImage"
              class="origin-center rotate-45 text-[28.468px] font-Satoshi400 text-[#3F634D]"
            >
              +
            </button>
          </div>
          <img
            v-if="portfolio.cover_image"
            :src="portfolio?.cover_image"
            alt="Uploaded Image"
            class="rounded-[5.897px]"
          />

          <div class="flex lg:flex-row flex-col gap-2 items-center">
            <input id="cover_image" hidden type="file" @change="uploadImage" />
            <label
              for="cover_image"
              class="bg-[#3F634D33] px-8 p-3 cursor-pointer rounded-[8.303px] text-[17.792px] text-[#3F634D] font-Satoshi500"
              ><span>Upload File</span></label
            >
            <p class="text-[#00000080] font-Satoshi400 text-[16.606px]">
              Upload file .jpeg, .png, .svg
            </p>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-center mt-12">
        <button
          @click="onFinish"
          class="bg-[#2F929C] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] text-white rounded-full px-8 p-4 w-auto"
        >
          <span v-if="!loading" class="text-[12.067px]">Save</span>
          <WhiteLoader v-if="loading" />
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>
<style>
.ql-toolbar {
  @apply rounded-t-[5.897px];
}
.ql-container {
  @apply rounded-b-[5.897px];
}
/* .ql-editor {
  @apply min-h-[58.122px];
} */
</style>
