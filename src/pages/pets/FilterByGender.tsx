const gender = ["Male", "Female"];

const FilterByGender = () => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">Gender</p>
      <div className="flex flex-col gap-1">
        {gender.map((item) => (
          <div className="flex items-center gap-2" key={item}>
            <input
              className="accent-maroon border border-black rounded-sm"
              type="checkbox"
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterByGender;
