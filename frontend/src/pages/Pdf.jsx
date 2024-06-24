import React,{useEffect,useState} from 'react'
import axios from 'axios';
import PdfQueList from '../Teacher/PdfQueList';



const Pdf = () => {
    const [addToCartQues, setAddToCartQues] = useState([]);
    // useEffect(() => {
    //     const addToCartItems = async () => {
    //       try {
    //         const res = await axios.post(
    //           "http://localhost:3001/api/v1/users/addToCartItems",
    //           {},
    //           { withCredentials: true }
    //         );
    //         setAddToCartQues(res.data.data);
    //         console.log("fetch addToCartQues successfully", res);
    //       } catch (error) {
    //         console.log("fetch addToCartQues Unsuccessful", error.message);
    //       }
    //     };
    
    //     addToCartItems();
    //   }, []);
  return (
    // <div id="pdf-content">
    //     <div className="flex justify-center" id="coching-name">
    //       <div>
    //         <div className="mt-5 text-2xl font-semibold">
    //           Unnati Education Academy
    //         </div>
    //         <hr className="my-5" />
    //       </div>
    //     </div>
    //     <div className="flex justify-center">
    //       <div>
    //         {addToCartQues.map((item, index) => {
    //           return (
    //             <div key={index} className="pdf-question">
    //               <PdfQueList item={item} index={index} />
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    <div>NirbhayKachhadiya</div>
  )
}

export default Pdf