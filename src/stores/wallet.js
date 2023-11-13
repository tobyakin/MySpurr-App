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
        verifyPin(payload)
      }

      const addBank = async (payload) => {
          addBankAccount(payload)
      }
      const setPin = async (payload) => {
        setWithdrawalPin(payload)
      }
  return {
    banks,
    getBanks,
    verifyPIN,
    addBank,
    setPin
  }
})
