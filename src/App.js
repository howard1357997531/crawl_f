import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CurrencyScreen from "./screens/CurrencyScreen";
import CurrencyModifyScreen from "./screens/CurrencyModifyScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/currency" element={<CurrencyScreen />} />
        <Route path="/currency-modify" element={<CurrencyModifyScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
