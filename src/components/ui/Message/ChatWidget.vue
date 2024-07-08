<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
  import MessageFilter from "@/components/ui/Message/MessageFilter.vue"
  import AttachFile from "@/components/icons/attachFile.vue";
  import DropDownArror from "@/components/icons/DropDownArrow.vue"
  import arrowLeft from "@/components/icons/arrowLeftAlt.vue";
  import MessageList from "@/components/ui/Message/MessageList.vue";
  import smallNewMessageIcon from "@/components/icons/smallNewMessageIcon.vue";
  import NewMessage from "@/components/ui/Message/NewMessage.vue";
  import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
  import sendIcon from "@/components/icons/sendIcon.vue"
  const clickedMessage = ref();
  const showChatList = ref(true)
  const showChatPage = ref(false)
  const closeWidget = ref(true)
  const newMessage = ref(false)
  const message = ref('')
  const textArea = ref(null)
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

  function handleInput(){
    message.value = textArea.value.innerText
    console.log(message.value)
  }

  
  function assignClickedMessage() {
    messages.value.forEach((item) => {
      if (item.clicked === true) {
        clickedMessage.value = item;
      }
    });
  }
  
  assignClickedMessage();
  
  function showChatPane(clickedMessage) {
    messages.value.forEach((message) => {
      message.clicked = message.id === clickedMessage.id;
      if (message.clicked === true) {
        clickedMessage = message;
      }
    });
  
    messages.value = [...messages.value];
    assignClickedMessage();
    showChatList.value = false
    showChatPage.value = true
  }

  function handleSend(){
    const activeChat = ref()
    messages.value.forEach(item=>{
      if (item.id === clickedMessage.value.id){
        activeChat.value = item
      }
    })
    console.log(activeChat.value.id)
    activeChat.value.thread.push(
      {
        id: 1,
        senderID: userID,
        recieverID: 3,
        message: message.value ,
        from: "",
        attachment: [],
      },
    )
    textArea.value.innerText = ''
  }
  
  function switchTab(){
      showChatList.value = true
      showChatPage.value = false
  }
  function handleWidgetClose (){
      closeWidget.value = !closeWidget.value
  }

  function handleNewMessage(){
    newMessage.value = true
  }

  function closeWindow(){ 
   newMessage.value = false
  }
  
  </script>
  
  <template>
      <section class="w-[18rem] h-[25rem] rounded-t-[1.003rem] bg-[#fff] shadow-3xl pt-4 section transitionItem" :class="{widgetClosed: closeWidget}">
          <div class="flex flex-col h-full" v-if="showChatList">
              <div class="">
                  <div class=" show px-[1.44rem] flexBasic">
                      <div class="flexBasic gap-[0.88rem]">
                          <div class="userImg w-[1.875rem] h-[1.875rem] rounded-[1.875rem] overflow-hidden">
                              <img src="@/assets/image/userImg.png" alt="" class="w-full h-full">
                          </div>
                          <h3 class="text-[#000] font-Satoshi500 leading-[1.51rem]text-[0.903rem]">Messaging</h3>
                      </div>
                      <div class="flexBasic gap-4">
                          <MoreVertIcon />
                          <smallNewMessageIcon @click="handleNewMessage"/>
                          <DropDownArror class="!text-[#6C8285] cursor-pointer arrow" @click="handleWidgetClose"/>
                      </div>
                  </div>
                  <div class="px-[1.44rem] pb-4 filter">
                      <MessageFilter />
                  </div>
              </div>
              <div class=" messageList overflow-y-auto scroller flex-1" id="messagesContainer">
                  <MessageList :messageList="messages" @click="showChatPane"/>
              </div>
          </div>
          <div v-if="showChatPage" class="h-full widget flex flex-col">              
              <div class="chatPane flex-1 overflow-y-auto scroller">
                  <MessageChatPane :chat="clickedMessage" @closeWidget="handleWidgetClose" @switchTab="switchTab" class="chat"/>
              </div>
              
              <div class="inputField w-[95%] mx-auto mt-[0.2rem] flex items-center bg-[#2F929C1A] p-[0.5rem] rounded-[0.5rem] border gap-[0.5rem] min-h-[16px] max-h-[200px] absolute bottom-0 z-[99] left-[50%] translate-x-[-50%] backdrop-blur-[4px]">
                  <AttachFile />
                  <span 
                    class="textarea flex-1 p-[0.5rem] bg-transparent font-Satoshi400 text-[0.7rem] text-[#000000] resize focus:outline-0 min-h-[inherit] max-h-[inherit] overflow-auto scroller leading-4" 
                    role="textbox" 
                    contenteditable
                    @input="handleInput"
                    ref="textArea"
                  ></span>
                  <sendIcon class="!text-brand" @click="handleSend"/>
              </div>
          </div>
          <section class="widgetContainer newMessge fixed bg-[#00000066] !z-[99] w-full h-full top-0 left-0 grid place-items-center" v-if="newMessage" @click.self="closeWindow">
            <div class="messageWindow w-[50%] rounded-[0.5rem] bg-white h-[90%] transitionItem overflow-hidden">
                <NewMessage class="h-full" :chat="clickedMessage"/>
            </div>
          </section>
      </section>
  </template>
  
  <style scoped>
  
  .section {
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
} 
    .textarea[contenteditable]:empty::before {
    content: "Enter new message";
    color: gray;
    }
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