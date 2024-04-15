import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <label className="flex w-full items-center input input-bordered rounded-full">
        <input type="text" className="grow" placeholder="Search" />
        <button type="submit" className="text-gray">
          <IoSearchSharp className="w-5 h-5 outline-none" />
        </button>
      </label>
    </form>
  );
};
export default SearchInput;
