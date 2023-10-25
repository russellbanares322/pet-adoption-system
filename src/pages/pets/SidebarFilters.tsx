import FilterByColor from "./FilterByColor";
import FilterByGender from "./FilterByGender";
import FilterByPetType from "./FilterByPetType";
import { HiOutlineChevronDown } from "react-icons/hi";
import { FilterOptionKey } from "./Pets";
import { useState } from "react";

type SidebarFilterProps = {
  filterData: (filterOptionKey: FilterOptionKey, filterItem: string) => void;
};

const SidebarFilter = ({ filterData }: SidebarFilterProps) => {
  const [expandFilterOptions, setExpandfilterOptions] = useState(false);

  const handleExpandFilterOptions = () => {
    setExpandfilterOptions(!expandFilterOptions);
  };
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
      {/* Filter by color */}
      <FilterByColor
        expandFilterOptions={expandFilterOptions}
        filterData={filterData}
      />
      {/* Filter by gender */}
      <FilterByGender
        expandFilterOptions={expandFilterOptions}
        filterData={filterData}
      />
      {/* Filter by pet type */}
      <FilterByPetType
        expandFilterOptions={expandFilterOptions}
        filterData={filterData}
      />
    </div>
  );
};

export default SidebarFilter;
