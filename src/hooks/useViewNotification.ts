import { doc, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-toastify"
import { useFetchNotifications } from "../api/notifications/notifications"
import { auth, db } from "../firebase/firebase-config"

const useViewNotification = () => {
  const [user] = useAuthState(auth)
    const {data: notificationsData} = useFetchNotifications()
    const userDataRef = doc(db, "users", user?.email + "")


    const viewNotification = async(selectedNotificationId: string) => {
      try {
        const viewedNotification = notificationsData.map((data) => data.notificationId === selectedNotificationId ? {
          ...data,
          hasViewed: true
        } : data);

        await updateDoc(userDataRef, {notifications: viewedNotification});
      } catch(err: any){
        toast.error(err.message)
      }
      
    }
  return {viewNotification}
}

export default useViewNotification