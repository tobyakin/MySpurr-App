<script setup>
import BaseSidebar from "@/components/SideBar/index.vue";
import { ref } from "vue";
import "animate.css";

const closeNav = ref(false);
const closeBackdrop = ref(false);

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
</script>

<template>
  <div class="bg-[#e5e5e5]">
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
      <div class="p-0 lg:p-6 flex-grow">
        <nav
          class="top-menu flex items-center justify-between bg-white py-3 px-4 lg:px-0 lg:bg-[#e5e5e5]"
        >
          <div class="lg:hidden">
            <div class="logo">
              <router-link :to="{ name: 'dashboard' }"
                ><img src="@/assets/img/logo.svg" class="h-8 w-24" alt="Kavlr logo"
              /></router-link>
            </div>
          </div>

          <div class="links hidden flex">
            <div class="flex justify-between gap-2 items-center ml-auto">
              <span
                class="notification hidden lg:block p-2 bg-transparent md:bg-[#2B3C87] rounded-full"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19.22,13.27l1.18,1.48A2,2,0,0,1,18.84,18H5.16A2,2,0,0,1,3.6,14.75l1.18-1.48A1,1,0,0,0,5,12.65V9.29A7.2,7.2,0,0,1,11.78,2,7,7,0,0,1,19,9v3.65A1,1,0,0,0,19.22,13.27Z"
                  ></path>
                  <path d="M16,18a4,4,0,1,1-8,0"></path>
                </svg>
              </span>

              <div class="profile__dropdown">
                <div
                  class="profile__dropdown-text items-center flex gap-2 p-2 rounded-3xl"
                >
                  <img class="hidden" src="" alt="" />
                  <div
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

                  <svg
                    class="hidden lg:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#2B3C87"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="7 10 12 15 17 10"></polyline>
                  </svg>

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
                </div>
              </div>
            </div>
          </div>
        </nav>

        <slot></slot>
        <!-- Footer -->
        <!-- <div class="md:flex justify-between w-full mt-24">
          <ul>
            <li> Kavlr © {{ new Date().getFullYear() }}</li>
          </ul>
          <ul class="flex gap-6">
            <li>Privacy policy</li>
            <li>Terms & Conditions</li>
            <li>Support</li>
          </ul>
        </div> -->
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
