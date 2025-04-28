import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Generate from "./Generate.jsx";
import './App.css';
import loadingGif from './Pinwheel.gif';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="preloading">
        <img src={loadingGif} alt="Loading..." className="preloading-image" />
      </div>
    );
  }

  return (
    <div className="App-body">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
