<script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
  import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
  import MessageFilter from "@/components/ui/Message/MessageFilter.vue"
  import AttachFile from "@/components/icons/attachFile.vue";
  import DropDownArror from "@/components/icons/DropDownArrow.vue"
  import arrowLeft from "@/components/icons/arrowLeftAlt.vue";
  import MessageList from "@/components/ui/Message/MessageList.vue";
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
  const clickedMessage = ref();
  const showChatList = ref(true)
  const showChatPage = ref(false)
  const closeWidget = ref()
  const newMessage = ref(false)
  const textArea = ref(null)

let store = useStore();

let profile = useUserProfile();
let message = ref("");
const userDetails = computed(() => {
  return profile.user.data;
});
const userID = computed(() => {
  return profileStore.user.data.id;
});

const messageStore = useMessageStore();
const { sentMessages, allMessages, filteredMails, messageDetail } = storeToRefs(messageStore)
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
const isOnBoarded = computed(() => profileStore.user);
const messageLength = ref(false)
const attachedFiles = ref([])
const recieverMail = ref([])
const attached_file = ref(null)
const userInfo = ref([])

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
  return accountType;
});

function filterAll(){
  filterSection.value = 'all'
  getFilteredMessages()
}

function filterSent(){
  filterSection.value = 'sent'
  getFilteredMessages()
}

function filterRead(){
  filterSection.value = 'read'
  getFilteredMessages()
}

function filterUnread(){
  filterSection.value = 'unread'
  getFilteredMessages()
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
    cconsole.log(error)
    messageLoading.value = false
  }
  displayedMessages.value = allMessages.value.data?.filter(message=> message?.sender_id != userId)
  recievedMessages.value = displayedMessages.value
  messageLength.value = recievedMessages.value.length > 0
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
  
  if(detailLoaded.value === false){
    detailLoaded.value = true
  }
  await getMessageDetail(payload.id)
  messageDetails.value = messageDetail.value.data
  console.log(messageDetails.value)
  scrollToBottom()
  return messageDetails.value
}

const handleReplyMessage = async ()=>{
    const payload = ref({
      "message_id": clickedItem.value,
      "sender_id": userID.value,
      "receiver_id": messageDetails.value.sender_id,
      "receiver_email": messageDetails.value.receiver?.email,
      "attachments": attachedFiles.value,
      "message": textArea.value.textContent
    })
    console.log(payload.value)
    if(payload.value.receiver_email.length > 0 && payload.value.message.length > 0){
      try {
        textArea.value.textContent = ''
        attachedFiles.value = []
        await messageStore.handleReplyMessage(payload.value)
        getAllMessages(userID.value)
        await getMessageDetail(payload.value.message_id)
        messageDetails.value = messageDetail.value.data
        getSentMessages()
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Some fields are not properly field')
    }
  }

const isSending = ref(false)

const handleSendMessage = async (payload)=>{
  isSending.value = true
  try {
    if(payload.body.length > 0 &&
    payload.to.length > 0){
      closeWindow()
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
}

onMounted(async ()=>{
  closeWidget.value = props.defaultWidgetState;
  try {
    await profileStore.userProfile();
    if(isOnBoarded.value){
      getSentMessages(), getAllMessages(userID.value)
      getUserInfo()
      console.log(userInfo.value)
      userImg.value = userInfo.value.company_logo || userInfo.value.image
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('yes')
  }
})

  const uploadedFileDetails = ref([]);
  const userImg = ref('')

const getUserInfo = ()=>{
    userInfo.value = profileStore?.user?.data
    return userInfo.value
}
  const uploadFile = (event) => {
    const file = event.target.files[0];
    console.log(file)

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
      console.log(uploadedFileDetails.value, attachedFiles.value)
    } else {
      console.log(file)
    }
  };

  const switchTab = async ()=>{
      showChatList.value = true
      showChatPage.value = false
      await nextTick();
      const messageElement = document.querySelector(`#message-${clickedItem.value}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
        console.log(container.scrollHeight, calcHeight.value)
        container.scrollTop = container.scrollHeight + calcHeight.value;
      }
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
                          <div class="userImg w-[1.875rem] h-[1.875rem] rounded-[1.875rem] overflow-hidden">
                              <img :src="userImg" alt="" class="w-full h-full">
                          </div>
                          <h3 class="text-[#000] font-Satoshi500 leading-[1.51rem]text-[0.903rem]">Messaging</h3>
                      </div>
                      <div class="flexBasic gap-4">
                          <MoreVertIcon />
                          <smallNewMessageIcon @click="handleNewMessage"/>
                          <DropDownArror class="!text-[#6C8285] cursor-pointer arrow msgMob:hidden" @click="handleWidgetClose"/>
                      </div>
                  </div>
                  <div class="px-[1.44rem] pb-4 filter">
                    <MessageFilter @all="filterAll" @read="filterRead" @unread="filterUnread" @sent="filterSent"/>
                  </div>
              </div>
              <div class=" messageList overflow-y-auto scroller flex-1" id="messagesContainer">
                <ShortLoader v-if="messageLoading"/>
                <MessageList :messageList="displayedMessages" @messageClicked="handleMessageClicked" :filter="filterSection"
                :clickedId="clickedItem"
                @click="showChatPane"
                 v-else/>
              </div>
          </div>
          <div v-if="showChatPage" class="h-full widget flex flex-col">              
              <div ref="scrollContainer" class="chatPane flex-1 overflow-y-auto contScroll h-[90%]">
                <div 
                class="noScroll mb-[0.5rem]"
                :class="uploadedFileDetails?.length < 1? 'h-full': 'h-[80%]'"
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
                        <article class="flex items-center p-[0.5rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center" v-for="item in uploadedFileDetails">
                            <circleFileIcon class="w-[20px] h-[20px]"/>
                            <div>
                                <h3 class="font-Satosi400 text-[#244034] leading-[0.7rem] text-[0.5rem]">{{item.name}}</h3>
                                <p class="text-[#24403480] font-Satoshi400 text-[0.5rem] leading-[0.7rem]">{{item.size}}</p>
                            </div>
                        </article>
                    </div>
                </div>
              </div>
              
              <div class="inputField w-[95%] mx-auto mt-[0.2rem] flex items-center bg-[#2F929C1A] p-[0.5rem] rounded-[0.5rem] border gap-[0.5rem] min-h-[16px] max-h-[200px] sticky bottom-0 z-[99] backdrop-blur-[4px]">
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
                  <span 
                    class="textarea flex-1 p-[0.5rem] bg-transparent font-Satoshi400 text-[0.7rem] text-[#000000] resize focus:outline-0 min-h-[inherit] max-h-[inherit] overflow-auto scroller leading-4" 
                    role="textbox" 
                    contenteditable
                    @input="handleInput"
                    ref="textArea"
                    @keyup.enter="handleReplyMessage"
                  ></span>
                  <sendIcon class="!text-brand" @click="handleReplyMessage"/>
              </div>
          </div>
          <section class="widgetContainer newMessge fixed bg-[#00000066] !z-[99] w-full h-full top-0 left-0 grid place-items-center" v-if="newMessage" @click.self="closeWindow">
            <div class="messageWindow w-[50%] rounded-[0.5rem] bg-white h-[90%] transitionItem overflow-hidden msgMob:w-full msgMob:h-full msgMob:rounded-none">
              <NewMessage class="h-full" @send="handleSendMessage"
              @delete="handleDelete"
              @back="closeWindow"
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