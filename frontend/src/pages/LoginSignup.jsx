import React, { useState } from "react";

import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SignUpAtom } from "../store/userAtom";

const LoginSignup = () => {
  const signUpValue = useRecoilValue(SignUpAtom);

  const setSignUp = useSetRecoilState(SignUpAtom);

  return (
    <div className="flex justify-center items-center border  h-screen">
      <div className=" w-1/2  ">
        <div>
          <button
            className={`text-xl font-semibold px-4 py-3 w-1/2 rounded-l shadow-lg ${
              !signUpValue ? "bg-black  text-white " : "bg-white  text-black "
            }`}
            onClick={() => setSignUp(false)}
          >
            LogIn
          </button>
          <button
            className={`text-xl font-semibold px-4 py-3 w-1/2 rounded-l shadow-lg ${
              !signUpValue ? "bg-white  text-black " : "bg-black  text-white "
            }`}
            onClick={() => setSignUp(true)}
          >
            SignUp
          </button>
        </div>
        <div className="flex">
          <div className="w-1/2 text-center">{!signUpValue ? "▼" : ""}</div>
          <div className="w-1/2 text-center">{signUpValue ? "▼" : ""}</div>
        </div>
        <div className="mt-10">{signUpValue ? <SignUp /> : <LogIn />}</div>
      </div>
    </div>
  );
};

export default LoginSignup;
