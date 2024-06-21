import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { RoleAtom, UserNameAtom } from "../store/userAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import QueListPaperSeter from "../components/QueListPaperSeter";

const Inside = () => {
  const role = useRecoilValue(RoleAtom);
  const userName = useRecoilValue(UserNameAtom);
  const navigate = useNavigate();
  const [addQuestion, setAddQuestion] = useState(true);

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
      <div>
        {role === "paperSeter" ? (
          <div className="bg-gray-100 ">
            <div className="h-[70px] bg-gray-100 flex items-center justify-center">
              <button
                onClick={() => setAddQuestion(true)}
                className="bg-white  text-xl font-semibold  w-[250px] py-2 shadow-lg"
              >
                Add Question
              </button>
              <button
                onClick={() => setAddQuestion(false)}
                className="ml-10 bg-white text-xl font-semibold  w-[250px] py-2 shadow-lg"
              >
                Your Listing
              </button>
            </div>
            <div className="">
              {addQuestion ? (
                <AddQuestion setAddQuestion={setAddQuestion} />
              ) : (
                <QueListPaperSeter setAddQuestion={setAddQuestion} />
              )}
            </div>
          </div>
        ) : (
          <>teacher</>
        )}
      </div>
    </>
  );
};

export default Inside;
