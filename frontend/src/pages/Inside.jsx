import React from "react";
import { useRecoilValue } from "recoil";
import { RoleAtom, UserNameAtom } from "../store/userAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PaperSeter from "../components/PaperSeter.jsx";
import Teacher from "../components/Teacher";

const Inside = () => {
  const role = useRecoilValue(RoleAtom);
  const userName = useRecoilValue(UserNameAtom);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
      console.log("logOut successfull", res);
    } catch (error) {
      console.log("logOut Unsuccessfull", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center h-[100px]  bg-black text-white text-xl font-semibold shadow-lg">
        <div>Welcome {userName}</div>
        <div> Role : {role}</div>
        <button
          onClick={logOut}
          className="bg-white rounded-md text-black px-5 py-2 shadow-lg"
        >
          LogOut
        </button>
      </div>
      <div>{role === "paperSeter" ? <PaperSeter /> : <Teacher />}</div>
    </>
  );
};

export default Inside;
