"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import "../../style/list.scss";
import Navbar from "@/components/navbar/Navbar";
import Datatable from "@/components/datatable/datatable";
import ProductTable from "@/components/datatable/productTable";

const ProductList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductList;
