import { petColors } from "../../data/pet-filter-options";
import { FilterOptionKey } from "./Pets";

type FilterByColorProps = {
  expandFilterOptions: boolean;
  filterData: (filterOptionKey: FilterOptionKey, filterItem: string) => void;
};

const FilterByColor = ({
  expandFilterOptions,
  filterData,
}: FilterByColorProps) => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Color</p>
      <div className="flex flex-col gap-1">
        {petColors.map((color) => (
          <div className="flex items-center gap-2" key={color}>
            <input
              onClick={() => filterData("color", color)}
              value={color}
              className="accent-maroon border border-black rounded-sm"
              type="checkbox"
            />
            <p>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterByColor;
