import { petGender } from "../../data/pet-filter-options";

type FilterByGenderProps = {
  handleChangeUrlParams: (
    e: React.ChangeEvent<HTMLInputElement>,
    paramName: string
  ) => void;
  queryGender: string | number | readonly string[] | undefined;
};

const FilterByGender = ({
  handleChangeUrlParams,
  queryGender,
}: FilterByGenderProps) => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Gender</p>
      <div className="flex flex-col gap-1">
        {petGender.map((gender) => (
          <div className="flex items-center gap-2" key={gender}>
            <input
              value={queryGender}
              onChange={(e) => handleChangeUrlParams(e, "gender")}
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
