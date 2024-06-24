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
    const sentMessages = ref([])
    const receivedMessages = ref([])

    
    function groupMessagesByConversation(sent, received) {
        const conversations = {};
        
        function addMessageToConversation(sender, receiver, message) {
            const key = [sender, receiver].sort().join('_');
            if (!conversations[key]) {
            conversations[key] = { participants: [sender, receiver], thread: [] };
            }
            conversations[key].thread.push(message);
        }
        
        sent.forEach(message => {
            addMessageToConversation(message.attributes.sender_id, message.attributes.reciever_id, message);
        });
        
        received.forEach(message => {
            addMessageToConversation(message.attributes.sender_id, message.attributes.reciever_id, message);
        });
        
        return Object.values(conversations);
    }

    
    const getConversationList = async (userEmail, accountType) => {
        try {
            let res1, res2;
            if (accountType === 'talent'){
                res1 = await getTalentSentMessages()
                res2 = await getTalentReceivedMessages()
            } else if (accountType === 'business') {
                res1 = await getBusinessSentMessages()
                res2 = await getBusinessReceivedMessages()
            }

            sentMessages.value = [...res1.data]
            receivedMessages.value = [...res2.data]

                // sentMessages.value = [
                // {
                //   "sender_id": "abdultawabsalawudeen@gmail.com",
                //   "to": "abdultawabdeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "abdultawabsalawudeen@gmail.com",
                //   "to": "abdultawabdeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "abdultawabsalawudeen@gmail.com",
                //   "to": "opeydeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "abdultawabsalawudeen@gmail.com",
                //   "to": "opeydeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "abdultawabsalawudeen@gmail.com",
                //   "to": "opeydeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "abdultawabsalawudeen@gmail.com",
                //   "to": "opeysaint@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // ]
                
                // receivedMessages.value = [
                // {
                //   "sender_id": "abdultawabdeen@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "abdultawabdeen@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "opeydeen@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "opeydeen@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "opeydeen@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "opeysaint@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // {
                //   "sender_id": "lagbaja@gmail.com",
                //   "to": "abdultawabsalawudeen@gmail.com",
                //   "subject": "Apply for job",
                //   "body": "I am applying for the role of a frontend developer.",
                //   "cc": "",
                //   "bcc": "",
                //   "attachments": [
                //       {
                //           "file": ""
                //       }
                //   ]
                // },
                // ]

          
            const conversations = computed(() => {
                return groupMessagesByConversation(sentMessages.value, receivedMessages.value)
            })

            chats.value = conversations.value.map((conversation, index)=>{
                return {
                  id: index + 1,
                  userId: userEmail,
                  recieverID: conversation?.participants.find(email=>email !== userEmail) || '',
                  ...conversation,
                  senderID: 1,
                    id: 1,
                    status: "primary",
                    name: "jenny rio",
                    subject: "Work inquiry from google",
                    description:
                    "Hello, This is Jenny from google. We’r the largest online platform offer...",
                    date: "aug 22",
                    clicked: false,
                    logo: "",
                    timeStamp: "4:54AM (3 hours ago)",
                    mail: "google@inquiry.com",
                    company: "Google",
                }
            })

            console.log(chats.value)
            return chats.value, res1, res2
        } catch (error) {
            console.log(error);
            return {};
        }
    }

    return { 
        getConversationList,
        chats
    }
})