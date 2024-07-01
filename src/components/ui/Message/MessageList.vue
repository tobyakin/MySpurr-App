<script setup>
  import fileIcon from "@/components/icons/fileIcon.vue";
  import { ref } from "vue";
  const props = defineProps(['messageList', 'filter', 'clickedId'])
  const emit = defineEmits(['messageClicked'])
  const emitMMessageId = (id)=>{
    emit('messageClicked', id)
  }

  function wordsLen(str) { 
    const array = str.trim().split(/\s+/); 
    return array.length; 
  }

  function truncate(str, no_words) {
      wordsLen(str)
      let lengtofWord = wordsLen(str)
      if (lengtofWord > 12){
          return str.split(" ").splice(0,no_words).join(" ") + `...`;
      } else {
          return str
      }
  }

  function getLastThreadItem(message) {
    if (message && message.thread && message.thread.length > 0) {
      return message.thread.length - 1;
    }
    return null;
  }
</script>
<template>
  <div>
    <article 
    id="message" 
    class="p-[1.25rem] border-y border-[#F3F3F3] cursor-pointer" v-for="message in messageList" :key="message.id" @click="emitMMessageId(message.id)"
    :class="clickedId === message.id? 'active': 'reg'"
    >
          <div class="status flex items-center gap-[0.8rem] mb-[0.35rem]" :data-id="message.id">         
            <div>
              <span v-if="message.attributes.status ==='primary' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#007582]"></span>
              <span v-if="message.attributes.status ==='read' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#949939]"></span>
              <span v-if="message.attributes.status ==='unread' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#DA5252]"></span> 
            </div>
            <div class="flex items-center justify-between w-full">
              <h3 v-if="filter !== 'primary'" class="userName font-Satoshi500 text-messageFont leading-[2rem] text-[0.75rem] capitalize">{{ message.attributes.sender }}</h3>
              <h3 v-else class="userName font-Satoshi500 text-messageFont leading-[2rem] text-[0.75rem] capitalize">{{ message.attributes.receiver }}</h3>
              <h3 class="text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 uppercase text-[0.6rem]">{{ message.attributes.sent_at }}</h3>
            </div>
          </div>
          <div class="messageDetail pl-[1rem]">
            <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.5rem] text-[0.8rem] !mb-[0.3rem] capitalize" v-if="message.attributes.subject.length > 0">{{ message.attributes.subject }}</h3>
            <p class="messageText text-messageFont font-Satoshi400 leading-[1.25rem] text-[0.8rem] !mb-[0.7rem]">{{ truncate(message.attributes.body, 12) }}</p>
            <div v-if="message.attributes.attachment.length > 0">                    
              <div class="attachments flex items-center gap-[0.5rem] flex-wrap" v-for="file in message?.attributes.attachment" :key="file">
                <div class="attachment flex items-center justify-center gap-[0.24rem] bg-[#F0F5F3] w-fit px-[0.3rem] py-[0.5rem] rounded-[0.2rem]">
                  <fileIcon />
                  <p class="text-[rgba(0, 0, 0, 0.60)] text-[0.6rem]">
                    {{ file }}
                  </p>
                </div>
              </div>
            </div>
          </div>
    </article>
  </div>
</template>

<style scoped>
  
</style>