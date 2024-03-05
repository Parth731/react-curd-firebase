import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyAuS2Rim_g_jcq_XXDsJsG4C4yqpu-Opec",
  authDomain: "next-curd-5153c.firebaseapp.com",
  projectId: "next-curd-5153c",
  storageBucket: "next-curd-5153c.appspot.com",
  messagingSenderId: "524961361579",
  appId: "1:524961361579:web:b2a91e1c5e4df12cb151ee",
  measurementId: "G-T14DQECRSZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const generatedToken = async () => {
  // return getToken(messaging, {
  //   vapidKey:
  //     "BADJ8wK0vpWjDFttBL9R2LYthCN8smYqSUkHgEUuhFhb5Zl34QDdpU35UdWL5MkWlGPjuj8aJqIu5-KwJlnpdBo",
  // })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log("client-token", currentToken);
  //     } else {
  //       console.log("no register token found");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("An error occurred while retrieving token. ", error);
  //   });

  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BFoIlySEeJjEl0TElEaxDk-GWCn8NiQepmeL30wAZKpsDFqdP2X-q80oQFNswTi93f_bLwHLx6xbSieigZCGTGk",
    });
    console.log(currentToken);
    if (currentToken) {
      toast.success("Notification permission granted and token retrieved");
      return currentToken;
    }
  } else if (permission === "denied") {
    toast.error(
      "No registration token available. Request permission to generate one."
    );
  }
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payload", payload);
//       resolve(payload);
//     });
//   });
