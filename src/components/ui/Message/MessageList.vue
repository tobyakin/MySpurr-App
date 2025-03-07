<script setup>
  import fileIcon from "@/components/icons/fileIcon.vue";
  import { useUserProfile } from "../../../stores/profile";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { computed } from "vue";

  const useProfile = useUserProfile()
  const { user } = storeToRefs(useProfile)
  const props = defineProps(['messageList', 'filter', 'clickedId'])
  const emit = defineEmits(['messageClicked'])
  const emitMMessageId = async (id, index)=>{
    emit('messageClicked', {id: id, index: index})
  }
  const userDetails = computed(()=>{
    return user.value
  })

  // async function scroll(){
  //   console.log(props.clickedId)
  //   await nextTick();
  //     const messageElement = document.querySelector(`.index-${props.clickedId}`);
  //   if (messageElement) {
  //     messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // }

  // scroll()

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

  function displayDate(full_string){
    let date = full_string.split(' ').slice(0, 3).join(' ');
    return date
  }

  function displayTime(full_string){
    let time = full_string.split(' ').slice(3).join(' ');
    return time
  }

  // Function to sort messages by the `sent_at` field
  const sortedMessages = computed(() => {
    return [...props.messageList].sort(
      (a, b) => new Date(b.sent_at) - new Date(a.sent_at)
    );
  });

  onMounted(async()=>{
    await useProfile.userProfile()
  })

</script>
<template>
  <div>
    <article 
    :id="'message-' + message.id" 
    class="p-[1.25rem] border-y border-[#F3F3F3] cursor-pointer" v-for="(message, index) in sortedMessages" :key="message.id" @click="emitMMessageId(message.id, index)"
    :data-id="message.id"
    :class="clickedId === index? `active index-${index}`: 'reg'"
    @next="handleNext"
    >
          <div class="status flex items-center gap-[0.8rem] mb-[0.35rem]" :data-id="message.id">         
            <div>
              <span v-if="message.status ==='primary' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#007582]"></span>
              <span v-if="message.status ==='sent' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#949939]"></span>
              <span v-if="message.status ==='others' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#DA5252]"></span> 
            </div>
            <div class="flex items-center justify-between w-full">
              <div>
                <div v-if="filter !== 'sent'">
                  <h3 class="userName font-Satoshi500 text-messageFont leading-[2rem] text-[0.75rem] capitalize" v-if="userDetails?.data?.id == message?.sender_id">{{ message?.receiver?.first_name }} {{ message?.receiver?.last_name }}</h3>
                  <h3 class="userName font-Satoshi500 text-messageFont leading-[2rem] text-[0.75rem] capitalize" v-else>{{ message.sender.first_name }} {{ message.sender.last_name }}</h3>
                  
                </div>
                <h3 v-else class="userName font-Satoshi500 text-messageFont leading-[2rem] text-[0.75rem] capitalize">{{ message?.receiver?.first_name }} {{ message?.receiver?.last_name }}</h3>
              </div>
              <div>
                <h3 class="text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 uppercase text-[0.6rem] text-right">{{ displayDate(message.sent_at) }}</h3>
                <h3 class="text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 uppercase text-[0.6rem] text-right">{{ displayTime(message.sent_at) }}</h3>
              </div>
            </div>
          </div>
          <div class="messageDetail pl-[1rem]">
            <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.5rem] text-[0.8rem] !mb-[0.3rem] capitalize" v-if="message?.subject?.length > 0">{{ message.subject }}</h3>
            <p class="messageText text-messageFont font-Satoshi400 leading-[1.25rem] text-[0.8rem] !mb-[0.7rem]" v-html="truncate(message.message, 12)"></p>
            <div v-if="message?.attachment && message.attachment.length > 0" class="flex gap-[0.5rem]">                    
              <div class="attachments flex items-center gap-[0.5rem] flex-wrap" v-for="file in message?.attachment" :key="file">
                <div class="attachment flex items-center justify-center gap-[0.24rem] bg-[#F0F5F3] w-fit px-[0.3rem] py-[0.5rem] rounded-[0.2rem]">
                  <fileIcon />
                  <p class="text-[rgba(0, 0, 0, 0.60)] text-[0.6rem]">
                    {{ file.file_name }}
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