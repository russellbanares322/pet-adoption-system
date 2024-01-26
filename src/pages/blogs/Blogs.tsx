import { useState } from "react";
import { useFetchBlogs } from "../../api/blogs/blogs";
import AddEditBlogFormModal from "../../global/AddEditBlogFormModal";
import LoadingSpinner from "../../global/LoadingSpinner";
import useUserInfo from "../../hooks/useUserInfo";
import BlogsCard from "./BlogsCard";

const Blogs = () => {
  const [openBlogFormModal, setOpenBlogFormModal] = useState(false);
  const { data, isLoading } = useFetchBlogs();
  const { isLoggedIn } = useUserInfo();
  const isDataEmpty = !isLoading && data?.length === 0;

  const handleToggleBlogFormModal = () => {
    setOpenBlogFormModal(!openBlogFormModal);
  };

  const handleCloseBlogFormModal = () => {
    setOpenBlogFormModal(false);
  };

  return (
    <div className="py-24 w-full bg-whitesmoke min-h-screen h-full">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl text-maroon">Blogs</h1>
            <p>
              Explore inspiring stories of everyday champions saving stray pets.
            </p>
          </div>
          {isLoggedIn && (
            <button
              onClick={handleToggleBlogFormModal}
              className="button-filled"
            >
              Add Story
            </button>
          )}
        </div>
        <div className="mt-4">
          {isDataEmpty && (
            <h1 className="flex justify-center items-center h-96 font-bold text-lg">
              No blogs posted yet...
            </h1>
          )}
          {isLoading && (
            <LoadingSpinner title="Fetching blogs..." size="large" />
          )}
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {data?.map((blog) => (
              <BlogsCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>
      <AddEditBlogFormModal
        open={openBlogFormModal}
        onCancel={handleCloseBlogFormModal}
      />
    </div>
  );
};

export default Blogs;
