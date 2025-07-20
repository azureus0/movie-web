import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  const [query, setQuery] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsAtTop(currentY < 50);
      if (currentY > lastScrollY.current && currentY > 100) {
        setShowHeader(false);
      } else if (currentY < lastScrollY.current) {
        setShowHeader(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 px-4 py-2 transition-all duration-300 text-white ${showHeader ? "translate-y-0" : "-translate-y-full"
        } ${isAtTop ? "bg-transparent backdrop-blur-5" : "bg-[#111]"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide flex items-center font-sans"
        >
          <span className="text-purple-500 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">MOVIE</span>
          <span className="text-gray-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">DEX</span>
        </Link>

        <SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} />
      </div>
    </header>
  );
};

export default Header;
