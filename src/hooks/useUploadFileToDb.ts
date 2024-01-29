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
          throw new Error(error.message);
        }
      };

      const uploadImgsToStorage =  async(files: File[]) => {
        try {
          const uploadTasks = files.map(async(file) => {
            const imageRef = ref(storage, `/images/${Date.now()}/${file?.name}`);
  
            const uploadTaskSnapshot = await uploadBytes(imageRef, file);
            return getDownloadURL(uploadTaskSnapshot.ref);
          });

          const imgUrls = await Promise.all(uploadTasks);

          return [...imgUrls]


        } catch(error: any){
          toast.error(error.message);
          throw new Error(error.message);
        }

      }

  return { uploadImgToStorage, uploadImgsToStorage }
}

export default useUploadFileToDb