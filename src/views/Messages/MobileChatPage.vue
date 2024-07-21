<template>
     <div class="h-[100%]">
        <div :class="showReplyField? 'h-[70%]': 'h-[100%]'">
        <!-- <ShortLoader v-if="chatLoading"/> -->
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
</template>

<script setup>
import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import MessageInputField from "@/components/ui/Message/MessageInputField.vue";
import { useMessageStore } from "@/stores/message";
import { storeToRefs } from "pinia";
const messageStore = useMessageStore();
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(['id'])
const { sentMessages, allMessages, filteredMails, messageDetail } = storeToRefs(messageStore)
const messageDetails = ref([])
const messageID = ref()
const route = useRoute()
const showReplyField = ref(false)

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

const handleReplyMessage = async (payload)=>{
  await messageStore.handleReplyMessage(payload)
  getAllMessages(userID.value)
//   handleMessageClicked(payload.message_id)
  showReplyField.value = false
  getSentMessages()
}

function handleReply(chatId) {
  showReplyField.value = true;
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick();
  const container = chatContainer.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

onMounted(()=>{
    messageID.value = route.params.id
    getMessageDetail(messageID.value)
    messageDetails.value = messageDetail.value.data
})

</script>

<style scoped>

</style>