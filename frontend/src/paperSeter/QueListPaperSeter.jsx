import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../assets/Loading";
import SubQueListPaperSeter from "./SubQueListPaperSeter";

const QueListPaperSeter = () => {
  const [loading, setLoading] = useState(true);
  const [ques, setQues] = useState([]);
  const [filterQues, setFilterQues] = useState([]);
  const [reCheck, setReCheck] = useState(false);
  const [num, setNum] = useState(0);
  const [numberArr, setNumberArr] = useState([]);

  const fetch = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/fetchPaperSeterQue",
        {},
        { withCredentials: true }
      );
      setQues(res.data.data);

      setLoading(false);
      setNum(1);

      console.log(
        "fetchPaperSeterQue from backend successfully",
        res,
        numberArr
      );
    } catch (error) {
      console.log(
        "fetchPaperSeterQue from backend Unsuccessfully",
        error.message
      );
    }
  };
  useEffect(() => {
    fetch();
  }, [reCheck]);

  useEffect(() => {
    const stage = () => {
      const filterData = ques.filter(
        (item, index) => index < num * 5 && index >= (num - 1) * 5
      );

      setFilterQues(filterData);
      const numberAr = Array.from(
        { length: Math.ceil(ques.length / 5) },
        (_, index) => index + 1
      );

      setNumberArr(numberAr);
    };
    if (num != 0) {
      stage();
    }
  }, [num, reCheck, ques]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center  bg-white h-screen ">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center">
          {filterQues.length === 0 ? (
            <div className="flex justify-center bg-white  h-screen items-center">
              "You haven't listed anything"
            </div>
          ) : (
            <div>
              {filterQues.map((item, index) => {
                return (
                  <SubQueListPaperSeter
                    index={index}
                    item={item}
                    key={index}
                    setReCheck={setReCheck}
                    num={num}
                  />
                );
              })}
              <div className="flex justify-center mt-5 mb-5">
                {numberArr.map((number, index) => (
                  <div key={number}>
                    <button
                      onClick={() => setNum(number)}
                      autoFocus={index === 0}
                      className={`border ${
                        number === num ? "focus:bg-yellow-300" : ""
                      } font-semibold px-4 bg-white shadow-lg py-1`}
                    >
                      {number}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueListPaperSeter;
