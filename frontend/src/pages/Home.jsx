import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginSignupAtom } from "../store/userAtom";
import LoginSignup from "./LoginSignup";

const Home = () => {
  const isLoginSignup = useRecoilValue(LoginSignupAtom);
  console.log(isLoginSignup);
  return (
    <>
      {!isLoginSignup ? (
        <div className="sm:flex ">
          <About />
          <TeacherPaperseter />
        </div>
      ) : (
        <LoginSignup />
      )}
    </>
  );
};

const About = () => {
  return (
    <div className="sm:w-1/2 bg-black text-white flex justify-center items-center h-[300px] sm:h-screen ">
      <div className="">
        <div className="font-semibold text-2xl">The World's No. 1 </div>
        <div className="mt-5 font-semibold text-xl">
          Paper Generation Application
        </div>
        <hr className="mt-2" />
        <div className="mt-5 font-semibold text-l">
          Access All Standard & Subjects from one plateform
        </div>
      </div>
    </div>
  );
};

const TeacherPaperseter = () => {
  const setLoginSignup = useSetRecoilState(LoginSignupAtom);

  return (
    <div className="sm:w-1/2 bg-white  text-black flex justify-center items-center h-[300px] sm:h-screen">
      <div className="sm:flex ">
        <div>
          <button
            onClick={() => setLoginSignup(true)}
            className="bg-black rounded-md px-4 w-[200px] py-2 text-white text-xl font-semibold shadow-lg"
          >
            I'm a teacher
          </button>
        </div>
        <div className="mt-3 sm:ml-3 sm:mt-0">
          <button
            onClick={() => setLoginSignup(true)}
            className="bg-black rounded-md w-[200px] px-4 py-2 text-white text-xl font-semibold shadow-lg"
          >
            I'm a paperSeter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
