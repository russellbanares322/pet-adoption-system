import { HiOutlineHeart, HiHeart, HiOutlineEye } from "react-icons/hi";

type PetsCardProps = {
  name: string;
  description: string;
  age: string;
  image: string;
};

const PetsCard = ({ name, description, age, image }: PetsCardProps) => {
  return (
    <div>
      <div className="relative group">
        <img
          className="object-cover rounded-lg border-l-4 border-b-4 border-b-maroon border-l-maroon"
          src={image}
        />
        <div className="rounded-lg cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100">
          <HiOutlineEye size={45} />
          <p>View Details</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="mt-3 uppercase font-bold">{name}</p>
        <HiOutlineHeart className="cursor-pointer" size={24} />
      </div>
      <p className="text-md">{description}</p>
      <p className="text-sm italic">{age}</p>
    </div>
  );
};

export default PetsCard;
