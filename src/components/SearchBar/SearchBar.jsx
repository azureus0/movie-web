import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
  className="flex items-center w-full max-w-full sm:max-w-[400px] px-3 py-1 rounded-full bg-black/10 border border-white/50 backdrop-blur-sm shadow-md h-[34px]"
  onSubmit={onSubmit}
>
  <input
    type="text"
    placeholder="Search Movies or TV Series..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-transparent text-white placeholder-white/40 outline-none w-full text-sm"
  />
  <button type="submit" className="cursor-pointer">
    <FiSearch size={16} />
  </button>
</form>




  );
}

export default SearchBar;
