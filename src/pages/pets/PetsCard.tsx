import { Tooltip } from "antd";
import {
  HiOutlineEye,
  HiOutlineThumbUp,
  HiThumbUp,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { PiHandHeart, PiHandHeartFill } from "react-icons/pi";

import moment from "moment";
import { PetsData } from "../../api/pets/pets";
import { useState } from "react";
import PetDetailsModal from "../../global/PetDetailsModal";
import useLikePost from "../../hooks/useLikePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-config";
import AdoptPetFormModal from "./AdoptPetFormModal";

const PetsCard = ({
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petLocation,
  showAdoptButton,
  petDescription,
  petImage,
  createdBy,
  dateCreated,
  likes,
  comments,
}: PetsData) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const [openAdoptPetFormModal, setOpenAdoptPetFormModal] = useState(false);
  const [user] = useAuthState(auth);
  const isUserLoggedIn = user;
  const { likePost } = useLikePost();
  const likesCount = likes?.length;
  const commentsCount = comments?.length;
  const isPostAlreadyLiked = likes?.includes(user?.uid as string);

  const handleOpenDetailsModal = () => {
    setOpenPetDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenPetDetailsModal(false);
  };

  const handleOpenAdoptionModal = () => {
    if (isUserLoggedIn && showAdoptButton) {
      setOpenAdoptPetFormModal(true);
    }
  };

  const handleCloseAdoptionModal = () => {
    setOpenAdoptPetFormModal(false);
  };

  const adoptButtonTooltip = () => {
    if (isUserLoggedIn && showAdoptButton) {
      return "Adopt Pet";
    } else if (!isUserLoggedIn) {
      return "You need to signin first to adopt a pet";
    } else if (isUserLoggedIn && !showAdoptButton) {
      return "This pet is not available to be adopted yet";
    }
  };

  return (
    <div className="border-l-4 border-b-4 border-b-maroon border-l-maroon rounded-lg bg-white">
      <div className="relative group">
        <img
          className="object-cover h-60 w-full bg-center rounded-tr-lg rounded-tl-lg"
          src={petImage}
        />
        <div
          onClick={handleOpenDetailsModal}
          className="rounded-tr-lg rounded-tl-lg cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100"
        >
          <HiOutlineEye size={45} />
          <p>View Details</p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 ml-4 mt-2">
        <div className="flex items-center gap-1">
          <Tooltip title="Add a comment">
            <HiOutlineChatAlt
              onClick={handleOpenDetailsModal}
              className="cursor-pointer"
              size={20}
            />
          </Tooltip>
          <span className="font-bold text-md">{commentsCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip title="Like post">
            {!isPostAlreadyLiked && (
              <HiOutlineThumbUp
                onClick={() => likePost(id, likes)}
                className="cursor-pointer"
                size={20}
              />
            )}
            {isPostAlreadyLiked && (
              <HiThumbUp
                onClick={() => likePost(id, likes)}
                className="cursor-pointer text-blue"
                size={20}
              />
            )}
          </Tooltip>
          <span className="font-bold text-md">{likesCount}</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 mt-2">
        <p className="mt-3 uppercase font-bold">{petName}</p>
        <Tooltip title={adoptButtonTooltip()}>
          <PiHandHeart
            onClick={handleOpenAdoptionModal}
            className={`${
              showAdoptButton && isUserLoggedIn
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }`}
            size={24}
          />
        </Tooltip>
      </div>
      <p className="mt-2 px-2 py-1 text-sm text-center">
        Posted by:{" "}
        <span className="font-bold text-md">
          {createdBy === "Admin Account" ? "Admin" : createdBy}
        </span>
      </p>
      <p className="mt-1 mb-4 italic text-center text-sm">
        {moment(dateCreated?.toDate()).fromNow()}
      </p>
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
      <AdoptPetFormModal
        openModal={openAdoptPetFormModal}
        onCancel={handleCloseAdoptionModal}
        selectedId={id}
      />
    </div>
  );
};

export default PetsCard;
