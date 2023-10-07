const colors = ["Brown", "White", "Black", "Gray"];
const gender = ["Male", "Female"];

const SidebarFilters = () => {
  return (
    <div>
      <p className="text-xl font-semibold border-b pb-4 border-b-gray-600">
        FILTERS
      </p>
      {/* Filter by color */}
      <div className="border-b border-b-gray-600 pb-4">
        <p className="text-md py-3">COLORS</p>
        <div className="flex flex-col gap-1">
          {colors.map((color) => (
            <div className="flex items-center gap-2" key={color}>
              <input type="checkbox" />
              <p>{color}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Filter by gender */}
      <div className="border-b border-b-gray-600 pb-4">
        <p className="text-md py-3">Gender</p>
        <div className="flex flex-col gap-1">
          {gender.map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <input type="checkbox" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
