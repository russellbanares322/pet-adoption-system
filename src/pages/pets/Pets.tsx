import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import LoadingSpinner from "../../global/LoadingSpinner";
import { PetsData, useFetchPets } from "../../api/pets/pets";
import { useEffect, useState } from "react";
import usePaginate from "../../hooks/usePaginate";
import { Pagination } from "antd";

type FilterOptions = {
  color: string[];
  gender: string[];
  type: string[];
};

export type FilterOptionKey = keyof FilterOptions;

const Pets = () => {
  const { data: petsData, isLoading } = useFetchPets();
  const [filteredPetsData, setFilteredPetsData] = useState<PetsData[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    color: [],
    gender: [],
    type: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const pageData: PetsData[] =
    filteredPetsData?.length > 0 ? filteredPetsData : petsData;
  const totalPostedPetCount = petsData.length;
  const { pageSize, currentItems, onPageChange, totalItemsCount } =
    usePaginate<PetsData>({ pageData });
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const filteredPetsData = petsData?.filter(
      (data) =>
        filterOptions.color.includes(data.petColor) ||
        filterOptions.gender.includes(data.petGender) ||
        filterOptions.type.includes(data.petType) ||
        data.petColor.toLowerCase().includes(searchInput) ||
        data.petGender.toLowerCase().includes(searchInput) ||
        data.petType.toLowerCase().includes(searchInput) ||
        data.petName.toLowerCase().includes(searchInput)
    );

    setFilteredPetsData(filteredPetsData);
  }, [
    filterOptions.color,
    filterOptions.gender,
    filterOptions.type,
    searchInput,
  ]);

  return (
    <div className="py-24 w-full bg-whitesmoke min-h-screen h-full">
      <div className="container flex-1 md:flex items-start justify-start gap-10 mt-1 md:mt-10">
        <div className="w-full md:w-72">
          <SidebarFilters
            expandFilterOptions={expandFilterOptions}
            handleExpandFilterOptions={handleExpandFilterOptions}
            filterData={filterData}
            onInputChange={onInputChange}
          />
        </div>
        <div className="w-full">
          {!isLoading && totalPostedPetCount > 0 && (
            <div className="text-center mt-3 md:mt-0 mb-2">
              <p className="font-semibold">
                {totalPostedPetCount}{" "}
                {totalPostedPetCount > 1 ? "ITEMS" : "ITEM"}
              </p>
            </div>
          )}
          {!isLoading && totalPostedPetCount > 0 && (
            <div className="flex items-end justify-end">
              <Pagination
                defaultCurrent={1}
                onChange={onPageChange}
                size="default"
                total={totalItemsCount}
                pageSize={pageSize}
                showSizeChanger={false}
              />
            </div>
          )}
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {petsData.length > 0 &&
              currentItems.map((pet) => <PetsCard key={pet.id} {...pet} />)}
          </div>
          {isLoading && (
            <LoadingSpinner title="Fetching pets..." size="large" />
          )}
          {!isLoading && totalPostedPetCount === 0 && (
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
