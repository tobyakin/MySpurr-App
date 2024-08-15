<script setup>
import { computed, onMounted, ref, nextTick, watch } from "vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ReplyIcon from "@/components/icons/ReplyIcon.vue";
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import circleFileIcon from "@/components/icons/circleFileIcon.vue";
import DropDownArror from "@/components/icons/DropDownArrow.vue"
import EditIcon from "@/components/icons/pencilIcon.vue"
import arrowLeft from "@/components/icons/arrowLeftAlt.vue";
import { useUserProfile } from "@/stores/profile";
import { useStore } from "@/stores/user";
const userInfo = ref([])
const editMessage = ref(false)
let profile = useUserProfile();
let store = useStore();
const userID = computed(() => {
  return profile.user.data.id;
});
const isOnBoarded = computed(() => profileStore.user);

const accountType = computed(() => {
  return store.getUser.data.user.type;
});

const prop = defineProps(['chat', 'id'])
const emit = defineEmits(['reply', 'switchTab', 'closeWidget'])

function handleReply(chatId){
    emit('reply', chatId)
}

const userImg = ref('')

const getUserInfo = ()=>{
    userInfo.value = profile.user.data
    return userInfo.value
}

watch(
    () => prop.chat,
  async () => {
    await scrollToBottom();
  },
  { deep: true }
);

function discoverLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let match;
    const links = [];
    while ((match = urlRegex.exec(text)) !== null) {
        links.push({
            url: match[0],
            index: match.index,
            length: match[0].length
        });
    }
    return links;
}
function displayTextWithLinks(text) {
    const links = discoverLinks(text);
    let lastIndex = 0;
    let resultHTML = '';
    if(links.length > 0){
        links.forEach(link => {
            // Add text before the link
            resultHTML += text.slice(lastIndex, link.index);
            // Add the clickable link with the class
            resultHTML += `<a href="${link.url}" target="_blank" class="styled-link">${link.url}</a>`;
            // Update lastIndex to the end of the current link
            lastIndex = link.index + link.length;
        });
        // Add any remaining text after the last link
        resultHTML += text.slice(lastIndex);
    } else {
        resultHTML = text
    }
    return resultHTML
}

onMounted(() => {
  return accountType, userID;
});

onMounted(async ()=>{
    try {
    await profileStore.userProfile();
    getUserInfo()
    userImg.value = userInfo.value.company_logo || userInfo.value.image
    await scrollToBottom()

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

const chatScroll = ref(null)

const scrollToBottom = async () => {
    await nextTick()
  if (chatScroll.value) {
    chatScroll.value.scrollTop = chatScroll.value.scrollHeight;
    console.log(chatScroll.value.scrollHeight)

  }
};

scrollToBottom()

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

function parseCustomDateString(dateString) {
    const [day, month, year, time, period] = dateString.split(/[\s]+/);
    const [hours, minutes] = time.split(':');
    
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    let parsedHours = parseInt(hours);
    const parsedMinutes = parseInt(minutes);

    if (period === "PM" && parsedHours !== 12) {
        parsedHours += 12;
    } else if (period === "AM" && parsedHours === 12) {
        parsedHours = 0;
    }

    return new Date(year, months[month], parseInt(day), parsedHours, parsedMinutes);
}


function timeDifference(dateString) {
    const givenDate = parseCustomDateString(dateString);
    const now = new Date();

    const diffInMs = now - givenDate;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const formattedGivenDate = givenDate.toLocaleString();
    const formattedNow = now.toLocaleString();

    console.log(`Given Date: ${formattedGivenDate}, Now: ${formattedNow}`);

//    console.log(givenDate, now)
    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else {
        return `${diffInDays} days ago`;
    }
   
}

const messageEdited = ref(false)

function handleEditMessage(e) {
    const targetElement = e.currentTarget;
    const mainContainer = targetElement.parentElement.parentElement.parentElement
    console.log(mainContainer)
    mainContainer.querySelector('.editBtnContainer').classList.add('!flex')
    const targetInput = targetElement.previousElementSibling;
    
    targetInput.setAttribute('aria-readonly', 'false');
    targetInput.contentEditable = 'true';
    targetInput.focus();
    console.dir(targetInput);
}

function handleCancelEdit(e){
    const targetElement = e.currentTarget;
    const mainContainer = targetElement.parentElement.parentElement
    const targetInput = targetElement.parentElement.previousElementSibling.querySelector('.message');  
    targetInput.setAttribute('aria-readonly', 'true');
    targetInput.contentEditable = 'false';
    targetInput.blur();
    mainContainer.querySelector('.editBtnContainer').classList.remove('!flex')
}

function handleSaveEdit(e){
     const targetElement = e.currentTarget;
    const mainContainer = targetElement.parentElement.parentElement
    const targetInput = targetElement.parentElement.previousElementSibling.querySelector('.message');  
    targetInput.setAttribute('aria-readonly', 'true');
    targetInput.contentEditable = 'false';
    targetInput.blur();
    mainContainer.querySelector('.editBtnContainer').classList.remove('!flex')
    mainContainer.querySelector('.editedNotifier').classList.add('!block')
}

</script>
<template>
    <article class="recievedMessage w-full h-full flex flex-col !gap-0" data-id="chat.id">
        <div class="senderDetails py-[2.16rem] px-[1.66rem] flexBasic h-[10%] !sticky top-0 bg-white z-[9]">
            <div class="header_container">
                <div class="bg-white mobHeader hidden w-full pt-4">
                    <div 
                    class="flexBasic msgMob:!justify-start gap-4 w-full cursor-pointer" 
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
                        <DropDownArror @click="handleWidgetClose" class="!text-[#6C8285] arrow msgMob:hidden"/>
                    </div>
                </div>
                <div class="header flexBasic gap-[0.85rem]">
                    <div class="logo w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden grid place-items-center border  border-brand font-Satoshi500 text-brand">
                        <!-- <div>
                            <img :src="userImg" alt="" class="w-full h-full object-cover">
                        </div> -->
                        <div>
                            <div v-if="chat?.sender_id != userID">
                                {{ chat?.sender?.first_name[0] }} {{chat?.sender?.last_name[0] }}
                            </div>
                            <div v-else>
                                {{ chat?.receiver?.first_name[0] }} {{chat?.receiver?.last_name[0] }}
                            </div>
                        </div>
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
        <div ref="chatScroll" id="chatScroll" class="chatScroll pt-[1.16rem] px-[1.66rem] h-[80%] overflow-y-auto hide-scrollbar">
            <div class="mb-6">
                <div class="chatPage">
                    <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem]">{{ chat.subject }}</h3>
                    <h3 class="messageTitleMob font-Satoshi500 text-[#000] leading-[1.51rem] text-[1.204rem] !mb-[1.11rem] hidden">{{ chat.subject }}</h3>
                    <div class="field !mb-[1.3rem]">
                        <div class="flex flex-col relative">
                            <div id="messageBox" class="flex gap-[0.5rem] items-start cursor-pointer max-w-[100%]"
                            :class="chat?.sender_id == userID? 'w-fit': ''"
                            >
                                <div 
                                v-html="displayTextWithLinks(chat?.message)"
                                contenteditable="false"
                                class="message break-words text-[#000000bf] font-Satoshi400 leading-[1rem] text-[0.75rem] w-auto max-w-[92%] h-auto whitespace-pre-wrap focus:outline-none"
                                aria-readonly="true"
                                >
                                </div>
                                <div 
                                @click="handleEditMessage" 
                                class="transitionItem editIcon w-[12px] h-[12px] z-[-1] opacity-[-1]"
                                v-if="chat?.sender_id == userID"
                                >
                                    <EditIcon class="w-full h-full"/>
                                </div>
                            </div>
                            <p class="hidden editedNotifier m-0 pt-[0.2rem] text-[0.5rem] font-Satoshi500">Edited</p>
                        </div>
                        <div class="hidden editBtnContainer gap-[0.5rem] mt-[0.5rem]">
                            <button
                            @click="handleCancelEdit"
                             class="text-[0.67rem] rounded-[0.15rem] px-[0.5rem] border border-brand text-white bg-brand btn-hover-2">Cancel</button>
                            <button
                            @click="handleSaveEdit"
                            class="text-[0.67rem] rounded-[0.15rem] px-[0.5rem] border border-brand text-white bg-brand btn-hover-2">Submit</button>
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
                        
                        <article v-for="item in chat?.attachment" :key="item.file_name">
                            <a :href="item.file" :download="item?.file_name" 
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
                <div class="mb-6" v-for="reply in chat.replies" :key="reply.id">
                    <div class="chatPage">
                    <div class=" head flex items-center justify-between mb-4">
                        <div class="flex items-center gap-[0.5rem]">
                            <!-- <div class="logo w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden grid bg-brand place-items-center border  border-brand font-Satoshi500 text-brand">
                                <svg data-v-f87d500a="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 text-gray-100 h-5"><path data-v-f87d500a="" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                            </div> -->
                            <div class="logo w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden grid place-items-center border  border-brand font-Satoshi500 text-brand">
                                <div v-if="reply?.sender?.id == userID">
                                    {{ reply?.sender?.first_name[0] }} {{reply?.sender?.last_name[0] }}
                                </div>
                                <div v-else>
                                    {{ reply?.receiver?.first_name[0] }} {{reply?.receiver?.last_name[0] }}
                                </div>
                            </div>
                             <h3 class=" company font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem] text-center">{{ reply.sender.first_name }} {{reply.sender.last_name }}</h3>
                        </div>
                        <div class="flex gap-[0.1rem] items-center">
                            <h3 class="time_stamp text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 uppercase text-[0.6rem] text-center">{{ displayTime(reply.replied_at) }}</h3>
                            <span class="time_stamp text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 text-[0.6rem] text-center">({{ timeDifference(reply.replied_at) }})</span>
                        </div>
                        
                        <!-- <hr class="border-[#EEEEEE] border-1 my-[1.1rem] w-[30%]"> -->
                        
                        </div>
                        <div class="field">
                            <div class="flex flex-col !mb-[1.3rem] relative">
                                <div id="messageBox" class="flex gap-[0.5rem] items-start cursor-pointer max-w-[100%]"
                                :class="reply?.sender?.id == userID? 'w-fit': ''"
                                >
                                    <div 
                                    v-html="displayTextWithLinks(reply?.message)"
                                    contenteditable="false"
                                    class="message break-words text-[#000000bf] font-Satoshi400 leading-[1rem] text-[0.75rem] w-auto max-w-[92%] h-auto whitespace-pre-wrap focus:outline-none"
                                    aria-readonly="true"
                                    >
                                    </div>
                                    <div 
                                    @click="handleEditMessage" class="transitionItem editIcon w-[12px] h-[12px] z-[-1] opacity-[-1]"
                                    v-if="reply?.sender?.id == userID"
                                    >
                                        <EditIcon class="w-full h-full"/>
                                    </div>
                                </div>
                                <p class="hidden editedNotifier m-0 pt-[0.2rem] text-[0.5rem] font-Satoshi500">Edited</p>
                            </div>
                            <div class="hidden editBtnContainer gap-[0.5rem] mt-[0.5rem]">
                                <button
                                @click="handleCancelEdit"
                                class="text-[0.67rem] rounded-[0.15rem] px-[0.5rem] border border-brand text-white bg-brand btn-hover-2">Cancel</button>
                                <button
                                @click="handleSaveEdit"
                                class="text-[0.67rem] rounded-[0.15rem] px-[0.5rem] border border-brand text-white bg-brand btn-hover-2">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4" v-if="reply?.attachments && reply?.attachments.length > 0">
                    <hr class="border-[#EEEEEE] border-1 my-[1.1rem]">
                    <div class="hidden">
                        <div class="flexBasic atachmentHead">
                            <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">{{ reply?.attachments.length }} Attachment</h3>
                            <button class="text-[#349459] font-Satoshi500 text-[0.702rem]">Download All</button>
                        </div>
                    </div>
                    <div class="filesContainer mt-4 flex gap-[1.1rem]">
                        <article v-for="item in reply?.attachments">
                            <a :href="item.file" :download="item.file_name" target="_blank" class="files flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center">
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
            </div>
        </div>
    </article>
</template>

<style scoped>
    #chatScroll::-webkit-scrollbar {
        display: none !important;
        /* scrollbar-color: red !important; */
    }
</style>