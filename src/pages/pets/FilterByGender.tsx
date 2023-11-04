import { petGender } from "../../data/pet-filter-options";
import { FilterOptionKey } from "./Pets";

type FilterByGenderProps = {
  filterData: (filterOptionKey: FilterOptionKey, filterItem: string) => void;
};

const FilterByGender = ({ filterData }: FilterByGenderProps) => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Gender</p>
      <div className="flex flex-col gap-1">
        {petGender.map((gender) => (
          <div className="flex items-center gap-2" key={gender}>
            <input
              onClick={() => filterData("gender", gender)}
              value={gender}
              className="accent-maroon border border-black rounded-sm"
              type="checkbox"
            />
            <p>{gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterByGender;
