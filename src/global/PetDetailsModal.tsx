import { Input, Modal, Tooltip } from "antd";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Comments } from "../api/pets/pets";
import {
  HiOutlineThumbUp,
  HiThumbUp,
  HiChatAlt,
  HiOutlineChatAlt,
  HiOutlineUser,
} from "react-icons/hi";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { useState } from "react";
import useLikePost from "../hooks/useLikePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";

type PetDetailsModalProps = {
  open: boolean;
  onCancel: () => void;
  userId: string;
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  likes: string[];
  comments: Comments[];
  petImage: string;
  createdBy: string;
  dateCreated: Timestamp;
};

const PetDetailsModal = ({
  open,
  onCancel,
  userId,
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petDescription,
  likes,
  comments,
  petImage,
  createdBy,
  dateCreated,
}: PetDetailsModalProps) => {
  const { TextArea } = Input;
  const [commentInput, setCommentInput] = useState("");
  const isCommentInputEmpty = commentInput.trim().length === 0;
  const { likePost } = useLikePost();
  const [user] = useAuthState(auth);
  const isPostAlreadyLiked = likes?.includes(user?.uid as string);
  const likesCount = likes?.length;

  const handleChangeCommentInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentInput(e.target.value);
  };

  const commentInputElement = (
    <div className="w-full relative">
      <TextArea
        value={commentInput}
        onChange={handleChangeCommentInput}
        placeholder="Write a comment..."
        rows={3}
      />
      <Tooltip title="Comment">
        <PiPaperPlaneTiltFill
          className={`absolute bottom-3 right-3 ${
            isCommentInputEmpty
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue cursor-pointer hover:bg-gray-100"
          } p-1 rounded-full`}
          size={35}
        />
      </Tooltip>
    </div>
  );

  return (
    <Modal
      title={`${createdBy}'s post`}
      open={open}
      footer={[commentInputElement]}
      onCancel={onCancel}
      width={700}
    >
      <hr />
      <div className="h-[34rem] overflow-y-scroll px-2">
        <p className="text-xs my-2">
          {moment(dateCreated.toDate()).format("LLL")}
        </p>
        <img
          className="h-[20rem] w-full object-cover rounded-md border"
          src={petImage}
          alt="Pet"
        />
        <div className="flex items-center justify-start gap-2 mt-4 mb-4">
          <div className="flex items-center gap-1">
            <HiChatAlt
              className="cursor-pointer bg-blue text-white rounded-full p-2"
              size={30}
            />
            <span className="font-bold text-md">0</span>
          </div>
          <div className="flex items-center gap-1">
            <HiThumbUp
              className="cursor-pointer bg-orange text-white rounded-full p-2"
              size={30}
            />
            <span className="font-bold text-md">{likesCount}</span>
          </div>
        </div>
        <hr />
        <div className="my-2 flex justify-around items-center w-full">
          <div
            onClick={() => likePost(id, likes)}
            className={`flex justify-center items-center gap-2 text-[1rem] cursor-pointer hover:bg-gray-300 rounded-md w-full duration-150 py-1 ${
              isPostAlreadyLiked ? "text-blue" : "text-black"
            }`}
          >
            {isPostAlreadyLiked && <HiThumbUp size={20} />}
            {!isPostAlreadyLiked && <HiOutlineThumbUp size={20} />}
            <p>Like</p>
          </div>
          <div className="flex justify-center items-center gap-2 text-[1rem] cursor-pointer hover:bg-gray-300 rounded-md w-full duration-150 py-1">
            <HiOutlineChatAlt className="mt-1" size={20} />
            <p>Comment</p>
          </div>
        </div>
        <hr />
        <div className="mt-5 w-full">
          <div className="flex flex-col bg-slate-100 rounded-md p-2 w-full my-2">
            <p className="text-[0.8rem] font-semibold">{createdBy}</p>
            <p className="text-[1rem]">Test comment!</p>
            <span className="text-xs font-light">2 hours ago</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PetDetailsModal;
