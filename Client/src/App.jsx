import { BrowserRouter, Routes, Route } from "react-router-dom";

import FlightList from "./WingWay/FlightForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
