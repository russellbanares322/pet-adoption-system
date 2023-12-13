import { updateEmail, updatePassword, updateProfile, User } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/firebase-config"
import { isInputEmpty } from "../utils/isInputEmpty"

const useUpdateProfile = () => {
    const [updateProfileConfigs, setUpdateProfileConfigs] = useState({
        isLoading: false,
        showSuccessAlertMessage: false,
        showErrorAlertMessage: false
    })
    const isLoading = updateProfileConfigs.isLoading;
    const showSuccessAlertMessage = updateProfileConfigs.showSuccessAlertMessage;
    const showErrorAlertMessage = updateProfileConfigs.showErrorAlertMessage;

    
    const updateUserProfile = async(fullName:string, email: string, newPassword: string) => {
        setUpdateProfileConfigs({
            ...updateProfileConfigs,
            isLoading: true
        })
        try {
            const currentUser = auth?.currentUser as User
            if(!isInputEmpty(fullName)){
                await updateProfile(currentUser, {
                    displayName: fullName
                })
            }

            if(!isInputEmpty(email)){
                await updateEmail(currentUser, email);
            }

            if(!isInputEmpty(newPassword)){
                await updatePassword(currentUser, newPassword)
            }

            setUpdateProfileConfigs({
                ...updateProfileConfigs,
                isLoading: true,
                showSuccessAlertMessage:true
            })
        } catch(err: any){
        setUpdateProfileConfigs({
                isLoading: false,
                showSuccessAlertMessage:false,
                showErrorAlertMessage: true
            })
        }
    }
  return { isLoading, showSuccessAlertMessage, showErrorAlertMessage, updateUserProfile }
}

export default useUpdateProfile