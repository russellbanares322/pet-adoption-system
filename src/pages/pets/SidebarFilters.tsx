import FilterByColor from "./FilterByColor";
import FilterByGender from "./FilterByGender";
import FilterByPetType from "./FilterByPetType";
import { FilterOptionKey } from "./Pets";

type SidebarFilterProps = {
  filterData: (filterOptionKey: FilterOptionKey, filterItem: string) => void;
};

const SidebarFilter = ({ filterData }: SidebarFilterProps) => {
  return (
    <div>
      <p className="text-xl font-semibold border-b pb-4 border-b-gray-600">
        FILTERS
      </p>
      {/* Filter by color */}
      <FilterByColor filterData={filterData} />
      {/* Filter by gender */}
      <FilterByGender filterData={filterData} />
      {/* Filter by pet type */}
      <FilterByPetType filterData={filterData} />
    </div>
  );
};

export default SidebarFilter;
