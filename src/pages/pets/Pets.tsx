import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import { HiOutlineChevronDown } from "react-icons/hi";
import useFetchPets from "../../hooks/useFetchPets";
import LoadingSpinner from "../../global/LoadingSpinner";

const Pets = () => {
  const { data: petsData, isLoading } = useFetchPets();

  return (
    <div className="py-24 w-full bg-whitesmoke">
      <div className="container flex items-start justify-start gap-10">
        <div className="w-72 hidden md:block">
          <SidebarFilters />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{petsData.length} ITEMS</p>
            <p className="flex items-center gap-2">
              <span className="text-gray-600">SORT BY:</span>{" "}
              <span className="flex items-center gap-2 cursor-pointer">
                PRICE - LOW TO HIGH <HiOutlineChevronDown />
              </span>
            </p>
          </div>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5">
            {petsData.length > 0 &&
              petsData.map((pet) => <PetsCard key={pet.id} {...pet} />)}
          </div>
          {isLoading && (
            <LoadingSpinner title="Fetching pets..." size="large" />
          )}
          {petsData.length === 0 && <h1>No added pets yet...</h1>}
        </div>
      </div>
    </div>
  );
};

export default Pets;
