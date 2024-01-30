import moment from "moment";
import { BlogsData } from "../../api/blogs/blogs";
import useUserInfo from "../../hooks/useUserInfo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Button from "../../global/Button";
import { Popconfirm } from "antd";
import AddEditBlogFormModal from "../../global/AddEditBlogFormModal";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const BlogsCard = ({
  dateCreated,
  id,
  title,
  story,
  images,
  createdBy,
  userId,
}: BlogsData) => {
  const { uid } = useUserInfo();
  const isPostOwnedByLoggedUser = userId === uid;
  const [openEditBlogModal, setOpenEditBlogModal] = useState(false);
  const navigate = useNavigate();

  const renderCreatedByName = () => {
    if (isPostOwnedByLoggedUser) {
      return "You";
    }
    return createdBy;
  };

  const handleOpenEditBlogModal = () => {
    setOpenEditBlogModal(true);
  };
  const handleCloseEditBlogModal = () => {
    setOpenEditBlogModal(false);
  };

  const deleteBlog = async () => {
    try {
      const deleteImagesInStorage = images.map(async (image) => {
        const imgToBeDeleted = ref(storage, image);
        await deleteObject(imgToBeDeleted);
      });
      await Promise.all([deleteImagesInStorage]).then(async (_) => {
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Successfully deleted post");
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="border-l rounded-md pb-5 border-l-dark-blue shadow-lg bg-slate-200 hover:-translate-y-2 duration-300 ease-in-out relative">
      <img
        className="rounded-md object-cover h-60 w-full bg-center"
        src={images[0]}
      />
      <div className="flex flex-col gap-2 items-center">
        <p className="text-sm">
          Posted by:{" "}
          <span className="font-medium text-base">{renderCreatedByName()}</span>
        </p>
        <p className="mt-2 font-semibold">{title}</p>
        <p className="text-lg">
          {story.substring(0, 7)}...{" "}
          <span
            onClick={() => navigate(`/blogs/${id}`)}
            className="text-blue italic text-sm cursor-pointer hover:underline"
          >
            Read more
          </span>
        </p>
      </div>
      <p className="text-center mt-3 italic text-sm">
        {moment(dateCreated?.toDate()).fromNow()}
      </p>
      {isPostOwnedByLoggedUser && (
        <div className="flex items-center justify-center gap-2 mt-5 text-white">
          <Button
            type="primary"
            title="Update"
            icon={<EditOutlined />}
            onClick={handleOpenEditBlogModal}
            styleClass="primary-btn"
          />
          <Popconfirm
            title="Remove pet from list"
            description="Are you sure to delete this data?"
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: "primary-btn",
            }}
            onConfirm={deleteBlog}
          >
            <Button
              type="primary"
              danger={true}
              title="Delete"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      )}
      <AddEditBlogFormModal
        open={openEditBlogModal}
        onCancel={handleCloseEditBlogModal}
        idForUpdate={id}
      />
    </div>
  );
};

export default BlogsCard;
