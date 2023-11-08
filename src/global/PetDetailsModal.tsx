import { Input, Modal, Popconfirm, Tag, Tooltip } from "antd";
import {
  arrayRemove,
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { Comments } from "../api/pets/pets";
import {
  HiOutlineThumbUp,
  HiThumbUp,
  HiChatAlt,
  HiOutlineChatAlt,
  HiOutlineHeart,
  HiTrash,
} from "react-icons/hi";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import React, { useEffect, useRef, useState } from "react";
import useLikePost from "../hooks/useLikePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type PetDetailsModalProps = {
  open: boolean;
  onCancel: () => void;
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petLocation: string;
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
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petLocation,
  petDescription,
  likes,
  comments,
  petImage,
  createdBy,
  dateCreated,
}: PetDetailsModalProps) => {
  const { TextArea } = Input;
  const [commentInput, setCommentInput] = useState("");
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const isCommentInputEmpty = commentInput.trim().length === 0;
  const { likePost } = useLikePost();
  const [user] = useAuthState(auth);
  const isUserLoggedIn = user;
  const isPostAlreadyLiked = likes?.includes(user?.uid as string);
  const likesCount = likes?.length;
  const commentsCount = comments?.length;
  const commentsRef = doc(db, "listed-pets", id);

  const handleChangeCommentInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentInput(e.target.value);
  };

  const showDeleteIcon = (userId: string) => {
    if (isUserLoggedIn && user?.uid === userId) {
      return true;
    }
    return false;
  };

  const handleSendComment = async () => {
    try {
      await updateDoc(commentsRef, {
        comments: arrayUnion({
          userId: user?.uid,
          comment: commentInput,
          commentId: uuidv4(),
          displayName: user?.displayName,
          dateCreated: new Date(),
        }),
      });
      setCommentInput("");
      toast.success("Added comment");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleClickSendIcon = () => {
    handleSendComment();
  };

  const handleEnterComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnterKeyPressed = e.key === "Enter";
    if (isCommentInputEmpty && isEnterKeyPressed) return;

    if (isEnterKeyPressed) {
      handleSendComment();
    }
  };

  const deleteComment = async (commentsData: Comments) => {
    try {
      await updateDoc(commentsRef, {
        comments: arrayRemove(commentsData),
      });
      toast.success("Deleted comment successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const focusCommentInput = () => {
    commentInputRef?.current?.focus();
  };

  const commentInputElement = (
    <div className="w-full relative">
      <Tooltip
        title={
          !isUserLoggedIn
            ? "You need to login first, before adding a comment"
            : ""
        }
      >
        <TextArea
          ref={commentInputRef}
          disabled={!isUserLoggedIn}
          value={commentInput}
          onChange={handleChangeCommentInput}
          className="resize-none"
          onKeyUp={(e) => handleEnterComment(e)}
          placeholder="Write a comment..."
          rows={3}
        />
      </Tooltip>
      <Tooltip title="Comment">
        <PiPaperPlaneTiltFill
          onClick={handleClickSendIcon}
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

  useEffect(() => {
    focusCommentInput();
  }, []);
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
          {moment(dateCreated?.toDate()).format("LLL")}
        </p>
        <img
          className="h-[20rem] w-full object-cover rounded-md border mb-5"
          src={petImage}
          alt="Pet"
        />
        <div className="mb-5 text-[1rem] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          <p>
            Pet Name: <span className="font-bold">{petName}</span>
          </p>
          <p>
            Pet Age: <span className="font-bold">{petAge}</span>
          </p>
          <p>
            Pet Gender: <span className="font-bold">{petGender}</span>
          </p>
          <p>
            Pet Color: <span className="font-bold">{petColor}</span>
          </p>
          <p>
            Pet Location: <span className="font-bold">{petLocation}</span>
          </p>
          <p className="w-max">
            Pet Description: <span className="font-bold">{petDescription}</span>
          </p>
        </div>
        <hr />
        <div className="flex items-center justify-start gap-2 mt-4 mb-4">
          <div className="flex items-center gap-1">
            <HiChatAlt
              className="bg-blue text-white rounded-full p-2"
              size={30}
            />
            <span className="font-bold text-md">{commentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiThumbUp
              className="bg-orange text-white rounded-full p-2"
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
            <HiOutlineHeart className="mt-1" size={20} />
            <p>Add to favorites</p>
          </div>
          <div
            onClick={focusCommentInput}
            className="flex justify-center items-center gap-2 text-[1rem] cursor-pointer hover:bg-gray-300 rounded-md w-full duration-150 py-1"
          >
            <HiOutlineChatAlt className="mt-1" size={20} />
            <p>Comment</p>
          </div>
        </div>
        <hr />
        <div className="mt-5 w-full">
          {comments?.map((comment) => (
            <div
              key={comment?.commentId}
              className="flex flex-col bg-slate-100 rounded-md p-2 w-full my-2"
            >
              <div className="flex justify-between items-center">
                <Tag className="bg-blue text-white font-semibold text-[0.8rem]">
                  {comment?.displayName}
                </Tag>
                <Tooltip title="Delete comment">
                  <Popconfirm
                    title="Delete post"
                    description="Are you sure want to delete this post?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteComment(comment)}
                    okButtonProps={{
                      className: "primary-btn",
                    }}
                  >
                    {showDeleteIcon(comment?.userId) && (
                      <HiTrash
                        className="cursor-pointer hover:text-red-600 duration-100 ease-in-out"
                        size={20}
                      />
                    )}
                  </Popconfirm>
                </Tooltip>
              </div>
              <p className="text-[1rem]">{comment.comment}</p>
              <span className="text-xs font-light">
                {moment(comment?.dateCreated?.toDate()).fromNow()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PetDetailsModal;
