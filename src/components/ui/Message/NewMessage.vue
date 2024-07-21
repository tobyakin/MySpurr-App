<template>
    <div class="newMessage h-full flex flex-col gap-0">
        <article class="header w-full z-[49] sticky top-0 bg-white">
            <div class="senderDetails pt-[.5rem] pb-[1.6rem] px-[1.66rem] flexBasic !items-end">
                <div class="flexBasic gap-[0.85rem]">
                    <div class="w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden">
                        <img :src="userImg" alt="user image" class="w-full h-full object-cover">
                    </div>
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
        <div class="overflow-y-auto scroller flex-1 border w-full">
            <MessageInputField class="my-[1.66rem]" notShow="true" showSubject="true" :chat="chat" :sendButton="true" @send="handleSend" @change="handleChange"
            :class="uploadedFileDetails?.length < 1? 'h-[85%]': 'h-[70%]'"
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
    import { useUserProfile } from "@/stores/profile";
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
    const emit = defineEmits(['send', 'change', 'delete'])

    // console.log(userInfo.value)

    function handleDelete(){
        emit('delete')
    }

    onMounted(()=>{
        getUserInfo()
        userSkill.value = userInfo.value.skill_title || userInfo.value.business_service
        userImg.value = userInfo.value.company_logo || userInfo.value.image
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