<script setup>
    import fileIcon from "@/components/icons/fileIcon.vue";
    const props = defineProps(['messageList'])
    const emit = defineEmits(['click'])
    const showChatPane = (message)=>{
      emit('click', message)
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
    

</script>
<template>
    <article id="message" class="p-[1.25rem] border-y border-[#F3F3F3] cursor-pointer" v-for="message in messageList" :key="message.senderID" :class="{active : message.clicked}" @click="showChatPane(message)">
      <div class="status flex items-center gap-[0.8rem] mb-[0.35rem]">
        <div>
          <span v-if="message.status==='primary' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#007582]"></span>
          <span v-if="message.status==='read' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#949939]"></span>
          <span v-if="message.status==='unread' " class="w-[0.40rem] h-[0.40rem] rounded-[50%] block bg-[#DA5252]"></span> 
        </div>
        <div class="flex items-center justify-between w-full">
          <h3 class="userName font-Satoshi500 text-messageFont leading-[2rem] text-[0.75rem] capitalize">{{ message.name }}</h3>
          <h3 class="text-[rgba(0, 0, 0, 0.50)] font-Satoshi400 leading-4 uppercase text-[0.6rem]">{{ message.date }}</h3>
        </div>
      </div>
      <div class="messageDetail pl-[1rem]">
        <h3 class="messageTitle font-Satoshi500 text-[#000] leading-[1.5rem] text-[0.8rem] !mb-[0.3rem] capitalize">{{ message.title }}</h3>
        <p class="messageText text-messageFont font-Satoshi400 leading-[1.25rem] text-[0.8rem] !mb-[0.7rem]">{{ truncate(message.description, 12) }}</p>
        <div class="attachments flex items-center gap-[0.5rem] flex-wrap">                    
          <div class="attachment flex items-center justify-center gap-[0.24rem] bg-[#F0F5F3] w-fit px-[0.3rem] py-[0.5rem] rounded-[0.2rem]" v-for="file in message.attachment">
            <fileIcon />
            <p class="text-[rgba(0, 0, 0, 0.60)] text-[0.6rem]">{{ file }}</p>
          </div>
        </div>
      </div>
    </article>
</template>

<style lang="scss" scoped>

</style>