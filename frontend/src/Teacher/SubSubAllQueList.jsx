import React, { useState } from "react";
import axios from "axios";

const SubSubAllQueList = ({ item, index }) => {

    const [done2, setDone2] = useState(false);

    const addToCart2 = async (id) => {
        try {
          const res = await axios.post(
            "http://localhost:3001/api/v1/users/addToCart",
            { id },
            { withCredentials: true }
          );
          setDone2(true);
          console.log("que addTocart successfully", res);
        } catch (error) {
          console.log("que addTocart Unsuccessful", error.message);
        }
      };
  return (
    <div
      key={index}
      className="flex sm:justify-center w-[500px] sm:w-[1100px] border border-black py-2 sm:px-5 bg-white shadow-lg "
    >
      {" "}
      <div className="font-semibold ml-2 text-xl">({index + 2})</div>
      <div className="ml-2 sm:ml-5">
        <div className="flex w-[450px]  sm:w-[1000px] justify-between font-semibold text-l sm:text-xl">
          <div>{item.question}</div>
          <div className=" flex justify-end">
            <div>{!done2 ?
              <button
                onClick={() => addToCart2(item.id)}
                className="bg-red-500 px-3  py-1 rounded-md font-semibold shadow-lg text-white"
              >
                Add +
              </button>:
              <div className="text-red-500">Added✅</div>}
            </div>
          </div>
        </div>
        <div className="flex justify-between my-1 sm:w-[700px]">
          <div>(A) {item.option1}</div>
          <div>(B) {item.option2}</div>
          <div>(C) {item.option3}</div>
          <div>(D) {item.option4}</div>
        </div>

        <div className="bg-green-500 px-3 w-[370px] sm:w-9/12 py-1 rounded-md font-semibold text-white">
          Answer : {item.answer}
        </div>
      </div>
    </div>
  );
};

export default SubSubAllQueList;
