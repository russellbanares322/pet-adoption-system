import { useState } from "react";
import AddEditBlogFormModal from "../../global/AddEditBlogFormModal";

const Blogs = () => {
  const [openBlogFormModal, setOpenBlogFormModal] = useState(false);

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
          <button onClick={handleToggleBlogFormModal} className="button-filled">
            Add Story
          </button>
        </div>
        <div className="mt-4">Content here</div>
      </div>
      <AddEditBlogFormModal
        open={openBlogFormModal}
        onCancel={handleCloseBlogFormModal}
      />
    </div>
  );
};

export default Blogs;
