"use client";

import "../../../style/new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db, storage } from "@/config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { productInputs, userInputs } from "@/config/datatablesource";

const NewProduct = () => {
  const [file, setFile] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [per, setPerc] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const params = useSearchParams();
  const uid: string | null = params.get("uid");
  const isEdit: boolean | null = Boolean(params.get("edit"));
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot: any = await getDoc(doc(db, "products", uid));
        console.log({ id: querySnapshot.id, ...querySnapshot.data() });
        setData({ id: querySnapshot.id, ...querySnapshot.data() });
      } catch (err) {
        console.log(err);
      }
    };
    if (uid && isEdit) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoadingProgress(progress);
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev: any) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  const handleInput = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      if (!isEdit) {
        await setDoc(doc(collection(db, "products")), {
          ...data,
          timeStamp: serverTimestamp(),
        });
        //   const res = await addDoc(collection(db, "cities"), {
        //     name: "Amhedabad",
        //     state: "Gujarat",
        //     country: "India",
        //     timeStamp: serverTimestamp(),
        //   });
        router.push("/products");
      } else {
        await updateDoc(doc(db, "products", uid), {
          ...data,
          timeStamp: serverTimestamp(),
        });
        router.push("/products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{isEdit ? "Edit Product " : "Add New Product"}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : isEdit
                  ? `${data?.img}`
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e: any) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <h1>Loading...{loadingProgress?.toFixed(2)}%</h1>
              {isEdit
                ? productInputs.map((input: any) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        id={input.id}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={handleInput}
                        value={data[input.id]}
                      />
                    </div>
                  ))
                : productInputs.map((input: any) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        id={input.id}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={handleInput}
                      />
                    </div>
                  ))}
              <button disabled={per !== null && per < 100} type="submit">
                {isEdit ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
