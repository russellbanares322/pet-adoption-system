import { doc, onSnapshot } from "firebase/firestore"
import { Moment } from "moment"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../firebase/firebase-config"

export type NotificationData = {
    notificationId: string,
    petId: string,
    petImage: string,
    applicationId: string,
    status: string,
    rejectionReason: string,
    approvalNote: string | null,
    userPerformedAction: {
      userEmail: string,
      userId: string,
      userFullName:string
    },
    hasViewed: boolean,
    dateUpdated: Moment
}

const useFetchNotifications = () => {
    const [data, setData] = useState<NotificationData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
    const isUserLoggedIn = user;
    const getNotifications = () => {
        setIsLoading(true);
        const userRef = doc(db, "users", user?.email + "");

        onSnapshot(userRef, (doc) => {
            setData(doc.data()?.notifications)
            setIsLoading(false);
          });
    }

    useEffect(() => {
        if(isUserLoggedIn){
            getNotifications()
        }
    }, [isUserLoggedIn])
    
    
    return {data, isLoading}
}

export {useFetchNotifications}