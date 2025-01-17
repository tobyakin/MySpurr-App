<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import Arrow from '@/components/icons/paginationArrow.vue';
import { useEventStore } from "../../stores/event";
import eventCard from "@/components/ui/Events/EventCard.vue"

const eventStore = useEventStore();
const events = ref([]);
const loading = ref(false)
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(9); // Set items per page to 9
const displayedPageNumbers = ref([]);

const fetchEvents = async (page = 1) => {
    loading.value = true

    try {
        const res = await eventStore.allEvents();
        console.log(res.pagination)
        if (res && res.data) {
            events.value = res.data.slice((page - 1) * perPage.value, page * perPage.value);

            currentPage.value = res.pagination.current_page;
            totalPages.value = Math.ceil((events.value.length) / perPage.value);

            updateDisplayedPageNumbers();
        } else {
            console.error('No data returned from API')
        }
        
    } catch (error) {
        console.error('Error fetching event details:', error)
    } finally {
        loading.value = false
    }
}

const updateDisplayedPageNumbers = () => {
  const startPage = Math.max(1, currentPage.value - 2);
  const endPage = Math.min(totalPages.value, startPage + 4);
  
  displayedPageNumbers.value = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;

    // Set items per page
    const itemsPerPage = 9;
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = currentPage.value * itemsPerPage;

    // Filter and slice based on selected category and page number
    events.value = events.value.slice(start, end)

    // Update displayed page numbers if needed
    updateDisplayedPageNumbers();
  }
};

onMounted(() => {
    fetchEvents()
})

</script>

<template>
  <section class="events">
    <DashboardLayout>
        
        <section class="adsContainer mx-auto !mt-[5rem] !p-0 overflow-hidden w-[80%] msgMob:!w-[90%] h-auto">
            <ShortLoader v-if="loading" />
            <div v-else>
                <div v-if="events && events.length === 0">
                    <div class="flex justify-center items-center">
                        <p class="pt-3">No data available.</p>
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-customGrid2 gap-[2rem]">
                        <eventCard 
                            v-for="event in events" 
                            :key="event.id"
                            :event="event"
                        />
                    </div>
                    <div class="mt-12 flex w-[60%] flex-row justify-center mx-auto" v-if="displayedPageNumbers?.length > 1">
                            <button
                            @click="goToPage(currentPage - 1)"
                            :disabled="currentPage === 1"
                            :class="{ 'opacity-50 !border-r-0 cursor-no': currentPage === 1 }"
                            class="border-[#007582] border-l-2 border-r-2 border-y-2 px-4 py-2 rounded-l-[6.032px] font-Satoshi500 text-[1.41rem] items-center flex"
                            >
                            <Arrow class="rotate-[180deg]" />
                            </button>
                            <button
                            v-for="pageNumber in displayedPageNumbers"
                            :key="pageNumber"
                            :class="[
                                'border-[#007582] p-4 py-2 font-Satoshi500 text-[1.41rem] items-center flex border-y-2 border-r-2',
                                pageNumber === currentPage ? 'bg-[#007582] text-white' : '',
                            ]"
                            @click="goToPage(pageNumber)"
                            >
                            {{ pageNumber }}
                            </button>
                            <button
                            @click="goToPage(currentPage + 1)"
                            :disabled="currentPage === totalPages"
                            class="border-[#007582] border-r-2 border-y-2 p-4 py-2 rounded-r-[6.032px] font-Satoshi500 text-[1.41rem] items-center flex"
                            :class="{ 'opacity-50 cursor-no': currentPage === totalPages }"
                            >
                            <Arrow />
                            </button>
                        </div>
                </div>
            </div>
        </section>
      
    </DashboardLayout>
  </section>
</template>

<style>
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
