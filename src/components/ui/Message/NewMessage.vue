<template>
    <div class="newMessage h-full flex flex-col gap-0">
        <article class="header w-full z-[49] sticky top-0 bg-white">
            <div class="senderDetails pt-[1rem] pb-[1.6rem] px-[1.66rem] flexBasic !items-end msgMob:pb-[.5rem] msgMob:px-[0.9rem]">
                <div class="flexBasic gap-[0.85rem]">
                    <div class="w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden msgMob:!hidden" v-if="userInfo?.company_logo || userInfo?.image">
                        <img :src="userImg" alt="user image" class="w-full h-full object-cover">
                    </div>
                    <div class="userImg w-[1.875rem] h-[1.875rem] rounded-[1.875rem] overflow-hidden bg-brand grid place-items-center" v-else>
                            <svg data-v-f87d500a="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 text-gray-100 h-5"><path data-v-f87d500a="" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                          </div>
                    <arrowLeft class="hidden msgMob:!block" @click="handleBack"/>
                    <div>
                        <h3 class="font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{ userInfo.first_name }} {{ userInfo.last_name }}</h3>
                        <p class="text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{userSkill}}</p>
                    </div>
                </div>
                <div class="timeStamp">
                    <h3 class="font-Satoshi400 text-right leading-[1.204rem] text-[#24403499] text-[0.65rem]">{{getCurrentTime()}}</h3>
                </div>   
            </div>
            <hr class="border-[#EEEEEE] border-1">
        </article>
        <div class="overflow-y-auto scroller flex-1 w-full">
            <MessageInputField class="my-[1.66rem]" notShow="true" :chat="chat" :sendButton="true" @send="handleSend" @change="handleChange"
            :class="[uploadedFileDetails?.length < 1? 'h-[85%]': 'h-[82%]', isWidget? '!h-[85%]': '']"
            :isSending="isSendng"
            @delete="handleDelete"
            />
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from "vue";
    import circleFileIcon from '@/components/icons/circleFileIcon.vue';
    import MessageInputField from '@/components/ui/Message/MessageInputField.vue';
    import arrowLeft from "@/components/icons/arrowLeftAlt.vue";
    import { useUserProfile } from "@/stores/profile";
import { useRoute } from "vue-router";
    const userInfo = ref([])
    let profile = useUserProfile();
    const uploadedFileDetails = ref([])
    const userID = computed(() => {
    return profile.user.data.id;
    });
    const userSkill = ref('')
    const userImg = ref('')
    const getUserInfo = ()=>{
        userInfo.value = profile.user.data
        return userInfo.value
    }
    const props = defineProps(['isSendng', 'chat'])
    const emit = defineEmits(['send', 'change', 'delete', 'back'])

    // console.log(userInfo.value)
    function handleBack(){
        emit('back')
    }

    function handleDelete(){
        emit('delete')
    }

    const isTargetRoute = (routeNames) => {
        return routeNames.includes(route.name)
    }

    const isWidget = ref(false)
    const route = useRoute()
   


    onMounted(()=>{
        getUserInfo()
        userSkill.value = userInfo.value?.skill_title || userInfo.value?.business_service
        userImg.value = userInfo.value?.company_logo || userInfo.value?.image
        if (!isTargetRoute(['messages'])) {
            const screenWidth = window.innerWidth
            if(screenWidth > 1024 ){
                isWidget.value = true
            }
            return isWidget.value
        }
    })

    function handleChange(fileDetails){
        uploadedFileDetails.value = fileDetails;
        emit('change')
    }

    function handleSend(payload){
        emit('send', payload)
    }

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Pad minutes with leading zero if needed
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;

        // Combine into desired format
        const currentTime = `${hours}:${minutesStr}${ampm}`;
        return currentTime;
        }

    const sendButton = ref(true)
</script>


<style scoped>

</style>