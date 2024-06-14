<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import MessageList from "@/components/ui/Message/MessageList.vue";
import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
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

const store = useSocketStore();
import { useUserProfile } from "@/stores/profile";
import CircleFileIcon from "../../components/icons/circleFileIcon.vue";
let profile = useUserProfile();
const router = useRouter();

let receiverId = "211950a8-c8bd-4f12-9b92-db142c85ddd4";
let message = ref("");
const userDetails = computed(() => {
  return profile.user.data;
});
const replyMessage = ref(false);

const chatPane = ref();
const inboxList = ref();
const messages = ref([
  {
    senderID: 1,
    id: 1,
    status: "primary",
    name: "jenny rio",
    subject: "Work inquiry from google",
    description:
      "Hello, This is Jenny from google. We’r the largest online platform offer...",
    attachment: ["details.pdf"],
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
      },
    ],
  },
  {
    senderID: 2,
    id: 2,
    status: "unread",
    name: "jannatul ferdaus",
    subject: "Product Designer Opportunities",
    description:
      "Hello, This is Jannat from HuntX. We offer business solution to our client..",
    attachment: [],
    date: "jun 22",
    clicked: false,
    logo: "",
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "HuntX",
    thread: [
      {
        id: 1,
        senderID: 2,
        recieverID: 3,
        from: "",
        message: ``,
      },
    ],
  },
  {
    senderID: 3,
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
    attachment: ["details.pdf", "forms.pdf"],
    date: "jun 22",
    clicked: true,
    logo: "@/assets/image/logo.png",
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "Payoneer",
    thread: [
      {
        id: 1,
        senderID: 3,
        recieverID: 3,
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
      },
    ],
  },
  {
    senderID: 4,
    id: 4,
    status: "read",
    name: "jakie chan",
    subject: "Hunting Marketing Specialist",
    description:
      "Hello, We’r the well known Real Estate Inc provide best interior/exterior solut...",
    attachment: ["details.pdf"],
    date: "jun 22",
    clicked: false,
    timeStamp: "4:54AM (3 hours ago)",
    mail: "payoneer@inquiry.com",
    company: "Real Estate Inc",
    thread: [
      {
        id: 1,
        senderID: 4,
        recieverID: 3,
        from: "",
        message: ``,
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
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-0 lg:py-10 py-6 mb-10"
    >
      <ComingSoon title="Messages" />
    </div>
    <!-- <section class="item mx-auto w-[80%] msgBreak:w-[90%] bg-[#FDFDF6] msgTab:container">
      <div class="mt-[0.47rem] flex gap-[34.16px] min-h-[75vh] overflow-hidden ">
        <div id="inboxList" class="w-[50%] msgTab:mx-auto msgTab:w-[75%] msgMob:w-full" ref="inboxList">
          <div class="w-full flex items-center justify-between msgTab:justify-center">
            <h3 class="text-[#244034] text-[1.80619rem] leading-[3.51206rem] font-Satoshi500">Message</h3>
            <NewMessageIcon class="msgTab:hidden" @click="handleNewMessage"/>
          </div>
          <div class="w-full h-[52rem] bg-[#FFF] rounded-[1.00344rem] mt-4">
            <div class="p-[1.25rem] h-[25%]">
              <div class="flex items-center justify-between">
                <h3 class="font-Satoshi500 text-[#000] text-[0.90313rem] leading-[1.50519rem]">Inbox</h3>
                <MoreVertIcon class="rotate-90"/>
              </div>
              <div class="my-[0.8rem] rounded-[1.50519rem] bg-searchBg border-[0.803px] border-[#EFEFEF] flex items-center justify-between px-4 py-[0.8rem]">
                <input type="text" placeholder="Search contacts" class="bg-searchBg font-Satoshi400 leading-[2rem] text-[0.8rem]">
                <SearchIcon />
              </div>
              <ul class="messageGroup flex items-center justify-between gap-[0.7rem] mt-[1.5rem] !mb-0">
                <li class="font-Satoshi500 leading-[2rem] capitalize text-[0.6rem] active">all</li>
                <li class="flex items-center gap-[0.3rem]">
                  <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#949939]"></span>
                  <p class="">read</p>
                </li>
                <li class="flex items-center gap-[0.3rem]">
                  <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#DA5252]"></span>
                  <p>unread</p>
                </li>
                <li class="flex items-center gap-[0.3rem]">
                  <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#007582]"></span>
                  <p>primary</p>
                </li>
              </ul>
            </div>
            <div id="messagesContainer" class="h-[75%] overflow-y-auto scroller pb-4">
              <MessageList :messageList="messages" @click="showChatPane"/>
            </div>
          </div>
        </div>
        <div class="w-full msgTab:hidden" id="chatPane" ref="chatPane">
          <div id="messageArrows" class="flexBasic !h-[3rem]">
            <arrowLeft class="cursor-pointer"/>
            <div class="flexBasic gap-4 msgTab:hidden">
              <leftArrowM />
              <h3 class="font-Satoshi400 text-[#000] leading-[1.51rem] text-[0.702rem]">1 - 5 of 120</h3>
              <rightArrowM />
            </div>
            <arrowRight class="cursor-pointer msgTab:hidden"/>
          </div>
          <div class="h-[52rem] bg-[#FFF] rounded-[1.00344rem] mt-[1.5rem]">
            <div class="h-full">
              <div class="h-[65%]">
                <MessageChatPane :chat="clickedMessage" @reply="handleReply"/>
              </div>
              <div class="h-[35%]">
                <MessageInputField notShow="false" showSubject="false" v-if="replyMessage"/>
              </div>
            </div>
            <div id="newMessage" class="h-full hidden">
              <NewMessage />
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </DashboardLayout>
</template>

<style scoped>
.scroller {
  scrollbar-width: thin;
  scrollbar-color: #96c6cc #e6f1f3;
}

.scroller::-webkit-scrollbar-thumb {
  background: #96c6cc;
}
.scroller::-webkit-scrollbar-track {
  background: #e6f1f3;
}
.scroller::-webkit-scrollbar {
  max-width: 10px;
  max-height: 10px;
}

.scroller::webkit-scrollbar-button {
  display: none;
}
</style>
