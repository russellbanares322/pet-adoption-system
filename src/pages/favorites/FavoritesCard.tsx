import { PetsData } from "../../api/pets/pets";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import PetDetailsModal from "../../global/PetDetailsModal";
import Button from "../../global/Button";
import { HeartFilled } from "@ant-design/icons";
import useAddToFavorites from "../../hooks/useAddToFavorites";

const FavoritesCard = ({
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
}: PetsData) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const { removePostToFavorites } = useAddToFavorites();
  const handleOpenDetailsModal = () => {
    setOpenPetDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenPetDetailsModal(false);
  };
  return (
    <div className="bg-white rounded-md">
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
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">{petName}</p>
          <Button
            onClick={() => removePostToFavorites(id)}
            type="primary"
            danger={true}
            title="Remove from favorites"
            icon={<HeartFilled />}
          />
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

export default FavoritesCard;
