<svg xmlns="http://www.w3.org/2000/svg" width="202" height="41" viewBox="0 0 202 41" fill="none">
  <g clip-path="url(#clip0_6666_26734)">
    <path d="M163.523 20.2807C163.648 9.67371 172.167 1.27217 182.678 1.39189C185.178 1.41495 187.649 1.93378 189.948 2.91836C192.247 3.90293 194.327 5.33368 196.069 7.12778C197.811 8.92188 199.18 11.0437 200.096 13.3704C201.012 15.697 201.458 18.1824 201.407 20.6824C201.269 30.9675 192.662 39.3531 182.377 39.2467C177.368 39.2123 172.575 37.1995 169.044 33.647C165.512 30.0944 163.528 25.29 163.523 20.2807ZM178.762 16.5056V30.7946H182.986V30.0737C182.986 27.7618 182.986 25.4525 182.986 23.1407C182.996 22.4344 183.259 21.755 183.727 21.2262C184.195 20.6974 184.838 20.3544 185.538 20.2594C187.328 19.9934 188.73 21.2172 188.759 23.1194C188.794 25.4499 188.759 27.7831 188.759 30.1136C188.759 30.353 188.781 30.5924 188.791 30.8132H192.987C193.008 30.7382 193.023 30.6618 193.032 30.5845C193.032 27.3361 193.067 24.0878 193.008 20.8421C192.974 19.8521 192.62 18.8999 191.999 18.1278C191.379 17.3557 190.525 16.8053 189.566 16.5588C187.222 16.0055 184.95 16.1119 183.197 18.1285C183.165 18.1657 183.101 18.171 182.96 18.2296V16.5056H178.762ZM176.202 16.5216H171.988V30.8026H176.202V16.5216ZM174.074 9.22676C173.734 9.22502 173.397 9.29031 173.081 9.41892C172.766 9.54753 172.48 9.73693 172.238 9.97631C171.996 10.2157 171.804 10.5004 171.672 10.8141C171.54 11.1278 171.471 11.4644 171.47 11.8047C171.468 12.145 171.533 12.4823 171.662 12.7973C171.79 13.1124 171.98 13.399 172.219 13.6409C172.458 13.8827 172.743 14.0751 173.057 14.2069C173.371 14.3387 173.707 14.4075 174.047 14.4092C174.735 14.4128 175.395 14.1431 175.884 13.6597C176.372 13.1762 176.648 12.5185 176.652 11.8313C176.656 11.1441 176.386 10.4836 175.902 9.99512C175.419 9.50668 174.761 9.23029 174.074 9.22676Z" fill="#007582"/> 
  </g>
  <defs>
    <clipPath id="clip0_6666_26734">
      <rect width="200.504" height="39.5734" fill="white" transform="translate()"/>
    </clipPath>
  </defs>
</svg>

c:\Users\Testing\OneDrive\Desktop\d33n\Salawudeen Abdultawab_Resume.pdf

VITE_LANDING_PAGE = "https://www.myspurr.net/"
VITE_ENCRYPT_KEY = "MySpurrDashaord#$%245"
VITE_BACKEND_BASEURL = "http://127.0.0.1:8000/api/"
VITE_BACKEND_BASEURL_PRODUCTION = "http://127.0.0.1:8000/api/"
VITE_DASHBOARD = "https://www.app.myspurr.net/"

VITE_LANDING_PAGE = "https://www.myspurr.net/"
VITE_ENCRYPT_KEY = "MySpurrDashaord#$%245"
VITE_BACKEND_BASEURL = "https://staging-api.myspurr.net/api/"
VITE_BACKEND_BASEURL_PRODUCTION = "https://backend-api.myspurr.net/api/"
VITE_DASHBOARD = "https://www.app.myspurr.net/"

import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

export const getMessages = async (userId) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const sendMessage = async (payload) => {
    const token = await getToken()
    try {
        let res = await axios.post(`v1/message`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const replyMessage = async (payload) => {
    const token = await getToken()
    try {
        let res = await axios.post(`v1/reply/message`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getSentMessages = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/sent/message`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getMessageDetail = async (message_id) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/detail/${message_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getMail = async (mail_input) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/getuser?email=${mail_input}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import calendarIcon from '@/components/icons/eventCalendarIcon.vue'
import locationIcon from '@/components/icons/eventLocationIcon.vue'
import timerIcon from '@/components/icons/eventTimerIcon.vue'
import rightArrowM from '@/components/icons/rightArrowM.vue'
import Share from '@/components/ui/SocialShare.vue'
import googleCalendarIcon from '@/components/icons/googleCalendarIcon.vue'
import outlookCalendarIcon from '@/components/icons/outlookCalendarIcon.vue'
import { useEventStore } from '../../stores/event'
import { storeToRefs } from 'pinia'
import { useUserProfile } from "@/stores/profile"
import SpinnerComponent from '../../components/spinner/SpinnerComponent.vue'

const showCalendarOptions = ref(false)
const calendarOption = ref()
const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()
const singleEvent = ref({})
const loading = ref(false)
const relatedEvents = ref([])
const apiLoading = ref(false)

const fetchSingleEvent = async () => {
    loading.value = true

    try {
        const res = await eventStore.handleGetEventDetailsBySlug(route.params.slug)
        if (res && res.data) {
            singleEvent.value = res.data
        } else {
            console.error('No data returned from API')
        }
    } catch (error) {
        console.error('Error fetching event details:', error)
    } finally {
        loading.value = false
    }
}

const fetchRelatedEvents = async () => {
    loading.value = true

    try {
        const res = await eventStore.related()
        if (res && res.data) {
            relatedEvents.value = res.data
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
    fetchSingleEvent()
    fetchRelatedEvents()
})

watch(
    () => route.params.slug,
    async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            await fetchSingleEvent()
            await fetchRelatedEvents()
        }
    }
)

const parseDateToUTC = (dateStr, timeStr) => {
    const [day, monthName, year] = dateStr.split(' ');
    const month = new Date(Date.parse(monthName + " 1, 2024")).getMonth();

    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    const localDate = new Date(year, month, day, hours, minutes);
    const utcDate = new Date(localDate.getTime() - (0 * 60 * 60 * 1000));

    return utcDate;
}


const formatDateToUTC = (date) => {
    const pad = (num) => num.toString().padStart(2, '0')

    const year = date.getUTCFullYear()
    const month = pad(date.getUTCMonth() + 1)
    const day = pad(date.getUTCDate())
    const hours = pad(date.getUTCHours())
    const minutes = pad(date.getUTCMinutes())
    const seconds = pad(date.getUTCSeconds())

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

const formatDateToOutlook = (date) => {
    const pad = (num) => num.toString().padStart(2, '0')

    const year = date.getUTCFullYear()
    const month = pad(date.getUTCMonth() + 1)
    const day = pad(date.getUTCDate())
    const hours = pad(date.getUTCHours())

    return `${year}-${month}-${day}T${hours}`
}

const addToCalendar = () => {
    //   showCalendarOptions.value = true
    const startDate = parseDateToUTC(singleEvent.value.event_date, singleEvent.value.event_time);

    if (isNaN(startDate.getTime())) {
        return;
    }

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    if (isNaN(endDate.getTime())) {
        return;
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
        singleEvent.value.title
    )}&dates=${formatDateToUTC(startDate)}/${formatDateToUTC(endDate)}&details=${encodeURIComponent(
        singleEvent.value.content
    )}&location=${encodeURIComponent(singleEvent.value.event_link)}`;

    const outlookCalendarUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(
        singleEvent.value.title
    )}&startdt=${encodeURIComponent(formatDateToOutlook(startDate))}&enddt=${encodeURIComponent(
        formatDateToOutlook(endDate)
    )}&body=${encodeURIComponent(singleEvent.value.content)}&location=${encodeURIComponent(
        singleEvent.value.event_link
    )}`

    if (calendarOption.value === 'google') {
        window.open(googleCalendarUrl, '_blank')
    } else if (calendarOption.value === 'outlook') {
        window.open(outlookCalendarUrl, '_blank')
    }
}

const showRegistrationCompletedNotification = ref(false)
const eventRegistered = ref(false)
const showOptions = ref(false)
const showSocials = ref(false)

const userProfile = useUserProfile();

const userDetails = computed(() => {
  return userProfile.user.data;
});

const useEvent = useEventStore();
const { registerEventData } = storeToRefs(useEvent);

function handleAddtoGoogleCalendar() {
    calendarOption.value = 'google'
    addToCalendar()
    showCalendarOptions.value = false
    showOptions.value = false
    handleCloseNotification()
}

function handleAddtoOutlookCalendar() {
    calendarOption.value = 'outlook'
    addToCalendar()
    showCalendarOptions.value = false
    showOptions.value = false
    handleCloseNotification()
}

function handleShowOptions() {
    showCalendarOptions.value = true
}

const handleRegisterNotification = async () => {
    
    registerEventData.value.event_id = singleEvent.value.id ?? '';
    registerEventData.value.first_name = userDetails.value.first_name ?? '';
    registerEventData.value.last_name = userDetails.value.last_name ?? '';
    registerEventData.value.creative_profession = userDetails.value.skill_title ?? '';
    registerEventData.value.email = userDetails.value.email ?? '';
    registerEventData.value.phone_number = userDetails.value.phone_number ?? '';
    registerEventData.value.description = '';

    apiLoading.value = true;
    try {
        const res = await useEvent.handleRegisterEvent();
        if (res.status === true) {
            showRegistrationCompletedNotification.value = true
        }
        return res;
    } catch (error) {
        console.log(error);
    } finally {
        apiLoading.value = false;
    }
}

function handleCloseNotification() {
    showRegistrationCompletedNotification.value = false
    showCalendarOptions.value = false
    eventRegistered.value = true
}

function handleCancelRegistration() {
    eventRegistered.value = false
}

const handleViewMore = () => {
    router.push({ name: 'events' })
}
</script>

<template>
    <section class="event-detail">
        <DashboardLayout>
            <ShortLoader v-if="loading" />
            <section class="w-[80%] msgMob:w-[90%] mx-auto mt-[4rem]" v-else>
                <article class="flex justify-between flex-col md:flex-row gap-[4.65rem]">
                    <div class="flex flex-col w-full md:w-3/6">
                        <span
                            class="bg-[#00474F] rounded-[0.86rem] text-[#fff] font-Satoshi700 text-[0.59rem] leading-[0.39rem] py-[0.7rem] eventBreak1:text-[0.4rem] eventBreak1:w-[50%] px-[1.47] w-[40%] text-center uppercase tracking-[0.38rem] eventBreak1:tracking-[0.15rem] eventBreak1:mb-4 mb-[1.5rem]">online
                            event</span>
                        <h3
                            class="text-[#000] font-Satoshi700 text-[2rem] eventBreak1:text-[1rem] eventBreak1:leading-[1.2rem] leading-[2.26463rem]">
                            {{ singleEvent.title }}
                        </h3>
                        <div class="mb-10 mt-5 h-[300px]">
                            <img :src="singleEvent.featured_graphics" alt="event image"
                                class="object-cover rounded-[2.1875rem] w-full h-full" />
                        </div>
                        
                    </div>
                    <div class="rounded-[2.1875rem] w-full md:w-3/6">
                        <div
                            class="mt-[116px] mb-[30px] eventBreak1:mt-4 bg-[#ECFAFC] rounded-[20px] eventBreak1:px-4 px-[2.2rem] py-[1.5rem] eventBreak1:py-[0.7rem] flex gap-10 w-full md:w-[380px] ms-auto">
                            <div class="schedule flex flex-col gap-4 eventBreak1:gap-[0.5rem]">
                                <div>
                                    <div for="">Date</div>
                                    <span class=" text-sm font-bold">{{ singleEvent.event_date }}</span>
                                </div>
                                <div>
                                    <label for="">Time</label>
                                    <h3>{{ singleEvent.event_time }}</h3>
                                </div>
                            </div>
                            <div class="schedule flex flex-col gap-4 eventBreak1:gap-[0.5rem]">
                                <div>
                                    <label for="">Location</label>
                                    <h3>{{ singleEvent.address }}</h3>
                                </div>
                                <div>
                                    <label for="">Time-zone</label>
                                    <h3>{{ singleEvent.timezone }}</h3>
                                </div>
                            </div>
                        </div>
                        <div>
                        <div class="bg-[#007582] rounded-[1.4rem] px-[3rem] py-[1.7rem] eventBreak1:px-[2rem] eventBreak1:py-4 eventBreak1:rounded-[0.5rem] w-full md:w-[380px] ms-auto"
                            :class="{ registered: eventRegistered }" v-if="!singleEvent.is_registered">
                            <div class="w-full grid place-items-center">
                                <h3 class="text-[#fff] font-Satoshi500 text-[1.3rem] eventBreak1:text-[1rem]">
                                    Register
                                </h3>
                                <button
                                    class="mt-[1.2rem] bg-[#ECFAFC] rounded-[1.6rem] w-[70%] mx-auto text-center py-[0.6rem] text-[#000] font-Satoshi500 leading-[0.8rem] text-[1rem] eventBreak1:text-[0.7rem]"
                                    @click="handleRegisterNotification">
                                    <div class="flex items-center justify-center">
                                        <span v-if="apiLoading"><SpinnerComponent /></span>
                                        <span v-else>Register for this Event</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div class="bg-[#ECFAFC] rounded-[1.4rem] px-[3rem] py-[1.7rem] eventBreak1:px-[2rem] eventBreak1:py-4 eventBreak1:rounded-[0.5rem] w-full md:w-[380px] ms-auto"
                            :class="{ registered: eventRegistered }" v-if="singleEvent.is_registered">
                            <div class="w-full text-center">
                                <h3 class="text-[#000] font-Satoshi500 text-[1.3rem] eventBreak1:text-[1rem] !mb-[0.5rem]">
                                    Thanks for registering, {{ userDetails.first_name }} {{ userDetails.last_name }}
                                </h3>
                                <p class="eventBreak1:text-[0.7rem] text-[1rem]">We recommend you:</p>
                                <div class="relative mt-[0.6rem] recommendations">
                                    <div class="cursor-pointer flex items-center gap-[0.7rem] w-[90%] mx-auto"
                                        @click="showOptions = !showOptions">
                                        <svg width="39" height="39" viewBox="0 0 39 39" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="19.0771" cy="19.6328" r="19" fill="#92E4EC" />
                                            <path d="M18.9571 15.3128H15.7571V13.0128H21.4171V27.6328H18.9571V15.3128Z"
                                                fill="#007582" />
                                        </svg>
                                        <div
                                            class="flex items-center rounded-[0.4rem] bg-[#43D0DF] text-[#fff] w-[100%] eventBreak1:w-full py-[0.5rem] justify-center">
                                            <calendarIcon class="!text-white" />
                                            <div class="flex items-center gap-[0.5rem]">
                                                <h3 class="">Add to Calendar</h3>
                                                <rightArrowM class="!text-white rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full h-auto">
                                        <ul class="w-[90%] mx-auto h-auto calendarIcons mt-4 transitionItem"
                                            :class="{ hideOptions: !showOptions }">
                                            <li class="flex items-center justify-center h-[fit] border border-[#007582] rounded-[0.5rem] py-[0.2rem] gap-4 text-[#000] font-Satoshi500 cursor-pointer"
                                                @click="handleAddtoGoogleCalendar">
                                                <googleCalendarIcon />
                                                <h3>Google</h3>
                                            </li>
                                            <li class="flex items-center justify-center h-[fit] border border-[#007582] rounded-[0.5rem] py-[0.2rem] gap-4 text-[#000] font-Satoshi500 mt-[0.5rem] cursor-pointer"
                                                @click="handleAddtoOutlookCalendar">
                                                <outlookCalendarIcon />
                                                <h3>Outlook</h3>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="cursor-pointer flex items-center gap-[0.7rem] w-[90%] mx-auto">
                                        <svg width="39" height="39" viewBox="0 0 39 39" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="19.0771" cy="19.6328" r="19" fill="#92E4EC" />
                                            <path
                                                d="M24.1371 27.6128L13.9971 27.6328V25.7128L18.7771 21.6728C20.7571 19.9928 21.4171 19.0328 21.4171 17.6328C21.4171 15.9728 20.5171 15.0328 18.9771 15.0328C17.3771 15.0328 16.3771 16.1528 16.3571 18.0328H13.8171C13.8371 14.8328 15.8771 12.7528 18.9771 12.7528C22.0971 12.7528 24.0371 14.5328 24.0371 17.4928C24.0371 19.5328 22.9171 21.0728 20.6971 22.9728L18.0571 25.2328H24.1371V27.6128Z"
                                                fill="#007582" />
                                        </svg>
                                        <div
                                            class="text-center rounded-[0.4rem] text-[#000] border border-[#2C4C50] w-[100%] eventBreak1:w-full py-[0.5rem] gap-4">
                                            <h3>Invite a friend</h3>
                                        </div>
                                    </div>
                                    <div class="cursor-pointer flex items-center gap-[0.7rem] w-[90%] mx-auto"
                                        @click="showSocials = !showSocials">
                                        <svg width="39" height="39" viewBox="0 0 39 39" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="19.0771" cy="19.6328" r="19" fill="#92E4EC" />
                                            <path
                                                d="M18.2571 20.3928H16.4771V18.7328L20.2371 15.2728H14.1571V13.0128H23.4371V15.0528L19.8771 18.3328C22.1171 18.7728 23.8571 20.4128 23.8571 22.9928C23.8571 25.9928 21.5171 27.8928 18.5571 27.8928C15.6971 27.8928 13.4771 26.1328 13.4771 22.9728H15.9971C15.9971 24.6528 17.0371 25.6128 18.5971 25.6128C20.1971 25.6128 21.2571 24.5728 21.2571 22.9528C21.2571 21.4728 20.2971 20.3928 18.2571 20.3928Z"
                                                fill="#007582" />
                                        </svg>
                                        <div
                                            class="text-center rounded-[0.4rem] text-[#000] border border-[#2C4C50] w-[100%] eventBreak1:w-full py-[0.5rem] gap-4">
                                            <h3>Share</h3>
                                        </div>
                                    </div>
                                    <div class="share w-[90%] ml-auto h-auto mr-4 calendarIcons mt-[0.5rem] transitionItem"
                                        :class="{ hideOptions: !showSocials }">
                                        <Share class="!justify-center !gap-6" />
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <h3 class="text-sm">
                                        No longer attending?
                                        <span class="!text-[#853232] cursor-pointer" @click="handleCancelRegistration"> 
                                            Cancel Registration
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </article>
                <article class="detail-container !items-start gap-[5rem] mt-5 md:mt-0 md:w-3/6">
                    <div>
                        <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">About the Event</h3>
                        <div class="about mt-6 font-Satoshi400 text-[#000] leading-[1.5rem] text-4 eventBreak1:text-[0.8rem] eventBreak1:leading-[1.3rem]"
                            v-html="singleEvent.content"></div>
                    </div>
                </article>
                <article class="my-[3rem] msgMob:w-full w-[50%] eventBreak1:my-[2rem]">
                    <div class="mb-[3.5rem]">
                        <h3
                            class="font-Satoshi700 text-[#000] text-[1.5rem] leading-6 eventBreak1:text-[1rem] eventBreak1:leading-4">
                            Speaker:
                        </h3>
                        <div class="mt-6 eventBreak1:mt-4 flex items-center gap-6">
                            <div class="w-[4rem] h-[4rem] rounded-[100%] overflow-hidden">
                                <img :src="singleEvent.featured_speaker" alt="" class="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 class="font-Satoshi700 text-[#000] text-4 leading-4 pb-1 eventBreak1:text-[0.9rem]">
                                    {{ singleEvent.speaker }}
                                </h3>
                                <p class="text-sm font-normal">{{ singleEvent.speaker_title }}</p>
                                <div class="mt-1">
                                    <a :href="singleEvent.linkedln" target="_blank" class="mt-[0.2rem]">
                                        <img src="../../assets/events/linkedin.svg" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">
                            About {{ singleEvent.speaker }}
                        </h3>
                        <p
                            class="mt-6 font-Satoshi400 text-[#000] leading-[1.5rem] text-4 eventBreak1:text-[0.8rem] eventBreak1:leading-[1.3rem]">
                            {{ singleEvent.speaker_bio }}
                        </p>
                    </div>
                </article>
                <article class="w-[50%] msgMob:w-full">
                    <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">Sponsors</h3>
                    <div v-if="singleEvent.brand_partners && singleEvent.brand_partners.length === 0">
                        <p class="pt-3">No sponsor available.</p>
                    </div>
                    <div class="flex gap-[1.4rem] flex-wrap mt-[1.7rem] msgMob:justify-center">
                        <div class="w-[4rem] h-[4rem] overflow-hidden" v-for="image in singleEvent.brand_partners"
                            :key="image">
                            <img :src="image.image" alt="" class="object-fit" />
                        </div>
                    </div>
                </article>
                <article class="w-[95%] msgMob:w-full mx-auto mt-[3rem]">
                    <div class="text-center">
                        <h3 class="font-Satoshi700 text-[#000] leading-5">Related Events</h3>
                    </div>
                    <div class="my-10">
                        <div class="flex gap-3 flex-col md:flex-row">
                            <div class="mb-4" v-for="event in relatedEvents" :key="event.id">
                                <div class="w-full md:w-[320px]">
                                    <div class="rounded-t-[1rem] h-[200px]">
                                        <img :src="event.featured_graphics" alt=""
                                        class="w-full h-full object-cover rounded-t-[1rem]" />
                                    </div>
                                    <div class="px-[0.7rem] py-[0.5rem] bg-[#ECFAFC] rounded-b-[1rem]">
                                        <h1 class="text-[#000] text-[0.8rem] font-Satoshi700 leading-[1rem] mb-4">
                                        {{ event.title }}
                                        </h1>
                                        <div class="event_details flex flex-col gap-[0.29rem] my-[0.5rem]">
                                        <div class="flex items-center gap-[0.63rem]">
                                            <locationIcon />
                                            <p>{{ event.address }}</p>
                                        </div>
                                        <div class="flex items-center gap-[0.63rem]">
                                            <calendarIcon />
                                            <p>{{ event.event_date }}</p>
                                        </div>
                                        <div class="flex items-center gap-[0.63rem]">
                                            <timerIcon />
                                            <p>{{ event.event_time }}</p>
                                        </div>
                                        </div>
                                        <router-link :to="{ name: 'event-detail', params: { slug: event.slug } }"
                                        class="event_btn">
                                        <div class="w-[100%] flex items-center justify-between px-4 py-[0.7rem] bg-[#43D0DF] rounded-[0.46rem] btn-hover-1 my-3">
                                            <h3 class="reg font-Satoshi700 text-[#000] text-[0.865rem] leading-4 eventBreak1:text-[0.7rem]">
                                            Register
                                            </h3>
                                            <rightArrowM class="reg" />
                                        </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid place-items-center">
                        <button
                            class="bg-[#31795A] rounded-[1.7rem] py-[1rem] font-Satoshi500 leading-[0.7rem] text-[#fff] w-[30%] btn-hover-2 eventBreak1:text-[0.8rem] msgMob:w-[45%]"
                            @click="handleViewMore">
                            View More Events
                        </button>
                    </div>
                </article>
                <div class="fixed top-0 left-0 bg-[#87878780] w-full h-[100vh] z-[999] grid place-items-center"
                    v-if="showRegistrationCompletedNotification">
                    <div class="bg-white rounded-[1rem] p-[2rem] pt-4 text-center msgMob:w-[90%]">
                        <div class="w-full flex justify-end" @click="handleCloseNotification">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 19 24"
                                fill="none">
                                <path
                                    d="M18.9534 2.83711L17.08 0.46875L9.6532 9.8582L2.22635 0.46875L0.353027 2.83711L7.77988 12.2266L0.353027 21.616L2.22635 23.9844L9.6532 14.5949L17.08 23.9844L18.9534 21.616L11.5265 12.2266L18.9534 2.83711Z"
                                    fill="#323232" />
                            </svg>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-[100px] mb-6">
                                <img src="../../assets/image/Logo-img.png" alt="" />
                            </div>
                            <div class="w-[85%] msgMob:w-full mb-[0.5rem]">
                                <h3 class="text-[#011B1F] font-Satoshi400 text-[1rem] leading-4 msgMob:text-[0.8rem]">
                                    You are successfully registered for:
                                </h3>
                                <p
                                    class="text-[#6BA336] font-Satoshi700 text-[1rem] leading-4 mt-[0.5rem] msgMob:text-[0.8rem]">
                                    {{ singleEvent.title }}
                                </p>
                            </div>
                            <div class="shareEvent flex items-center gap-[0.7rem]">
                                <h3 class="font-Satoshi400 leading-4 text-4 msgMob:text-[0.8rem]">Share event:</h3>
                                <Share />
                            </div>
                            <div class="w-full">
                                <button
                                    class="bg-[#007582] rounded-[0.5rem] w-[50%] mx-auto py-[0.5rem] mt-4 text-[#fff] text-[1rem] msgMob:text-[0.8rem] btn-hover-1"
                                    @click="handleShowOptions">
                                    Add to calendar
                                </button>
                                <ul class="w-[50%] mx-auto calendarIcons mt-4 transitionItem"
                                    v-if="showCalendarOptions">
                                    <li class="flex items-center justify-center h-[fit] border border-[#007582] rounded-[0.5rem] py-[0.2rem] gap-4 text-[#000] font-Satoshi500 cursor-pointer"
                                        @click="handleAddtoGoogleCalendar">
                                        <googleCalendarIcon />
                                        <h3>Google</h3>
                                    </li>
                                    <li class="flex items-center justify-center h-[fit] border border-[#007582] rounded-[0.5rem] py-[0.2rem] gap-4 text-[#000] font-Satoshi500 mt-[0.5rem] cursor-pointer"
                                        @click="handleAddtoOutlookCalendar">
                                        <outlookCalendarIcon />
                                        <h3>Outlook</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    </section>
</template>

<style scoped>
.calendarIcons svg {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

.detail-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: end;
    justify-content: end;
}

.eventAds-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
}

.detail-container label {
    color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
}

.eventAds h1,
.eventAds p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.eventAds h1 {
    font-weight: 600;
}

.eventAds p {
    font-size: 0.6rem;
    line-height: 1rem;
}

.schedule h3 {
    color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    transform: uppercase;
    margin-top: 0.3rem;
}

.registered {
    background: #e9fafb;
}

.recommendations svg {
    width: 25px;
}

.recommendations h3 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
}
</style>






<!-- Fixxx -->
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '@/components/layout/dashboardLayout.vue'
import calendarIcon from '@/components/icons/eventCalendarIcon.vue'
import locationIcon from '@/components/icons/eventLocationIcon.vue'
import timerIcon from '@/components/icons/eventTimerIcon.vue'
import rightArrowM from '@/components/icons/rightArrowM.vue'
import Share from '@/components/ui/SocialShare.vue'
import googleCalendarIcon from '@/components/icons/googleCalendarIcon.vue'
import outlookCalendarIcon from '@/components/icons/outlookCalendarIcon.vue'
import { useEventStore } from '../../stores/event'
import { storeToRefs } from 'pinia'
import { useUserProfile } from "@/stores/profile"
import SpinnerComponent from '../../components/spinner/SpinnerComponent.vue'

const showCalendarOptions = ref(false)
const calendarOption = ref()
const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()
const singleEvent = ref({})
const loading = ref(false)
const relatedEvents = ref([])
const apiLoading = ref(false)

const fetchSingleEvent = async () => {
    loading.value = true

    try {
        const res = await eventStore.handleGetEventDetailsBySlug(route.params.slug)
        if (res && res.data) {
            singleEvent.value = res.data
        } else {
            console.error('No data returned from API')
        }
    } catch (error) {
        console.error('Error fetching event details:', error)
    } finally {
        loading.value = false
    }
}

const fetchRelatedEvents = async () => {
    loading.value = true

    try {
        const res = await eventStore.related()
        if (res && res.data) {
            relatedEvents.value = res.data
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
    fetchSingleEvent()
    fetchRelatedEvents()
})

watch(
    () => route.params.slug,
    async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            await fetchSingleEvent()
            await fetchRelatedEvents()
        }
    }
)

const parseDateToUTC = (dateStr, timeStr) => {
    const [day, monthName, year] = dateStr.split(' ');
    const month = new Date(Date.parse(monthName + " 1, 2024")).getMonth();

    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    const localDate = new Date(year, month, day, hours, minutes);
    const utcDate = new Date(localDate.getTime() - (0 * 60 * 60 * 1000));

    return utcDate;
}


const formatDateToUTC = (date) => {
    const pad = (num) => num.toString().padStart(2, '0')

    const year = date.getUTCFullYear()
    const month = pad(date.getUTCMonth() + 1)
    const day = pad(date.getUTCDate())
    const hours = pad(date.getUTCHours())
    const minutes = pad(date.getUTCMinutes())
    const seconds = pad(date.getUTCSeconds())

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

const formatDateToOutlook = (date) => {
    const pad = (num) => num.toString().padStart(2, '0')

    const year = date.getUTCFullYear()
    const month = pad(date.getUTCMonth() + 1)
    const day = pad(date.getUTCDate())
    const hours = pad(date.getUTCHours())

    return `${year}-${month}-${day}T${hours}`
}

const addToCalendar = () => {
    //   showCalendarOptions.value = true
    const startDate = parseDateToUTC(singleEvent.value.event_date, singleEvent.value.event_time);

    if (isNaN(startDate.getTime())) {
        return;
    }

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    if (isNaN(endDate.getTime())) {
        return;
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
        singleEvent.value.title
    )}&dates=${formatDateToUTC(startDate)}/${formatDateToUTC(endDate)}&details=${encodeURIComponent(
        singleEvent.value.content
    )}&location=${encodeURIComponent(singleEvent.value.event_link)}`;

    const outlookCalendarUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(
        singleEvent.value.title
    )}&startdt=${encodeURIComponent(formatDateToOutlook(startDate))}&enddt=${encodeURIComponent(
        formatDateToOutlook(endDate)
    )}&body=${encodeURIComponent(singleEvent.value.content)}&location=${encodeURIComponent(
        singleEvent.value.event_link
    )}`

    if (calendarOption.value === 'google') {
        window.open(googleCalendarUrl, '_blank')
    } else if (calendarOption.value === 'outlook') {
        window.open(outlookCalendarUrl, '_blank')
    }
}

const showRegistrationCompletedNotification = ref(false)
const eventRegistered = ref(false)
const showOptions = ref(false)
const showSocials = ref(false)

const userProfile = useUserProfile();

const userDetails = computed(() => {
  return userProfile.user.data;
});

const useEvent = useEventStore();
const { registerEventData } = storeToRefs(useEvent);

function handleAddtoGoogleCalendar() {
    calendarOption.value = 'google'
    addToCalendar()
    showCalendarOptions.value = false
    showOptions.value = false
    handleCloseNotification()
}

function handleAddtoOutlookCalendar() {
    calendarOption.value = 'outlook'
    addToCalendar()
    showCalendarOptions.value = false
    showOptions.value = false
    handleCloseNotification()
}

function handleShowOptions() {
    showCalendarOptions.value = true
}

const handleRegisterNotification = async () => {
    
    registerEventData.value.event_id = singleEvent.value.id ?? '';
    registerEventData.value.first_name = userDetails.value.first_name ?? '';
    registerEventData.value.last_name = userDetails.value.last_name ?? '';
    registerEventData.value.creative_profession = userDetails.value.skill_title ?? '';
    registerEventData.value.email = userDetails.value.email ?? '';
    registerEventData.value.phone_number = userDetails.value.phone_number ?? '';
    registerEventData.value.description = '';

    apiLoading.value = true;
    try {
        const res = await useEvent.handleRegisterEvent();
        if (res.status === true) {
            showRegistrationCompletedNotification.value = true
        }
        return res;
    } catch (error) {
        console.log(error);
    } finally {
        apiLoading.value = false;
    }
}

function handleCloseNotification() {
    showRegistrationCompletedNotification.value = false
    showCalendarOptions.value = false
    eventRegistered.value = true
}

function handleCancelRegistration() {
    eventRegistered.value = false
}

const handleViewMore = () => {
    router.push({ name: 'events' })
}
</script>

<template>
    <section class="event-detail">
        <DashboardLayout>
            <ShortLoader v-if="loading" />
            <section class="w-[80%] msgTab:w-[90%] mx-auto mt-[4rem]" v-else>
                <article class="grid md:grid-cols-2 grid-cols-1  w-full gap-[4.65rem] items-end !mb-[4rem]">
                    <div class="flex flex-col gap-4 w-full">
                        <span
                            class="bg-[#00474F] rounded-[0.86rem] text-[#fff] font-Satoshi700 text-[0.59rem] leading-[0.39rem] py-[0.7rem] eventBreak1:text-[0.4rem] eventBreak1:w-[50%] px-[1.47] w-[40%] text-center uppercase tracking-[0.38rem] eventBreak1:tracking-[0.15rem] eventBreak1:mb-4">online
                            event</span>
                        <h3
                            class="text-[#000] font-Satoshi700 text-[2rem] eventBreak1:text-[1rem] eventBreak1:leading-[1.2rem] leading-[2.26463rem]">
                            {{ singleEvent.title }}
                        </h3>
                        <div class="md:hidden rounded-[2.1875rem] msgMob:min-h-[auto] w-full md:w-3/6">
                            <div class="h-full rounded-[2.1875rem] overflow-hidden msgMob:rounded-[0.5rem]">
                                <img :src="singleEvent.featured_graphics" alt="event image"
                                class="object-cover w-full h-full min-h-[300px] msgMob:object-contain msgMob:min-h-[auto]"/>
                            </div>
                        </div>
                        <div
                            class="eventBreak1:mt-4 bg-[#ECFAFC] rounded-[20px] eventBreak1:px-4 px-[2.2rem] py-[1.5rem] eventBreak1:py-[0.7rem] flex gap-10 justify-between w-full w-full-auto">
                            <div class="schedule flex flex-col gap-4 eventBreak1:gap-[0.5rem]">
                                <div>
                                    <label for="date">Date</label>
                                    <h3 id="date" class="">{{ singleEvent.event_date }}</h3>
                                </div>
                                <div>
                                    <label for="">Time</label>
                                    <h3>{{ singleEvent.event_time }}</h3>
                                </div>
                            </div>
                            <div class="schedule flex flex-col gap-4 eventBreak1:gap-[0.5rem]">
                                <div>
                                    <label for="">Location</label>
                                    <h3>{{ singleEvent.address }}</h3>
                                </div>
                                <div>
                                    <label for="">Time-zone</label>
                                    <h3>{{ singleEvent.timezone }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block rounded-[2.1875rem] h-[100%] w-full">
                        <div class="h-[100%] rounded-[2.1875rem] overflow-hidden msgMob:rounded-[0.5rem">
                            <img :src="singleEvent.featured_graphics" alt="event image"
                            class="object-co w-full h-full msgMob:object-contan msgMob:min-h-[auto] msgTab:border-2"/>
                        </div>
                    </div>
                </article>
                <article class="detail-container !items-start gap-[5rem] mt-5 md:w-3/6">
                    <div>
                        <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">About the Event</h3>
                        <div class="about mt-6 font-Satoshi400 text-[#000] leading-[1.5rem] text-4 eventBreak1:text-[0.8rem] eventBreak1:leading-[1.3rem]"
                            v-html="singleEvent.content"></div>
                    </div>
                </article>
                <article class="my-[3rem] msgMob:w-full w-[50%] eventBreak1:my-[2rem]">
                    <div class="mb-[3.5rem]">
                        <h3
                            class="font-Satoshi700 text-[#000] text-[1.5rem] leading-6 eventBreak1:text-[1rem] eventBreak1:leading-4">
                            Speaker:
                        </h3>
                        <div class="mt-6 eventBreak1:mt-4 flex items-center gap-6">
                            <div class="w-[4rem] h-[4rem] rounded-[100%] overflow-hidden">
                                <img :src="singleEvent.featured_speaker" alt="" class="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 class="font-Satoshi700 text-[#000] text-4 leading-4 pb-1 eventBreak1:text-[0.9rem]">
                                    {{ singleEvent.speaker }}
                                </h3>
                                <p class="text-sm font-normal">{{ singleEvent.speaker_title }}</p>
                                <div class="mt-1">
                                    <a :href="singleEvent.linkedln" target="_blank" class="mt-[0.2rem]">
                                        <img src="../../assets/events/linkedin.svg" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">
                            About {{ singleEvent.speaker }}
                        </h3>
                        <p
                            class="mt-6 font-Satoshi400 text-[#000] leading-[1.5rem] text-4 eventBreak1:text-[0.8rem] eventBreak1:leading-[1.3rem]">
                            {{ singleEvent.speaker_bio }}
                        </p>
                    </div>
                </article>
                <article class="w-[50%] msgMob:w-full">
                    <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">Sponsors</h3>
                    <div v-if="singleEvent.brand_partners && singleEvent.brand_partners.length === 0">
                        <p class="pt-3">No sponsor available.</p>
                    </div>
                    <div class="flex gap-[1.4rem] flex-wrap mt-[1.7rem] msgMob:justify-center">
                        <div class="w-[4rem] h-[4rem] overflow-hidden" v-for="image in singleEvent.brand_partners"
                            :key="image">
                            <img :src="image.image" alt="" class="object-fit" />
                        </div>
                    </div>
                </article>
                <article class="w-[95%] msgMob:w-full mx-auto mt-[3rem]">
                    <div class="text-center">
                        <h3 class="font-Satoshi700 text-[#000] leading-5">Related Events</h3>
                    </div>
                    <div class="my-10">
                        <div class="grid grid-cols-customGrid gap-3 msgMob:grid-cols-1">
                            <div class="mb-4" v-for="event in relatedEvents" :key="event.id">
                                <div class=" flex flex-col h-full">
                                    <div class="rounded-t-[1rem]">
                                        <img :src="event.featured_graphics" alt=""
                                        class="w-full object-contain h-full rounded-t-[1rem]" />
                                    </div>
                                    <div class="flex-grow px-[1.24rem] pb-[2rem] pt-4 bg-[#ECFAFC] rounded-b-[1.32038rem] flex flex-col justify-between">
                                        <h1 class="text-[#000] text-[0.8rem] font-Satoshi700 leading-[1rem] mb-4">
                                        {{ event.title }}
                                        </h1>
                                        <div class="event_details flex flex-col gap-[0.29rem] my-[0.5rem]">
                                        <div class="flex items-center gap-[0.63rem]">
                                            <locationIcon />
                                            <p>{{ event.address }}</p>
                                        </div>
                                        <div class="flex items-center gap-[0.63rem]">
                                            <calendarIcon />
                                            <p>{{ event.event_date }}</p>
                                        </div>
                                        <div class="flex items-center gap-[0.63rem]">
                                            <timerIcon />
                                            <p>{{ event.event_time }}</p>
                                        </div>
                                        </div>
                                        <router-link :to="{ name: 'event-detail', params: { slug: event.slug } }"
                                        class="event_btn">
                                        <div class="w-[100%] flex items-center justify-between px-4 py-[0.7rem] bg-[#43D0DF] rounded-[0.46rem] btn-hover-1 my-3">
                                            <h3 class="reg font-Satoshi700 text-[#000] text-[0.865rem] leading-4 eventBreak1:text-[0.7rem]">
                                            Register
                                            </h3>
                                            <rightArrowM class="reg" />
                                        </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid place-items-center">
                        <button
                            class="bg-[#31795A] rounded-[1.7rem] py-[1rem] font-Satoshi500 leading-[0.7rem] text-[#fff] w-[30%] btn-hover-2 eventBreak1:text-[0.8rem] msgMob:w-[45%]"
                            @click="handleViewMore">
                            View More Events
                        </button>
                    </div>
                </article>
                <div class="fixed top-0 left-0 bg-[#87878780] w-full h-[100vh] z-[999] grid place-items-center"
                    v-if="showRegistrationCompletedNotification">
                    <div class="bg-white rounded-[1rem] p-[2rem] pt-4 text-center msgMob:w-[90%]">
                        <div class="w-full flex justify-end" @click="handleCloseNotification">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 19 24"
                                fill="none">
                                <path
                                    d="M18.9534 2.83711L17.08 0.46875L9.6532 9.8582L2.22635 0.46875L0.353027 2.83711L7.77988 12.2266L0.353027 21.616L2.22635 23.9844L9.6532 14.5949L17.08 23.9844L18.9534 21.616L11.5265 12.2266L18.9534 2.83711Z"
                                    fill="#323232" />
                            </svg>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-[100px] mb-6">
                                <img src="../../assets/image/Logo-img.png" alt="" />
                            </div>
                            <div class="w-[85%] msgMob:w-full mb-[0.5rem]">
                                <h3 class="text-[#011B1F] font-Satoshi400 text-[1rem] leading-4 msgMob:text-[0.8rem]">
                                    You are successfully registered for:
                                </h3>
                                <p
                                    class="text-[#6BA336] font-Satoshi700 text-[1rem] leading-4 mt-[0.5rem] msgMob:text-[0.8rem]">
                                    {{ singleEvent.title }}
                                </p>
                            </div>
                            <div class="shareEvent flex items-center gap-[0.7rem]">
                                <h3 class="font-Satoshi400 leading-4 text-4 msgMob:text-[0.8rem]">Share event:</h3>
                                <Share />
                            </div>
                            <div class="w-full">
                                <button
                                    class="bg-[#007582] rounded-[0.5rem] w-[50%] mx-auto py-[0.5rem] mt-4 text-[#fff] text-[1rem] msgMob:text-[0.8rem] btn-hover-1"
                                    @click="handleShowOptions">
                                    Add to calendar
                                </button>
                                <ul class="w-[50%] mx-auto calendarIcons mt-4 transitionItem"
                                    v-if="showCalendarOptions">
                                    <li class="flex items-center justify-center h-[fit] border border-[#007582] rounded-[0.5rem] py-[0.2rem] gap-4 text-[#000] font-Satoshi500 cursor-pointer"
                                        @click="handleAddtoGoogleCalendar">
                                        <googleCalendarIcon />
                                        <h3>Google</h3>
                                    </li>
                                    <li class="flex items-center justify-center h-[fit] border border-[#007582] rounded-[0.5rem] py-[0.2rem] gap-4 text-[#000] font-Satoshi500 mt-[0.5rem] cursor-pointer"
                                        @click="handleAddtoOutlookCalendar">
                                        <outlookCalendarIcon />
                                        <h3>Outlook</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    </section>
</template>

<style scoped>
.calendarIcons svg {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

.detail-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: end;
    justify-content: end;
}

.eventAds-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
}

.detail-container label {
    color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
}

.eventAds h1,
.eventAds p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.eventAds h1 {
    font-weight: 600;
}

.eventAds p {
    font-size: 0.6rem;
    line-height: 1rem;
}

.schedule h3 {
    color: #000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    transform: uppercase;
    margin-top: 0.3rem;
}

.registered {
    background: #e9fafb;
}

.recommendations svg {
    width: 25px;
}

.recommendations h3 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
}
</style>


