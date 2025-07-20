import HeroSection from "../components/Section/HeroSection";
import TrendingSection from "../components/Section/TrendingSection";
import PopularSection from "../components/Section/PopularSection";

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <div className="px-6 md:px-10 space-y-10">
        <TrendingSection />
        <PopularSection />

      </div>
    </div>
  );
};

export default Home;
