import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getEvents, getEventDetails, viewEventDetailsBySlug, getRelated } from '@/services/EventService'

export const useEventStore = defineStore('events', () => {

    const event = ref([])
    const singleEvent = ref({})
    const singleEventSlug = ref({})
    const getRelatedEvent = ref([])

    const allEvents = async () => {
        try {
            event.value = await getEvents()
            return event.value
        } catch (error) {
            console.error(error)
        }
    }

    const getSingleEvent = async (id) => {
        try {
            singleEvent.value = await getEventDetails(id)
            return singleEvent.value
        } catch (error) {
            console.error(error)
        }
    }

    const handleGetEventDetailsBySlug = async (slug) => {
        try {
            singleEventSlug.value = await viewEventDetailsBySlug(slug)
            return singleEventSlug.value
        } catch (error) {
            console.error(error)
        }
    }

    const related = async () => {
        try {
            getRelatedEvent.value = await getRelated()
            return getRelatedEvent.value
        } catch (error) {
            console.error(error)
        }
    }

    return {
        allEvents,
        getSingleEvent,
        handleGetEventDetailsBySlug,
        related
    }
})

