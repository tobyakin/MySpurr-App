<template>
    <section class="widget-container" :class="{ 'widget-closed': closeWidget }">
      <div class="header">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="userImg w-[1.875rem] h-[1.875rem] rounded-full overflow-hidden">
              <img src="@/assets/image/userImg.png" alt="User Image" class="w-full h-full">
            </div>
            <h3 class="text-[#000] font-Satoshi500 leading-[1.51rem] text-[0.903rem] ml-2">Messaging</h3>
          </div>
          <div class="flex items-center gap-4">
            <MoreVertIcon />
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M3.43501 12.0374L4.6968 8.88292C4.89798 8.37995 5.19923 7.9231 5.58228 7.54005L12.5015 0.621319C13.3299 -0.207108 14.673 -0.207106 15.5015 0.621321C16.3299 1.44975 16.3299 2.79289 15.5015 3.62132L8.58228 10.5401C8.19923 10.9231 7.74238 11.2243 7.23941 11.4255L4.08495 12.6873C3.67679 12.8506 3.27175 12.4455 3.43501 12.0374Z" fill="#6C8285"/>
              <path d="M1.50195 3.87061C1.50195 3.18025 2.0616 2.62061 2.75195 2.62061H8.00195C8.41617 2.62061 8.75195 2.28482 8.75195 1.87061C8.75195 1.45639 8.41617 1.12061 8.00195 1.12061H2.75195C1.23317 1.12061 0.00195312 2.35182 0.00195312 3.87061V13.3706C0.00195312 14.8894 1.23317 16.1206 2.75195 16.1206H12.252C13.7707 16.1206 15.002 14.8894 15.002 13.3706V8.12061C15.002 7.70639 14.6662 7.37061 14.252 7.37061C13.8377 7.37061 13.502 7.70639 13.502 8.12061V13.3706C13.502 14.061 12.9423 14.6206 12.252 14.6206H2.75195C2.0616 14.6206 1.50195 14.061 1.50195 13.3706V3.87061Z" fill="#6C8285"/>
            </svg>
            <DropDownArror class="!text-[#6C8285] cursor-pointer arrow" @click="handleWidgetClose" />
          </div>
        </div>
        <div class="filter-section">
          <MessageFilter />
        </div>
      </div>
      <div class="message-content">
        <div class="message-list" v-if="showChatList">
          <MessageList :messageList="messages" @click="showChatPane" />
        </div>
        <div class="chat-pane" v-if="showChatPage">
          <MessageChatPane :chat="clickedMessage" class="h-fit" @closeWidget="handleWidgetClose" @switchTab="switchTab" />
          <div class="message-input">
            <AttachFile />
            <span class="input-box" contenteditable></span>
            <span>send</span>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
  import MessageFilter from "@/components/ui/Message/MessageFilter.vue";
  import AttachFile from "@/components/icons/attachFile.vue";
  import DropDownArror from "@/components/icons/DropDownArrow.vue";
  import MessageList from "@/components/ui/Message/MessageList.vue";
  import MessageChatPane from "@/components/ui/Message/MessageChatPane.vue";
  
  const clickedMessage = ref();
  const showChatList = ref(true);
  const showChatPage = ref(false);
  const closeWidget = ref(false);
  
  const messages = ref([
    // Your messages data
  ]);
  
  function assignClickedMessage() {
    messages.value.forEach((item) => {
      if (item.clicked) {
        clickedMessage.value = item;
      }
    });
  }
  
  assignClickedMessage();
  
  function showChatPane(clickedMessage) {
    messages.value.forEach((message) => {
      message.clicked = message.id === clickedMessage.id;
      if (message.clicked) {
        clickedMessage = message;
      }
    });
  
    messages.value = [...messages.value];
    assignClickedMessage();
    showChatList.value = false;
    showChatPage.value = true;
  }
  
  function switchTab() {
    showChatList.value = true;
    showChatPage.value = false;
  }
  
  function handleWidgetClose() {
    closeWidget.value = !closeWidget.value;
  }
  </script>
  
  <style scoped>
  .widget-container {
    width: 22rem;
    height: 30rem;
    background: #fff;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: height 0.3s ease;
    overflow: hidden;
  }
  
  .widget-container.widget-closed {
    height: 2.5rem; /* Adjust the height to only show the header */
  }
  
  .header {
    padding: 0.5rem 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .filter-section {
    padding-bottom: 1rem;
  }
  
  .message-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .message-list {
    flex: 1;
    overflow-y: auto;
  }
  
  .chat-pane {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .message-input {
    display: flex;
    align-items: center;
    background: #2f929c1a;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    gap: 0.5rem;
    min-height: 16px;
    max-height: 160px;
    position: absolute;
    bottom: 0;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .input-box {
    flex: 1;
    padding: 0.5rem;
    background: transparent;
    font-family: Satoshi, sans-serif;
    font-size: 0.57rem;
    color: #000;
    resize: none;
    min-height: 16px;
    max-height: 40px;
    overflow: auto;
  }
  </style>
  