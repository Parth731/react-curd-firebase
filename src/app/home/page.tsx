"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import "../../style/home.scss";
import Navbar from "@/components/navbar/Navbar";
import Widget from "@/components/widget/Widget";
import Featured from "@/components/featured/Featured";
import Chart from "@/components/chart/chart";
import List from "@/components/table/Table";
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { generatedToken, messaging } from "@/config/firebase";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  useEffect(() => {
    generatedToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload?.notification?.body || "success");
    });
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
