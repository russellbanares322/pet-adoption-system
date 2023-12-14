import { signOut, updateEmail, updatePassword, updateProfile, User } from "firebase/auth"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth } from "../firebase/firebase-config"
import { isInputEmpty } from "../utils/isInputEmpty"

type UpdateProfileConfigsData = {
    isLoading: boolean;
    showSuccessAlertMessage: boolean;
    showErrorAlertMessage: boolean
}
const useUpdateProfile = () => {
    const [updateProfileConfigs, setUpdateProfileConfigs] = useState<UpdateProfileConfigsData>({
        isLoading: false,
        showSuccessAlertMessage: false,
        showErrorAlertMessage: false
    })
    const isLoading = updateProfileConfigs.isLoading;
    const showSuccessAlertMessage = updateProfileConfigs.showSuccessAlertMessage;
    const showErrorAlertMessage = updateProfileConfigs.showErrorAlertMessage;
    const navigate = useNavigate()
    const [user] = useAuthState(auth);

    const hideAlertMessage = (key: "showSuccessAlertMessage" | "showErrorAlertMessage" ) => {
        const alertMessageTimeout = setTimeout(() => {
            setUpdateProfileConfigs({
                ...updateProfileConfigs,
                [key]: false
            })
        }, 7000)

        return () => clearTimeout(alertMessageTimeout)
    }

    const updateUserProfile = async(fullName:string, email: string, newPassword: string) => {
        setUpdateProfileConfigs({
            ...updateProfileConfigs,
            isLoading: true
        })
        try {
            const currentUser = auth?.currentUser as User
            const providedDefaultEmail = user?.email === email;
            const providedDefaultFullName = user?.displayName === fullName;

            if(!isInputEmpty(fullName) && !providedDefaultFullName){
                await updateProfile(currentUser, {
                    displayName: fullName
                })
            }

            if(!isInputEmpty(email) && !providedDefaultEmail){
                await updateEmail(currentUser, email);
            }

            if(!isInputEmpty(newPassword)){
                await updatePassword(currentUser, newPassword)
                await signOut(auth);
                navigate("/login");
                toast.success("Successfully changed password, please re-login.")
            }

            setUpdateProfileConfigs({
                ...updateProfileConfigs,
                isLoading: false,
                showSuccessAlertMessage:true
            })
            hideAlertMessage("showSuccessAlertMessage")

        } catch(err: any){
            setUpdateProfileConfigs({
                isLoading: false,
                showSuccessAlertMessage:false,
                showErrorAlertMessage: true
            })
            hideAlertMessage("showErrorAlertMessage")

        }
    }
  return { isLoading, showSuccessAlertMessage, showErrorAlertMessage, updateUserProfile }
}

export default useUpdateProfile