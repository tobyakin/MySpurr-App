<script setup>
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ReplyIcon from "@/components/icons/ReplyIcon.vue";
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import circleFileIcon from "@/components/icons/circleFileIcon.vue";


const prop = defineProps(['chat', 'id'])
const emit = defineEmits(['reply'])
function handleReply(chat){
    emit('reply', chat)
}

</script>
<template>
    <article class="recievedMessage w-full h-full flex flex-col gap-0" data-id="chat.id">
        <div class="senderDetails py-[2.16rem] px-[1.66rem] flexBasic h-[10%]">
            <div class="flexBasic gap-[0.85rem] msgTab:!justify-center msgTab:text-center msgTab:flex-col msgTab:w-full">
                <div class="w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden">
                <img src="@/assets/image/logo.png" alt="" class="w-full h-full object-cover">
                </div>
                <div>
                <h3 class="font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{ chat.company }}</h3>
                <p class="text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat.mail }}</p>
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
        <div class="pt-[2.16rem] px-[1.66rem] h-[80%] overflow-y-auto hide-scrollbar">
            <div class="">
                <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem]">{{ chat.subject }}</h3>
                <div>
                    <div class="text-[#000000bf] font-Satoshi400 leading-[1.405rem] text-[0.75rem] !mb-[1.3rem]" v-for="item in chat?.thread">
                        {{ item.message }}
                    </div>
                </div>
            </div>
            <div class="h-[30%]" v-if="chat.attachment.length > 0">
                <hr class="border-[#EEEEEE] border-1 my-[1.1rem]">
                <div class="flexBasic">
                    <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">{{ chat.attachment.length }} Attachment</h3>
                    <button class="text-[#349459] font-Satoshi500 text-[0.702rem]">Download All</button>
                </div>
                <div class="mt-4 flex gap-[1.1rem]">
                    <article class="flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center" v-for="item in chat?.attachment">
                        <circleFileIcon />
                        <div>
                        <h3 class="font-Satosi400 text-[#244034] leading-[1.003rem] text-[0.75rem]">{{ item }}</h3>
                        <p class="text-[#24403480] font-Satoshi400 text-[0.65rem] leading-[1.003rem]">2.3mb</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>

</style>