
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { sendMessage, connect } from '@/services/Socket'

export const useSocketStore = defineStore('socket', () => {
  const socket = ref(null)
  const socketMessage = ref(null)
  const connectSocket = async (receiverId) => {
    try {
      socket.value = await connect(receiverId)
      return socket.value
    } catch (error) {
      console.error('Error fetching job title :', error)
    }
  }
  const sendSocketMessage = async (receiverId, payload) => {
    try {
      await sendMessage(receiverId, payload)
    } catch (error) {
      console.error('Error fetching job title :', error)
    }
  }

  return {
    socket,
    connectSocket,
    sendSocketMessage,
    socketMessage
  }
})



// import { defineStore } from 'pinia'
// import io from 'socket.io-client'

// export const useSocketStore = defineStore('socket', {
//   state: () => ({
//     socket: null
//   }),
//   actions: {
//     connect() {
//       // Connect to the Socket.io server
//       this.socket = io('http://localhost:3000')

//       // Listen for events
//       this.socket.on('connect', () => {
//         console.log('Connected to Socket.io server')
//       })

//       this.socket.on('message', (data) => {
//         console.log('Received message:', data)
//       })
//     },
//     sendMessage(message) {
//       // Send a message to the server
//       this.socket.emit('message', message)
//     }
//   }
// })

// 

// 

// import { ref } from 'vue'
// import { defineStore } from 'pinia'
// import io from 'socket.io-client'
// import { sendMessage, connect } from '@/services/Socket'

// export const useSocketStore = defineStore('socket', () => {
//   const socket = io(import.meta.env.VITE_BACKEND_BASEURL)

//   const connect = (receiverId) => {
//     // Listen for events
//     socket.value.on(`message/${receiverId}`, () => {
//       console.log('Connected to Socket.io server')
//     })

//     socket.value.on('message', (data) => {
//       console.log('Received message:', data)
//     })
//   }
//    const sendMessage = (receiverId,message) => {
//      // Send a message to the server
//      socket.value.emit(`message/${receiverId}`, message)
//    }

//   return {
//     socket,
//     connect,
//     sendMessage
//   }
// })
// import { defineStore } from 'pinia'
// import io from 'socket.io-client'
// import { getToken } from './Auth'

// export const useSocketStore = defineStore('socket', {
//   state: () => ({
//     socket: null
//   }),
//   actions: {
//     connect: async (receiverId) => {
//       // Retrieve the bearer token from the auth module
//       const token = await getToken()

//       // Connect to the Socket.io server with the bearer token
//       this.socket = io(`https://myspurr.azurewebsites.net/api/v1/message/${receiverId}`, {
//         extraHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       })

//       // Listen for events
//       this.socket.on('connect', () => {
//         console.log('Connected to Socket.io server')
//       })

//       this.socket.on('message', (data) => {
//         console.log('Received message:', data)
//       })
//     },
//     sendMessage: (message) => {
//       // Send a message to the server
//       this.socket.emit('message', message)
//     }
//   }
// })



// import { reactive } from 'vue'
// import { io } from 'socket.io-client'

// export const state = reactive({
//   connected: false,
//   fooEvents: [],
//   barEvents: []
// })

// // "undefined" means the URL will be computed from the `window.location` object
// // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'
// const URL =  import.meta.env.VITE_BACKEND_BASEURL

// export const socket = io(URL)

// socket.on('message/`${receiverId}`', () => {
//   state.connected = true
// })

// socket.emit('message/`${receiverId}', () => {
//   state.connected = false
// })

// // socket.on('foo', (...args) => {
// //   state.fooEvents.push(args)
// // })

// // socket.on('bar', (...args) => {
// //   state.barEvents.push(args)
// // })
