import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
    getMessages,
    sendMessage,
    replyMessage,
    getSentMessages,
    getMessageDetail,
    getMail,
    connect,
    editMessage,
    editReplyMessage
} from "@/services/Messaging"

export const useMessageStore = defineStore('messages', () => {
    const allMessages = ref([])
    const sentMessages = ref([])
    const filteredMails = ref([])
    const messageDetail = ref([])
    const errorMessage = ref(null)
    const socket = ref(null)
    const editedMessageList = ref([])

    const connectSocket = async (receiverId) => {
        try {
          socket.value = await connect(receiverId)
          return socket.value
        } catch (error) {
          console.error('Error fetching job title :', error)
        }
    }

    const handleSendMessage = async (payload)=>{
        try {
            let res = await sendMessage(payload)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleReplyMessage = async (payload)=>{
        try {
            let res = await replyMessage(payload)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetMessages = async (userId)=>{
        try {
            allMessages.value = await getMessages(userId)
            return allMessages.value
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSentMessages = async ()=>{
        try {
            sentMessages.value = await getSentMessages()
            return sentMessages.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleMessageDetail = async (message_id)=>{
        try {
            messageDetail.value = await getMessageDetail(message_id)
            return messageDetail.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditMessage = async (message_id, payload) =>{
        try {
            let res = await editMessage(message_id, payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditReplyMessage = async (message_id, payload) =>{
        try {
            let res = await editReplyMessage(message_id, payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const updateEditedMessageList = (id) => {
        let match = editedMessageList.value.find((item) => item === id);
        if (match) {
            return editedMessageList.value;
        } else {
            editedMessageList.value.push(id);
        }

        localStorage.setItem("editedMessageIds", JSON.stringify(editedMessageList.value));
    };

    const getEditedMessageList = ()=>{
        const storedList = localStorage.getItem("editedMessageIds");
        if (storedList) {
            editedMessageList.value = JSON.parse(storedList);
        }

        return editedMessageList.value
    }

    const handleFilterMails = async (mail_input)=>{
        try {
            filteredMails.value = await getMail(mail_input)
            return filteredMails.value
        } catch (error) {
            errorMessage.value = error
            console.log(error)
        }
    }

    
    return { 
       allMessages,
       handleGetMessages,
       sentMessages,
       handleSentMessages,
       filteredMails,
       handleFilterMails,
       messageDetail,
       handleMessageDetail,
       handleReplyMessage,
       handleSendMessage,
       errorMessage,
       socket,
       connectSocket,
       handleEditMessage,
       editedMessageList,
       updateEditedMessageList,
       getEditedMessageList,
       handleEditReplyMessage
       
    }
})