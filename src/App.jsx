import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MediaDetail from "./pages/MediaDetail";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:mediaType/:id" element={<MediaDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
