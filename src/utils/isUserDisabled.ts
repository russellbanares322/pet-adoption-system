import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const isUserDisabled = async(userEmail: string) => {
    const userDataRef = doc(db, "users", userEmail);
    const response = await getDoc(userDataRef);
    const userAccountDisabled = !response.data()?.isActive;

    if(userAccountDisabled){
        return true
    }

    return false
}