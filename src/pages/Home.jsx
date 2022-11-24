import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdDocument } from "react-icons/io";
import { getDocumentType } from "../redux/document-type/documentTypeSlice";
import Navbar from "../components/Navbar";
import { logout, reset } from "../redux/auth/authSlice";
import apiService from "../redux/apiService";

function Home() {
  const { documentsType } = useSelector((state) => state.documentType);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onChooseDocumentType = (index) => {
    const json = documentsType[index].content;
    navigation("/survey", { state: { json, id: documentsType[index].id } });
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation("/signin");
  };

  useEffect(() => {
    dispatch(getDocumentType());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div>
          <h1 className="font-bold text-2xl text-center p-2 capitalize">Build your document</h1>
          <h3 className="font-bold text-xl text-center p-2 text-zinc-400">Create Your Free Legal Documents & Contracts Online in Minutes</h3>

          <div className="flex justify-center my-5">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              {documentsType &&
                documentsType.constructor === Array &&
                documentsType.map((type, index) => (
                  <div
                    key={index}
                    onClick={() => onChooseDocumentType(index)}
                    className="flex justify-center p-5 border rounded border-[#1ab394] w-72 h-72 items-center cursonr cursor-pointer"
                  >
                    <div className="text-center space-y-7">
                      <div className="flex justify-center">
                        <IoMdDocument color="#1ab394" size={50} />
                      </div>

                      <p className="capitalize text-xl">{type.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button onClick={onLogout}>Log out</button>
      </div>
    </>
  );
}

export default Home;
