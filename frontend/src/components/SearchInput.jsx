import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const { setSelectedConversation } = useConversation();
  const [search, setSearch] = useState();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search with atleast 3 characters");
    }

    const result = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (result) {
      setSelectedConversation(result);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label className="flex w-full items-center input input-bordered rounded-full">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="text-gray">
          <IoSearchSharp className="w-5 h-5 outline-none" />
        </button>
      </label>
    </form>
  );
};
export default SearchInput;
