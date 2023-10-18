import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import LoadingSpinner from "../../global/LoadingSpinner";
import { useFetchPets } from "../../api/pets/pets";

const Pets = () => {
  const { data: petsData, isLoading } = useFetchPets();

  return (
    <div className="py-24 w-full bg-whitesmoke">
      <div className="container flex items-start justify-start gap-10 mt-10">
        <div className="w-72 hidden md:block">
          <SidebarFilters />
        </div>
        <div className="w-full">
          <div className="text-center mb-2">
            <p className="font-semibold">{petsData.length} ITEMS</p>
          </div>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {petsData.length > 0 &&
              petsData.map((pet) => <PetsCard key={pet.id} {...pet} />)}
          </div>
          {isLoading && (
            <LoadingSpinner title="Fetching pets..." size="large" />
          )}
          {!isLoading && petsData.length === 0 && (
            <h1 className="flex justify-center items-center h-96 font-bold text-lg">
              No added pets yet...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pets;
