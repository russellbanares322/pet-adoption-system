import {  doc, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-toastify"
import { useFetchNotifications } from "../api/notifications/notifications"
import { useFetchUser } from "../api/users/users"
import { auth, db } from "../firebase/firebase-config"

const useViewNotification = () => {
  const [user] = useAuthState(auth)
  const userEmail = user?.email + ""
    const { data: notificationsData } = useFetchNotifications();
    const { data: userData } = useFetchUser(userEmail);
    const userDataRef = doc(db, "users", userEmail)

    const viewNotification = async(selectedNotificationId: string) => {
      try {
        const viewedNotification = notificationsData.map((data) => data.notificationId === selectedNotificationId ? {
          ...data,
          hasViewed: true
        } : data);

        await updateDoc(userDataRef, { notifications: viewedNotification });
      } catch(err: any){
        toast.error(err.message)
      }
      
    }

    const deleteNotification = async (selectedNotificationId: string) => {
      try {
        const filteredNotifications = userData?.notifications?.filter((data) => data.notificationId !== selectedNotificationId)
        await updateDoc(userDataRef, {
          ...userData,
          notifications: filteredNotifications
        })

        toast.success("Removed notification")
      } catch(err: any){
        toast.error(err.message)
      }
      
    }
  return { viewNotification, deleteNotification }
}

export default useViewNotification