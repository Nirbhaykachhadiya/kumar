import React from "react";
import SubAllQueList from "./SubAllQueList";

const AllQueList = ({ ques, chepArr }) => {
  return chepArr.map((item) => {
    const filterItem = ques.filter((que) => que.chepter === item);
    return (
      <div className="flex justify-center">
        <div className=" bg-white my-5 text-black flex justify-end items-center h-[109px]">
          <div className="bg-green-500 h-[30px] pl-3 text-white font-semibold shadow-lg pr-1 rounded-l-md">
            {item}
          </div>
        </div>
        <div className="">
          <div>
            {" "}
            <SubAllQueList filterItem={filterItem} />
          </div>
        </div>
      </div>
    );
  });
};

export default AllQueList;
