import FilterByColor from "./FilterByColor";
import FilterByGender from "./FilterByGender";
import FilterByPetType from "./FilterByPetType";
import { HiOutlineChevronDown } from "react-icons/hi";
import { FilterOptionKey } from "./Pets";
import SearchInput from "./SearchInput";
import React from "react";

type SidebarFilterProps = {
  expandFilterOptions: boolean;
  handleExpandFilterOptions: () => void;
  filterData: (filterOptionKey: FilterOptionKey, filterItem: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SidebarFilter = ({
  expandFilterOptions,
  handleExpandFilterOptions,
  filterData,
  onInputChange,
}: SidebarFilterProps) => {
  return (
    <div>
      <div
        onClick={handleExpandFilterOptions}
        className="flex justify-between items-center border-b py-1 border-b-gray-600 cursor-pointer px-1 hover:bg-gray-300"
      >
        <p className="text-xl font-semibold">FILTERS</p>
        <HiOutlineChevronDown
          className={`${
            expandFilterOptions ? "rotate-180" : "rotate-0"
          } duration-100 ease-in-out`}
          size={25}
        />
      </div>
      {expandFilterOptions && (
        <div>
          {/* Search filter */}
          <SearchInput onInputChange={onInputChange} />
          {/* Filter by color */}
          <FilterByColor filterData={filterData} />
          {/* Filter by gender */}
          <FilterByGender filterData={filterData} />
          {/* Filter by pet type */}
          <FilterByPetType filterData={filterData} />
        </div>
      )}
    </div>
  );
};

export default SidebarFilter;
