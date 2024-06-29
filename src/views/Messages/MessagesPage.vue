<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import MessageList from "@/components/ui/Message/MessageList.vue";
import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
import MessageFilter from "@/components/ui/Message/MessageFilter.vue"
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
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

const messageStore = useMessageStore();
const { sentMessages, receivedMessages, sentMessageDetail, receivedMessageDetails } = storeToRefs(messageStore)
const messageLoading = ref(false)
const filterSection = ref('all')
const displayedMessages = ref()
let allMessages
const userEmail = "abdultawabsalawudeen@gmail.com"
// console.log(chats)
const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  return accountType;
});

const profileStore = useUserProfile();
const tabStore = useTabStore();
const { isLoading } = storeToRefs(tabStore);
const isOnBoarded = computed(() => profileStore.user);

const getSentMessages = async () =>{
  if(accountType.value === "talent"){
    messageLoading.value = true
    try {
      await messageStore.handleTalentSentMessages()
      messageLoading.value = false
    } catch (error) {
      console.log(error)
      messageLoading.value = false
    }
  } else if(accountType.value === "business"){
    messageLoading.value = true
    try {
      await messageStore.handleBusinessSentMessages()
      messageLoading.value = false
    } catch (error) {
      console.log(error)
      messageLoading.value = false
    }
  }

  // console.log(sentMessages.value)
}

function filterAll(){
  filterSection.value = 'all'
  getAllMessages()
  console.log(filterSection.value)
}

function filterPrimary(){
  filterSection.value = 'primary'
  getAllMessages()
  console.log(filterSection.value)
}

function filterRead(){
  filterSection.value = 'read'
  getAllMessages()
  console.log(filterSection.value)
}

function filterUnread(){
  filterSection.value = 'unread'
  getAllMessages()
  console.log(filterSection.value)
}
  
// getAllMessages to be optimised if combined sent and recieved messages no longer needed
const getAllMessages = async ()=>{
  const allChats = ref()
  if(accountType.value === "talent"){
    messageLoading.value = true
    try {
      await messageStore.handleTalentSentMessages()
      await messageStore.handleTalentReceivedMessages()
      messageLoading.value = false
    } catch (error) {
      console.log(error)
      messageLoading.value = false
    }
  }else if(accountType.value === "business"){
    messageLoading.value = true
    try {
      await messageStore.handleBusinessSentMessages()
      await messageStore.handleBusinessReceivedMessages()
      messageLoading.value = false
    } catch (error) {
      console.log(error)
      messageLoading.value = false
    }
  }

  if(filterSection.value === 'all'){
    displayedMessages.value = receivedMessages.value.data
  } else if(filterSection.value === 'read'){
    displayedMessages.value = receivedMessages.value.data.filter(message=> message.attributes.status === 'read')
  } else if(filterSection.value === 'unread'){
    displayedMessages.value = receivedMessages.value.data.filter(message=> message.attributes.status === 'unread')
  } else if (filterSection.value === 'primary'){
    displayedMessages.value = sentMessages.value.data
  }

  console.log(filterSection.value, displayedMessages.value)

  allMessages =computed(()=>{
    return [...sentMessages.value.data, ...receivedMessages.value.data]
  }) 

  // console.log(allChats.value)
  
  return allMessages.value
}

getAllMessages()

  

const getReceivedMessages = async () =>{
  if(accountType.value === "talent"){
    messageLoading.value = true
    try {
      await messageStore.handleTalentReceivedMessages()
      messageLoading.value = false
    } catch (error) {
      console.log(error)
      messageLoading.value = false
    }
  } else if(accountType.value === "business"){
    messageLoading.value = true
    try {
      await messageStore.handleBusinessReceivedMessages()
      messageLoading.value = false
    } catch (error) {
      console.log(error)
      messageLoading.value = false
    }
  }
}

const getSentMessageDetail = async (message_id)=>{
  if(accountType.value === "talent"){
    try {
      await messageStore.handleSentTalentDetail(message_id)
    } catch (error) {
      console.log(error)
    }
  } else if(accountType.value === "business"){
    try {
      await messageStore.handleSentBusinessMessageDetail(message_id)
    } catch (error) {
      
    }
  }
};

const getReceiveMessageDetail = async (message_id)=>{
  if(accountType.value === "talent"){
    try {
      await messageStore.handleReceivedTalentDetail(message_id)
    } catch (error) {
      console.log(error)
    }
  } else if(accountType.value === "business"){
    try {
      await messageStore.handleReceivedBusinessMessageDetail(message_id)
    } catch (error) {
      console.log(error)
    }
  }
};


onMounted(async ()=>{
  getSentMessages(), getReceivedMessages(), getAllMessages()
})


onMounted(async () => {
  try {
    await profileStore.userProfile();
    if (
      isOnBoarded.value &&
      !isOnBoarded.value.business_details &&
      !isOnBoarded.value.work_details
    ) {
      console.log('yes')
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

import CircleFileIcon from "../../components/icons/circleFileIcon.vue";



const replyMessage = ref(false);
const chatPane = ref();
const inboxList = ref();
const showNewMessage = ref(false)


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
  // assignClickedMessage();
  return profile.userProfile();
});
onMounted(async () => {
  // await store.connectSocket(receiverId);
});
onMounted(async () => {
  await profile.userProfile();
});

function handleReply(chat) {
  console.log(chat);
  replyMessage.value = true;
  console.log(userDetails.value.email)
}

function handleNewMessage(){
  showNewMessage.value = true
}
</script>

<template>
  <section class="message">

    <DashboardLayout>
      <div
        class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-0 lg:py-10 py-6 mb-10"
      >
        <ComingSoon title="Messages" />
      </div>
      <!-- <section class="item mx-auto w-[80%] msgBreak:w-[90%] bg-[#FDFDF6] msgTab:container h-[88vh] overflow-hidden">
        <div class="mt-[0.47rem] flex gap-[34.16px] h-full overflow-hidden">
          <div id="inboxList" class="w-[50%] msgTab:mx-auto msgTab:w-[75%] msgMob:w-full h-full" ref="inboxList">
            <div class="w-full flex items-center justify-between msgTab:justify-center h-[10%]">
              <h3 class="text-[#244034] text-[1.80619rem] leading-[1.51206rem] font-Satoshi500">Message</h3>
              <NewMessageIcon class="msgTab:hidden" @click="handleNewMessage"/>
            </div>
            <div class="w-full bg-[#FFF] rounded-[1.00344rem] mt-4 h-[90%] flex flex-col">
              <div class="px-[1rem]">
                <div class="flex items-center justify-between">
                  <h3 class="font-Satoshi500 text-[#000] text-[0.90313rem] leading-[1.50519rem]">Inbox</h3>
                  <MoreVertIcon class="rotate-90"/>
                </div>
                <MessageFilter @all="filterAll" @read="filterRead" @unread="filterUnread" @primary="filterPrimary"/>
              </div>
              <div id="messagesContainer" class=" overflow-y-auto scroller pb-4 flex-1">
                <ShortLoader v-if="messageLoading"/>
                <MessageList :messageList="displayedMessages" @click="" :filter="filterSection" v-else/>
              </div>
            </div>
          </div>
          <div class="w-full msgTab:hidden h-full" id="chatPane" ref="chatPane">
            <div id="messageArrows" class="flexBasic !h-[10%]">
              <arrowLeft class="cursor-pointer"/>
              <div class="flexBasic gap-4 msgTab:hidden">
                <leftArrowM />
                <h3 class="font-Satoshi400 text-[#000] leading-[1.51rem] text-[0.702rem]">1 - 5 of 120</h3>
                <rightArrowM />
              </div>
              <arrowRight class="cursor-pointer msgTab:hidden"/>
            </div>
            <div class="h-[90%] bg-[#FFF] rounded-[1.00344rem] mt-[1.5rem] overflow-auto relative">
              <div class="h-full" v-if="!showNewMessage">
                <div class="h-[100%]">
                  <MessageChatPane :chat="clickedMessage" @reply="handleReply"/>
                  {{ chats }}
                </div>
                <div class="inputField sticky bottom-[2rem] bg-white min-h-[230px] max-h-[350px]" v-if="replyMessage">
                  <MessageInputField notShow="false" showSubject="false" class="h-full min-h-[inherit] max-h-[inherit]" :chat="clickedMessage"/>
                </div>
              </div>
              <div id="newMessage" class="h-[100%]" v-else>
                <NewMessage />
              </div>
            </div>
          </div>
        </div>
      </section> -->
    </DashboardLayout>
  </section>
</template>

<style scoped>

</style>
