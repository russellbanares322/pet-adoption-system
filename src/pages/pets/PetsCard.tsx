import { Tooltip } from "antd";
import { HiOutlineHeart, HiOutlineEye } from "react-icons/hi";
import { BiCommentDetail, BiLike } from "react-icons/bi";
// BiSolidLike
// HiHeart
import moment from "moment";
import { PetsData } from "../../api/pets/pets";

const PetsCard = ({
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petDescription,
  petImage,
  createdBy,
  dateCreated,
  likes,
  comments,
}: PetsData) => {
  return (
    <div className="border-l-4 border-b-4 border-b-maroon border-l-maroon rounded-lg bg-white">
      <div className="relative group">
        <img
          className="object-cover h-60 w-full bg-center rounded-tr-lg rounded-tl-lg"
          src={petImage}
        />
        <div className="rounded-tr-lg rounded-tl-lg cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100">
          <HiOutlineEye size={45} />
          <p>View Details</p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 ml-4 mt-2">
        <div className="flex items-center gap-1">
          <Tooltip title="Add a comment">
            <BiCommentDetail className="cursor-pointer" size={20} />
          </Tooltip>
          <span className="font-bold text-md">1</span>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip title="Like post">
            <BiLike className="cursor-pointer" size={20} />
          </Tooltip>
          <span className="font-bold text-md">1</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 mt-2">
        <p className="mt-3 uppercase font-bold">{petName}</p>
        <Tooltip title="Add to favorites">
          <HiOutlineHeart className="cursor-pointer" size={24} />
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
    </div>
  );
};

export default PetsCard;
