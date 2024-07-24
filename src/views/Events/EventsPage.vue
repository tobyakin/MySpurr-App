<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import calendarIcon from "@/components/icons/eventCalendarIcon.vue"
import locationIcon from "@/components/icons/eventLocationIcon.vue"
import timerIcon from "@/components/icons/eventTimerIcon.vue"
import rightArrowM from "@/components/icons/rightArrowM.vue"
import { useEventStore } from "../../stores/event";
//import Loader from "../../components/ui/Loader/Loader.vue";

const eventStore = useEventStore();
const events = ref([]);
const loading = ref(false)

const fetchEvents = async () => {
    loading.value = true

    try {
        const res = await eventStore.allEvents();
        if (res && res.data) {
            events.value = res.data;
        } else {
            console.error('No data returned from API')
        }
        
    } catch (error) {
        console.error('Error fetching event details:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchEvents()
})

</script>

<template>
  <section class="events">
    <DashboardLayout>
        <ShortLoader v-if="loading" />
        <section class="adsContainer mx-auto !mt-[5rem] !p-0 overflow-hidden flex flex-wrap w-[80%] msgMob:!w-[90%] basis-1/4" v-else>
            <div v-if="events && events.length === 0">
                <div class="flex justify-center items-center">
                    <p class="pt-3">No data available.</p>
                </div>
            </div>
            
            <article v-for="event in events" :key="event.id" class="w-[300px]">
                <div class="rounded-t-[1.13825rem] h-[200px]">
                    <img :src="event.featured_graphics" alt="" class="w-full h-full object-cover rounded-t-[1rem]">
                </div>
                <div class="px-[1.24rem] pb-[2rem] pt-4 bg-[#ECFAFC] rounded-b-[1.32038rem]">
                    <h1 class="text-[#000] font-Satoshi700 leading-[1.27488rem] mb-4">{{ event.title }}</h1>
                    <div class="event_details flex flex-col gap-[0.39rem] my-4">
                        <div class="flex items-center gap-[0.63rem]">
                            <locationIcon />
                            <span class="text-[13px]">{{ event.address }}</span>
                        </div>
                        <div class="flex items-center gap-[0.63rem]">
                            <calendarIcon />
                            <span class="text-[13px]">{{ event.event_date }}</span>
                        </div>
                        <div class="flex items-center gap-[0.63rem]">
                            <timerIcon />
                            <span class="text-[13px]">{{ event.event_time }}</span>
                        </div>
                    </div>
                    <router-link :to="{name: 'event-detail', params: {slug: event.slug}}" class="event_btn">
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
          font-size: 13.5px !important;
      }
    }
  
    @media (max-width: 1024px){
      html {
        font-size: 16px !important;
      }
    } 
   
</style>
