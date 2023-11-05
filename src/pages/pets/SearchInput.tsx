import { HiSearch } from "react-icons/hi";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-1 mt-3 bg-white p-1 rounded-md border shadow-sm">
      <HiSearch className="pointer-events-none" size={23} />
      <input
        placeholder="Search..."
        className="appearance-none outline-none w-full h-full"
        type="text"
      />{" "}
    </div>
  );
};

export default SearchInput;
