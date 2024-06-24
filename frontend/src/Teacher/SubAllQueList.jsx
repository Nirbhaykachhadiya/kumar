import axios from "axios";
import React, { useState } from "react";
import SubSubAllQueList from "./SubSubAllQueList";

const SubAllQueList = ({ filterItem,setAddToCartCheck }) => {
  const [down, setDown] = useState(false);
  const [done, setDone] = useState(false);

  const finalFilterItem = filterItem.filter((item, index) => index != 0);

  const addToCart = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/addToCart",
        { id },
        { withCredentials: true }
      );
      setDone(true);
      setAddToCartCheck((prev)=>!prev)
      console.log("que addTocart successfully", res);
    } catch (error) {
      console.log("que addTocart Unsuccessful", error.message);
    }
  };

  return (
    <div className="flex mt-5" key={filterItem[0].id}>
      <div>
        <div
          className={`flex sm:justify-center w-[500px] sm:w-[1100px] border  py-2 sm:px-5 bg-white shadow-lg ${
            down ? "border-black" : ""
          }`}
        >
          {" "}
          <div className="font-semibold ml-2 text-xl">(1)</div>
          <div className="ml-2 sm:ml-5">
            <div className="flex w-[450px]  sm:w-[1000px] justify-between font-semibold  sm:text-xl">
              <div>{filterItem[0].question}</div>
              <div className=" flex justify-end">
                <div>
                  {!done ? (
                    <button
                      onClick={() => addToCart(filterItem[0].id)}
                      className="bg-red-500 px-3  py-1 rounded-md font-semibold shadow-lg text-white"
                    >
                      Add +
                    </button>
                  ) : (
                    <div className="text-red-500">Added✅</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between my-1 ">
              <div>(A) {filterItem[0].option1}</div>
              <div>(B) {filterItem[0].option2}</div>
              <div>(C) {filterItem[0].option3}</div>
              <div>(D) {filterItem[0].option4}</div>
            </div>
            <div className="flex justify-between ">
              <div className="bg-green-500 px-3 w-9/12 py-1 rounded-md font-semibold text-white">
                Answer : {filterItem[0].answer}
              </div>
            </div>
          </div>
        </div>
        {down
          ? finalFilterItem.map((item, index) => {
              return (
                <div key={index}>
                  <SubSubAllQueList item={item} index={index} setAddToCartCheck={setAddToCartCheck} />
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <div className=" bg-green-500  text-white flex justify-start items-center h-[70px] ">
          <div>
            {" "}
            <div>
              <button onClick={() => setDown(!down)} className="w-[40px] ">
                {!down ? "▼" : "▲"}{" "}
              </button>
            </div>
            {/* <div>click here for more que from {item}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAllQueList;
