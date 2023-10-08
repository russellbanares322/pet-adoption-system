const colors = ["Brown", "White", "Black", "Gray"];

const FilterByColor = () => {
  return (
    <div className="border-b border-b-gray-600 pb-4">
      <p className="text-md py-3">COLORS</p>
      <div className="flex flex-col gap-1">
        {colors.map((color) => (
          <div className="flex items-center gap-2" key={color}>
            <input
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
