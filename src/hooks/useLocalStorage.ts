
const useLocalStorage = () => {

    const saveItemInLocalStorage = <T> (localStorageKey: string, data: T) => {
        localStorage.setItem(localStorageKey, JSON.stringify(data))
    }

    const getItemFromLocalStorage = (localStorageKey: string) => {
        return JSON.parse(localStorage.getItem(localStorageKey) || "{}")
    }

    const removeItemFromLocalStorage = (localStorageKey: string) => {
      return  localStorage.removeItem(localStorageKey)
    }

  return {getItemFromLocalStorage, removeItemFromLocalStorage, saveItemInLocalStorage}
}

export default useLocalStorage