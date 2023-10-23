import { Tag } from "antd";
import { HiCheckCircle } from "react-icons/hi";
import moment from "moment";
import { PetsData } from "../../../api/pets/pets";

const PendingPostsCard = ({
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petDescription,
  petImage,
  status,
  dateCreated,
  createdBy,
}: PetsData) => {
  const isPostStatusPending = status === "Pending";
  const postStatus = isPostStatusPending ? "Pending" : "Approved";

  return (
    <div className="border-l rounded-md pb-5 border-l-dark-blue shadow-lg bg-slate-200">
      <div className="relative group">
        <img
          className="rounded-md object-cover h-60 w-full bg-center"
          src={petImage}
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <p className="italic">{moment(dateCreated).fromNow()}</p>
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
          <button className=" bg-green-600 text-base px-2 py-1 rounded-sm hover:bg-green-500 flex items-center gap-2 disabled:bg-dark-blue/75">
            Approve Post <HiCheckCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingPostsCard;
