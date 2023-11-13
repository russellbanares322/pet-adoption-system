import { arrayUnion, doc, DocumentReference, serverTimestamp, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-toastify"
import { AdoptionsData } from "../api/adoptions/adoptions"
import {  auth, db } from "../firebase/firebase-config"
import {v4 as uuidv4} from "uuid";
import { useState } from "react"

const useApproveAdoptionApplication = () => {
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false);
  
  const approveApplication = async (applicationData: AdoptionsData) => {
      const userDataRef = doc(db, "users", applicationData.userEmail + "")
      setIsLoading(true)
        try {
          await updateDoc(doc(db,"adoption-applications", applicationData.id), {
            userId: applicationData.userId,
            userEmail:applicationData.userEmail,
            firstName: applicationData.firstName,
            middleName: applicationData.middleName,
            lastName: applicationData.lastName,
            address: applicationData.address,
            contactNumber: applicationData.contactNumber,
            status: "Approved",
            rejectionReason: "",
            recipientId: applicationData.recipientId,
            petId: applicationData.petId,
            dateCreated: applicationData.dateCreated,
            dateUpdated: serverTimestamp(),
            validIdImg: applicationData.validIdImg,
          })
          sendNotification(userDataRef, applicationData.petId, applicationData.id, "Approved")
          toast.success(`Successfully approved application for ${applicationData.id}`)
          setIsLoading(false)
        } catch (err: any) {
          toast.error(err.message)
          setIsLoading(false)
        }
    }

  const rejectApplication = async (applicationData: AdoptionsData, rejectionReason: string) => {
      const userDataRef = doc(db, "users", applicationData.userEmail + "")
      setIsLoading(true)
        try {
          await updateDoc(doc(db,"adoption-applications", applicationData.id), {
            userId: applicationData.userId,
            userEmail:applicationData.userEmail,
            firstName: applicationData.firstName,
            middleName: applicationData.middleName,
            lastName: applicationData.lastName,
            address: applicationData.address,
            contactNumber: applicationData.contactNumber,
            status: "Rejected",
            rejectionReason: rejectionReason,
            recipientId: applicationData.recipientId,
            petId: applicationData.petId,
            dateCreated: applicationData.dateCreated,
            dateUpdated: serverTimestamp(),
            validIdImg: applicationData.validIdImg,
          })
          sendNotification(userDataRef, applicationData.petId, applicationData.id, "Rejected", rejectionReason)
          toast.success(`Successfully approved application for ${applicationData.id}`)
          setIsLoading(false)
        } catch (err: any) {
          toast.error(err.message)
          setIsLoading(false)
        }
    }

    const sendNotification = async(userDataRef: DocumentReference, petId:string, id: string, status:string, rejectionReason?:string) => {
      const notificationToBeSent =  {
        notificationId: uuidv4(),
        petId: petId,
        applicationId: id,
        status: status,
        rejectionReason: status === "Rejected" ? rejectionReason : "",
        userPerformedAction: {
          userEmail: user?.email,
          userId: user?.uid,
          userFullName:user?.displayName
        },
        dateUpdated: serverTimestamp()
      }

      await updateDoc(userDataRef, {
        notifications: arrayUnion(notificationToBeSent)
      })
    }
  return {approveApplication, rejectApplication, isLoading}
}

export default useApproveAdoptionApplication