import React, { useState } from 'react'
import AddQuestion from "../paperSeter/AddQuestion";
import QueListPaperSeter from "../paperSeter/QueListPaperSeter";

const PaperSeter = () => {
    const [addQuestion, setAddQuestion] = useState(true);
  return (
    <div className="bg-gray-100 ">
    <div className="h-[70px] bg-gray-100 flex items-center justify-center">
      <button
        onClick={() => setAddQuestion(true)}
        className="bg-white  text-xl font-semibold  w-[250px] py-2 shadow-lg"
      >
        Add Question
      </button>
      <button
        onClick={() => setAddQuestion(false)}
        className="ml-10 bg-white text-xl font-semibold  w-[250px] py-2 shadow-lg"
      >
        Your Listing
      </button>
    </div>
    <div className="">
      {addQuestion ? (
        <AddQuestion setAddQuestion={setAddQuestion} />
      ) : (
        <QueListPaperSeter setAddQuestion={setAddQuestion} />
      )}
    </div>
  </div>
  )
}

export default PaperSeter