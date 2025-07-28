import React from "react";

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showUserDetailsHandler, // ✅ added
  showFirmTitle
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {showFirmTitle && <li onClick={showFirmHandler}>Add Firm</li>}
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li onClick={showUserDetailsHandler}>User Details</li> {/* ✅ added click */}
      </ul>
    </div>
  );
};

export default SideBar;
