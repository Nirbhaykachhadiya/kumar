import React from "react";

const PdfQueList = ({ item, index }) => {
  return (
    <div className="flex justify-center w-[600px] sm:w-[1100px] border  py-2 sm:px-5 bg-white  ">
      {" "}
      <div className="">
        <div className="flex ">
          <div className="font-semibold text-black   text-l sm:text-xl">
            ({index + 1})
          </div>
          <div className="ml-3 sm:ml-5">
            <div className=" w-[500px] text-black sm:w-[1000px]  font-semibold text-l sm:text-xl">
              {item.question.question}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-black my-1 ml-7 sm:my-2 sm:ml-10 sm:w-[900px]">
          <div>(A) {item.question.option1}</div>
          <div>(B) {item.question.option2}</div>
          <div>(C) {item.question.option3}</div>
          <div>(D) {item.question.option4}</div>
        </div>
      </div>
    </div>
  );
};

export default PdfQueList;
