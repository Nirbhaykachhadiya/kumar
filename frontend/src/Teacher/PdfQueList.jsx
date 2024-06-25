import RedLoading from "../assets/RedLoading";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const PdfQueList = ({ addToCartQues, downloaded = false }) => {
  const [loading, setLoading] = useState("false");
  const [paperBackend, setPaperBackend] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/v1/users/savePaperToBackend",
          {},
          { withCredentials: true }
        );
        //setQues(res.data.data);
        //setLoading(false);
        console.log("savePaperToBackend succesfully", res);
      } catch (error) {
        console.log("savePaperToBackendUnsuccesful", error.message);
      }
    };
    if (paperBackend) {
      fetch();
    }
  }, [paperBackend]);

  const generatePdf = async () => {
    setLoading("true");
    const input = document.getElementById("pdf-content");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight = 295; // A4 height in mm
    const pageWidth = 210; // A4 width in mm
    let position = 0; // Top position for the new content
    let heightLeft = pageHeight;

    const coching = document.getElementById("coching-name");
    const cochingHeight = coching.offsetHeight * 0.35;

    const canvas = await html2canvas(coching, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    position += cochingHeight;
    heightLeft -= cochingHeight;

    const questions = Array.from(input.querySelectorAll(".pdf-question"));

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionHeight = question.offsetHeight * 0.37; // Convert px to mm

      if (heightLeft - questionHeight < 0) {
        pdf.addPage();
        heightLeft = pageHeight;
        position = 0;
      }

      const canvas = await html2canvas(question, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      position += questionHeight;
      heightLeft -= questionHeight;
    }

    pdf.save("mcqs.pdf");
    setLoading("finish");
    if (!downloaded) {
      setPaperBackend(true);
    }
    downloaded === true;
  };

  return (
    <>
      <div>
        <div className="text-center font-semibold pb-5 text-red-500">
          Your Paper is ready.....▼
        </div>
        <div id="pdf-content">
          <div
            id="coching-name"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <div
                style={{
                  padding: "16px",
                  fontSize: "30px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Unnati Education Academy
              </div>
              <div>
                {/* <hr
              style={{
                marginTop: "20px",
                width: "100vw",
                border: "1px solid black",
              }}
            /> */}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              {addToCartQues.map((item, index) => {
                return (
                  <div key={index} className="pdf-question">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "12px",
                        width: "650px",
                        paddingInline: "20px",
                        backgroundColor: "white",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex" }}>
                          <div
                            className="text-medium"
                            style={{
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            ({index + 1})
                          </div>
                          <div style={{ marginLeft: "12px" }}>
                            <div
                              style={{
                                width: "550px",
                                color: "black",
                                fontWeight: "normal",
                                fontSize: "24px",
                              }}
                            >
                              {item.question.question}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            fontSize: "18px",
                            margin: "8px 0",
                            marginLeft: "28px",
                            fontWeight: "lighter",
                            width: "550px",
                          }}
                        >
                          <div>(A) {item.question.option1}</div>
                          <div>(B) {item.question.option2}</div>
                          <div>(C) {item.question.option3}</div>
                          <div>(D) {item.question.option4}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {loading === "false" && !downloaded ? (
              <button
                onClick={generatePdf}
                style={{
                  backgroundColor: "#f56565",
                  margin: "12px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  color: "white",
                }}
              >
                Save & Download PDF 📥
              </button>
            ) : (
              ""
            )}
            {loading === "finish" || downloaded ? (
              <button
                onClick={generatePdf}
                style={{
                  backgroundColor: "#f56565",
                  margin: "12px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  color: "white",
                }}
              >
                Download PDF Again 📥
              </button>
            ) : (
              ""
            )}
            {loading === "true" ? <RedLoading /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfQueList;

// const PdfQueList = ({ addToCartQues }) => {
//   const [loading, setLoading] = useState("false");

//   const generatePdf = async () => {
//     setLoading("true");
//     const input = document.getElementById("pdf-content");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageHeight = 295; // A4 height in mm
//     const pageWidth = 210; // A4 width in mm
//     let position = 0; // Top position for the new content
//     let heightLeft = pageHeight;

//     const coching = document.getElementById("coching-name");
//     const cochingHeight = coching.offsetHeight * 0.264583;

//     const canvas = await html2canvas(coching, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const imgHeight = (canvas.height * pageWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
//     position += cochingHeight;
//     heightLeft -= cochingHeight;

//     const questions = Array.from(input.querySelectorAll(".pdf-question"));

//     for (let i = 0; i < questions.length; i++) {
//       const question = questions[i];
//       const questionHeight = question.offsetHeight  * 0.35; // Convert px to mm

//       if (heightLeft - questionHeight < 0) {
//         pdf.addPage();
//         heightLeft = pageHeight;
//         position = 0;
//       }

//       const canvas = await html2canvas(question, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");
//       const imgHeight = (canvas.height * pageWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
//       position += questionHeight;
//       heightLeft -= questionHeight;
//     }

//     pdf.save("mcqs.pdf");
//     setLoading("finish");
//   };

//   return (
//     <div id="pdf-content" className="border border-black">
//       <div className="flex justify-center" id="coching-name">
//         <div>
//           <div className=" sm:py-4mm text-6mm sm:text-10mm text-center font-bold">
//             Unnati Education Academy
//           </div>
//           <div>
//             {" "}
//             <hr
//               className="mt-5 w-screen
//              border border-black"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center  ">
//         <div>
//           {addToCartQues.map((item, index) => {
//             return (
//               <div key={index} className="pdf-question ">
//                 <div className="flex justify-center items-center  py-3mm  w-[600px] sm:w-[1100px]   sm:px-5 bg-white  ">
//                   {" "}
//                   <div className="">
//                     <div className="flex ">
//                       <div className="font-semibold text-black   text-5mm sm:text-7mm">
//                         ({index + 1})
//                       </div>
//                       <div className="ml-3 sm:ml-5">
//                         <div className=" w-[500px] text-black sm:w-[1000px]  font-semibold text-5mm sm:text-7mm">
//                           {item.question.question}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-between text-black text-4mm sm:text-6mm my-1 ml-7 sm:my-2 sm:ml-10 sm:w-[900px]">
//                       <div>(A) {item.question.option1}</div>
//                       <div>(B) {item.question.option2}</div>
//                       <div>(C) {item.question.option3}</div>
//                       <div>(D) {item.question.option4}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="flex justify-center">
//         {loading === "false" ? (
//           <button
//             onClick={generatePdf}
//             className="bg-red-500 my-3 px-3  py-2 rounded-md font-semibold shadow-lg text-white"
//           >
//             Save & Download PDF 📥
//           </button>
//         ) : (
//           ""
//         )}
//         {loading === "finish" ? (
//           <button
//             onClick={generatePdf}
//             className="bg-red-500 my-3 px-3  py-2 rounded-md font-semibold shadow-lg text-white"
//           >
//             Download PDF Again 📥
//           </button>
//         ) : (
//           ""
//         )}
//         {loading === "true" ? <RedLoading /> : ""}
//       </div>
//     </div>
//   );
// };

// export default PdfQueList;
