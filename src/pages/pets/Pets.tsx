import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import dummyPetImg from "../../assets/dummy-pets.jpg";
import { HiOutlineChevronDown } from "react-icons/hi";

const dummyPets = [
  {
    name: "Pet 1",
    description: "Good pet 1",
    age: "3 months old",
    image: dummyPetImg,
  },
  {
    name: "Pet 2",
    description: "Good pet 2",
    age: "1 year old",
    image: dummyPetImg,
  },
  {
    name: "Pet 3",
    description: "Good pet 3",
    age: "5 months old",
    image: dummyPetImg,
  },
  {
    name: "Pet 4",
    description: "Good pet 4",
    age: "8 months old",
    image: dummyPetImg,
  },
];

const Pets = () => {
  return (
    <div className="py-24 w-full bg-whitesmoke">
      <div className="container flex items-start justify-start gap-10">
        <div className="w-72 hidden md:block">
          <SidebarFilters />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{dummyPets.length} ITEMS</p>
            <p className="flex items-center gap-2">
              <span className="text-gray-600">SORT BY:</span>{" "}
              <span className="flex items-center gap-2 cursor-pointer">
                PRICE - LOW TO HIGH <HiOutlineChevronDown />
              </span>
            </p>
          </div>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dummyPets.map((pet) => (
              <PetsCard key={pet.name} {...pet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pets;
