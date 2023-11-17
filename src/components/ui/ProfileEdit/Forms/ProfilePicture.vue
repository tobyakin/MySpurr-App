<script setup>
import UserAvater from '../../Avater/UserAvater.vue'
import { ref, onMounted, computed, watch, onUpdated, onBeforeMount } from 'vue'
import { useUserProfile } from '@/stores/profile'
import { storeToRefs } from 'pinia'
import WhiteLoader from '@/components/ui/WhiteLoader.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

const profileStore = useUserProfile()
const { profileImage } = storeToRefs(profileStore)

let loading = ref(false)
let cropper = ref(null)
let imageFile = ref(null)

const cropImage = () => {
  if (cropper.value) {
    const croppedCanvas = cropper.value.getCroppedCanvas()
    if (croppedCanvas) {
      const dataURL = croppedCanvas.toDataURL()
      profileImage.value = dataURL
    }
  }
}

const previewImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imageFile.value = reader.result
      if (cropper.value) {
        cropper.value.replace(reader.result)
      }
    }
    reader.readAsDataURL(file)
  } else {
    imageFile.value = ''
  }
}

const onFinish = async () => {
  loading.value = true
  try {
    cropImage()
    const res = await profileStore.handleUpdateProfilePhoto()
    await profileStore.userProfile()
    closeModal()
    return res
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
const userDetails = computed(() => {
  return profileStore.user.data.image
})

onMounted(() => {
  return profileStore.userProfile()
})
onUpdated(async () => {
  await profileStore.userProfile()
})

onMounted(async () => {
  await profileStore.userProfile()
})
watch(profileImage, () => {})
const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}
onBeforeMount(async () => {
  await profileStore.userProfile()
})
</script>
<template>
  <div class="flex flex-col justify-center items-center gap-[40px]">
    <UserAvater v-if="!imageFile" :imageUrl="profileImage ? profileImage : userDetails" />
    <div v-if="imageFile" class="content">
      <section
        class="cropper-area w-[60%] !h-[20%] flex-col flex gap-2 items-center mx-auto justify-center"
      >
        <div class="img-cropper">
          <vue-cropper :aspect-ratio="4 / 4" :src="imageFile" preview=".preview" ref="cropper" />
        </div>
      </section>
    </div>

    <div class="flex lg:flex-row flex-col w-[60%] lg:gap-[31px] gap-4">
      <input type="file" id="upload_image" hidden @change="previewImage" accept="image/*" />
      <label
        for="upload_image"
        role="button"
        class="btn-brand !border-none w-full !py-3 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="profileImage === '' && imageFile === null" class="text-[12.067px]"
          >Add photo</span
        >
        <span v-else class="text-[12.067px]">Change photo</span>
      </label>
      <button
        v-if="imageFile !== null"
        @click="onFinish"
        :disabled="imageFile === null"
        role="button"
        :class="imageFile === null ? '!bg-[#2f919c9e] cursor-not-allowed' : ''"
        class="btn-brand !border-none !w-full !py-3 !px-5 !text-[#FFFFFF] text-center !bg-[#2F929C]"
      >
        <span v-if="!loading" class="text-[12.067px]">Save</span>
        <WhiteLoader v-if="loading" />
      </button>
    </div>
    <p class="text-[14px] lg:w-[70%] text-center leading-[18.599px] text-[#011B1F] font-Satoshi400">
      On MySpurr, we require members to use their real identities, upload a square photo of
      yourself. Photos will be cropped automatically to a preferred circular size
    </p>
  </div>
</template>
