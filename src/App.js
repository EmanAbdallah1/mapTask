import React from "react";
import MapComponent from "./Components/Map/Map";
import Bannner from "./Components/Banner/Bannner";
import BranchesAddress from "./Components/Branches/BranchesAddress";
import'./App.css'
function App() {
  return (
    <>
      <Bannner />
      <MapComponent />
      <BranchesAddress/>
    </>
  );
}

export default App;
