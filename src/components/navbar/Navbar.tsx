"use client";
import "../../style/navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { getToken } from "firebase/messaging";
import { generatedToken, messaging } from "@/config/firebase";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
// import Notification from "../Notification";

const Navbar = () => {
  const { dispatch }: any = useContext(DarkModeContext);
  const { currentUser }: any = useContext(AuthContext);

  console.log(currentUser?.stsTokenManager?.accessToken);

  const handleSendNotification = async () => {
    const token = await generatedToken();
    console.log(token);

    const response = await axios.post(
      `https://fcm.googleapis.com//v1/projects/next-curd-5153c/messages:send`,
      {
        message: {
          token: token,
          notification: {
            title: "Notification Title",
            body: "Notofication body",
          },
          webpush: {
            fcm_options: {
              link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPuY60qCZAjLrnmd-mWjQNqWTXCg5chh4vmSzo1zR3e9wPoJbnIG9TYJXNQkMdepq3_4o&usqp=CAU",
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.stsTokenManager?.accessToken}`,
        },
      }
    );
    console.log(response);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item" onClick={() => handleSendNotification()}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {/* <div className="counter">1</div> */}
            {/* <Notification /> */}
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
