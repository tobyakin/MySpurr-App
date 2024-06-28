<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import calendarIcon from "@/components/icons/eventCalendarIcon.vue"
import locationIcon from "@/components/icons/eventLocationIcon.vue"
import timerIcon from "@/components/icons/eventTimerIcon.vue"
import rightArrowM from "@/components/icons/rightArrowM.vue";

const events = [
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
    {
        id: 1,
        title: 'Creating your professional workspace with low budget',
        location: 'online',
        date: '22nd May 2024',
        time: '06:00pm-7:00pm',
    },
]

</script>

<template>
  <section class="events">
    <DashboardLayout>
        <section class="adsContainer mx-auto !mt-[5rem] !p-0 overflow-hidden flex flex-wrap w-[80%] msgMob:!w-[90%] basis-1/4">
            <article v-for="event in events" :key="event.id">
                <div class="rounded-t-[1.13825rem]overflow-hidden">
                    <img src="@/assets/image/event_img.png" alt="" class="w-full h-full">
                </div>
                <div class="px-[1.24rem] pb-[2rem] pt-4 bg-[#ECFAFC] rounded-b-[1.32038rem]">
                    <h1 class="text-[#000] font-Satoshi700 leading-[1.27488rem] mb-4">{{ event.title }}</h1>
                    <div class="event_details flex flex-col gap-[0.39rem] my-4">
                        <div class="flex items-center gap-[0.63rem]">
                            <locationIcon />
                            <p>{{ event.location }}</p>
                        </div>
                        <div class="flex items-center gap-[0.63rem]">
                            <calendarIcon />
                            <p>{{ event.date }}</p>
                        </div>
                        <div class="flex items-center gap-[0.63rem]">
                            <timerIcon />
                            <p>{{ event.time }}</p>
                        </div>
                    </div>
                    <router-link :to="{name: 'event-detail', param: {id: 1}}" class="event_btn">
                        <div class="w-[100%] flex items-center justify-between px-4 py-[0.7rem] bg-[#43D0DF] rounded-[0.46rem] btn-hover-1">
                            <h3 class="reg font-Satoshi700  text-[#000] text-[0.865rem] leading-4">Register</h3>
                            <rightArrowM class="reg"/>
                        </div>
                    </router-link>
                </div>
            </article>
        </section>
      
    </DashboardLayout>
  </section>
</template>

<style>
.events .adsContainer {
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    width: 80%;
    overflow-x: hidden !important;
}

@media (max-width: 1450px){
      html {
          font-size: 13px !important;
      }
    }
  
    @media (max-width: 1024px){
      html {
        font-size: 16px !important;
      }
    } 
   
</style>
