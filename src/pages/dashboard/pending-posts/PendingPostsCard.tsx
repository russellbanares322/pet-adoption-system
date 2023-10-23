import { Popconfirm, Tag } from "antd";
import { HiCheckCircle } from "react-icons/hi";
import moment from "moment";
import { PetsData } from "../../../api/pets/pets";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const PendingPostsCard = ({
  id,
  petName,
  petAge,
  petType,
  petGender,
  petColor,
  petDescription,
  petImage,
  status,
  createdBy,
  dateCreated,
  likes,
  comments,
}: PetsData) => {
  const isPostStatusPending = status === "Pending";
  const postStatus = isPostStatusPending ? "Pending" : "Approved";
  const [user] = useAuthState(auth);

  const approvePost = async () => {
    try {
      await updateDoc(doc(db, "listed-pets", id), {
        userId: user?.uid,
        petName: petName,
        petAge: petAge,
        petGender: petGender,
        petColor: petColor,
        petType: petType,
        petDescription: petDescription,
        petImage: petImage,
        status: "Approved",
        createdBy: createdBy,
        dateCreated: serverTimestamp(),
        likes: likes,
        comments: comments,
      });
      toast.success("Successfully approved post");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="border-l rounded-md pb-5 border-l-dark-blue shadow-lg bg-slate-200">
      <div className="relative group">
        <img
          className="rounded-md object-cover h-60 w-full bg-center"
          src={petImage}
        />
      </div>
      <p className="italic text-center my-2">
        {moment(dateCreated?.toDate()).fromNow()}
      </p>
      <div className="flex items-center justify-center gap-2">
        <Tag className="mt-3" color={isPostStatusPending ? "orange" : "green"}>
          {postStatus}
        </Tag>
      </div>
      <div className="px-2 mt-2 text-dark-blue text-center">
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
        <p className="text-md italic">
          Posted By: <span className="text-[1rem] font-bold">{createdBy}</span>
        </p>
        <div className="flex items-center justify-center gap-2 mt-5 text-white">
          <Popconfirm
            title="Approve post"
            description="Are you sure want to approve this post?"
            okText="Yes"
            cancelText="No"
            onConfirm={approvePost}
            okButtonProps={{
              className: "primary-btn",
            }}
          >
            <button className=" bg-green-600 text-base px-2 py-1 rounded-sm hover:bg-green-500 flex items-center gap-2 disabled:bg-dark-blue/75">
              Approve Post <HiCheckCircle size={20} />
            </button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default PendingPostsCard;
