import React from "react";
import { HiSearch } from "react-icons/hi";

type SearchInputProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ onInputChange }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-1 mt-3 bg-white p-1 rounded-md border shadow-sm">
      <HiSearch className="pointer-events-none" size={23} />
      <input
        onChange={onInputChange}
        placeholder="Search..."
        className="appearance-none outline-none w-full h-full"
        type="text"
      />{" "}
    </div>
  );
};

export default SearchInput;
