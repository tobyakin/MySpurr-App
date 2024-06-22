<script setup>
import DropDownArror from "@/components/icons/DropDownArrow.vue"
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ReplyIcon from "@/components/icons/ReplyIcon.vue";
import emojiIcon from "@/components/icons/emojiIcon.vue";
import AttachImage from "@/components/icons/AttachImage.vue";
import cancelIcon from "@/components/icons/cancelIcon.vue"
import AttachFile from "@/components/icons/attachFile.vue";
import { ref, onMounted } from "vue";
import axios from '@/axios/index.js'
import { catchAxiosError, catchAxiosSuccess } from '@/services/Response.js'
import { getToken } from "@/services/Auth.js";
const props = defineProps(['notShow', 'showSubject', 'chat'])

const textArea = ref(null)
const subject = ref(null)
const userID = 0

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

const autoResize = () => {
  const textarea = textArea.value;
  const maxHeight = 400; // Set your desired maximum height in pixels

  textarea.style.height = 'auto'; // Reset height to auto to calculate actual size
  if (textarea.scrollHeight <= maxHeight) {
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  } else {
    textarea.style.height = `${maxHeight}px`; // Set height to maxHeight if exceeded
    textarea.style.overflowY = 'auto'; // Allow vertical scrolling if content exceeds maxHeight
  }
};

const data = {
    "sender_id": "1",
    "to": "abdultawabsalawudeen@gmail.com",
    "subject": "Apply for job",
    "body": "I am applying for the role of a frontend developer.",
    "cc": "",
    "bcc": "",
    "attachments": [
        {
            "file": ""
        }
    ]
}

const handleSend2 = async () => {
  const token = await getToken()
    try {
        let res = await axios.post(`v1/message`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        catchAxiosSuccess(res)
        return res.data
        
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

function handleSend(){
    const activeChat = ref()
    const message = textArea.value.value
    console.log(message)
    messages.value.forEach(item=>{
      if (item.id === props.chat.id){
        activeChat.value = item
      }
    })
    // console.log(activeChat.value.id)
    // activeChat.value.thread.push(
    //   {
    //     id: 1,
    //     subject: subject.value,
    //     senderID: userID,
    //     recieverID: 3,
    //     message: message,
    //     from: "",
    //     attachment: [],
    //   },
    // )
    handleSend2()
    textArea.value.value = ''
  }

// onMounted(()=>{
//     textArea.focus()
// })



</script>

<template>
    <article class="replyBox w-full px-[1.66rem] h-[100%]">
        <div class="border border-[#0000001a] rounded-[0.50175rem] h-full flex flex-col max-h-[inherit] min-h-[inherit] gap-0">
            <div class="h-fit">
                <div class="header flex items-center justify-between px-4 py-[0.5rem]">
                    <div class="flexBasic gap-[0.8rem]">
                    <div class="flexBasic gap-[0.6rem]">
                        <ReplyIcon class="!opacity-1" :class="{hidden: notShow}"/>
                        <DropDownArror class="cursor-pointer" :class="{hidden: notShow}"/>
                        <h3 class="font-Satoshi400 text-[#244034] text-[0.702rem]">To:</h3>
                    </div>
                    <div class="flex gap-[0.3rem]">
                        <div class="flexBasic bg-[#F0F5F3] rounded-[0.75rem] gap-4 px-[0.55rem] py-[0.3rem]">
                            <h3 class="text-[#244034b3] font-Satoshi500 leading-[1.104rem] text-[0.702rem]">payoner</h3>
                            <cancelIcon class="cursor-pointer"/>
                            </div>
                        <input type="mail">
                    </div>
                    </div>
                    <div class="flexBasic gap-[0.8rem]">
                    <h3 class="font-Satoshi500 text-[0.75rem] leading-[1.51rem] text-[#244034cc]">Cc</h3>
                    <h3 class="font-Satoshi500 text-[0.75rem] leading-[1.51rem] text-[#244034cc]">Bcc</h3>
                    </div>
                </div>
                <hr class="border-[#EEEEEE] border-1">
                <div :class="{ hidden: !showSubject }">
                    <div class="px-4 py-[0.5rem] flex items-center gap-4">
                        <h3 class="text-[#244034] font-Satoshi400 text-[0.702rem] capitalize">subject:</h3>
                        <input type="text" class="basis-full" ref="subject">
                    </div>
                    <hr class="border-[#EEEEEE] border-1">
                </div>
            </div>
            <div class="px-4 w-[100%] flex-1 h-full my-[0.5rem]">
                <textarea
                ref="textArea"
                class="textarea w-[100%] h-full p-[0.5rem] font-Satoshi400 text-[0.75rem] leading-[1.505rem] text-[#000000bf] resize-y focus:outline-0 block overflow-auto scroller"
                placeholder="Write a message"
                @input="autoResize"
                ></textarea>
            </div>
            <div class="p-4 !pt-0 flexBasic h-fit">
                <div class="flexBasic gap-4">
                    <AttachFile />
                    <emojiIcon />
                    <AttachImage />
                </div>
            <div class="flexBasic gap-4">
                <DeleteIcon class="cursor-pointer"/>
                <button class="bg-[#3F634D] rounded-[10.38575rem] px-[1.3rem] py-[0.3rem] font-Satoshi500 text-[#fff] text-[0.803rem] leading-[1.7rem] " @click="handleSend">Reply</button>
            </div>
            </div>
        </div>
        </article>
</template>

<style lang="scss" scoped>

</style>