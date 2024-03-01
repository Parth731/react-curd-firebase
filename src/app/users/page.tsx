"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import "../../style/list.scss";
import Navbar from "@/components/navbar/Navbar";
import Datatable from "@/components/datatable/datatable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
