<script setup>
import DropDownArror from '@/components/icons/DropDownArrow.vue'
import circleFileIcon from '@/components/icons/circleFileIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import ReplyIcon from '@/components/icons/ReplyIcon.vue'
import cancelIcon from '@/components/icons/cancelIcon.vue'
import AttachFile from '@/components/icons/attachFile.vue'
import SearchIcon from '@/components/icons/searchBarIcon.vue'
import { ref, onMounted, computed, onUnmounted } from 'vue'
import ShortLoader from '@/components/ui/Loader/ShortLoader.vue'
import { storeToRefs } from 'pinia'
import { useUserProfile } from '@/stores/profile'
import { useMessageStore } from '@/stores/message'
import WhiteLoader from '@/components/ui/WhiteLoader.vue'
import { useRoute } from 'vue-router'
const messageStore = useMessageStore()
const { filteredMails } = storeToRefs(messageStore)
const route = useRoute()
const isWidget = ref(false)
let profile = useUserProfile()
const userID = computed(() => {
  return profile.user.data.id
})
const props = defineProps(['notShow', 'showSubject', 'chat', 'sendButton', 'isSending'])
const emit = defineEmits(['send', 'change', 'reply', 'delete'])

const textArea = ref(null)
const mailSubject = ref(null)
const recieverMail = ref([])
const mailInput = ref(null)
const mailValue = ref('')
const attachedFiles = ref([])
const isWidgetWindow = ref(false)

const autoResize = () => {
  const textarea = textArea.value
  let maxHeight
  if (!isWidgetWindow.value) {
    maxHeight = 400
  } else {
    maxHeight = 155
  }

  textarea.style.height = 'auto' // Reset height to auto to calculate actual size
  if (textarea.scrollHeight <= maxHeight) {
    textarea.style.height = `${textarea.scrollHeight}px` // Set height based on content
  } else {
    textarea.style.height = `${maxHeight}px` // Set height to maxHeight if exceeded
    textarea.style.overflowY = 'auto' // Allow vertical scrolling if content exceeds maxHeight
  }
}

function handleReply() {
  const payload = ref({
    message_id: props.chat?.id,
    sender_id: userID.value,
    receiver_id: props.chat?.sender_id,
    receiver_email: recieverMail.value.join(','),
    attachments: [...attachedFiles.value],
    message: textArea.value.value
  })

  emit('reply', payload.value)
  // textArea.value.value = ''
}

function handleSend() {
  const payload = ref({
    sender_id: userID.value,
    to: recieverMail.value.join(','),
    subject: mailSubject.value,
    body: textArea.value.value,
    cc: '',
    bcc: '',
    attachments: [...attachedFiles.value]
  })

  emit('send', payload.value)
  // if(props.isSending){
  //   revertToDefault()
  // }
}

function revertToDefault() {
  textArea.value.value = ''
  mailSubject.value = ''
  attachedFiles.value = []
  recieverMail.value = []
}

function handleDelete() {
  revertToDefault()
  emit('delete')
}

const uploadedFileDetails = ref([])

const uploadFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = () => {
      attachedFiles.value.push({
        file: reader.result,
        file_name: file.name,
        file_size: `${(file.size / 1048576).toFixed(2)} MB`
      }) // Extract base64 data
      uploadedFileDetails.value.push({
        name: file.name,
        size: `${(file.size / 1048576).toFixed(2)} MB`
      })
    }

    emit('change', uploadedFileDetails.value)
    reader.readAsDataURL(file)
  } else {
    console.log(file)
  }
}

function handleEnterMail(event) {
  if (event.key === 'Enter') {
    recieverMail.value.push(mailValue.value)
    mailValue.value = ''
  }
}

function removeMail(index) {
  recieverMail.value.splice(index, 1)
}

function removeFile(index) {
  attachedFiles.value.splice(index, 1)
  uploadedFileDetails.value.splice(index, 1)
}

function addMail(mail) {
  recieverMail.value.push(mail)
  displayedMails.value = []
  mailValue.value = ''
}

const loadingMails = ref(false)

const displayedMails = ref([])

const filterMail = async () => {
  loadingMails.value = true
  try {
    if (mailValue.value.length > 0) {
      await messageStore.handleFilterMails(mailValue.value)
      displayedMails.value = filteredMails.value.data.splice(0, 4)
      loadingMails.value = false
    }
  } catch (error) {
    console.log(error)
    loadingMails.value = false
  }

  return displayedMails.value
}

const isTargetRoute = (routeNames) => {
  return routeNames.includes(route.name)
}

onMounted(() => {
  if (mailInput.value) {
    mailInput.value.addEventListener('keydown', handleEnterMail)
  }
  if (props.chat?.receiver?.email) {
    recieverMail.value.push(props.chat?.receiver?.email)
  } else {
    console.log('yes')
  }
  if (!isTargetRoute(['messages'])) {
    isWidget.value = true
    const screenWidth = window.innerWidth
    if (screenWidth > 1024) {
      isWidgetWindow.value = true
    }
  }
  if (route?.query?.email) {
    recieverMail.value.push(route?.query?.email)
    displayedMails.value = []
    mailValue.value = ''
  }
})

onUnmounted(() => {
  if (mailInput.value) {
    mailInput.value.removeEventListener('keydown', handleEnterMail)
  }
})
</script>

<template>
  <article
    class="replyBox w-full px-[1.66rem] h-[100%] pb-4 msgMob:px-[0.9rem]"
    :class="isWidget ? '!h-[280px]' : 'reg'"
  >
    <div
      class="border border-[#0000001a] rounded-[0.50175rem] h-full flex flex-col max-h-[inherit] min-h-[inherit] gap-0"
    >
      <div class="h-fit">
        <div class="header flex items-center justify-between px-4 py-[0.5rem] relative">
          <div class="flexBasic gap-[0.8rem]">
            <div class="flexBasic gap-[0.6rem]">
              <ReplyIcon class="!opacity-1" :class="{ hidden: notShow }" />
              <DropDownArror class="cursor-pointer" :class="{ hidden: notShow }" />
              <h3 class="font-Satoshi400 text-[#244034] text-[0.702rem]">To:</h3>
            </div>
            <div
              class="flex gap-[0.3rem] w-full overflow-hidden"
              :class="recieverMail?.length > 0 ? 'flex-col' : 'flex-row'"
            >
              <div class="flex items-center gap-[0.3rem] flex-wrap">
                <div
                  class="flexBasic bg-[#F0F5F3] rounded-[0.75rem] gap-4 px-[0.55rem] py-[0.3rem]"
                  v-for="(mail, index) in recieverMail"
                  :key="index"
                >
                  <h3 class="text-[#244034b3] font-Satoshi500 leading-[1.104rem] text-[0.702rem]">
                    {{ mail }}
                  </h3>
                  <cancelIcon class="cursor-pointer" @click="removeMail(index)" />
                </div>
              </div>
              <input
                type="mail"
                ref="mailInput"
                v-model="mailValue"
                placeholder="Enter mail"
                class="font-Satoshi400 text-[0.7rem] text-[#244034b3] leading-[1.2rem]"
                @input="filterMail"
                v-if="recieverMail?.length < 1"
              />
            </div>
          </div>
          <div class="flexBasic gap-[0.8rem]">
            <h3 class="hidden font-Satoshi500 text-[0.75rem] leading-[1.51rem] text-[#244034cc]">
              Cc
            </h3>
            <h3 class="hidden font-Satoshi500 text-[0.75rem] leading-[1.51rem] text-[#244034cc]">
              Bcc
            </h3>
          </div>
          <div
            class="max-h-[15rem] absolute top-[100%] left-[10%] w-[50%] msgMob:w-[70%] bg-white rounded-[0.3rem] py-[0.5rem] shadow-4xl"
            v-if="mailValue.length > 0"
          >
            <div class="w-full">
              <ShortLoader v-if="loadingMails" />
              <div class="border-b" v-else>
                <article
                  class="flex items-center gap-[0.5rem] p-[0.3rem] py-[0.2rem] cursor-pointer"
                  v-for="mail in displayedMails"
                  @click="addMail(mail.email)"
                  :key="mail.email"
                >
                  <div
                    class="w-[2.5rem] h-[2.5rem] border !rounded-full overflow-hidden grid place-items-center bg-brand"
                  >
                    <!-- <img src="" alt="user_img" class="object-contain"> -->
                    <div class="text-white uppercase">
                      {{ mail.first_name[0] }}{{ mail.last_name[0] }}
                    </div>
                  </div>
                  <div>
                    <p class="capitalize font-Satoshi500 text-[0.8rem]">
                      {{ mail.first_name }} {{ mail.last_name }}
                    </p>
                    <h3 class="!text-[0.6rem]">{{ mail.email }}</h3>
                  </div>
                </article>
              </div>
              <div class="p-[0.3rem] pt-[0.5rem] pb-0 flex gap-[0.5rem] items-center">
                <SearchIcon class="rotate-[90deg]" />
                <h3 class="text-[0.8rem] font-Satoshi400">Top Results</h3>
              </div>
            </div>
          </div>
        </div>
        <hr class="border-[#EEEEEE] border-1" />
        <div :class="{ hidden: showSubject }">
          <div class="px-4 py-[0.5rem] flex items-center gap-4">
            <h3 class="text-[#244034] font-Satoshi400 text-[0.702rem] capitalize">subject:</h3>
            <input
              type="text"
              class="font-Satoshi400 text-[0.7rem] text-[#244034b3] leading-[1.2rem] basis-full"
              v-model="mailSubject"
            />
          </div>
          <hr class="border-[#EEEEEE] border-1" />
        </div>
      </div>
      <div class="px-4 w-[100%] flex-1 h-auto my-[0.5rem] quill">
        <textarea
          ref="textArea"
          class="textarea w-[100%] h-full p-[0.5rem] font-Satoshi400 text-[0.75rem] leading-[1.505rem] text-[#000000bf] resize-y focus:outline-0 block overflow-auto scroller"
          placeholder="Write a message"
          @input="autoResize"
        ></textarea>
      </div>
      <div class="p-4 !pt-0 flexBasic h-fit">
        <div class="flexBasic gap-4">
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
        <div class="flexBasic gap-4">
          <DeleteIcon class="cursor-pointer" @click="handleDelete" />
          <button
            class="bg-[#3F634D] rounded-[10.38575rem] px-[1.3rem] py-[0.3rem] font-Satoshi500 text-[#fff] text-[0.803rem] leading-[1.7rem]"
            @click="handleReply"
            :class="props.isSending? 'px-[2rem] py-[1rem]': ''"
            v-if="!sendButton"
          >
          <span v-if="!props.isSending">Reply</span>
          <WhiteLoader v-else />
          </button>
          <button
            class="bg-[#3F634D] rounded-[10.38575rem] px-[1.3rem] py-[0.3rem] font-Satoshi500 text-[#fff] text-[0.803rem]"
            @click="handleSend"
            :class="props.isSending? 'px-[2rem] py-[1rem]': ''"
            v-if="sendButton"
          >
            <span v-if="!props.isSending">Send</span>
            <WhiteLoader v-else />
          </button>
        </div>
      </div>
    </div>
    <div
      class="attachment px-[1.66rem] !pb-6 !my-[1.66rem] basis-[30%]"
      v-if="uploadedFileDetails?.length > 0"
    >
      <!-- <div class="flexBasic">
                    <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">{{ uploadedFileDetails?.length}} Attachment</h3>
                    <button class="text-[#349459] font-Satoshi500 text-[0.702rem]">Download All</button>
                </div> -->
      <div class="mt-4 flex !gap-[0.5rem] flex-wrap">
        <article
          class="flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center"
          v-for="(item, index) in uploadedFileDetails"
          :key="index"
        >
          <circleFileIcon />
          <div>
            <h3 class="font-Satosi400 text-[#244034] leading-[1.003rem] text-[0.75rem]">
              {{ item.name }}
            </h3>
            <p class="text-[#24403480] font-Satoshi400 text-[0.65rem] leading-[1.003rem]">
              {{ item.size }}
            </p>
          </div>
          <cancelIcon class="cursor-pointer" @click="removeFile(index)" />
        </article>
      </div>
    </div>
  </article>
</template>
