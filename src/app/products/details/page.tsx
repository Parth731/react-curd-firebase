"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import "../../../style/single.scss";
import Navbar from "@/components/navbar/Navbar";
import Chart from "@/components/chart/chart";
import List from "@/components/table/Table";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const ProductDetails = () => {
  const [data, setData] = useState<any>({});
  const params = useSearchParams();
  const uid: any = params.get("uid");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot: any = await getDoc(doc(db, "products", uid));
        console.log({ id: querySnapshot.id, ...querySnapshot.data() });
        setData({ id: querySnapshot.id, ...querySnapshot.data() });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => router.push(`/products/new?edit=true&uid=${uid}`)}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <Image
                className="itemImg"
                src={data?.img}
                alt="profile"
                width={200}
                height={200}
              />

              <div className="details">
                <h1 className="itemTitle">{data?.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">{data?.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">description:</span>
                  <span className="itemValue">{data?.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data?.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stock:</span>
                  <span className="itemValue">{data?.stock}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
