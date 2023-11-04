import { Popconfirm, Tag } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/firebase-config";
import moment from "moment";
import { PetsData } from "../../../api/pets/pets";
import PetDetailsModal from "../../../global/PetDetailsModal";
import { useState } from "react";

type PetsDisplayProps = {
  handleOpenEditModal: (petId: string) => void;
} & PetsData;

const PetDisplay = ({
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petLocation,
  petDescription,
  petImage,
  status,
  createdBy,
  dateCreated,
  likes,
  comments,
  handleOpenEditModal,
}: PetsDisplayProps) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const location = useLocation();
  const isPostCreatedByGuest = location.pathname === "/my-post";
  const isPostStatusPending = status === "Pending";
  const disableUpdateAndDeleteBtn = isPostStatusPending && isPostCreatedByGuest;
  const postStatus = isPostStatusPending
    ? "Waiting to be approved by the admin"
    : "Approved";

  const deletePost = async () => {
    try {
      const imgToBeDeleted = ref(storage, petImage);
      await deleteDoc(doc(db, "listed-pets", id));
      await deleteObject(imgToBeDeleted);
      toast.success("Successfully deleted post");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleOpenDetailsModal = () => {
    setOpenPetDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenPetDetailsModal(false);
  };

  return (
    <div className="border-l rounded-md pb-5 border-l-dark-blue shadow-lg bg-slate-200">
      <div className="relative group">
        <img
          className="rounded-md object-cover h-60 w-full bg-center"
          src={petImage}
        />
        <div
          onClick={handleOpenDetailsModal}
          className="rounded-md cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100"
        >
          <HiOutlineEye size={45} />
          <p>View Details</p>
        </div>
      </div>
      <p className="text-center my-1 italic">
        {moment(dateCreated?.toDate()).fromNow()}
      </p>
      <div className="px-2 mt-2 text-dark-blue text-center">
        {isPostCreatedByGuest && (
          <Tag
            className="mt-3"
            color={isPostStatusPending ? "orange" : "green"}
          >
            {postStatus}
          </Tag>
        )}
        <p className="uppercase font-bold text-lg">{petName}</p>
        <p className="text-md text-center mb-2 text-[1rem]">{petDescription}</p>
        <p className="text-md italic">
          Age: <span className="text-[1rem] font-bold">{petAge}</span>
        </p>
        <p className="text-md italic">
          Color: <span className="text-[1rem] font-bold">{petColor}</span>
        </p>
        <p className="text-md italic">
          Gender: <span className="text-[1rem] font-bold">{petGender}</span>
        </p>
        {createdBy !== "Admin Account" && (
          <p className="text-md italic">
            Posted By:{" "}
            <span className="text-[1rem] font-bold">{createdBy}</span>
          </p>
        )}
        <div className="flex items-center justify-center gap-2 mt-5 text-white">
          <button
            disabled={disableUpdateAndDeleteBtn}
            onClick={() => handleOpenEditModal(id)}
            className={`bg-dark-blue text-base px-2 py-1 rounded-sm hover:bg-dark-blue/90 flex items-center gap-2 disabled:bg-dark-blue/75 ${
              disableUpdateAndDeleteBtn
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Update <HiOutlinePencilAlt size={20} />
          </button>
          <Popconfirm
            title="Remove pet from list"
            description="Are you sure to delete this data?"
            okText="Yes"
            cancelText="No"
            onConfirm={deletePost}
            okButtonProps={{
              className: "primary-btn",
            }}
          >
            <button
              disabled={disableUpdateAndDeleteBtn}
              className={`bg-red-600 text-base px-2 py-1 rounded-sm hover:bg-red-500 flex items-center gap-2 disabled:bg-red-400 ${
                disableUpdateAndDeleteBtn
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Delete <HiOutlineTrash size={20} />
            </button>
          </Popconfirm>
        </div>
      </div>
      <PetDetailsModal
        open={openPetDetailsModal}
        onCancel={handleCloseDetailsModal}
        id={id}
        petName={petName}
        petAge={petAge}
        petGender={petGender}
        petColor={petColor}
        petLocation={petLocation}
        petDescription={petDescription}
        likes={likes}
        comments={comments}
        petImage={petImage}
        createdBy={createdBy}
        dateCreated={dateCreated}
      />
    </div>
  );
};

export default PetDisplay;
