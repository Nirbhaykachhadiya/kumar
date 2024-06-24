import React, { useState } from "react";
import axios from "axios";
import RedLoading from "../assets/RedLoading";

const SubAddToCartQues = ({ item, index, setAddToCartCheck }) => {
  const [loading, setLoading] = useState(false);

  const deleteAddToCartQue = async (id) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/deleteAddToCartQue",
        { id },
        { withCredentials: true }
      );

      setAddToCartCheck((prev) => !prev);
      setLoading(false);
      console.log("deleteAddToCartQue successfully", res);
    } catch (error) {
      console.log("deleteAddToCartQue Unsuccessful", error.message);
    }
  };
  return (
    <div className="flex justify-center w-[600px] sm:w-[1100px] border border-black py-2 sm:px-5 bg-white shadow-lg ">
      {" "}
      
      <div className="font-semibold text-black ml-2 text-xl">({index + 1})</div>
      <div className="ml-2 sm:ml-5">
        <div className="flex w-[500px] text-black sm:w-[1000px] justify-between font-semibold text-l sm:text-xl">
          <div>{item.question.question}</div>
          <div className=" flex justify-end">
            <div>
              {!loading ? (
                <button
                  onClick={() => deleteAddToCartQue(item.id)}
                  className="bg-red-500 px-3  py-1 rounded-md font-semibold shadow-lg text-white"
                >
                  Delete
                </button>
              ) : (
                <RedLoading/>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-black my-1 sm:w-[700px]">
          <div>(A) {item.question.option1}</div>
          <div>(B) {item.question.option2}</div>
          <div>(C) {item.question.option3}</div>
          <div>(D) {item.question.option4}</div>
        </div>
      </div>
    </div>
  );
};

export default SubAddToCartQues;
