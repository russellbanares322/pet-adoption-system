import { Pagination } from "antd";
import { useState } from "react";
import { BlogsData, useFetchBlogs } from "../../api/blogs/blogs";
import AddEditBlogFormModal from "../../global/AddEditBlogFormModal";
import LoadingSpinner from "../../global/LoadingSpinner";
import usePaginate from "../../hooks/usePaginate";
import useUserInfo from "../../hooks/useUserInfo";
import BlogsCard from "./BlogsCard";

const Blogs = () => {
  const [openBlogFormModal, setOpenBlogFormModal] = useState(false);
  const { data, isLoading } = useFetchBlogs();
  const { isLoggedIn } = useUserInfo();
  const isDataEmpty = !isLoading && data?.length === 0;
  const { pageSize, currentItems, onPageChange, totalItemsCount } =
    usePaginate<BlogsData>({ pageData: data });

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
            {currentItems?.map((blog) => (
              <BlogsCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>
      <AddEditBlogFormModal
        open={openBlogFormModal}
        onCancel={handleCloseBlogFormModal}
        idForUpdate={null}
      />
      {!isLoading && data?.length > 0 && (
        <div className="flex items-center justify-center mt-5">
          <Pagination
            defaultCurrent={1}
            onChange={onPageChange}
            size="default"
            total={totalItemsCount}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Blogs;
