<script setup>
import BaseSidebar from "@/components/SideBar/index.vue";
import BellIcon from "@/components/icons/bellIcon.vue";
import BookMarkIcon from "@/components/icons/bookmarkIcon.vue";
import WalletIcon from "@/components/icons/walletIcon.vue";
import SearchIcon from "@/components/icons/searchBarIcon.vue";
import Dropdown from "@/components/ui/DropDown.vue";
import NotificationDropDown from "@/components/ui/NotificationDropDown.vue";
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import "animate.css";
import { useRouter, useRoute } from "vue-router";
import { useUserProfile } from "@/stores/profile";
import { useStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useMessageStore } from "@/stores/message";
import ChatWidget from "@/components/ui/Message/ChatWidget.vue";

const messageStore = useMessageStore();
const profileStore = useUserProfile();
const messageLength = ref()
const messageNum = ref()
const router = useRouter();
const route = useRoute()
const closeNav = ref(false);
const closeBackdrop = ref(false);
const showDropdown = ref(false);
const showNotificationDropdown = ref(false);
const showChatWidget = computed(() => !route.meta.hideChatWidget);
const receivedMessages = ref([])
const { allMessages } = storeToRefs(messageStore)
const userDetails = computed(() => {
  return profileStore?.user?.data;
});

const props = defineProps(['height', 'overflow'])

let store = useStore();
const accountType = computed(() => {
  return store.getUser?.data?.user?.type;
});

const userID = computed(() => {
  return profileStore?.user?.data?.id;
});

onMounted(() => {
  return accountType, userID;
});

const toggle = () => {
  closeNav.value = !closeNav.value;

  if (closeNav.value) {
    closeBackdrop.value = !closeBackdrop.value;
  }

  if (!closeNav.value) {
    setTimeout(() => {
      closeBackdrop.value = !closeBackdrop.value;
    }, 1000);
  }
};
const items = [
  { id: 0, name: "profile", context: "MySpurr profile" },
  {
    id: 1,
    name: "my-applications",
    context: "My Jobs",
  },
  {
    id: 2,
    name: "wallet",
    context: "Wallet",
  },
  {
    id: 3,
    name: "settings",
    context: "Settings",
  },
  {
    id: 4,
    name: "help-center",
    context: "Help Center",
  },
  {
    id: 5,
    name: "logout",
    context: "Log out",
  },
];
const itemss = [
  { id: 0, name: "profile", context: "MySpurr profile" },
  {
    id: 1,
    name: "wallet",
    context: "Wallet",
  },
  {
    id: 2,
    name: "settings",
    context: "Settings",
  },
  {
    id: 3,
    name: "help-center",
    context: "Help Center",
  },
  {
    id: 4,
    name: "logout",
    context: "Log out",
  },
];
const notificationItems = ref([])

const toogleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showNotificationDropdown.value === true) {
    showNotificationDropdown.value = false;
  }
};
const toogleNotificationDropdown = () => {
  showNotificationDropdown.value = !showNotificationDropdown.value;
  if (showDropdown.value === true) {
    showDropdown.value = false;
  }
};
const redirectToWallet = () => {
  router.push({ name: "wallet" });
};
const redirectToBookmark = () => {
  router.push({ name: "bookmark" });
};
onMounted(async () => {
  await profileStore.userProfile();
  getReceivedMessages(userID.value)
  return userDetails.value?.image;
});

onUpdated(async () => {
  // await profileStore.userProfile();
  // getReceivedMessages(userID.value)
  return userDetails.value?.image;
});
const searchQuery = ref("");

const redirectToJobPage = () => {
  router.push({
    name: "jobs",
    query: { search: searchQuery.value },
  });
};
const redirectToTalentPage = () => {
  router.push({
    name: "talents",
    query: { search: searchQuery.value },
  });
};
// const handleSearchInput = (event) => {
//   const searchQuery = event.target.value;
//   redirectToJobPage(searchQuery);
// };
const unreadMessages = ref([])
const getReceivedMessages = async (userId)=>{
  try {
    await messageStore.handleGetMessages(userId)
  } catch (error) {
    cconsole.log(error)
  }
  receivedMessages.value = allMessages.value.data?.filter(message=> message?.sender_id != userId)
  unreadMessages.value = receivedMessages.value.filter(message=>message.status == 'unread')
  messageLength.value = unreadMessages.value.length > 0
  messageNum.value = unreadMessages?.value.length
  return receivedMessages.value
}

const redirectWithSearchQuery = () => {
  // const inputField = document.querySelector(".search-input");
  // if (searchQuery.value) {
  return accountType.value === "talent" ? redirectToJobPage() : redirectToTalentPage();
  // }
};
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

watch([userDetails, accountType], receivedMessages, async () => {
  const hasImage = userDetails.value?.image || userDetails.value?.company_logo;
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
  await profileStore.userProfile();
  getReceivedMessages(userID.value)
});

function setInitials(name) {
  if (typeof name === 'string' && name.trim().length > 0) {
    initials.value = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  } else {
    initials.value = '';
  }
}

function getImageSrc() {
  return accountType.value === "talent"
    ? userDetails.value?.image
    : userDetails.value?.company_logo;
}

function handleImageError() {
  console.error("Image loading error");
  setInitials(userDetails.value?.business_name);
}
const displayImage = computed(() => imageExists.value);
</script>

<template>
  <div 
  class="bg-[#FDFDF6] relative"
  :style="{ height: height, overflow: overflow }"
  >
    <div class="lg:flex">
      <div
        v-if="closeBackdrop"
        @click.self="toggle"
        class="lg:hidden z-20 menubg fixed top-0 left-0 w-full exclude-from-print"
      >
        <div
          :class="{ 'animate__animated animate__slideOutLeft': !closeNav }"
          class="w-2/3 animate__animated animate__slideInLeft"
        >
          <BaseSidebar />
        </div>
      </div>
      <div class="hidden lg:block flex-shrink-0 md:w-[256px] exclude-from-print">
        <BaseSidebar />
      </div>
      <div class="flex-grow dashBreak:!w-[100%] tab:bg-[red] pb-20 variableDiv w-[calc(100%-256px)]">
        <!-- top-menu flex items-center justify-between py-3 px-4 lg:px-0 -->
        <!-- flex items-center gap-[3rem] justify-between px-4 min-[370px]:px-6 sticky top-0 pt-4 min-[370px]:pt-5 bg-white z-50  -->
        <nav
          class="flex bg-[#FDFDF6] exclude-from-print items-center gap-[3rem] justify-between px-3 min-[370px]:px-6 sticky top-0 py-3 min-[370px]:pt-5 z-[50]"
        >
          <div class="lg:hidden">
            <div class="logo">
              <router-link :to="{ name: 'dashboard' }"
                ><img
                  src="@/assets/Logobeta.png"
                  class="lg:w-[80%] h-[40px]"
                  alt="Myspurr logo"
              /></router-link>
            </div>
          </div>
          <div class="w-[40%] relative hidden lg:flex">
            <SearchIcon class="absolute left-3 top-3" /><input
              class="w-full font-light font-Satoshi400 text-[14px] p-3 pl-9 pr-24 border-[#F0F0F0] border-[1px] opacity-[0.8029] rounded-[7px] text-sm"
              placeholder=" Search here.."
              type="text"
              v-model="searchQuery"
            /><button
              class="absolute right-0 top-3 px-[21px] border-l-[#F0F0F0] border-l-[1px]"
              @click="redirectWithSearchQuery"
            >
              {{ accountType === "talent" ? "Find job" : "Find talent" }}
            </button>
          </div>
          <div class="links flex">
            <div class="flex justify-between gap-1 items-center ml-auto">
              <span
                role="button"
                @click="redirectToWallet"
                class="notification cusor-pointer hidden lg:block px-2"
                ><WalletIcon />
              </span>
              <span
                @click="redirectToBookmark"
                role="button"
                class="notification cusor-pointer hidden lg:block px-2"
                ><BookMarkIcon />
              </span>
              <span
                @click="toogleNotificationDropdown"
                role="button"
                class="notification cusor-pointer hidden lg:block px-2"
                >
                <div class="relative">
                  <span v-if="messageLength" class="absolute right-[-5px] top-[-5px] w-[15px] h-[15px] bg-[red] grid place-content-center rounded-[100%] text-[0.7rem] font-Satoshi500 text-white">{{ messageNum }}</span>
                  <BellIcon />
                </div>
                  
              </span>

              <div class="profile__dropdown">
                <div
                  class="profile__dropdown-text relative items-center flex gap-2 lg:px-2 rounded-3xl"
                >
                  <div @click="toggle" class="lg:hidden cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </div>
                  <img class="hidden" src="" alt="" />
                  <div
                    @click="toogleDropdown()"
                    role="button"
                    class="h-10 w-10 flex justify-center items-center rounded-full bg-brand"
                  >
                    <template v-if="userDetails?.image || userDetails?.company_logo">
                      <template v-if="displayImage">
                        <img
                          :src="getImageSrc()"
                          class="h-10 w-10 bg-[#0A090991] object-cover rounded-full"
                          @error="handleImageError"
                        />
                      </template>
                      <template v-else>
                        <div class="initials-container text-white font-bold">
                          {{ initials }}
                        </div>
                      </template>
                    </template>
                    <template v-else>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 text-gray-100 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </template>
                    <!-- <img
                      v-if="userDetails?.image || userDetails?.company_logo"
                      :src="
                        accountType === 'talent'
                          ? userDetails?.image
                          : userDetails?.company_logo
                      "
                      class="h-10 w-10 bg-[#0A090991] rounded-full"
                      @error="showInitial(userDetails?.business_name)" -->
                    <!-- /> -->

                    <!-- <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 text-gray-100 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg> -->
                    <!-- <div ref="initialContainer" class="initials-container"></div> -->
                  </div>
                  <Dropdown
                    v-if="showDropdown"
                    :showDropdown="showDropdown"
                    :link="true"
                    :items="accountType === 'talent' ? items : itemss"
                    @closeDropdown="toogleDropdown"
                  />

                  <NotificationDropDown
                    v-if="showNotificationDropdown"
                    :showDropdown="showNotificationDropdown"
                    :link="true"
                    :items="notificationItems"
                    :itemNum="messageNum"
                    @closeDropdown="toogleNotificationDropdown"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <slot></slot>
      </div>
      </div>
      
      <ChatWidget defaultWidgetState="true" v-if="showChatWidget" class="fixed bottom-0 right-[3rem] z-[99] eventBreak:hidden"/>
  </div>
</template>

<style lang="scss" scoped>
.menubg {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(7px);
}
</style>
