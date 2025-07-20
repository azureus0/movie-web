import { Link } from "react-router-dom";
import tmdbLogo from "../../assets/tmdb-logo.svg";

const Footer = () => {
  return (
    <footer className="mt-14 px-4 py-6 border-t border-gray-800 bg-[#111] text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left">
          This website uses the TMDb API.
        </p>

        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <img
            src={tmdbLogo}
            alt="TMDb Logo"
            className="h-6 w-auto"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
