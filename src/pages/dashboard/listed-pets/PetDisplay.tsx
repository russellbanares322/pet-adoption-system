import { HiOutlineEye } from "react-icons/hi";

type PetsDisplayProps = {
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  petImage: string;
};

const PetDisplay = ({
  id,
  petName,
  petAge,
  petGender,
  petColor,
  petDescription,
  petImage,
}: PetsDisplayProps) => {
  return (
    <div className="bg-dark-blue text-white rounded-lg pb-5 shadow-md">
      <div className="relative group">
        <img
          className="object-cover rounded-lg h-60 w-full bg-center"
          src={petImage}
        />
        <div className="rounded-lg cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100">
          <HiOutlineEye size={45} />
          <p>View Details</p>
        </div>
      </div>
      <div className="px-2 mt-2">
        <p className="mt-3 uppercase font-bold">{petName}</p>
        <p className="text-md">{petDescription}</p>
        <p className="text-sm italic">{petAge}</p>
      </div>
    </div>
  );
};

export default PetDisplay;
