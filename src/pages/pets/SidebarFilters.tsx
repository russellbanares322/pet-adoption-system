import FilterByColor from "./FilterByColor";
import FilterByGender from "./FilterByGender";
import FilterByPetType from "./FilterByPetType";

type QueryString = string | number | readonly string[] | undefined;

type SidebarFilterProps = {
  handleChangeUrlParams: (
    e: React.ChangeEvent<HTMLInputElement>,
    paramName: string
  ) => void;
  queryColor: QueryString;
  queryGender: QueryString;
  queryType: QueryString;
};

const SidebarFilters = ({
  handleChangeUrlParams,
  queryColor,
  queryGender,
  queryType,
}: SidebarFilterProps) => {
  return (
    <div>
      <p className="text-xl font-semibold border-b pb-4 border-b-gray-600">
        FILTERS
      </p>
      {/* Filter by color */}
      <FilterByColor
        handleChangeUrlParams={handleChangeUrlParams}
        queryColor={queryColor}
      />
      {/* Filter by gender */}
      <FilterByGender
        handleChangeUrlParams={handleChangeUrlParams}
        queryGender={queryGender}
      />
      {/* Filter by pet type */}
      <FilterByPetType
        handleChangeUrlParams={handleChangeUrlParams}
        queryType={queryType}
      />
    </div>
  );
};

export default SidebarFilters;
