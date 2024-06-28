import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import {
    getMessage,
    sendMessage,
    getTalentSentMessages,
    getSentTalentMessageDetail,
    getTalentReceivedMessages,
    getTalentReceivedMessageDetail,
    getBusinessSentMessages,
    getBusinessSentMessageDetail,
    getBusinessReceivedMessages,
    getBusinessReceivedMessageDetail

} from "@/services/Messaging"

export const useMessageStore = defineStore('messages', () => {
    const chats = ref([])
    const allMessages = ref()
    const sentMessages = ref([])
    const receivedMessages = ref([])
    const sentMessageDetail = ref([])
    const receivedMessageDetail = ref([])
    
    const handleTalentSentMessages = async ()=>{
        try {
            sentMessages.value = await getTalentSentMessages()
            return sentMessages.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleTalentReceivedMessages = async ()=>{
        try {
            receivedMessages.value = await getTalentReceivedMessages()
            return receivedMessages.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleBusinessRecievedMessages = async ()=>{
        try {
            receivedMessages.value =await getBusinessReceivedMessages()
            return receivedMessages.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleBusinesSentMessages = async ()=>{
        try {
            sentMessages.value =await getBusinessSentMessages()
            return sentMessages.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleSentTalentDetail = async (message_id)=>{
        try {
            sentMessageDetail.value = getSentTalentMessageDetail(message_id)
            return sentMessageDetail.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleReceivedTalentDetail = async (message_id) =>{
        try {
            receivedMessageDetail.value = getTalentReceivedMessageDetail(message_id)
            return receivedMessageDetail.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleReceivedBusinessDetail = async (message_id) =>{
        try {
            receivedMessageDetail.value = getBusinessReceivedMessageDetail(message_id)
            return receivedMessageDetail.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleSentBusinessDetail = async (message_id)=>{
        try {
            sentMessageDetail.value = getBusinessSentMessageDetail(message_id)
            return sentMessageDetail.value
        } catch (error) {
            console.log(error)
        }
    }
    
    return { 
       sentMessages,
       receivedMessages,
       sentMessageDetail,
       receivedMessageDetail,
       handleTalentSentMessages,
       handleTalentReceivedMessages,
       handleSentTalentDetail,
       handleReceivedTalentDetail,
       handleBusinesSentMessages,
       handleBusinessRecievedMessages,
       handleReceivedBusinessDetail,
       handleSentBusinessDetail,
    }
})