import useLocalStorage from "./useLocalStorage"

const useUserInfo = () => {
    const { getItemFromLocalStorage } = useLocalStorage()
    const userData = getItemFromLocalStorage("user-info");
    const displayName = userData?.displayName
    const email = userData?.email
    const uid = userData?.uid
    const isLoggedIn = Object.values(userData).length > 0

  return {
    displayName,
    email,
    isLoggedIn,
    uid
  }
}

export default useUserInfo