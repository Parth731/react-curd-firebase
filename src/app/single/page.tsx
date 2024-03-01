"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import "../../style/single.scss";
import Navbar from "@/components/navbar/Navbar";
import Chart from "@/components/chart/chart";
import List from "@/components/table/Table";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const Single = () => {
  const [data, setData] = useState<any>({});
  const params = useSearchParams();
  const uid: any = params.get("uid");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot: any = await getDoc(doc(db, "users", uid));
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
        {/* {
    id: '01WH8a5l5wQqliIRzENj8rxt1Eo1',
    img: 
      'https://firebasestorage.googleapis.com/v0/b/next-curd-5153c.appspot.com/o/zyro-w48LglCMKFI-unsplash.jpg?alt=media&token=f4c417a1-1559-4930-a937-26a5d539db92',
    email: 'navbar@gmail.com',
    password: 'navbar1234',
    username: 'kishan',
    phone: '286868368',
    country: 'india',
    displayName: 'kishan patel',
    address: 'Ahemdabad, Gujrat',
    timeStamp: Timestamp { seconds: 1709212849, nanoseconds: 362000000 }
  } */}
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => router.push(`/users/new?edit=true&uid=${uid}`)}
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
                <h1 className="itemTitle">{data?.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data?.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data?.country}</span>
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

export default Single;
