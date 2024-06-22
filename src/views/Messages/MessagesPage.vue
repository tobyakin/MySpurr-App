<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import MessageList from "@/components/ui/Message/MessageList.vue";
import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
import MessageFilter from "@/components/ui/Message/MessageFilter.vue"
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
import { storeToRefs } from "pinia";

const router = useRouter();



let store = useStore();
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

onMounted(() => {
  return accountType;
});
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

import CircleFileIcon from "../../components/icons/circleFileIcon.vue";
let profile = useUserProfile();

let receiverId = "211950a8-c8bd-4f12-9b92-db142c85ddd4";
let message = ref("");
const userDetails = computed(() => {
  return profile.user.data;
});
const replyMessage = ref(false);

const chatPane = ref();
const inboxList = ref();
const showNewMessage = ref(false)
const userID = 0;

const messages = ref([
  {
    senderID: 1,
    id: 1,
    status: "primary",
    name: "jenny rio",
    subject: "Work inquiry from google",
    description:
      "Hello, This is Jenny from google. We’r the largest online platform offer...",
    date: "aug 22",
    clicked: false,
    logo: "",
    timeStamp: "4:54AM (3 hours ago)",
    mail: "google@inquiry.com",
    company: "Google",
    thread: [
      {
        id: 1,
        senderID: 1,
        recieverID: 3,
        message: ``,
        from: "",
        attachment: ["details.pdf"],
      },
    ],
  },
  {
    senderID: 1,
    id: 2,
    status: "unread",
    name: "jannatul ferdaus",
    subject: "Product Designer Opportunities",
    description:
      "Hello, This is Jannat from HuntX. We offer business solution to our client..",
   
    date: "jun 22",
    clicked: false,
    logo: "",
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "HuntX",
    thread: [
      {
        id: 1,
        senderID: 1,
        recieverID: 3,
        from: "",
        message: ``,
        attachment: [],
      },
    ],
  },
  {
    senderID: 1,
    recieverID: 3,
    id: 3,
    status: "primary",
    name: "hasan islam",
    subject: "Account Manager",
    description: `Hello, Greeting from Uber. Hope you doing great. I am approaching to you for as our company need a great & talented account manager.

    What we need from you to start:
    - Your CV
    - Verified Gov ID
    Our Telegram @payoneer

    Thank you`,
    
    date: "jun 22",
    clicked: true,
    logo: "@/assets/image/logo.png",
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "Payoneer",
    thread: [
      {
        id: 1,
        senderID: 1,
        message: `Hello, Greeting from Uber. Hope you doing great. 
        I am approaching to you for as our company need a great & talented account manager.
        What we need from you to start:
        - Your CV
        - Verified Gov ID 
        
        Our Telegram @payoneer 
        Thank you! lorem50
        Hello, Greeting from Uber. Hope you doing great. 
        I am approaching to you for as our company need a great & talented account manager.
        What we need from you to start:
        - Your CV
        - Verified Gov ID 
        
        Our Telegram @payoneer 
        Thank you!`,
        from: "",
        attachment: ["details.pdf", "forms.pdf"],
      },
      {
        id: 4,
        senderID: 1,
        message: `Hello, Greeting from Uber. Hope you doing great. 
        I am approaching to you for as our company need a great & talented account manager.
        What we need from you to start:
        - Your CV
        - Verified Gov ID 
        
        Our Telegram @payoneer 
        Thank you! lorem50
        Hello, Greeting from Uber. Hope you doing great. 
        I am approaching to you for as our company need a great & talented account manager.
        What we need from you to start:
        - Your CV
        - Verified Gov ID 
        
        Our Telegram @payoneer 
        Thank you!`,
        from: "",
        attachment: ["details.pdf", "forms.pdf"],
      },
    ],
  },
  {
    senderID: 1,
    id: 4,
    status: "read",
    name: "jakie chan",
    subject: "Hunting Marketing Specialist",
    description:
      "Hello, We’r the well known Real Estate Inc provide best interior/exterior solut...",
    date: "jun 22",
    clicked: false,
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "Real Estate Inc",
    thread: [
      {
        id: 1,
        senderID: 1,
        recieverID: 3,
        from: "",
        message: ``,
        attachment: ["details.pdf"],
      },
    ],
  },
  {
    senderID: 5,
    id: 5,
    status: "primary",
    name: "zubayer al hasan",
    subject: "delivery man",
    description:
      "Hello, Greeting from Uber. Hope you doing great. I am approcing to you for...",
    attachment: ["details & Agreement.pdf"],
    date: "jun 22",
    clicked: false,
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "Uber",
    thread: [
      {
        id: 1,
        senderID: 5,
        recieverID: 3,
        from: "",
        message: ``,
      },
    ],
  },
]);

const clickedMessage = ref();

function assignClickedMessage() {
  messages.value.forEach((item) => {
    if (item.clicked === true) {
      clickedMessage.value = item;
    }
  });
}

assignClickedMessage();

function showChatPane(clickedMessage) {
  const mediaQuery = window.matchMedia("(max-width: 800px)");

  messages.value.forEach((message) => {
    message.clicked = message.id === clickedMessage.id;
    if (message.clicked === true) {
      clickedMessage = message;
    }
  });

  messages.value = [...messages.value];
  assignClickedMessage();
  // router.push({name: 'chats', params: {senderID: clickedMessage.senderID}})
}

function handleReply(chat) {
  console.log(chat);
  replyMessage.value = true;
}

function handleNewMessage(){
  showNewMessage.value = true
}

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
</script>

<template>
  <section class="message">

    <DashboardLayout>
      <!-- <div
        class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-0 lg:py-10 py-6 mb-10"
      >
        <ComingSoon title="Messages" />
      </div> -->
      <section class="item mx-auto w-[80%] msgBreak:w-[90%] bg-[#FDFDF6] msgTab:container h-[88vh] overflow-hidden">
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
                <MessageFilter />
              </div>
              <div id="messagesContainer" class=" overflow-y-auto scroller pb-4 flex-1">
                <MessageList :messageList="messages" @click="showChatPane"/>
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
      </section>
    </DashboardLayout>
  </section>
</template>

<style scoped>

</style>
