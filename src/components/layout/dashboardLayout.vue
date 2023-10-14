<script setup>
import BaseSidebar from "@/components/SideBar/index.vue";
import BellIcon from "@/components/icons/bellIcon.vue";
import BookMarkIcon from "@/components/icons/bookmarkIcon.vue";
import WalletIcon from "@/components/icons/walletIcon.vue";
import SearchIcon from "@/components/icons/searchBarIcon.vue";
import Dropdown from "@/components/ui/DropDown.vue";
import { ref } from "vue";
import "animate.css";
import { useRouter } from "vue-router";
const router = useRouter();
const closeNav = ref(false);
const closeBackdrop = ref(false);
const showDropdown = ref(false);

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
  { id: 0, name: "dashboard", context: "My profile" },
  {
    id: 1,
    name: "dashboard",
    context: "My work",
  },
  {
    id: 2,
    name: "dashboard",
    context: "Wallet",
  },
  {
    id: 3,
    name: "dashboard",
    context: "Settings",
  },
  {
    id: 4,
    name: "dashboard",
    context: "Help Center",
  },
  {
    id: 5,
    name: "logout",
    context: "Log out",
  },
];

const toogleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const redirectToWallet = () => {
  router.push({ name: "wallet" });
};
</script>

<template>
  <div class="bg-[#FDFDF6]">
    <div class="lg:flex">
      <div
        v-if="closeBackdrop"
        @click.self="toggle"
        class="lg:hidden z-20 menubg fixed top-0 left-0 w-full"
      >
        <div
          :class="{ 'animate__animated animate__slideOutLeft': !closeNav }"
          class="w-2/3 animate__animated animate__slideInLeft"
        >
          <BaseSidebar />
        </div>
      </div>
      <div class="hidden lg:block flex-shrink-0 md:w-[256px]">
        <BaseSidebar />
      </div>
      <div class="flex-grow">
        <!-- top-menu flex items-center justify-between py-3 px-4 lg:px-0 -->
        <!-- flex items-center gap-[3rem] justify-between px-4 min-[370px]:px-6 sticky top-0 pt-4 min-[370px]:pt-5 bg-white z-50  -->
        <nav
          class="flex bg-[#FDFDF6] items-center gap-[3rem] justify-between px-3 min-[370px]:px-6 sticky top-0 py-3 min-[370px]:pt-5 z-50"
        >
          <div class="lg:hidden">
            <div class="logo">
              <router-link :to="{ name: 'dashboard' }"
                ><img
                  src="@/assets/Logobeta.png"
                  class="lg:w-[80%] h-[40px] md:w-[40%]"
                  alt="Myspurr logo"
              /></router-link>
            </div>
          </div>
          <div class="w-[40%] relative hidden lg:flex">
            <SearchIcon class="absolute left-3 top-3" /><input
              class="w-full font-light font-Satoshi400 text-[14px] p-3 pl-9 pr-24 border-[#F0F0F0] border-[1px] opacity-[0.8029] rounded-[7px] text-sm"
              placeholder=" Search here.."
              type="text"
            /><button
              class="absolute right-0 top-3 px-[21px] border-l-[#F0F0F0] border-l-[1px]"
            >
              Find job
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
              <span role="button" class="notification cusor-pointer hidden lg:block px-2"
                ><BookMarkIcon />
              </span>
              <span role="button" class="notification cusor-pointer hidden lg:block px-2"
                ><BellIcon />
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
                  </div>
                  <Dropdown
                    v-if="showDropdown"
                    :showDropdown="showDropdown"
                    :link="true"
                    :items="items"
                    @closeDropdown="toogleDropdown"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menubg {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(7px);
}
</style>
