import PetsCard from "./PetsCard";
import SidebarFilters from "./SidebarFilters";
import LoadingSpinner from "../../global/LoadingSpinner";
import { PetsData, useFetchPets } from "../../api/pets/pets";
import { useEffect, useState } from "react";
import usePaginate from "../../hooks/usePaginate";
import { Pagination } from "antd";
import NoResultsFound from "../../global/NoResultsFound";
import { useFetchAdoptionApplications } from "../../api/adoptions/adoptions";

type FilterOptions = {
  color: string[];
  gender: string[];
  type: string[];
};

export type FilterOptionKey = keyof FilterOptions;

const Pets = () => {
  const { data: petsData, isLoading: isPetsDataBeingFetched } = useFetchPets();
  const { data: adoptionApplicationsData } = useFetchAdoptionApplications();
  const [filteredPetsData, setFilteredPetsData] = useState<PetsData[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    color: [],
    gender: [],
    type: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const emptySearchInput = searchInput.trim().length === 0;
  const emptyFilterOptions = Object.values(filterOptions).every(
    (data) => data.length === 0
  );
  const hasSelectedFilterOption = !emptyFilterOptions || !emptySearchInput;
  const conditionallyRederedPageData: PetsData[] = hasSelectedFilterOption
    ? filteredPetsData
    : petsData;
  const filteredPageData = conditionallyRederedPageData.filter(
    (item) =>
      adoptionApplicationsData.find((data) => item.id === data.petId)
        ?.status !== "Approved"
  );
  const totalPostedPetCount = filteredPageData.length;
  const totalFilteredPetsDataCount = filteredPetsData.length;
  const emptyFilterQueryResponse =
    hasSelectedFilterOption && filteredPetsData.length === 0;
  const { pageSize, currentItems, onPageChange, totalItemsCount } =
    usePaginate<PetsData>({ pageData: filteredPageData });
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
    const filteredDataByOptions = petsData?.filter(
      (data) =>
        filterOptions.color.some((color) => color === data.petColor) ||
        filterOptions.type.some((type) => type === data.petType) ||
        filterOptions.gender.some((gender) => gender === data.petGender)
    );

    const filteredDataBySearch = petsData?.filter(
      (data) =>
        data.petColor.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.petGender.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.petType.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.petName.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (!emptyFilterOptions) {
      setFilteredPetsData(filteredDataByOptions);
    }
    if (!emptySearchInput) {
      setFilteredPetsData(filteredDataBySearch);
    }
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
          {emptyFilterQueryResponse && (
            <NoResultsFound title="No results found" />
          )}
          {!emptyFilterQueryResponse &&
            !isPetsDataBeingFetched &&
            totalPostedPetCount > 0 && (
              <div className="text-center mt-3 md:mt-0 mb-2">
                <p className="font-semibold">
                  {hasSelectedFilterOption
                    ? totalFilteredPetsDataCount
                    : totalPostedPetCount}{" "}
                  {!hasSelectedFilterOption &&
                    (totalPostedPetCount > 1 ? "ITEMS" : "ITEM")}
                  {hasSelectedFilterOption &&
                    (totalFilteredPetsDataCount > 1 ? "ITEMS" : "ITEM")}
                </p>
              </div>
            )}

          {!emptyFilterQueryResponse && (
            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {petsData.length > 0 &&
                currentItems.map((pet) => <PetsCard key={pet.id} {...pet} />)}
            </div>
          )}
          {!emptyFilterQueryResponse && isPetsDataBeingFetched && (
            <LoadingSpinner title="Fetching pets..." size="large" />
          )}
          {!emptyFilterQueryResponse &&
            !isPetsDataBeingFetched &&
            totalPostedPetCount === 0 && (
              <h1 className="flex justify-center items-center h-96 font-bold text-lg">
                No added pets yet...
              </h1>
            )}
        </div>
      </div>
      {!emptyFilterQueryResponse &&
        !isPetsDataBeingFetched &&
        totalPostedPetCount > 0 && (
          <div className="flex items-center justify-center mt-5">
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
    </div>
  );
};

export default Pets;
