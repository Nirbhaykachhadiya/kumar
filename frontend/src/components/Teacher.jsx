import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import AllQueList from "../Teacher/AllQueList";
import pdf from "../assets/pdf.png";
import RedLoading from "../assets/RedLoading";
import PdfQueList from "../Teacher/PdfQueList";

const Teacher = () => {
  const [loading, setLoading] = useState(true);
  const [ques, setQues] = useState([]);
  const [chepArr, setChepArr] = useState([]);
  const [teacherHome, setTeacherHome] = useState(true);
  const [papers, setPapers] = useState([]);
  const [addToCartQues, setAddToCartQues] = useState([]);
  const [paperView, setPaperView] = useState(false);
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

  const fetchPaper = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/fetchPaper",
        {},
        { withCredentials: true }
      );
      setPapers(res.data.data);
      setLoading(false);
      console.log(
        "paper from backend for teacher fetch succesfully",
        res.data.data
      );
    } catch (error) {
      console.log(
        "Paper from backend for teacher fetch Unsuccesful",
        error.message
      );
    }
  };
  useEffect(() => {
    if (!teacherHome) {
      fetchPaper();
    }
  }, [teacherHome]);

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

  const pdfClick = (ques) => {
    setAddToCartQues(ques);
    setPaperView(true);
  };

  return (
    <>
      <div className="text-center  mb-5">
        <div className="text-xl font-semibold mt-2  underline">
          The World's No. 1 Paper Generation Application
        </div>
        <div className="flex justify-center mb-3">
          <div
            onClick={() => {setTeacherHome(true),setPaperView(false)}}
            className="px-5 cursor-pointer py-2 bg-red-500 w-[200px] rounded-md text-xl text-white font-semibold shadow-lg"
          >
            Create a Paper
          </div>
          <div
            onClick={() =>  {setTeacherHome(false),setPaperView(false)}}
            className="px-5 cursor-pointer ml-2 py-2 bg-red-500  w-[200px] rounded-md text-xl text-white font-semibold shadow-lg"
          >
            Your-Paper
          </div>
        </div>
        <hr className="border border-black" />
      </div>
      {!paperView ? (
        <>
          {teacherHome ? (
            <>
              {loading ? (
                <div className="flex justify-center">
                  <RedLoading />
                </div>
              ) : (
                <div className="w-[639px] sm:w-screen">
                  <AllQueList ques={ques} chepArr={chepArr} />
                </div>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <div className="flex justify-center">
                  <RedLoading />
                </div>
              ) : (
                <div className="flex flex-wrap">
                  {papers.map((item, index) => {
                    const arr = item.createdAt.split("T");
                    item.Date = arr[0];
                    item.Time = arr[1];

                    return (
                      <div key={index} className="w-[200px]">
                        <div>
                          <img
                            onClick={() => pdfClick(item.question)}
                            className="cursor-pointer w-[200px] h-[200px]"
                            src={pdf}
                          />
                        </div>
                        <div className="flex justify-center">
                          <div>
                            <div>{item.Date}</div>
                            <div>{item.Time}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>{<PdfQueList addToCartQues={addToCartQues} downloaded={true} />}</>
      )}
    </>
  );
};

export default Teacher;
