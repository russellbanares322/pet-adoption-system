import { petGender } from "../../data/pet-filter-options";

const FilterByGender = () => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Gender</p>
      <div className="flex flex-col gap-1">
        {petGender.map((gender) => (
          <div className="flex items-center gap-2" key={gender}>
            <input
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
