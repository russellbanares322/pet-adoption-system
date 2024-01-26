import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase/firebase-config";

type BlogsData = {
    id: string,
    title: string,
    story:string,
    images: string[],
    dateCreated: Timestamp
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

export {useFetchBlogs}