<template>
  <div class="border-[#2440341A] rounded-[13.799px] border-[1.794px] relative p-4 lg:p-8">
    <!-- <RatedBadge class="absolute h-[62.097px] w-[60.718px] top-0 left-0" /> -->
    <div>
      <div
        class="w-full flex lg:flex-row flex-col lg:justify-between justify-center gap-8 items-center"
      >
        <div
          class="flex lg:flex-row flex-col items-center lg:justify-normal justify-center gap-6"
        >
          <div>
            <div
              v-if="props?.talent?.image"
              class="relative h-[100.955px] w-[100.955px] object-contain items-center flex justify-center bg-brand rounded-full"
            >
              <template v-if="displayImage">
                <img
                  :src="getImageSrc()"
                  class="h-[100.955px] w-[100.955px] object-cover rounded-full"
                  @error="handleImageError"
                />
              </template>
              <template v-else>
                <div class="initials-container text-white text-5xl font-bold">
                  {{ initials }}
                </div>
              </template>
              <GreenIcon class="absolute top-1 right-3" />
            </div>
            <div
              v-else
              class="relative h-[100.955px] w-[100.955px] bg-brand rounded-full"
            >
              <img
                loading="lazy"
                :src="Icon"
                class="h-[100.955px] w-[100.955px] rounded-full"
                alt=""
              />
              <GreenIcon class="absolute top-1 right-3" />
            </div>
          </div>

          <div class="lg:text-left text-center">
            <p
              class="text-[#000000] text-[20.839px] flex gap-[8px] items-center capitalize font-Satoshi500 leading-[19.739px]"
            >
              {{ props?.talent.first_name }}
              {{ props?.talent.last_name }}
              <span
                v-if="props?.talent?.experience_level"
                class="bg-[#00474F] rounded-full py-[0.5px] capitalize text-[10.519px] text-[#E6F1F3] font-medium px-[19px]"
                >{{ props?.talent?.experience_level }}</span
              >
            </p>
            <p
              class="text-[#00000066] text-[16.699px] leading-[20.739px] font-Satoshi400"
            >
              {{ props?.talent?.skill_title }}
            </p>
            <div class="flex items-center gap-2">
              <p class="lg:text-[19.319px] text-[14px] text-[#244034] font-Satoshi500">
                ${{ store.abbr(props?.talent?.rate) }}/hr
              </p>
              <div class="h-[6px] bg-[#010101e2] w-[6px] rounded-full"></div>
              <p class="text-[#244034] lg:text-[19.319px] text-[14px] font-Satoshi500">
                {{ props?.talent?.location }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="flex md:flex-row flex-col lg:items-start items-center gap-4">
            <div class="flex lg:justify-normal gap-4 items-center justify-center">
              <!-- <button><LoveIcon /></button> -->

              <button @click="copyUrl"><CopyLinkIcon /></button>
            </div>
            <button class="btn-brand" @click="goTo(props.talent?.email, true)">Message</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row gap-6 w-full overflow-hidden mt-6 hide-scrollbar overflow-x-auto"
    >
      <img
        loading="lazy"
        v-for="item in props?.talent?.portfolio"
        :key="item"
        :src="item?.featured_image"
        class="h-[140.078px] flex flex-col object-cover w-auto rounded-lg"
        alt=""
      />
    </div>
    <router-link
      :to="{
        name: 'view-talent',
        params: { uuid: props?.talent?.uniqueId, name: props?.talent?.first_name },
      }"
      class="flex items-center gap-4 mt-6"
    >
      <p class="lg:text-[20.699px] text-[14px] font-Satoshi500 text-[#244034]">
        View Profile
      </p>
      <ArrowRight />
    </router-link>
    <section class="widgetContainer newMessge fixed bg-[#00000066] !z-[99] w-full h-full top-0 left-0 grid" v-if="newMessage" @click.self="closeWindow">
      <div class="messageWindow w-[50%] mx-auto mt-6 msgMob:mt-0 rounded-[0.5rem] bg-white h-[70%] transitionItem overflow-hidden msgMob:w-full msgMob:h-full msgMob:rounded-none">
        <NewMessage class="h-full" @send="handleSendMessage"
        @delete="closeWindow"
        @back="closeWindow"
        :email="props.talent?.email"
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, watch, ref } from "vue";
import NewMessage from "@/components/ui/Message/NewMessage.vue";
// import RatedBadge from "@/components/icons/ratedBadge.vue";
import GreenIcon from "@/components/icons/greenIcon.vue";
import LoveIcon from "@/components/icons/loveIcon.vue";
import SearchIcon from "@/components/icons/searchIcon.vue";
import ArrowRight from "@/components/icons/arrowRight.vue";
import Icon from "@/assets/defultAvater.png";
import { useTabStore } from "@/stores/tab";
import CopyLinkIcon from "@/components/icons/copyLinkIcon.vue";
import { useClipboard } from "@vueuse/core";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { useMessageStore } from "@/stores/message";

const messageStore = useMessageStore();
const toast = useToast();
const newMessage = ref(false)
const route = useRoute()
const router = useRouter()

let source = "";

const goTo = async (email, show) => {
  const query = { ...route.query };

  await router.push({ query: {email, show} });
  newMessage.value = true
};

function closeWindow(){ 
  const query = { ...route.query };
  if (query.email) {
    delete query.email;
    router.push({ query });
  } else {
    console.log("Email query not found in the URL.");
  }
  newMessage.value = false
}

const isSending = ref(false)

const handleSendMessage = async (payload)=>{
  isSending.value = true
  try {
    if(payload.body.length > 0 &&
    payload.to.length > 0){
      closeWindow()
      await messageStore.handleSendMessage(payload)
      toast.success('Message sent', {
          timeout: 4000
        })
      isSending.value = false
    } else {
      alert('Some fields are not filled')
    }
  } catch (error) {
    console.log(error)
    isSending.value = false
  }
}

onMounted(() => {
  source =
    import.meta.env.VITE_LANDING_PAGE +
    `talent/` +
    `${props?.talent?.first_name}/` +
    props?.talent?.uniqueId;
});

// let source = window.location.href;
const { copy, copied, isSupported } = useClipboard({ source });
const copyUrl = () => {
  if (isSupported) {
    if (copied) {
      copy(source);
      toast.success("Link Copied", {
        timeout: 4000,
      });
    }
  } else {
    toast.error("Your browser does not support Clipboard API", {
      timeout: 4000,
    });
  }
};

const store = useTabStore();

const props = defineProps({
  talent: Object,
});
const talentData = computed(() => {
  return props?.talent;
});
const imageExists = ref(false);
const initials = ref("");

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

watch(talentData, async () => {
  await updateImageExists();
});

async function updateImageExists() {
  const hasImage = props?.talent?.image;
  if (hasImage) {
    const imageSrc = getImageSrc();
    imageExists.value = await checkImageExists(imageSrc);
    if (!imageExists.value) {
      setInitials(
        `${talentData.value?.first_name}` + "" + `${talentData.value?.last_name}`
      );
    }
  } else {
    imageExists.value = false;
    setInitials(
      `${talentData.value?.first_name}` + "" + `${talentData.value?.last_name}`
    );
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
  return props?.talent?.image;
}

function handleImageError() {
  console.error("Image loading error");
  setInitials(`${talentData.value?.first_name}` + "" + `${talentData.value?.last_name}`);
}

const displayImage = computed(() => imageExists.value);
</script>
