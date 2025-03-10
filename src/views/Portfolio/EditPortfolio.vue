<script setup>
import { ref, onUnmounted, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import "vue-slider-component/theme/antd.css";
// import SelectGroup from "@/components/ui/Form/Input/SelectGroup.vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
// import { useStore } from "@/stores/user";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import { useOnboardingStore } from "@/stores/onBoarding";
import { useUserProfile } from "@/stores/profile";
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import { useRouter, useRoute } from "vue-router";
import PagePreLoader from "@/components/ui/Loader/PagePreLoader.vue";
import FormGroup from "@/components/ui/Form/Input/FormGroup.vue";
import Label from "@/components/ui/Form/Input/Label.vue";
import { useSkillsStore } from "@/stores/skills";
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
const { skills } = storeToRefs(skillsStore);

const router = useRouter();
const route = useRoute();
const showPageLoader = ref(true);
const OnboardingStore = useOnboardingStore();
const { portfolio } = storeToRefs(OnboardingStore);
const userProfile = useUserProfile();
const { singlePortfolio } = storeToRefs(userProfile);
// const FormGroup = defineAsyncComponent(() =>
//   import("@/components/ui/Form/Input/FormGroup.vue")
// );
// const Label = defineAsyncComponent(() => import("@/components/ui/Form/Input/Label.vue"));
// let store = useStore();

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
const portfolioID = ref(route.params.id);
const SingleCertificateObject = computed(() => singlePortfolio.value?.data || []);

const search = ref("");
const showDropdown = ref(false);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return options.value.filter((option) => option.name.toLowerCase().includes(searchTerm));
});
const maxCharacters = 1000;

const characterCount = computed(() => portfolio.value.description.length);
const isDisabled = computed(() => characterCount.value >= maxCharacters);

const handleChange = () => {
  if (portfolio.value.description.length > maxCharacters) {
    portfolio.value.description = portfolio.value.description.substring(0, maxCharacters);
  }
};

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
    portfolio.value.tags.push(option.name);
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
const uploadedFeatureImageName = ref("");

const uploadImage = (event, index) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    uploadedImageName.value = file.name;

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSizeMB = 10; // Maximum allowed file size in MB
        const maxDimension = 1200; // Maximum width or height of the image

        let width = img.width;
        let height = img.height;

        // Check if image size exceeds the maximum allowed size
        let scaleFactor = 1;
        if (file.size / (1024 * 1024) > maxSizeMB) {
          scaleFactor = Math.min(maxDimension / width, maxDimension / height);
          width *= scaleFactor;
          height *= scaleFactor;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to base64 data URL with reduced quality
        const reducedQualityDataURL = canvas.toDataURL("image/jpeg", 0.4); // Adjust quality as needed

        // Assign reduced quality image to portfolio.cover_image
        portfolio.value.project_image[index].image = reducedQualityDataURL;
        portfolio.value.project_name[index].name = file.name;
      };
    };
    reader.readAsDataURL(file);
  } else {
    portfolio.value.project_image[index].image = null;
    portfolio.value.project_name[index].name = null;
  }
};
const uploadFeatureImage = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    uploadedFeatureImageName.value = file.name;

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSizeMB = 10; // Maximum allowed file size in MB
        const maxDimension = 1200; // Maximum width or height of the image

        let width = img.width;
        let height = img.height;

        // Check if image size exceeds the maximum allowed size
        let scaleFactor = 1;
        if (file.size / (1024 * 1024) > maxSizeMB) {
          scaleFactor = Math.min(maxDimension / width, maxDimension / height);
          width *= scaleFactor;
          height *= scaleFactor;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to base64 data URL with reduced quality
        const reducedQualityDataURL = canvas.toDataURL("image/jpeg", 0.4); // Adjust quality as needed

        // Assign reduced quality image to portfolio.cover_image
        portfolio.value.featured_image = reducedQualityDataURL;
      };
    };
    reader.readAsDataURL(file);
  } else {
    portfolio.value.featured_image = "";
  }
};
const removeImage = (index) => {
  portfolio.value.project_image[index].image = null;
  portfolio.value.project_name[index].name = null;
  // uploadedImageName.value = "";
};
const removeFeatureImage = () => {
  portfolio.value.featured_image = null;
  uploadedFeatureImageName.value = "";
};
const restForm = () => {
  (portfolio.value.title = ""),
    (portfolio.value.category_id = ""),
    (portfolio.value.description = ""),
    (portfolio.value.tags = []),
    (portfolio.value.project_image = Array.from({ length: 4 }, () => ({
      name: null,
      image: null,
    }))),
    (portfolio.value.link = ""),
    (portfolio.value.featured_image = "");
};
let deleteLoading = ref(false);
const handleDelete = async () => {
  deleteLoading.value = true;
  try {
    const res = await userProfile.handleDeleteEducation(portfolioID.value);
    if (res.status === "true") {
      userProfile.userProfile();
      router.push({ name: "profile" });
    }
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    deleteLoading.value = false;
    restForm();
  }
};
const onFinish = async () => {
  loading.value = true;
  // let featuredImage = null;
  // let ProductImage = null;
  // // Check if the cover image is the same as the pre-filled one
  // if (portfolio.value.featured_image === SingleCertificateObject.value.featured_image) {
  //   portfolio.value.featured_image = null; // Return null if cover image is the same
  // } else {
  //   featuredImage = portfolio.value.featured_image;
  // }
  // if (portfolio.value.project_image === SingleCertificateObject.value.project_image) {
  //   portfolio.value.featured_image = Array.from({ length: 4 }, () => ({ image: null })); // Return empty string if cover image is the same
  // } else {
  //   ProductImage = portfolio.value.project_image;
  // }

  // let payload = {
  //   title: portfolio.value.title,
  //   description: portfolio.value.description,
  //   category_id: portfolio.value.category_id,
  //   project_image: ProductImage,
  //   tags: portfolio.value.tags,
  //   featured_image: featuredImage,
  //   link: portfolio.value.link,
  //   is_draft: "false",
  // };
  loading.value = true;
  let featuredImage = null;
  let ProductImage = null;

  // Check if the featured_image is in base64 format
  if (
    portfolio.value.featured_image &&
    portfolio.value.featured_image.startsWith("data:image")
  ) {
    featuredImage = portfolio.value.featured_image;
  }

  // Check if the project_image contains images in base64 format
  ProductImage = portfolio.value.project_image.map((image) => {
    if (
      image.image &&
      image.image.startsWith("data:image") &&
      !image.name.startsWith("http")
    ) {
      return { ...image };
    } else {
      return { image: null, name: null };
    }
  });

  let payload = {
    title: portfolio.value.title,
    description: portfolio.value.description,
    category_id: portfolio.value.category_id,
    tags: portfolio.value.tags,
    link: portfolio.value.link,
    is_draft: "false",
  };

  // Include project_image in payload if it contains images in base64 format
  if (ProductImage.some((image) => image.image !== null) && !featuredImage) {
    payload.project_image = ProductImage.filter((image) => image.image !== null);
  }

  // Include featured_image in payload if it's in base64 format
  if (featuredImage && !ProductImage.some((image) => image.image !== null)) {
    payload.featured_image = featuredImage;
  }

  try {
    const res = await userProfile.handleUpdatePortfolio(portfolioID.value, payload);
    if (res.status === "true") {
      userProfile.userProfile();
      router.push({ name: "profile" });
    }
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    (portfolio.value.title = ""),
      (portfolio.value.description = ""),
      (portfolio.value.category_id = ""),
      (portfolio.value.tags = []),
      (portfolio.value.project_image = Array.from({ length: 4 }, () => ({
        image: null,
      }))),
      (portfolio.value.featured_image = null),
      (portfolio.value.link = "");
  }
};

const prefillDetails = (SingleObject) => {
  portfolio.value.title = SingleObject.title || "";
  portfolio.value.description = SingleObject.description || "";
  portfolio.value.category_id = SingleObject.category_id || "";
  portfolio.value.tags = SingleObject.tags || [];
  portfolio.value.project_image = SingleObject.project_image || "";
  portfolio.value.featured_image = SingleObject.featured_image || "";
  portfolio.value.link = SingleObject.link || "";
};
watch(SingleCertificateObject, (newSingleObject) => {
  prefillDetails(newSingleObject);
});

onMounted(async () => {
  try {
    prefillDetails(SingleCertificateObject.value);
    await userProfile.userProfile();
    await userProfile.handleGetSinglePortfolio(route.params.id);
    await skillsStore.getskills();
  } catch (error) {
    /* empty */
  } finally {
    showPageLoader.value = !showPageLoader.value;
  }

  isLayoutReady.value = true
});
onUnmounted(() => {
  restForm();
});
</script>

<template>
  <DashboardLayout>
    <PagePreLoader v-if="showPageLoader" />
    <div v-else class="container lg:py-3 py-4 mb-20">
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[20px]">
        Project details
      </h4>
      <div class="mt-8 flex flex-col gap-[49px]">
        <div class="flex lg:flex-row flex-col w-full gap-8">
          <FormGroup
            v-model="portfolio.title"
            labelClasses="font-Satoshi500 !text-[17.792px]"
            label="Title"
            name="Name"
            placeholder="Vino brand identity"
            type="text"
            inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 !py-2.5 !border-[#254035AB] border-[0.509px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
          ></FormGroup>
          <div class="flex flex-col w-full text-left">
            <Label class="font-Satoshi500 !text-[17.792px] mb-2.5">Category</Label>
            <a-select
              placeholder=""
              :show-arrow="true"
              :bordered="true"
              class="w-full !outline-none !px-1"
              show-search
              v-model:value="portfolio.category_id"
            >
              <a-select-option
                v-for="item in skills?.data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[44.05px]">
        Describe your project (1000 words)
      </h4>
      <div class="mt-8 flex flex-col">
        <ckeditor
          v-if="isLayoutReady"
          v-model="portfolio.description"
          :editor="editor"
          :config="editorConfigs"
        />
        <div>{{ characterCount }} / {{ maxCharacters }}</div>
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[28.468px] mt-[44.05px]">
        Upload up to 4 project images
      </h4>
      <div class="mt-8 flex flex-col gap-8">
        <Label class="font-Satoshi500 text-[15.606px]">File Attachment*</Label>
        <div
          v-for="(image, index) in portfolio.project_image"
          :key="index"
          class="flex flex-col gap-4"
        >
          <div
            v-if="image.image"
            class="w-full bg-[#EDF2F7] flex flex-row items-center justify-between rounded-[5.897px] py-[20px] px-[28px] text-[#000000] text-[16.606px] font-Satoshi400"
          >
            <div v-for="(name, nameIndex) in portfolio.project_name" :key="nameIndex">
              <template v-if="nameIndex === index">
                <p v-html="name.name"></p>
              </template>
            </div>
            <button
              @click="removeImage(index)"
              class="origin-center rotate-45 text-[28.468px] font-Satoshi400 text-[#3F634D]"
            >
              +
            </button>
          </div>
          <img
            v-if="image.image"
            :src="image.image"
            alt="Uploaded Image"
            class="rounded-[5.897px] object-cover h-[300px] w-full"
          />

          <div v-if="!image.image" class="flex lg:flex-row flex-col gap-2 items-center">
            <input
              :id="'cover_image_' + index"
              hidden
              type="file"
              accept=".jpg,.png,.svg"
              @change="uploadImage($event, index)"
            />
            <label
              :for="'cover_image_' + index"
              class="bg-[#3F634D33] px-8 p-3 cursor-pointer rounded-[8.303px] text-[17.792px] text-[#3F634D] font-Satoshi500"
              ><span> + Upload File</span></label
            >
            <p class="text-[#00000080] font-Satoshi400 text-[16.606px]">
              Upload file .jpeg, .png, .svg
            </p>
          </div>
        </div>
      </div>
      <h4 class="text-[#2B7551] font-Satoshi500 text-[28.468px] mt-[64.05px]">
        Upload featured image
      </h4>
      <div class="mt-8 flex flex-col gap-8">
        <Label class="font-Satoshi500 text-[15.606px]">File Attachment*</Label>
        <div class="flex flex-col gap-4" f>
          <div
            v-if="portfolio.featured_image"
            class="w-full bg-[#EDF2F7] flex flex-row items-center justify-between rounded-[5.897px] py-[20px] px-[28px] text-[#000000] text-[16.606px] font-Satoshi400"
          >
            <p>{{ uploadedFeatureImageName }}</p>
            <button
              @click="removeFeatureImage"
              class="origin-center rotate-45 text-[28.468px] font-Satoshi400 text-[#3F634D]"
            >
              +
            </button>
          </div>
          <img
            v-if="portfolio.featured_image"
            :src="portfolio?.featured_image"
            alt="Uploaded Image"
            class="rounded-[5.897px] object-cover h-[300px] w-full"
          />

          <div
            v-if="!portfolio.featured_image"
            class="flex lg:flex-row flex-col gap-2 items-center"
          >
            <input
              id="featured_image"
              hidden
              type="file"
              accept=".jpg,.png,.svg"
              @change="uploadFeatureImage"
            />
            <label
              for="featured_image"
              class="bg-[#3F634D33] px-8 p-3 cursor-pointer rounded-[8.303px] text-[17.792px] text-[#3F634D] font-Satoshi500"
              ><span> + Upload File</span></label
            >
            <p class="text-[#00000080] font-Satoshi400 text-[16.606px]">
              Upload file .jpeg, .png, .svg
            </p>
          </div>
        </div>
      </div>

      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">Tags</h4>
      <div class="mt-8 flex flex-col gap-8">
        <div class="border-[0.737px] border-[#254035AB] rounded-[5.897px] p-4 py-1.5">
          <div>
            <p class="text-[#00000080] p-2 text-[18.979px] font-Satoshi400">
              Add up 4 Tags
            </p>
            <div class="selected-items p-2 gap-2">
              <div
                v-for="(selectedItem, index) in portfolio.tags"
                :key="selectedItem"
                class="selected-item bg-[#31795A1A] text-sm font-Satoshi400 gap-2 px-4 p-[5px] text-[#0000008A] !rounded-full"
              >
                {{ selectedItem }}
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
      <!-- <h4 class="text-[#2B7551] font-Satoshi500 text-[28.468px] mt-[64.05px]">
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
      </div> -->
      <h4 class="text-[#2B7551] font-Satoshi500 text-[33.212px] mt-[64.05px]">
        Share a Link to full project
      </h4>

      <div class="w-full mt-8 flex flex-col gap-8">
        <FormGroup
          v-model="portfolio.link"
          labelClasses="font-Satoshi500 text-[15.606px]"
          label=""
          placeholder=""
          type="text"
          inputClasses="w-full mt-2 font-light font-Satoshi400 !p-3 !border-[#254035AB] !border-[0.909px] opacity-[0.8029] rounded-[5.897px] text-[12.68px]"
        ></FormGroup>
      </div>
      <div class="flex gap-4 justify-start mt-12">
        <button
          @click="handleDelete"
          class="bg-[#2F929C] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] text-white rounded-full px-8 p-4 w-auto"
        >
          <span v-if="!deleteLoading" class="text-[12.067px]">Delete</span>
          <WhiteLoader v-if="deleteLoading" />
        </button>
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
