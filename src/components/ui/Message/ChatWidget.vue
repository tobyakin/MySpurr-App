<script setup>
  import { ref, computed, onMounted, nextTick, watch } from "vue";
  import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
  import WhiteLoader from '@/components/ui/WhiteLoader.vue'
  import MessageFilter from "@/components/ui/Message/MessageFilter.vue"
  import AttachFile from "@/components/icons/attachFile.vue";
  import DropDownArror from "@/components/icons/DropDownArrow.vue"
  import MessageList from "@/components/ui/Message/MessageList.vue";
  import cancelIcon from "@/components/icons/cancelIcon.vue"
  import smallNewMessageIcon from "@/components/icons/smallNewMessageIcon.vue";
  import NewMessage from "@/components/ui/Message/NewMessage.vue";
  import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
  import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
  import { useStore } from "@/stores/user";
  import { useUserProfile } from "@/stores/profile";
  import { useMessageStore } from "@/stores/message";
  import { storeToRefs } from "pinia";
  import sendIcon from "@/components/icons/sendIcon.vue"
  import circleFileIcon from '@/components/icons/circleFileIcon.vue';
  import { useToast } from 'vue-toastification'

  const toast = useToast()
  const showChatList = ref(true)
  const showChatPage = ref(false)
  const closeWidget = ref()
  const newMessage = ref(false)
  const textArea = ref(null)

let store = useStore();

const userID = computed(() => {
  return profileStore.user.data.id;
});

const messageStore = useMessageStore();
const { sentMessages, allMessages, messageDetail } = storeToRefs(messageStore)
const messageLoading = ref(false)
const chatLoading = ref(false)
const filterSection = ref('')
const recievedMessages = ref([])
const displayedMessages = ref([])
const pageLoading = ref(true)
const detailLoaded = ref(false)
const messageDetails = ref([])
const clickedItem = ref()
const profileStore = useUserProfile();
const isOnBoarded = computed(() => profileStore.user);
const messageLength = ref(false)
const attachedFiles = ref([])
const attached_file = ref(null)
const userInfo = ref([])
const noMessageNotification = ref('')
const uploadedFileDetails = ref([]);
const userImg = ref('')
const messageIndex = ref()
const isSending = ref(false)

const props = defineProps(['defaultWidgetState'])

watch(
  () => props.defaultWidgetState,
  (newVal) => {
    closeWidget.value = newVal;
  },
  { immediate: true }
);

const accountType = computed(() => {
  return store.getUser.data.user.type;
});
onMounted(() => {
  noMessageNotification.value = 'messages'
  return accountType;
});

function filterMessages(type) {
  filterSection.value = type;
  getFilteredMessages();
  noMessageNotification.value = type === 'primary' ? 'messages' : (type === 'sent' ? 'sent message' : 'featured message');
  detailLoaded.value = false;
  messageIndex.value = -1;
}

function getFilteredMessages(){
  messageLoading.value = true
  if(filterSection.value === 'primary'){
    displayedMessages.value = [...allMessages.value?.data?.filter((message)=>message?.type === "primary")] || []
    messageLoading.value = false
  } else if(filterSection.value === 'others'){
    displayedMessages.value = [...allMessages.value?.data?.filter((message)=>message?.type === "admin")] || []
    messageLoading.value = false
  } else if (filterSection.value === 'sent'){
    displayedMessages.value = sentMessages.value.data
    messageLoading.value = false
  }

  if(displayedMessages.value){
    messageLength.value = displayedMessages.value.length > 0
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
  } catch (error) {
    console.log(error)
    messageLoading.value = false
  }
  displayedMessages.value = [...allMessages.value?.data?.filter((message)=>message?.type === "primary")] || []
  recievedMessages.value = displayedMessages.value
  messageLength.value = recievedMessages.value.length > 0
  pageLoading.value = false
  messageLoading.value = false
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
  
  if(detailLoaded.value === false){
    detailLoaded.value = true
  }
  await getMessageDetail(payload.id)
  messageDetails.value = messageDetail.value.data
  scrollToBottom()
  return messageDetails.value
}

const handleReplyMessage = async ()=>{
  isSending.value = true
    const payload = ref({
      "message_id": clickedItem.value,
      "sender_id": userID.value,
      "receiver_id": messageDetails.value.sender_id,
      "receiver_email": messageDetails.value.receiver?.email,
      "attachments": attachedFiles.value,
      "message": textArea.value.value
    })
    if(payload.value.receiver_email.length > 0 && payload.value.message.length > 0){
      try {
        textArea.value.value = ''
        textArea.value.style.height = 'auto'; 
        attachedFiles.value = []
        await messageStore.handleReplyMessage(payload.value)
        await getAllMessages(userID.value)
        await getMessageDetail(payload.value.message_id)
        messageDetails.value = messageDetail.value.data
        getSentMessages()
        filterSection.value = filterSection.value
        await getFilteredMessages()
        isSending.value = false
      } catch (error) {
        console.log(error)
        isSending.value = false
      }
    } else {
      alert('Some fields are not properly field')
      isSending.value = false
    }
  }

const handleSendMessage = async (payload)=>{
  isSending.value = true
  try {
    if(payload.body.length > 0 &&
    payload.to.length > 0){
      await messageStore.handleSendMessage(payload)
      getAllMessages(userID.value)
      getSentMessages()
      isSending.value = false
      closeWindow()
    } else {
      toast.error('Some field are not filled', {
        timeout: 4000
      })
    }
  } catch (error) {
    console.log(error)
    isSending.value = false
  }
}

const userDetails = computed(() => {
  return profileStore?.user?.data;
});

onMounted(async () => {
  await profileStore.userProfile();
  return userDetails.value?.image;
});

onMounted(async ()=>{
  closeWidget.value = props.defaultWidgetState;
  filterSection.value = 'primary'
  try {
    await profileStore.userProfile();
    if(isOnBoarded.value){
      getSentMessages(), getAllMessages(userID.value)
      getUserInfo()
      userImg.value = userInfo.value.company_logo || userInfo.value.image
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('loaded')
  }
})

watch([userDetails], async () => {
  const hasImage = userDetails.value?.image || userDetails.value?.company_logo;
  if (hasImage) {
   userImg.value = hasImage
  }
});

  

const getUserInfo = ()=>{
    userInfo.value = profileStore?.user?.data
    return userInfo.value
}
  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        attachedFiles.value.push({
          "file": reader.result,
          "file_name": file.name,
          "file_size": `${(file.size / 1048576).toFixed(2)} MB`
        }) // Extract base64 data
        uploadedFileDetails.value.push(
          {
            name: file.name,
            size: `${(file.size / 1048576).toFixed(2)} MB`
          }
        );
      };

      // emit('change', uploadedFileDetails.value)
      reader.readAsDataURL(file);
      scrollToBottom()
    } else {
      console.log(file)
    }
  };

  const switchTab = async ()=>{
    filterSection.value = filterSection.value
      showChatList.value = true
      showChatPage.value = false
      await nextTick();
      const messageElement = document.querySelector(`#message-${clickedItem.value}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function handleWidgetClose (){
    const screenWidth = window.innerWidth
    const maxWidth = 1024
    if(screenWidth >= maxWidth){
      closeWidget.value = !closeWidget.value
    }
  }

  function handleNewMessage(){
    newMessage.value = true
  }

  function closeWindow(){ 
   newMessage.value = false
  }

  function handleDelete(){
    newMessage.value = false
  }

  function showChatPane() {
    showChatList.value = false
    showChatPage.value = true
  }

  const scrollContainer = ref(null);
  const calcHeight = ref()
  const elHeight = ref()

  const scrollToBottom = async () => {
    await nextTick();
    const container = scrollContainer.value;
    if(attached_file.value){
      elHeight.value = attached_file.value.offsetHeight
      if (container) {
        calcHeight.value = 40 + elHeight.value;
        container.scrollTop = container.scrollHeight + calcHeight.value;
      }
    }
  }

  function removeFile(index){
    attachedFiles.value.splice(index, 1)
    uploadedFileDetails.value.splice(index, 1)
  }

  const autoResize = () => {
  const textarea = textArea.value;
  const maxHeight = 100; // Set your desired maximum height in pixels

  textarea.style.height = 'auto'; // Reset height to auto to calculate actual size
  if (textarea.scrollHeight <= maxHeight) {
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  } else {
    textarea.style.height = `${maxHeight}px`; // Set height to maxHeight if exceeded
    textarea.style.overflowY = 'auto'; // Allow vertical scrolling if content exceeds maxHeight
  }
};

  // Experimental funtions
  </script>
  
  <template>
      <section class="w-[21rem] h-[32rem] rounded-t-[1.003rem] bg-[#fff] shadow-3xl section transitionItem msgMob:rounded-none" :class="{widgetClosed: closeWidget}">
          <div class="flex flex-col h-full" v-if="showChatList">
              <div class="msgMob:sticky">
                  <div class="pt-4 show px-[1.44rem] flexBasic cursor-pointer" @click.self="handleWidgetClose">
                      <div class="flexBasic gap-[0.88rem]">
                          <div class="userImg w-[1.875rem] h-[1.875rem] rounded-[1.875rem] overflow-hidden" v-if="userInfo?.company_logo || userInfo?.image">
                              <img :src="userImg" alt="" class="w-full h-full">
                          </div>
                          <div class="userImg w-[1.875rem] h-[1.875rem] rounded-[1.875rem] overflow-hidden bg-brand grid place-items-center" v-else>
                            <svg data-v-f87d500a="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 text-gray-100 h-5"><path data-v-f87d500a="" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                          </div>
                          <h3 class="text-[#000] font-Satoshi500 leading-[1.51rem]text-[0.903rem]">Messaging</h3>
                      </div>
                      <div class="flexBasic gap-4">
                          <MoreVertIcon />
                          <smallNewMessageIcon @click="handleNewMessage"/>
                          <DropDownArror class="!text-[#6C8285] cursor-pointer arrow msgMob:hidden" @click="handleWidgetClose"/>
                      </div>
                  </div>
                  <div class="px-[1.44rem] pb-4 msgMob:pb-[0.5rem] filter">
                    <MessageFilter
                    @primary="filterMessages('primary')" @others="filterMessages('others')" 
                    @sent="filterMessages('sent')" 
                    :filter="filterSection"/>
                  </div>
              </div>
              <div class="messageList overflow-y-auto scroller flex-1" id="messagesContainer">
                <ShortLoader v-if="messageLoading"/>
                <div v-else>
                  <MessageList 
                    :messageList="displayedMessages" 
                    @messageClicked="handleMessageClicked" 
                    :filter="filterSection"
                    :clickedId="clickedItem"
                    @click="showChatPane"
                    v-if="messageLength"
                  />
                  <div v-else class="grid w-full h-full place-items-center">
                    <div class="text-center w-[90%] mx-auto mt-[3rem]">
                      <h1 class="font-Satoshi500 text-[1.5rem] leading-[3.5rem]">No {{ noMessageNotification }} yet</h1>
                      <p>Start a conversation by sending a message</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div v-if="showChatPage" class="h-full widget flex flex-col">              
              <div ref="scrollContainer" class="chatPane flex-1 overflow-y-auto contScroll h-[90%]">
                <div 
                class="noScroll mb-[0.5rem]"
                :class="uploadedFileDetails?.length < 1? 'h-full': 'h-[90%]'"
                >
                  <ShortLoader v-if="chatLoading"/>
                  <MessageChatPane
                  :chat="messageDetails"
                   @reply="handleReply"
                  v-if="!chatLoading" 
                  @switchTab="switchTab" 
                  @closeWidget="handleWidgetClose"
                  class="chat"/>
                </div>
                  <div class="attachment px-[0.5rem] !pb-[0.5rem] !my-[1rem] basis-[30%]" v-if="uploadedFileDetails?.length > 0">
                    <div class="flex !gap-[0.5rem] flex-wrap" ref="attached_file">
                        <article class="flex items-center p-[0.5rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center" v-for="item in uploadedFileDetails" :key="item">
                            <circleFileIcon class="w-[20px] h-[20px]"/>
                            <div>
                                <h3 class="font-Satosi400 text-[#244034] leading-[0.7rem] text-[0.5rem]">{{item.name}}</h3>
                                <p class="text-[#24403480] font-Satoshi400 text-[0.5rem] leading-[0.7rem]">{{item.size}}</p>
                            </div>
                            <cancelIcon class="cursor-pointer" @click="removeFile(index)"/>
                        </article>
                    </div>
                </div>
              </div>
              
              <div class="inputField w-[95%] msgMob:w-full mx-auto mt-[0.2rem] flex items-center bg-[#2F929C1A] p-[0.5rem] rounded-[0.5rem] msgMob:rounded-none border gap-[0.5rem] min-h-[40px] h-auto max-h-[200px] sticky bottom-0 z-[99] backdrop-blur-[4px]"
              :class="messageDetail?.data?.sender?.last_name === 'Admin'? 'hidden h-0': ''"
              >
                  <div>
                    <label for="upload_file">
                      <AttachFile />
                    </label>
                    <input
                      type="file"
                      name=""
                      @change="uploadFile"
                      ref="attachedFile"
                      accept=".doc,.docx,.jpg,.png,.pdf"
                      hidden
                      id="upload_file"
                    />
                  </div>
                  <textarea
                    class="textarea flex-1 p-[0.5rem] bg-transparent font-Satoshi400 text-[0.7rem] text-[#000000] resize focus:outline-0 h-auto overflow-auto scroller leading-4 " 
                    contenteditable
                    @input="autoResize"
                    ref="textArea"
                  ></textarea>
                  <sendIcon v-if="!isSending" class="!text-brand" @click="handleReplyMessage"/>
                  <div v-else class="pr-[0.5rem]">
                    <WhiteLoader color="#2f929c"/>
                  </div>
              </div>
          </div>
          <section class="widgetContainer newMessge fixed bg-[#00000066] !z-[99] w-full h-full top-0 left-0 grid" v-if="newMessage" @click.self="closeWindow">
            <div class="messageWindow w-[50%] mx-auto mt-6 msgMob:mt-0 rounded-[0.5rem] bg-white h-[70%] transitionItem overflow-hidden msgMob:w-full msgMob:h-full msgMob:rounded-none">
              <NewMessage class="h-full" @send="handleSendMessage"
              @delete="handleDelete"
              @back="closeWindow"
              :isSending="isSending"
              />
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
      
    .contScroll{
      scrollbar-width: thin !important;
    } 

    .noScroll #chatScroll::-webkit-scrollbar {
      display: none !important;
      scrollbar-color: none !important;
    }
  </style>