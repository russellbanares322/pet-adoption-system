import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import LoadingSpinner from "../../global/LoadingSpinner";
import { useFetchPets } from "../../api/pets/pets";
import { useSearchParams } from "react-router-dom";

const Pets = () => {
  const { data: petsData, isLoading } = useFetchPets();
  const [searchParams, setSearchParams] = useSearchParams({
    color: "",
    gender: "",
    type: "",
  });

  const queryColor = searchParams.get("color");
  const queryGender = searchParams.get("gender");
  const queryType = searchParams.get("type");
  const totalPostedPetCount = petsData.length;

  const handleChangeUrlParams = (
    e: React.ChangeEvent<HTMLInputElement>,
    paramName: string
  ) => {
    const { value } = e.target;

    setSearchParams((prev) => {
      prev.set(paramName, value);
      return prev;
    });
  };

  return (
    <div className="py-24 w-full bg-whitesmoke min-h-screen h-full">
      <div className="container flex items-start justify-start gap-10 mt-10">
        <div className="w-72 hidden md:block">
          <SidebarFilters
            handleChangeUrlParams={handleChangeUrlParams}
            queryColor={queryColor as string}
            queryGender={queryGender as string}
            queryType={queryType as string}
          />
        </div>
        <div className="w-full">
          <div className="text-center mb-2">
            <p className="font-semibold">
              {totalPostedPetCount} {totalPostedPetCount > 1 ? "ITEMS" : "ITEM"}
            </p>
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
