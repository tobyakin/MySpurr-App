<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick} from "vue";
import ChatWidget from "@/components/ui/Message/ChatWidget.vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import MessageList from "@/components/ui/Message/MessageList.vue";
import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
import MessageFilter from "@/components/ui/Message/MessageFilter.vue"
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import Loader from "@/components/ui/Loader/Loader.vue"
import WhiteLoader from "@/components/ui/WhiteLoader.vue";
import NewMessage from "@/components/ui/Message/NewMessage.vue";

import arrowRight from "@/components/icons/arrowRightAlt.vue";
import arrowLeft from "@/components/icons/arrowLeftAlt.vue";
import leftArrowM from "@/components/icons/leftArrowM.vue";
import rightArrowM from "@/components/icons/rightArrowM.vue";
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import SearchIcon from "@/components/icons/searchBarIcon.vue";
import NewMessageIcon from "@/components/icons/NewMessageIcon.vue";
import MessageInputField from "@/components/ui/Message/MessageInputField.vue";
import { useSocketStore } from "@/stores/socket";
import ComingSoon from "@/components/ui/ComingSoon/ComingSoon.vue";
import { useTabStore } from "@/stores/tab";
import { useStore } from "@/stores/user";
import { useUserProfile } from "@/stores/profile";
import { useMessageStore } from "@/stores/message";
import { storeToRefs } from "pinia";

let store = useStore();
const router = useRouter();
const conversationList = ref([])
// const allMessages = ref([])
let profile = useUserProfile();
let receiverId = "211950a8-c8bd-4f12-9b92-db142c85ddd4";
let message = ref("");
const userDetails = computed(() => {
  return profile.user.data;
});
const emit = defineEmits(['next'])

const messageStore = useMessageStore();
const { sentMessages, allMessages, messageDetail } = storeToRefs(messageStore)
const messageLoading = ref(false)
const chatLoading = ref(false)
const filterSection = ref('all')
const recievedMessages = ref([])
const displayedMessages = ref([])
const pageLoading = ref(true)
const detailLoaded = ref(false)
const messageDetails = ref([])
const clickedItem = ref()
const profileStore = useUserProfile();
const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);
const showReplyField = ref(false);
const chatPane = ref();
const inboxList = ref();
const showNewMessage = ref(false)
const messagesContainer = ref(null)
const isOnBoarded = computed(() => profileStore.user);
const messageID = ref()
const messageNum = ref()
const messageIndex = ref()
const showMobileChats = ref(false)
const userID = computed(() => {
  return profileStore.user.data.id;
});
const chatContainer = ref(null);

const scrollToBottom = async () => {
  await nextTick();
  const container = chatContainer.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const messageLength = ref(false)


const accountType = computed(() => {
  return store.getUser.data.user.type;
});

onMounted(() => {
  return accountType, userID;
});

const getMessageID = ()=>{
  messageID.value = messagesContainer.value.querySelector('.active')
  messageID.value = messageID.value.dataset.id
  return messageID.value
}


function filterAll(){
  filterSection.value = 'all'
  getFilteredMessages()
  detailLoaded.value = false
  messageIndex.value = -1
}

function filterSent(){
  filterSection.value = 'sent'
  getFilteredMessages()
  detailLoaded.value = false
  messageIndex.value = -1
}

function filterRead(){
  filterSection.value = 'read'
  getFilteredMessages()
  detailLoaded.value = false
}

function filterUnread(){
  filterSection.value = 'unread'
  getFilteredMessages()
    messageIndex.value = -1
}

function getFilteredMessages(){
  if(filterSection.value === 'all'){
    displayedMessages.value = allMessages.value.data?.filter(message=> message?.sender_id != userID.value)
  } else if(filterSection.value === 'read'){
    displayedMessages.value = recievedMessages.value.filter(message=> message.status === 'read')
  } else if(filterSection.value === 'unread'){
    displayedMessages.value = recievedMessages.value.filter(message=> message.status === 'unread')
  } else if (filterSection.value === 'sent'){
    displayedMessages.value = sentMessages.value.data
  }

  if(displayedMessages.value){
    messageLength.value = displayedMessages.value.length > 0
    messageNum.value = displayedMessages.value.length
  }
  // return displayedMessages.value
}

getFilteredMessages()

const getSentMessages = async () =>{
  messageLoading.value = true
  try {
    await messageStore.handleSentMessages()
    messageLoading.value = false
  } catch (error) {
    console.log(error)
    messageLoading.value = false
  }
}

const getAllMessages = async (userId)=>{
  messageLoading.value = true
  try {
    await messageStore.handleGetMessages(userId)
    messageLoading.value = false
  } catch (error) {
    console.log(error)
    messageLoading.value = false
  }
  displayedMessages.value = allMessages.value.data?.filter(message=> message?.sender_id != userId)
  recievedMessages.value = displayedMessages.value
  messageLength.value = recievedMessages.value.length > 0
  messageNum.value = recievedMessages?.value.length
  pageLoading.value = false
  return displayedMessages.value
}


const getMessageDetail = async (message_id)=>{
  chatLoading.value = true
  try {
    await messageStore.handleMessageDetail(message_id)
    chatLoading.value = false
  } catch (error) {
    console.log(error)
    chatLoading.value = false
  }
};

const handleMessageClicked = async (payload)=>{
  clickedItem.value = payload.id
  messageIndex.value = payload.index
  console.log(clickedItem.value)
  const screenWidth = window.innerWidth
  const maxWidth = 800

  if(screenWidth <= maxWidth){
    showMobileChats.value = true
  }
  showReplyField.value = false
  showNewMessage.value = false
  
  if(detailLoaded.value === false){
    detailLoaded.value = true
  }
  await getMessageDetail(payload.id)
  messageDetails.value = messageDetail.value.data

  return messageDetails.value
}

const handleReplyMessage = async (payload)=>{
  await messageStore.handleReplyMessage(payload)
  getAllMessages(userID.value)
  await getMessageDetail(payload.message_id)
  messageDetails.value = messageDetail.value.data
  showReplyField.value = false
  getSentMessages()
  console.log(payload)
}

const isSending = ref(false)

const handleSendMessage = async (payload)=>{
  isSending.value = true
  try {
    if(
      payload.body.length > 0 &&
      payload.to.length > 0
    ){
      showReplyField.value = false
      showNewMessage.value = false
      await nextTick();
      const messageElement = document.querySelector(`#message-${clickedItem.value}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      await messageStore.handleSendMessage(payload)
      getAllMessages(userID.value)
      getSentMessages()
      isSending.value = false
    } else {
      alert('Some fields are not filled')
    }
  } catch (error) {
    console.log(error)
    isSending.value = false
  }

  console.log(payload)
}

const handleNavRight = async ()=>{
  messageIndex.value += 1
  emit('next', messageIndex.value)
  console.log(messageIndex.value)
    await nextTick();
    const messageElement = messagesContainer.value.querySelector(`.index-${messageIndex.value}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    getMessageID()
    await getMessageDetail(messageID.value)
    messageDetails.value = messageDetail.value.data
}

const handleNavLeft = async ()=>{
  const screenWidth = window.innerWidth
  const maxWidth = 800

  if(screenWidth <= maxWidth){
    showMobileChats.value = false
    showNewMessage.value = false
  }
  messageIndex.value -= 1
  console.log(messageIndex.value)
    await nextTick();
    const messageElement = messagesContainer.value.querySelector(`.index-${messageIndex.value}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    getMessageID()
    await getMessageDetail(messageID.value)
    messageDetails.value = messageDetail.value.data
}


onMounted(async ()=>{
  try {
    await profileStore.userProfile();
    if(isOnBoarded.value){
      getSentMessages(), getAllMessages(userID.value)
    }
  } catch (error) {
    console.log(error)
  }
})


onMounted(async () => {
  try {
    await profileStore.userProfile();
    if (
      isOnBoarded.value &&
      !isOnBoarded.value.business_details &&
      !isOnBoarded.value.work_details
    ) {
      if (accountType.value === "talent") {
        router.push({ name: "talent-onboarding" });
      } else if (accountType.value === "business") {
        router.push({ name: "business-onboarding" });
      }
    }
  } catch (error) {
    /* empty */
  } finally {
    isLoading.value = !isLoading.value;
  }
});

// const connectSocket = async () => {
//   try {
//     await store.connectSocket(receiverId);
//   } catch (error) {
//     console.error(error);
//   }
// };

const sendMessage = async () => {
  let payload = {
    sender_id: userDetails.value.uniqueId,
    receiver_id: receiverId,
    message: message.value,
  };
  try {
    await store.sendSocketMessage(receiverId, payload);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  return profile.userProfile();
});
onMounted(async () => {
  // await store.connectSocket(receiverId);
});
onMounted(async () => {
  await profile.userProfile();
});

function handleReply(chatId) {
  showReplyField.value = true;
  scrollToBottom()
}

function handleAttachment(){
  console.log('yes')
  scrollToBottom()
}

function handleDelete(){
  const screenWidth = window.innerWidth
  const maxWidth = 800
  console.log('delete')
  if(showReplyField.value === true){
    showReplyField.value = false
  }
  if(showNewMessage.value === true){
    showNewMessage.value = false
  }
  if(screenWidth <= maxWidth){
    showMobileChats.value = false
  }
}

function handleNewMessage(){
  const screenWidth = window.innerWidth
  const maxWidth = 800
  
  if(screenWidth <= maxWidth){
    showNewMessage.value = true
    showMobileChats.value = true
  } else {
    showNewMessage.value = !showNewMessage.value
  }

  console.log(showNewMessage.value)

}
</script>

<template>
  <section class="message msgMob:hidden">
    <DashboardLayout height="100vh">
      <!-- <div
        class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-0 lg:py-10 py-6 mb-10"
      >
        <ComingSoon title="Messages" />
      </div> -->
      <div class="w-full h-full grid place-items-center" v-if="pageLoading">
          <ShortLoader />
        </div>
      <section class="item mx-auto w-[80%] msgBreak:w-[90%] bg-[#FDFDF6] msgTab:container h-[90vh] overflow-hidden bottom-0 sticky" v-else>
        <div class="mt-[0.47rem] flex gap-[34.16px] h-full overflow-hidden msgTab:flex-col relative">
          <div id="inboxList" class="w-[50%] msgTab:mx-auto msgTab:w-[75%] msgTab2:!opacity-[100] msgTab2:!z-[1] msgMob:w-full h-full" ref="inboxList" 
          :class="showMobileChats? 'opacity-[-1] z-[-1]': 'opacity-[1] z-[1]'"
          >
            <div class="w-full flex items-center justify-between h-[10%]">
              <h3 class="text-[#244034] text-[1.80619rem] leading-[1.51206rem] font-Satoshi500">Message</h3>
              <NewMessageIcon class="" @click="handleNewMessage"/>
            </div>
            <div class="w-full bg-[#FFF] rounded-[1.00344rem] mt-4 h-[90%] flex flex-col">
              <div class="px-[1rem]">
                <div class="flex items-center justify-between">
                  <h3 class="font-Satoshi500 text-[#000] text-[0.90313rem] leading-[1.50519rem]">Inbox</h3>
                  <MoreVertIcon class="rotate-90"/>
                </div>
                <MessageFilter @all="filterAll" @read="filterRead" @unread="filterUnread" @sent="filterSent"/>
              </div>
              <div id="messagesContainer" class=" overflow-y-auto scroller pb-4 flex-1" ref="messagesContainer">
                  <div v-if="messageLength">
                    <ShortLoader v-if="messageLoading"/>
                    <MessageList :messageList="displayedMessages" @messageClicked="handleMessageClicked" :filter="filterSection"
                    :clickedId="messageIndex"
                     v-else/>
                  </div>
                  <div class="w-full h-full grid place-items-center" v-else>
                    <div class="text-center w-[90%] mx-auto">
                      <h1 class="font-Satoshi500 text-[1.5rem] leading-[3.5rem]">No messages yet</h1>
                      <p>Start a conversation by sending a message</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="w-full h-full hide-scrollbar msgTab:mx-auto msgTab:w-[80%] msgMob:w-full msgTab2:!opacity-[100] msgTab2:!z-[1]" id="chatPane" ref="chatPane" :class="showMobileChats? '!opacity-100 !z-[1]': 'reg'">
            <div class="h-full w-full" v-if="!showNewMessage && messageLength">
              <div v-if="!detailLoaded" class="w-full h-full bg-white grid place-items-center">
                <div class="flex flex-col items-center justify-center gap-4">
                  <h3 class="font-Satoshi500 text-[1.5rem]">Click Message to resume conversation</h3>
                  <p class="font-Satoshi500 text-[1.5rem] text-brand">or</p>
                  <div class="flex items-center gap-[0.5rem]">
                    <h3 class="font-Satoshi500 text-[1.5rem]">Click</h3>
                    <NewMessageIcon />
                    <h3 class="font-Satoshi500 text-[1.5rem]">to start a new conversation</h3>
                  </div>
                </div>
              </div>
              <div class="w-full h-full" v-else>
                <div id="messageArrows" class="flexBasic !h-[10%]">
                  <arrowLeft class="cursor-pointer" @click="handleNavLeft"/>
                  <div class="flexBasic gap-4 msgTab:hidden">
                    <leftArrowM />
                    <h3 class="font-Satoshi400 text-[#000] leading-[1.51rem] text-[0.702rem]">{{ messageIndex + 1 }} of {{ messageNum }}</h3>
                    <rightArrowM />
                  </div>
                  <arrowRight class="cursor-pointer msgTab:hidden" @click="handleNavRight"/>
                </div>
                <div ref="chatContainer" class="h-[90%] bg-[#FFF] rounded-[1.00344rem] mt-[1.5rem] overflow-auto relative transitionItem contScroll">
                  <div class="h-full" @click.self="showReplyField === false">
                    <div class="h-[100%]">
                      <div :class="showReplyField? 'h-[70%]': 'h-[100%]'">
                        <ShortLoader v-if="chatLoading"/>
                        <MessageChatPane :chat="messageDetails" @reply="handleReply" v-if="!chatLoading"/>
                      </div>
                      <div class="inputField pb-[3rem] bg-white min-h-[230px] max-h-[350px]" v-if="showReplyField">
                        <MessageInputField notShow="false" showSubject="false" class="h-full min-h-[inherit] max-h-[inherit]" :chat="messageDetails"
                        @reply="handleReplyMessage"
                        @change="handleAttachment"
                        @delete="handleDelete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="newMessage" 
            class="h-[100%] bg-white" 
            v-else
            >
              <NewMessage @send="handleSendMessage" :isSending="isSending" @delete="handleDelete"/>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  </section>
  <section class="mobileWindow hidden msgMob:block overflow-hidden h-[100vh]">
    <ChatWidget class="w-full !h-[100vh] max-h-[100vh] overflow-hidden" defaultWidgetState=""/>
  </section>
</template>

<style scoped>
  .contScroll{
    scrollbar-width: thin !important;
  } 
</style>
