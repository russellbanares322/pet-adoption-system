import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase/firebase-config";

export type BlogsData = {
    createdBy: string
    id: string
    title: string
    story:string
    images: string[]
    dateCreated: Timestamp
    userId: string
}

const useFetchBlogs = () => {
    const [data, setData] = useState<BlogsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBlogs = () => {
        setIsLoading(true);
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, 
            orderBy("dateCreated", "desc")
            );

        onSnapshot(q, (snapshot) => {
            const blogsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as BlogsData[]

            setData(blogsData)
            setIsLoading(false)
        })    
    }

    useEffect(() => {
        getBlogs()
    }, [])

    return { data, isLoading }
}

const useFetchBlog = (id: string) => {
    const [data, setData] = useState<BlogsData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const getSingleBlog = async () => {
      if (id !== null) {
        setIsLoading(true);
        const blogsRef = doc(db, "blogs", id);
        const snapshot = await getDoc(blogsRef);
        if (snapshot.exists()) {
          setData({ ...snapshot.data() as BlogsData }) ;
          setIsLoading(false);
        }
      }
    };
  
    useEffect(() => {
      getSingleBlog();
    }, [id]);
  
    return { data, isLoading };
  };

export {useFetchBlogs, useFetchBlog}