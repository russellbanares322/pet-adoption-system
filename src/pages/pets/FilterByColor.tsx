import { petColors } from "../../data/pet-filter-options";

type FilterByColorProps = {
  handleChangeUrlParams: (
    e: React.ChangeEvent<HTMLInputElement>,
    paramName: string
  ) => void;
  queryColor: string | number | readonly string[] | undefined;
};

const FilterByColor = ({
  handleChangeUrlParams,
  queryColor,
}: FilterByColorProps) => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Color</p>
      <div className="flex flex-col gap-1">
        {petColors.map((color) => (
          <div className="flex items-center gap-2" key={color}>
            <input
              value={queryColor}
              onChange={(e) => handleChangeUrlParams(e, "color")}
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
