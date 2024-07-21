<script setup>
import { computed, onMounted, ref } from "vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ReplyIcon from "@/components/icons/ReplyIcon.vue";
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import circleFileIcon from "@/components/icons/circleFileIcon.vue";
import DropDownArror from "@/components/icons/DropDownArrow.vue"
import arrowLeft from "@/components/icons/arrowLeftAlt.vue";
import { useUserProfile } from "@/stores/profile";
import { useStore } from "@/stores/user";
const userInfo = ref([])
let profile = useUserProfile();
let store = useStore();
const userID = computed(() => {
  return profile.user.data.id;
});
const isOnBoarded = computed(() => profileStore.user);

const accountType = computed(() => {
  return store.getUser.data.user.type;
});

const userImg = ref('')

const getUserInfo = ()=>{
    userInfo.value = profile.user.data
    return userInfo.value
}

onMounted(()=>{
    getUserInfo()
    userImg.value = userInfo.value.company_logo || userInfo.value.image
})

onMounted(() => {
  return accountType, userID;
});

onMounted(async ()=>{
    try {
    await profileStore.userProfile();
    if (
      isOnBoarded.value &&
      !isOnBoarded.value.business_details &&
      !isOnBoarded.value.work_details
    ) {
      if (accountType.value === "talent") {
        console.log(isOnBoarded.value.work_details)
      } else if (accountType.value === "business") {
        console.log(isOnBoarded.value.business_details)
      }
    }
  } catch (error) {
    /* empty */
  } 
})


const prop = defineProps(['chat', 'id'])
const emit = defineEmits(['reply', 'switchTab', 'closeWidget'])
function handleReply(chatId){
    emit('reply', chatId)
}

function handleWidgetClose(){
    emit('closeWidget')
}

function switchTab(){
    emit('switchTab')
}

function displayDate(full_string){
    let date = full_string.split(' ').slice(0, 3).join(' ');
    return date
}

function displayTime(full_string){
    let time = full_string.split(' ').slice(3).join(' ');
    return time
}

const downloadFile = (fileUrl, fileName) => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadAllAttachments = (attachments) => {
  attachments.forEach(item => {
    console.log(item)
    downloadFile(item.file, item.file_name);
  });
};

</script>
<template>
    <article class="recievedMessage w-full h-full flex flex-col !gap-0" data-id="chat.id">
        <div class="senderDetails py-[2.16rem] px-[1.66rem] flexBasic h-[10%] !sticky top-0 bg-white z-[9]">
            <div class="header_container">
                <div class="bg-white mobHeader hidden w-full pt-4">
                    <div 
                    class="flexBasic gap-4 w-full cursor-pointer" 
                    @click.self="handleWidgetClose"
                    >
                        <arrowLeft @click="switchTab"/>
                        <div v-if="chat?.sender_id != userID">
                            <h3 class="company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{chat?.sender?.first_name }} {{chat?.sender?.last_name }} </h3>
                            <p class="mail text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat?.sender?.email}}</p>
                        </div>
                        <div v-else>
                            <h3 class="company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{chat?.receiver?.first_name }} {{chat?.receiver?.last_name }} </h3>
                            <p class="mail text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat?.receiver?.email}}</p>
                        </div>
                        <DropDownArror @click="handleWidgetClose" class="!text-[#6C8285] arrow"/>
                    </div>
                </div>
                <div class="header flexBasic gap-[0.85rem]">
                    <div class="logo w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden grid place-items-center border  border-brand font-Satoshi500 text-brand">
                        <div v-if="chat?.sender_id != userID">
                            {{ chat?.sender?.first_name[0] }} {{chat?.sender?.last_name[0] }}
                        </div>
                        <div v-else>
                            {{ chat?.receiver?.first_name[0] }} {{chat?.receiver?.last_name[0] }}
                        </div>
                    <!-- <img :src="userImg" alt="" class="w-full h-full object-cover"> -->
                    </div>
                    <div>
                        <div v-if="chat?.sender_id != userID">
                            <h3 class="company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{ chat?.sender?.first_name }} {{chat?.sender?.last_name }}</h3>
                            <p class="mail text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat?.sender?.email }}</p>
                        </div>
                        <div v-else>
                            <h3 class="company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">{{chat?.receiver?.first_name }} {{chat?.receiver?.last_name }} </h3>
                            <p class="mail text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">{{ chat?.receiver?.email}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="timeStamp">
                <h3 class="font-Satoshi400 text-right leading-[1.204rem] text-[#24403499] text-[0.65rem]">{{ chat.sent_at }}</h3>
                <div class="icons flex items-center justify-end gap-4 mt-[0.6rem]">
                <DeleteIcon class="cursor-pointer"/>
                <ReplyIcon class="cursor-pointer opacity-[0.5]" @click="handleReply(chat.id)"/>
                <MoreVertIcon />
                </div>
            </div>   
            </div>
        <hr class="border-[#EEEEEE] border-1">
        <div id="chatScroll" class="chatScroll pt-[1.16rem] px-[1.66rem] h-[80%] overflow-y-auto hide-scrollbar">
            <div class="mb-6">
                <div class="chatPage">
                    <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem]">{{ chat.subject }}</h3>
                    <h3 class="messageTitleMob font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem] hidden">{{ chat.subject }}</h3>
                    <div>
                        <div class="message text-[#000000bf] font-Satoshi400 leading-[1.405rem] text-[0.75rem] !mb-[1.3rem]">
                            {{ chat.message }}
                        </div>
                    </div>
                </div>
                <div class="mb-4" v-if="chat.attachment && chat.attachment.length > 0">
                    <hr class="border-[#EEEEEE] border-1 my-[1.1rem]">
                    <div>
                        <div class="flexBasic atachmentHead">
                            <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">{{ chat.attachment.length }} Attachment</h3>
                            <button 
                            class="text-[#349459] font-Satoshi500 text-[0.702rem]"
                            @click="downloadAllAttachments(chat.attachment)"
                            >Download All</button>
                        </div>
                    </div>
                    <div class="filesContainer mt-4 flex gap-[1.1rem]">
                        
                        <article v-for="item in chat?.attachment">
                            <a :href="item.file" download 
                            target="_blank"
                            class="files flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center" >
                                <circleFileIcon />
                                <div>
                                <h3 class="font-Satosi400 text-[#244034] leading-[1.003rem] text-[0.75rem]">{{ item.file_name }}</h3>
                                <p class="text-[#24403480] font-Satoshi400 text-[0.65rem] leading-[1.003rem]">{{ item.file_size }}</p>
                                </div>
                            </a>
                        </article>
                    </div>
                </div>
            </div>
            <div class="replies mb-4" v-if="chat.replies && chat.replies.length > 0">
                <div class="mb-6" v-for="reply in chat.replies">
                    <div class="chatPage">
                    <div class=" head flex items-center justify-between">
                        <hr class="border-[#EEEEEE] border-1 my-[1.1rem] w-[30%]">
                        <div>
                            <h3 class="flex-1 company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem] text-center">{{ reply.sender.first_name }} {{reply.sender.last_name }}</h3>
                            <h3 class="time_stamp text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 uppercase text-[0.6rem] text-center">{{ displayDate(reply.replied_at) }}, {{ displayTime(reply.replied_at) }}</h3>
                        </div>
                        <hr class="border-[#EEEEEE] border-1 my-[1.1rem] w-[30%]">
                        
                        </div>
                        <div>
                            <div class="message text-[#000000bf] font-Satoshi400 leading-[1.405rem] text-[0.75rem] !mb-[1.3rem]">
                                {{ reply.message }}
                            </div>
                        </div>
                    </div>
                    <div class="mb-4" v-if="reply.attachment && reply.attachment.length > 0">
                    <hr class="border-[#EEEEEE] border-1 my-[1.1rem]">
                    <div>
                        <div class="flexBasic atachmentHead">
                            <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">{{ reply.attachment.length }} Attachment</h3>
                            <button class="text-[#349459] font-Satoshi500 text-[0.702rem]">Download All</button>
                        </div>
                    </div>
                    <div class="filesContainer mt-4 flex gap-[1.1rem]">
                        <article class="files flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center" v-for="item in reply?.attachment">
                            <circleFileIcon />
                            <div>
                            <h3 class="font-Satosi400 text-[#244034] leading-[1.003rem] text-[0.75rem]">{{ item.file_name }}</h3>
                            <p class="text-[#24403480] font-Satoshi400 text-[0.65rem] leading-[1.003rem]">{{ item.file_size }}</p>
                            </div>
                        </article>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
    #chatScroll::-webkit-scrollbar {
        display: none !important;
        scrollbar-color: red !important;
    }
</style>