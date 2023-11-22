import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBankList, verifyPin, addBankAccount, setWithdrawalPin } from '@/services/Wallet'

export const useWalletStore = defineStore('wallet', () => {
  const banks = ref({})

  const getBanks = async () => {
    try {
      banks.value = await getBankList()
      return banks.value
    } catch (error) {
      console.error('Error fetching banks :', error)
    }
  }
      const verifyPIN = async (payload) => {
        try{
          let res = await verifyPin(payload)
          return res
        }catch (error) {
          /**/
        }
      }

      const addBank = async (payload) => {
        try{
          let res = await addBankAccount(payload)
          return res
        }catch (error) {
          /**/
        }
      }
      const setPin = async (payload) => {
        try{
          let res = await setWithdrawalPin(payload)
          return res
        }catch (error) {
          /**/
        }
      }
  return {
    banks,
    getBanks,
    verifyPIN,
    addBank,
    setPin
  }
})
