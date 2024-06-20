<script setup>
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ReplyIcon from "@/components/icons/ReplyIcon.vue";
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import circleFileIcon from "@/components/icons/circleFileIcon.vue";
import DropDownArror from "@/components/icons/DropDownArrow.vue"
import arrowLeft from "@/components/icons/arrowLeftAlt.vue";


const prop = defineProps(['chat', 'id'])
const emit = defineEmits(['reply', 'switchTab', 'closeWidget'])
const userID = 0;
function handleReply(chat){
    emit('reply', chat)
}

function handleWidgetClose(){
    emit('closeWidget')
}

function switchTab(){
    emit('switchTab')
}

</script>
<template>
    <article class="recievedMessage w-full h-full flex flex-col !gap-0" data-id="chat.id">
        <div class="senderDetails py-[2.16rem] px-[1.66rem] flexBasic h-[10%] relative">
            <div class="mobHeader hidden">
                <div class="flexBasic gap-4">
                    <arrowLeft @click="switchTab"/>
                    <div>
                        <h3 class="company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{ chat.company }}</h3>
                        <p class="mail text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat.mail }}</p>
                    </div>
                </div>
                <DropDownArror @click="handleWidgetClose" class="!text-[#6C8285] arrow"/>
            </div>
            <div class="header flexBasic gap-[0.85rem] msgTab:!justify-center msgTab:text-center msgTab:flex-col msgTab:w-full">
                <div class="logo w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden">
                <img src="@/assets/image/logo.png" alt="" class="w-full h-full object-cover">
                </div>
                <div>
                <h3 class="company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{ chat.company }}</h3>
                <p class="mail text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat.mail }}</p>
                </div>
            </div>
            <div class="timeStamp msgTab:hidden">
                <h3 class="font-Satoshi400 text-right leading-[1.204rem] text-[#24403499] text-[0.65rem]">{{ chat.timeStamp }}</h3>
                <div class="icons flex items-center justify-end gap-4 mt-[0.6rem]">
                <DeleteIcon class="cursor-pointer"/>
                <ReplyIcon class="cursor-pointer opacity-[0.5]" @click="handleReply(chat)"/>
                <MoreVertIcon />
                </div>
            </div>   
            </div>
        <hr class="border-[#EEEEEE] border-1">
        <div class="pt-[1.16rem] px-[1.66rem] h-[80%] overflow-y-auto hide-scrollbar">
            <div class="" v-for="message in chat?.thread" :key="message.senderID">
            <div class="chatPage">
                <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem]">{{ chat.subject }}</h3>
                <h3 class="messageTitleMob font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem] hidden" :class="message.senderID === userID? 'text-right': 'text-left' ">{{ chat.name }}</h3>
                <div>
                    <div class="message text-[#000000bf] font-Satoshi400 leading-[1.405rem] text-[0.75rem] !mb-[1.3rem]">
                        {{ message.message }}
                    </div>
                </div>
            </div>
            <div class="mb-4" v-if="message.attachment.length > 0">
                <hr class="border-[#EEEEEE] border-1 my-[1.1rem]">
                <div class="flexBasic atachmentHead">
                    <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">{{ message.attachment.length }} Attachment</h3>
                    <button class="text-[#349459] font-Satoshi500 text-[0.702rem]">Download All</button>
                </div>
                <div class="filesContainer mt-4 flex gap-[1.1rem]">
                    <article class="files flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center" v-for="item in message?.attachment">
                        <circleFileIcon />
                        <div>
                        <h3 class="font-Satosi400 text-[#244034] leading-[1.003rem] text-[0.75rem]">{{ item }}</h3>
                        <p class="text-[#24403480] font-Satoshi400 text-[0.65rem] leading-[1.003rem]">2.3mb</p>
                        </div>
                    </article>
                </div>
            </div>
            </div>
        </div>
    </article>
</template>

<style scoped>

</style>