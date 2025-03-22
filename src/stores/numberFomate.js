import { defineStore } from 'pinia'
import { ref } from 'vue'
import currencySymbol from 'currency-symbol'

export const useNumberFomateStore = defineStore('numberFomate', () => {
  const abbr = (num, digits = 1) => { // Default digits to 1
    let si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' }
    ];
    
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
  
    // Round up and format to 1 decimal place
    const roundedValue = Math.ceil((num / si[i].value) * 10) / 10;
    
    return roundedValue.toFixed(1).replace(rx, '$1') + si[i].symbol;
  };  
  const formatCurrency = (value) => {
    return currencySymbol.symbol(value)
  }
  return {
    abbr,
    formatCurrency
  }
})
