<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import calendarIcon from "@/components/icons/eventCalendarIcon.vue"
import locationIcon from "@/components/icons/eventLocationIcon.vue"
import timerIcon from "@/components/icons/eventTimerIcon.vue"
import rightArrowM from "@/components/icons/rightArrowM.vue";
import cancelIcon from "@/components/icons/cancelIcon.vue"
import facebookIcon from "@/components/icons/eventFacebookIcon.vue"
import whatsAppIcon from "@/components/icons/whatsAppIcon.vue"
import LinkedinIcon from "@/components/icons/eventLinkedinIcon.vue"
import twitterIcon from "@/components/icons/eventTwitterIcon.vue"

const route = useRouter()

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
]

const showRegistrationCompletedNotification = ref(false)
const eventRegistered = ref(false)

function handleRegisterNotification(){
    showRegistrationCompletedNotification.value = true
}

function handleCloseNotification(){
    showRegistrationCompletedNotification.value = false
    eventRegistered.value = true
}

function handleCancelRegistration(){
    eventRegistered.value = false
}

function handleViewMore(){
    route.push({ name: 'events'})
}


</script>

<template>
  <section class="event-detail">
    <DashboardLayout>
       <section class="w-[80%] msgMob:w-[90%] mx-auto mt-[4rem]">
            <article class="detail-container gap-[4.65rem]">
                <div class="flex flex-col justify-end">
                    <span class="bg-[#00474F] rounded-[0.86rem] text-[#fff] font-Satoshi700 text-[0.59rem] leading-[0.39rem] py-[0.7rem] eventBreak1:text-[0.4rem] eventBreak1:w-[50%] px-[1.47] w-[40%] text-center uppercase tracking-[0.38rem] eventBreak1:tracking-[0.15rem] eventBreak1:mb-4 mb-[1.5rem]">online event</span>
                    <h3 class="text-[#000] font-Satoshi700 text-[2rem] eventBreak1:text-[1rem] eventBreak1:leading-[1.2rem] leading-[2.26463rem]">
                        Creating Your Professional Workspace With 
                        Low Budget
                    </h3>
                    <p class="mt-4 eventBreak1:mt-[0.5rem] text-[#000] font-Satoshi400 text-4 eventBreak1:text-[0.7rem] leading-4">Learn how to design your workspace with minimal budget</p>
                    <div class="mt-[1.5rem] eventBreak1:mt-4 bg-[#ECFAFC] rounded-[0.5rem] eventBreak1:px-4 px-[1.5rem] py-[1rem] eventBreak1:py-[0.7rem] flex justify-between">
                        <div class="schedule flex flex-col gap-4 eventBreak1:gap-[0.5rem]">
                            <div>
                                <label for="">Date</label>
                                <h3>22ND MAY, 2024</h3>
                            </div>
                            <div>
                                <label for="">time</label>
                                <h3>06:00PM - 07:00PM</h3>
                            </div>
                        </div>
                        <div class="schedule flex flex-col gap-4 eventBreak1:gap-[0.5rem]">  
                            <div>
                                <label for="">location</label>
                                <h3 class="uppercase">online</h3>
                            </div>
                            <div>
                                <label for="">time-zone</label>
                                <h3>GMT+01:00 - Africa</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rounded-[2.1875rem] overflow-hidden eventBreak1:rounded-[1rem]">
                    <img src="@/assets/image/event_detail_img.png" alt="event image" class="object-fit">
                </div>
            </article>
            <article class="detail-container !items-start gap-[5rem] mt-[5rem] eventBreak1:mt-[3.5rem]">
                <div>
                    <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">About the Event</h3>
                    <div class="about mt-6 font-Satoshi400 text-[#000] leading-[1.5rem] text-4 eventBreak1:text-[0.8rem] eventBreak1:leading-[1.3rem]">
                        <p>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat <br>
        
                            sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt <br>
        
                            ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                        </p>
                    </div>
                </div>
                <div>
                    <div class="bg-[#007582] rounded-[0.7rem] px-[3rem] py-[1.8rem] eventBreak1:px-[2rem] eventBreak1:py-4 eventBreak1:rounded-[0.5rem] w-full"
                    :class="{registered: eventRegistered}"
                    >
                        <div class="w-full place-items-center" v-if="!eventRegistered">
                            <h3 class="text-[#fff] font-Satoshi500 leading-[1.5rem] text-[1.5rem] eventBreak1:text-[1rem]">Register</h3>
                            <button class="mt-[1.5rem] bg-[#ECFAFC] rounded-[1.6rem] w-[90%] mx-auto text-center py-[1rem] text-[#000] font-Satoshi500 leading-[0.8rem] text-[1rem] eventBreak1:text-[0.7rem]"
                            @click="handleRegisterNotification"
                            >Register for this Event</button>
                        </div>
                        <div class="w-full text-center" v-if="eventRegistered">
                            <h3 class="text-[#000] font-Satoshi500 leading-[1.5rem] text-[1.5rem] eventBreak1:text-[1rem] !mb-[0.5rem]">Thanks for registering, Josh</h3>
                            <p class="eventBreak1:text-[0.7rem] text-[1rem]">We recommend you:</p>
                            <div class="mt-[0.6rem] recommendations">
                                <div class="cursor-pointer flex items-center gap-[0.7rem] w-[90%] mx-auto">
                                    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19.0771" cy="19.6328" r="19" fill="#92E4EC"/>
                                    <path d="M18.9571 15.3128H15.7571V13.0128H21.4171V27.6328H18.9571V15.3128Z" fill="#007582"/>
                                    </svg>
                                    <div class="flex items-center rounded-[0.4rem] bg-[#43D0DF] text-[#fff] w-[100%] eventBreak1:w-full py-[0.5rem] justify-center">
                                        <calendarIcon class="!text-white"/>
                                        <div class="flex items-center gap-[0.5rem]">
                                            <h3 class="">Add to Calendar</h3>
                                            <rightArrowM class="!text-white rotate-90"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="cursor-pointer flex items-center gap-[0.7rem] w-[90%] mx-auto">
                                    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19.0771" cy="19.6328" r="19" fill="#92E4EC"/>
                                    <path d="M24.1371 27.6128L13.9971 27.6328V25.7128L18.7771 21.6728C20.7571 19.9928 21.4171 19.0328 21.4171 17.6328C21.4171 15.9728 20.5171 15.0328 18.9771 15.0328C17.3771 15.0328 16.3771 16.1528 16.3571 18.0328H13.8171C13.8371 14.8328 15.8771 12.7528 18.9771 12.7528C22.0971 12.7528 24.0371 14.5328 24.0371 17.4928C24.0371 19.5328 22.9171 21.0728 20.6971 22.9728L18.0571 25.2328H24.1371V27.6128Z" fill="#007582"/>
                                    </svg>
                                    <div class="text-center rounded-[0.4rem] text-[#000] border border-[#2C4C50] w-[100%] eventBreak1:w-full py-[0.5rem] gap-4">
                                        <h3>Invite a friend</h3>
                                    </div>
                                </div>
                                <div class="cursor-pointer flex items-center gap-[0.7rem] w-[90%] mx-auto">
                                    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19.0771" cy="19.6328" r="19" fill="#92E4EC"/>
                                    <path d="M18.2571 20.3928H16.4771V18.7328L20.2371 15.2728H14.1571V13.0128H23.4371V15.0528L19.8771 18.3328C22.1171 18.7728 23.8571 20.4128 23.8571 22.9928C23.8571 25.9928 21.5171 27.8928 18.5571 27.8928C15.6971 27.8928 13.4771 26.1328 13.4771 22.9728H15.9971C15.9971 24.6528 17.0371 25.6128 18.5971 25.6128C20.1971 25.6128 21.2571 24.5728 21.2571 22.9528C21.2571 21.4728 20.2971 20.3928 18.2571 20.3928Z" fill="#007582"/>
                                    </svg>
                                    <div class="text-center rounded-[0.4rem] text-[#000] border border-[#2C4C50] w-[100%] eventBreak1:w-full py-[0.5rem] gap-4">
                                        <h3>Share</h3>
                                    </div>
                                </div>
                            </div>
                        <div class="mt-4">
                                <h3 class="font-Satoshi400 leading-4 text-[#000] eventBreak1:text-[0.7rem] eventBreak1:text-center">
                                    No longer attending?   
                                    <span class="!text-[#853232] pl-[0.5rem] cursor-pointer" @click="handleCancelRegistration"> Cancel Registration</span>
                                </h3>
                        </div>
                        </div>
                    </div>
                </div>
            </article>
            <article class="my-[3rem] msgMob:w-full w-[50%] eventBreak1:my-[2rem]">
                <div class="mb-[3.5rem]">
                    <h3 class="font-Satoshi700 text-[#000] text-[1.5rem] leading-6 eventBreak1:text-[1rem] eventBreak1:leading-4">Speaker:</h3>
                    <div class="mt-6 eventBreak1:mt-4  flex items-center gap-6">
                        <div class="w-[4rem] h-[4rem] rounded-[100%] overflow-hidden">
                            <img src="../../assets/image/messageUser.png" alt="" class="w-full h-full">
                        </div>
                        <div>
                            <h3 class="font-Satoshi700 text-[#000] text-4 leading-4 eventBreak1:text-[0.9rem]">Adedire Akanji</h3>
                            <p class="mt-[0.2rem] text-[#000] text-[0.8rem] leading-4">LinkedIn Marketing Specialist</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">About Vibratique Hub</h3>
                    <p class="mt-6 font-Satoshi400 text-[#000] leading-[1.5rem] text-4 eventBreak1:text-[0.8rem] eventBreak1:leading-[1.3rem]">
                        Vibratique hub is a full service creative agency at WillowTree, you’ll give form to ideas by being the voice and owner of product decisions. You’ll drive the design direction, and then make it happen! You can Learn More by visiting www.myspurr.net
                    </p>
                </div>
            </article>
            <article class="w-[50%] msgMob:w-full ">
                <h3 class="font-Satoshi700 text-[#000] text-[1rem] leading-4">Sponsors</h3>
                <div class="flex gap-[1.4rem] flex-wrap mt-[1.7rem] msgMob:justify-center">
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons4.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons1.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons3.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons2.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons4.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons2.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons3.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons1.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons4.png" alt="" class="object-fit">
                    </div>
                    <div class="w-[4rem] h-[4rem] overflow-hidden">
                        <img src="@/assets/image/spons1.png" alt="" class="object-fit">
                    </div>
                    
                </div>
            </article>
            <article class="w-[95%] msgMob:w-full mx-auto mt-[3rem]">
                <div class="text-center">
                    <h3 class="font-Satoshi700 text-[#000] leading-5">Related Events</h3>
                </div>
                <div class="eventAds-container my-10">
                    <article v-for="event in events" :key="event.id" class="eventAds grow shrink-0 basis-1/4">
                        <div class="rounded-t-[1rem] overflow-hidden">
                            <img src="@/assets/image/event_img.png" alt="" class="w-full h-full">
                        </div>
                        <div class="px-[0.7rem] py-[0.5rem] bg-[#ECFAFC] rounded-b-[1rem]">
                            <h1 class="text-[#000] text-[0.8rem] font-Satoshi700 leading-[1rem] mb-4">{{ event.title }}</h1>
                            <div class="event_details flex flex-col gap-[0.29rem] my-[0.5rem]">
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
                                <div 
                                class="w-[100%] flex items-center justify-between px-4 py-[0.7rem] bg-[#43D0DF] rounded-[0.46rem] btn-hover-1" 
                                >
                                    <h3 class="reg font-Satoshi700  text-[#000] text-[0.865rem] leading-4 eventBreak1:text-[0.7rem]">Register</h3>
                                    <rightArrowM class="reg"/>
                                </div>
                            </router-link>
                        </div>
                    </article>
                </div>
                <div class="grid place-items-center">
                    <button class="bg-[#31795A] rounded-[1.7rem] py-[1rem] font-Satoshi500 leading-[0.7rem] text-[#fff] w-[30%] btn-hover-2 eventBreak1:text-[0.8rem] msgMob:w-[45%]"
                    @click="handleViewMore"
                    >View More Events</button>
                </div>
            </article>
            <div class="fixed top-0 left-0 bg-[#87878780] w-full h-[100vh] z-[999] grid place-items-center" v-if="showRegistrationCompletedNotification">
                <div class="bg-white rounded-[1rem] p-[2rem] pt-4 text-center msgMob:w-[90%]">
                    <div class="w-full flex justify-end" @click="handleCloseNotification">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 19 24" fill="none">
    <path d="M18.9534 2.83711L17.08 0.46875L9.6532 9.8582L2.22635 0.46875L0.353027 2.83711L7.77988 12.2266L0.353027 21.616L2.22635 23.9844L9.6532 14.5949L17.08 23.9844L18.9534 21.616L11.5265 12.2266L18.9534 2.83711Z" fill="#323232"/>
                        </svg>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-[100px] mb-6">
                            <img src="../../assets/image/Logo-img.png" alt="">
                        </div>
                        <div class="w-[85%] msgMob:w-full mb-[0.5rem]">
                            <h3 class="text-[#011B1F] font-Satoshi400 text-[1rem] leading-4 msgMob:text-[0.8rem]">You are successfully registered for:</h3>
                            <p class="text-[#6BA336] font-Satoshi700 text-[1rem] leading-4 mt-[0.5rem] msgMob:text-[0.8rem]">Creating Your Professional Workspace With Low Budget</p>
                        </div>
                        <div class=" shareEvent flex items-center gap-[0.7rem]">
                            <h3 class="font-Satoshi400 leading-4 text-4 msgMob:text-[0.8rem]">Share event: </h3>
                            <div class="flex items-center gap-[0.7rem] msgMob:gap-[0.5rem]">
                            <facebookIcon class="hover:text-[#2F929C] transitionItem"/>
                            <whatsAppIcon class="hover:text-[#2F929C] transitionItem"/>
                            <twitterIcon class="hover:text-[#2F929C] transitionItem"/>
                            <LinkedinIcon class="hover:text-[#2F929C] transitionItem"/>
                            </div>
                        </div>
                        <button class="bg-[#007582] rounded-[0.5rem] w-[50%] mx-auto py-[0.5rem] mt-4 text-[#fff] text-[1rem] msgMob:text-[0.8rem] btn-hover-1">Add to calendar</button>
                    </div>
                </div>
            </div>
        </section>
    </DashboardLayout>
  </section>
</template>

<style scoped>
    .detail-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        align-items: end;
        justify-content: end;
    }

    .eventAds-container {
        display:grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
    }

    .detail-container label {
        color: #000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        text-transform: uppercase;
    }

    .eventAds h1, .eventAds p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana;
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
        background: #E9FAFB;
    }

    .recommendations svg {
        width: 25px;
    }

    .recommendations h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
    }

</style>