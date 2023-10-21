import { petTypes } from "../../data/pet-filter-options";

type FilterByPetTypeProps = {
  handleChangeUrlParams: (
    e: React.ChangeEvent<HTMLInputElement>,
    paramName: string
  ) => void;
  queryType: string | number | readonly string[] | undefined;
};

const FilterByPetType = ({
  handleChangeUrlParams,
  queryType,
}: FilterByPetTypeProps) => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Pet Type</p>
      <div className="flex flex-col gap-1">
        {petTypes.map((type) => (
          <div className="flex items-center gap-2" key={type}>
            <input
              value={queryType}
              onChange={(e) => handleChangeUrlParams(e, "type")}
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
