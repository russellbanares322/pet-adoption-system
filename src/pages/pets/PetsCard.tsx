import { HiOutlineHeart, HiHeart, HiOutlineEye } from "react-icons/hi";

type PetsCardProps = {
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  petImage: string;
};

const PetsCard = ({
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petDescription,
  petImage,
}: PetsCardProps) => {
  return (
    <div className="border-l-4 border-b-4 border-b-maroon border-l-maroon rounded-lg bg-white">
      <div className="relative group">
        <img
          className="object-cover h-60 w-full bg-center rounded-lg"
          src={petImage}
        />
        <div className="rounded-lg cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100">
          <HiOutlineEye size={45} />
          <p>View Details</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 mt-2">
        <p className="mt-3 uppercase font-bold">{petName}</p>
        <HiOutlineHeart className="cursor-pointer" size={24} />
      </div>
      <div className="px-2 my-3 text-dark-blue text-center">
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
      </div>
    </div>
  );
};

export default PetsCard;
