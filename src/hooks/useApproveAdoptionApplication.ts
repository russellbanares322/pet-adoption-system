import { arrayUnion, deleteDoc, doc, DocumentReference, serverTimestamp, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-toastify"
import { AdoptionsData } from "../api/adoptions/adoptions"
import {  auth, db, storage } from "../firebase/firebase-config"
import {v4 as uuidv4} from "uuid";
import { useState } from "react"
import moment from "moment"
import { deleteObject, ref } from "firebase/storage"

//*TODO: Allow user that will adopt the pet set the date when they will pickup the pet
const useApproveAdoptionApplication = () => {
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false);
  
  const deleteApplication = async (applicationId: string, validIdImg: string) => {
    try {
      const imgToBeDeleted = ref(storage, validIdImg);
      await deleteDoc(doc(db, "adoption-applications", applicationId));
      await deleteObject(imgToBeDeleted);
      toast.success("Successfully deleted application");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const approveApplication = async (applicationData: AdoptionsData, dateOfAdoption: string) => {
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
            petImage: applicationData.petImage,
            dateOfAdoption: dateOfAdoption
          })
          await sendNotification(userDataRef, applicationData.petId, applicationData.id, "Approved", applicationData.petImage, dateOfAdoption, "")
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
            petImage: applicationData.petImage,
            dateOfAdoption: null
          })
          await sendNotification(userDataRef, applicationData.petId, applicationData.id, "Rejected",applicationData.petImage, "", rejectionReason)
          await deleteDoc(doc(db, "listed-pets", applicationData.id))
          toast.success(`Successfully rejected application`)
          setIsLoading(false)
        } catch (err: any) {
          toast.error(err.message)
          setIsLoading(false)
        }
    }

  const sendNotification = async(userDataRef: DocumentReference, petId:string, id: string, status:string,petImage: string, dateOfAdoption?: string, rejectionReason?:string) => {
      const notificationToBeSent =  {
        notificationId: uuidv4(),
        petId: petId,
        petImage: petImage,
        applicationId: id,
        status: status,
        dateOfAdoption: status === "Rejected" ? null : dateOfAdoption,
        rejectionReason: status === "Rejected" ? rejectionReason : "",
        userPerformedAction: {
          userEmail: user?.email,
          userId: user?.uid,
          userFullName:user?.displayName
        },
        hasViewed: false,
        dateUpdated: moment().format()
      }

      await updateDoc(userDataRef, {
        notifications: arrayUnion(notificationToBeSent)
      })
    }
  return { approveApplication, deleteApplication, rejectApplication, isLoading }
}

export default useApproveAdoptionApplication