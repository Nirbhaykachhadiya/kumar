import React, { useState } from "react";

const SubAllQueList = ({ filterItem }) => {
  const [down, setDown] = useState(false);

  return (
    <div className="flex mt-5">
      <div>
        {down ? (
          filterItem.map((item, index) => {
            return (
              <>
                <div className="flex sm:justify-center w-[500px] sm:w-[1100px] border border-black py-2 sm:px-5 bg-white shadow-lg ">
                  <div className="font-semibold ml-2 text-xl">
                    ({index + 1})
                  </div>
                  <div className="ml-2 sm:ml-5">
                    <div className="flex w-[400px]  sm:w-[700px] justify-between font-semibold text-l sm:text-xl">
                      <div>{item.question}</div>
                    </div>
                    <div className="flex justify-between my-1">
                      <div>(A) {item.option1}</div>
                      <div>(B) {item.option2}</div>
                      <div>(C) {item.option3}</div>
                      <div>(D) {item.option4}</div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="bg-green-500 px-3 w-9/12 py-1 rounded-md font-semibold text-white">
                        Answer : {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="flex sm:justify-center w-[500px] sm:w-[1100px] border  py-2 sm:px-5 bg-white shadow-lg ">
        
              {" "}
              <div className="font-semibold ml-2 text-xl">(1)</div>
              <div className="ml-2 sm:ml-5">
                <div className="flex w-[400px]  sm:w-[700px] justify-between font-semibold text-l sm:text-xl">
                  <div>{filterItem[0].question}</div>
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
       
        )}
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
