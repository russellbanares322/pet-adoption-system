import FilterByColor from "./FilterByColor";
import FilterByGender from "./FilterByGender";

const SidebarFilters = () => {
  return (
    <div>
      <p className="text-xl font-semibold border-b pb-4 border-b-gray-600">
        FILTERS
      </p>
      {/* Filter by color */}
      <FilterByColor />
      {/* Filter by gender */}
      <FilterByGender />
    </div>
  );
};

export default SidebarFilters;
