import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase-config";

const useUploadFileToDb = () => {

    const uploadImgToStorage = async (file: File) => {
        const imageRef = ref(storage, `/images/${Date.now()}/${file?.name}`);
    
        try {
          const uploadTaskSnapshot = await uploadBytes(imageRef, file as Blob);
    
          const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
          return downloadURL;
       
        } catch (error: any) {
          toast.error(error.message);
          throw error;
        }
      };

  return {uploadImgToStorage}
}

export default useUploadFileToDb