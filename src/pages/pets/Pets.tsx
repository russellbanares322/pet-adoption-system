import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import LoadingSpinner from "../../global/LoadingSpinner";
import { useFetchPets } from "../../api/pets/pets";
import { useEffect, useState } from "react";

type FilterOptions = {
  color: string[];
  gender: string[];
  type: string[];
};

export type FilterOptionKey = keyof FilterOptions;

const Pets = () => {
  const { data: petsData, isLoading } = useFetchPets();
  const totalPostedPetCount = petsData.length;
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    color: [],
    gender: [],
    type: [],
  });
  const [expandFilterOptions, setExpandFilterOptions] = useState(true);

  const handleExpandFilterOptions = () => {
    setExpandFilterOptions(!expandFilterOptions);
  };

  const filterData = (filterOptionKey: FilterOptionKey, filterItem: string) => {
    if (filterOptions[filterOptionKey].includes(filterItem)) {
      const filteredOptions = filterOptions[filterOptionKey].filter(
        (option) => option !== filterItem
      );
      setFilterOptions({
        ...filterOptions,
        [filterOptionKey]: filteredOptions,
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        [filterOptionKey]: [...filterOptions[filterOptionKey], filterItem],
      });
    }
  };

  useEffect(() => {
    if (
      filterOptions.color.length > 0 ||
      filterOptions.gender.length > 0 ||
      filterOptions.type.length > 0
    ) {
      petsData.filter(
        (data) =>
          filterOptions.color.includes(data.petColor) ||
          filterOptions.gender.includes(data.petGender) ||
          filterOptions.type.includes(data.petType)
      );
    }
  }, [filterOptions]);

  return (
    <div className="py-24 w-full bg-whitesmoke min-h-screen h-full">
      <div className="container flex-1 md:flex items-start justify-start gap-10 mt-1 md:mt-10">
        <div className="w-full md:w-72">
          <SidebarFilters
            expandFilterOptions={expandFilterOptions}
            handleExpandFilterOptions={handleExpandFilterOptions}
            filterData={filterData}
          />
        </div>
        <div className="w-full">
          <div className="text-center mt-3 md:mt-0 mb-2">
            <p className="font-semibold">
              {totalPostedPetCount} {totalPostedPetCount > 1 ? "ITEMS" : "ITEM"}
            </p>
          </div>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {petsData.length > 0 &&
              petsData
                .filter((data) => {
                  if (
                    filterOptions.color.length > 0 ||
                    filterOptions.gender.length > 0 ||
                    filterOptions.type.length > 0
                  ) {
                    return (
                      filterOptions.color.includes(data.petColor) ||
                      filterOptions.gender.includes(data.petGender) ||
                      filterOptions.type.includes(data.petType)
                    );
                  }
                  return data;
                })
                .map((pet) => <PetsCard key={pet.id} {...pet} />)}
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
