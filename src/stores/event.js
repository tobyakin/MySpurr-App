import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getEvents, getEventDetails, viewEventDetailsBySlug, getRelated, registerEvent } from '@/services/EventService'

export const useEventStore = defineStore('events', () => {

    const event = ref([])
    const singleEvent = ref({})
    const singleEventSlug = ref({})
    const getRelatedEvent = ref([])

    const registerEventData = ref({
        event_id: '',
        first_name: '',
        last_name: '',
        creative_profession: '',
        email: '',
        phone_number: '',
        description: ''
    });

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

    const handleRegisterEvent = async () => {

        let payload = {
            event_id: registerEventData.value.event_id,
            first_name: registerEventData.value.first_name,
            last_name: registerEventData.value.last_name,
            creative_profession: registerEventData.value.creative_profession,
            email: registerEventData.value.email,
            phone_number: registerEventData.value.phone_number,
            description: registerEventData.value.description,
        }

        try {
            let res = await registerEvent(payload)
            return res
        } catch (error) {
            /**/
        }
    }

    return {
        allEvents,
        getSingleEvent,
        handleGetEventDetailsBySlug,
        related,
        handleRegisterEvent,
        registerEventData
    }
})

