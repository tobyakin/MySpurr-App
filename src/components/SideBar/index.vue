<template>
  <header class="h-screen bg-[#E9FAFB]">
    <div class="logo lg:visible invisible">
      <router-link to="/">
        <img src="@/assets/Logobeta.png" class="h-12" alt="MySpurr logo" />
      </router-link>
    </div>
    <!-- The nav -->
    <nav class="nav !font-light">
      <router-link
        to="/dashboard"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="
          route.name === 'dashboard' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '
        "
      >
        <div
          :class="route.name === 'dashboard' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <HomeIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Home</span
        >
      </router-link>
      <router-link
        to="/messages"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="route.name === 'messages' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '"
      >
        <div
          :class="route.name === 'messages' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <MessageIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Messages</span
        >
      </router-link>
      <router-link
        v-if="feature.includes('ALL_APPLICATIONS')"
        to="/"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="route.name === '' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '"
      >
        <div
          :class="route.name === '' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <ApplicationIcon />
        </div>
        <span
          class="place-self-center relative text-[16px] font-Satoshi500 leading-[20.23px]"
        >
          <!-- <sup class="coming-soon">coming soon</sup> -->

          All Application</span
        >
      </router-link>
      <router-link
        v-if="feature.includes('MY_APPLICATIONS')"
        to="/my-applications"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="
          route.name === 'my-applications' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '
        "
      >
        <div
          :class="route.name === 'my-applications' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <ApplicationIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >My Application</span
        >
      </router-link>
      <router-link
        v-if="feature.includes('JOBS')"
        to="/jobs"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="route.name === 'jobs' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '"
      >
        <div
          :class="route.name === 'jobs' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <MyjobsIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Jobs</span
        >
      </router-link>
      <router-link
        v-if="feature.includes('JOB_LISTING')"
        to="/job-lists"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="
          route.name === 'job-lists' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '
        "
      >
        <div
          :class="route.name === 'job-lists' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <MyjobsIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Job Listing</span
        >
      </router-link>
      <router-link
        v-if="feature.includes('COURSES')"
        to="/courses"
        class="p-[10px] flex justify-start hidden hover:bg-brand/[0.1] rounded-[5px]"
        :class="route.name === 'courses' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '"
      >
        <div
          :class="route.name === 'courses' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <Courses />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Courses</span
        >
      </router-link>
      <router-link
        v-if="feature.includes('MY_SCHEDULE')"
        to="/my-schedule"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="
          route.name === 'my-schedule' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '
        "
      >
        <div
          :class="route.name === 'my-schedule' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <MySchedule />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >My Schedule</span
        >
      </router-link>
      <!-- <router-link
        v-if="feature.includes('EVENTS')"
        to="/events"
        class="p-[10px] flex justify-start hover:bg-brand/[0.1] rounded-[5px]"
        :class="
          route.name === 'events' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '
        "
      >
        <div
          :class="route.name === 'events' ? '!text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
        <GoProIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Events</span
        >
      </router-link> -->
      <router-link
        to="/dashboard"
        class="p-[10px] flex justify-start hidden hover:bg-brand/[0.1] rounded-[5px]"
        :class="route.name === '' ? 'text-white bg-[#43D0DF] hover:!bg-[#43D0DF]' : 'text-[#01272C] '"
      >
        <div
          :class="route.name === '' ? 'text-white ' : 'text-[#297F88] '"
          class="mr-[20px] justify-center flex items-center rounded-[5px] h-[40px] w-[40px]"
        >
          <GoProIcon />
        </div>
        <span class="place-self-center text-[16px] font-Satoshi500 leading-[20.23px]"
          >Go Pro</span
        >
      </router-link>
    </nav>
  </header>
</template>
<script setup>
import { useStore } from "@/stores/user";
import HomeIcon from "@/components/icons/homeIcon.vue";
import MessageIcon from "@/components/icons/messageIcon.vue";
import ApplicationIcon from "@/components/icons/applicationIcon.vue";
import MyjobsIcon from "@/components/icons/searchIcon.vue";
import Courses from "@/components/icons/coursesIcon.vue";
import MySchedule from "@/components/icons/calenderIcon.vue";
import GoProIcon from "@/components/icons/starIcon.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const store = useStore();

const user = store.getUser;

const feature = computed(() => {
  return Array.isArray(store.features) ? store.features : [];
});

// const logOut = () => {
//   localStorage.clear();
//   router.push({
//     name: "login",
//   });
// };
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  min-height: 100vh;
  height: 100vh;
  overflow-y: scroll;
  //   background-color: $color-white;

  &::-webkit-scrollbar {
    width: 0.4vw;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    // background-color: $color-primary;
    border-radius: 50px;
  }

  .logo {
    margin-bottom: 20px;
  }

  nav {
    width: 90%;
    // border-top: 1px solid $color-grey-100;
    padding-top: 20px;
    margin-bottom: 10px;

    .link-group {
      margin-top: 35px;

      h4 {
        font-size: 0.8rem;
        // color: $color-grey-300;
        padding-inline: 10px;
        text-transform: uppercase;
        font-weight: 700;
      }
    }

    .link {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      padding: 10px;

      &:hover {
        // background-color: rgba($color: $color-primary, $alpha: 0.1);
        border-radius: 5px;
      }

      &.router-link-exact-active {
        .link__icon {
          // background-color: rgba($color: $color-primary, $alpha: 20);
          //   color: $color-grey-100;

          i {
            // color: $color-grey-100;
          }
        }

        .link__text {
          font-weight: 300;
          //   color: $color-primary;
          // background-color: rgba($color: $color-primary, $alpha: 0.1);
        }
      }

      &__icon {
        width: 35px;
        height: 35px;
        border-radius: 10px;
        background-color: transparent;
        display: grid;
        place-items: center;
        margin-right: 20px;

        i {
          font-size: 1.1rem;
          //   color: $color-grey-400;
        }
      }

      &__text {
        font-size: 0.9rem;
        // color: $color-grey-400;
      }
    }
  }

  .cta {
    display: inline-block;
    padding: 10px 20px;
    // background-color: $color-primary;
    // color: $color-white;
    font-size: 0.75rem;
    border-radius: 5px;
    transition: 0.15s ease;

    &:hover {
      //   background-color: darken($color: $color-primary, $amount: 10%);
    }
  }
}
</style>
