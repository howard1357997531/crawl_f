import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CurrencyScreen from "./screens/CurrencyScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/currency" element={<CurrencyScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
