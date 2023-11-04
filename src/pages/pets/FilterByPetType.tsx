import { petTypes } from "../../data/pet-filter-options";
import { FilterOptionKey } from "./Pets";

type FilterByTypeProps = {
  filterData: (filterOptionKey: FilterOptionKey, filterItem: string) => void;
};

const FilterByPetType = ({ filterData }: FilterByTypeProps) => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Pet Type</p>
      <div className="flex flex-col gap-1">
        {petTypes.map((type) => (
          <div className="flex items-center gap-2" key={type}>
            <input
              onClick={() => filterData("type", type)}
              value={type}
              className="accent-maroon border border-black rounded-sm"
              type="checkbox"
            />
            <p>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterByPetType;
