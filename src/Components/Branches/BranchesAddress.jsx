// BranchesComponent.js

import React from "react";
import './BranchesAddress.css';
const BranchesComponent = ({ branchAddresses }) => {
  return (
    <div className="branchesAddress">
     <h3>Branches Address</h3>
     <ul>
     {branchAddresses && branchAddresses.length > 0 ? (
        
        branchAddresses.map((address, index) => (
          <li key={index}>{address}</li>
        ))
      ) :null}
     </ul>
   
    </div>
    
  );
};

export default BranchesComponent;
