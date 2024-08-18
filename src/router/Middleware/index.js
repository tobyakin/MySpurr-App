import { decrypt } from '@/services/Encrypt'
import { logout } from '../../services/Auth'

const getUserFromLocalStorage = () => {
  const encryptedData = localStorage.getItem('_user_data')
  return encryptedData ? decrypt(encryptedData, import.meta.env.VITE_ENCRYPT_KEY).data : null
}

const redirectLogin = () => getUserFromLocalStorage()?.token ? undefined : { name: 'login' };

const redirectDashboard = () => getUserFromLocalStorage()?.token ? { name: 'dashboard' } : undefined;

const deleteSession = async() => {
  try {
    await logout();
  } catch (error) {
    console.log(error)
  }

  if (localStorage.getItem('_user_data')) {
    localStorage.removeItem('_user_data')
    return { name: 'login' }
  }
  return undefined
}
export default {
  redirectLogin,
  redirectDashboard,
  deleteSession
}

