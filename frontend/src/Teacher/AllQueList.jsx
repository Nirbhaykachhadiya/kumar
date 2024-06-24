import React, { useEffect, useState } from "react";
import SubAllQueList from "./SubAllQueList";
import axios from "axios";
import SubAddToCartQues from "./SubAddToCartQues";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PdfQueList from "./PdfQueList";

const AllQueList = ({ ques, chepArr }) => {
  const [up, setUp] = useState(false);
  const [addToCartQues, setAddToCartQues] = useState([]);
  const [addToCartCheck, setAddToCartCheck] = useState(false);

  useEffect(() => {
    const addToCartItems = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/v1/users/addToCartItems",
          {},
          { withCredentials: true }
        );
        setAddToCartQues(res.data.data);
        console.log("fetch addToCartQues successfully", res);
      } catch (error) {
        console.log("fetch addToCartQues Unsuccessful", error.message);
      }
    };

    addToCartItems();
  }, [addToCartCheck]);

  const generatePdf = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("mcqs.pdf");
    });
  };

  return (
    <>
      {chepArr.map((item, index) => {
        const filterItem = ques.filter((que) => que.chepter === item);
        return (
          <div className="flex justify-center " key={index}>
            <div className=" bg-white my-5 text-black flex justify-end items-center h-[109px]">
              <div className="bg-blue-500 h-[30px] pl-3 text-white font-semibold shadow-lg pr-1 rounded-l-md">
                {item}
              </div>
            </div>
            <div className="">
              <div>
                {" "}
                <SubAllQueList
                  filterItem={filterItem}
                  setAddToCartCheck={setAddToCartCheck}
                />
              </div>
            </div>
          </div>
        );
      })}
      {!up ? (
        <div className="bg-black flex items-center justify-between px-10 sticky bottom-0 text-white h-[50px] z-10">
          <div>
            {" "}
            <button onClick={() => setUp(!up)}>{!up ? "▲" : "▼"}</button>
          </div>
          <div>Total Que Added : {addToCartQues.length}</div>
        </div>
      ) : (
        <>
          <div className="bg-black  px-10 sticky bottom-0 text-white  z-10">
            <div>
              <button onClick={() => setUp(!up)}>{!up ? "▲" : "▼"}</button>
            </div>
            <div className="flex justify-center">
              <div>
                <div>
                  {addToCartQues.map((item, index) => {
                    return (
                      <div key={index}>
                        <SubAddToCartQues
                          item={item}
                          index={index}
                          setAddToCartCheck={setAddToCartCheck}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={generatePdf}
                    className="bg-red-500 my-3 px-3  py-2 rounded-md font-semibold shadow-lg text-white"
                  >
                    Save & Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div id="pdf-content">
        <div className="flex justify-center">
          <div className="my-5 text-xl font-semibold">
            Unnati Education Academy
           
          </div>
        </div>
        <hr className="my-5"/>
        <div className="flex justify-center">
          <div>
            {addToCartQues.map((item, index) => {
              return (
                <div key={index}>
                  <PdfQueList item={item} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllQueList;
