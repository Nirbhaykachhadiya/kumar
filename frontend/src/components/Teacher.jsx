import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loading from "../assets/Loading";
import AllQueList from "../Teacher/AllQueList";

const Teacher = () => {
  const [loading, setLoading] = useState(true);
  const [ques, setQues] = useState([]);
  const [chepArr, setChepArr] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/fetchAllQue",
        {},
        { withCredentials: true }
      );
      setQues(res.data.data);
      setLoading(false);
      console.log("ques from backend for teacher fetch succesfully", res);
    } catch (error) {
      console.log(
        "ques from backend for teacher fetch Unsuccesful",
        error.message
      );
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  useMemo(() => {
    if (ques.length != null) {
      let newArr = [];
      ques.forEach((item) => {
        if (!newArr.includes(item.chepter)) {
          newArr.push(item.chepter);
        }
      });

      setChepArr(newArr);
    }
  }, [ques]);
  return (
    <>
      <div className="text-center text-xl font-semibold mt-2 mb-5 underline">
        <div>The World's No. 1 Paper Generation Application</div>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="w-[639px] sm:w-screen">
          <AllQueList ques={ques} chepArr={chepArr} />
        </div>
      )}
    </>
  );
};

export default Teacher;
