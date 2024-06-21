import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../assets/Loading";
import axios from "axios";

const SubQueListPaperSeter = ({ index, item, setReCheck ,num}) => {
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      chepter: item.chepter,
      question: item.question,
      option1: item.option1,
      option2: item.option2,
      option3: item.option3,
      option4: item.option4,
      answer: item.answer,
    },
  });

  const update = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/updatequestion",
        { data: data, queId: item.id },
        { withCredentials: true }
      );
      setReCheck((prev) => !prev);
      setEdit(false);
      setLoading(false);
      console.log("update Question Successfully", res);
    } catch (error) {
      console.log("update Question UnSuccessfully ", error.message);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    //console.log(data);
    update(data);
  };

  return (
    <div className="flex sm:justify-center sm:w-[1300px] border my-5 py-2 px-5 bg-white shadow-lg mx-5">
      {!edit ? (
        <>
          {" "}
          <div className="font-semibold text-xl">
            ({index + 1 + 5 * (num - 1)})
          </div>
          <div className="ml-5">
            <div className="flex w-[500px]  sm:w-[700px] justify-between font-semibold text-xl">
              <div>{item.question}</div>
              <div className="bg-blue-500 px-3 py-1 rounded-md text-white">
                {item.chepter}
              </div>
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
              <div className="flex w-3/12 justify-end ml-5">
                <div>
                  <button className="bg-red-500  rounded-md text-white font-semibold px-3 py-1">
                    Delete
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setEdit(true)}
                    className="bg-red-500 ml-2 font-semibold rounded-md text-white px-3 py-1"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  ">
              <label className=" w-1/2 text-right font-semibold ">
                Please select a Chepter :-
              </label>
              <select
                className="  w-1/4  text-xl font-semibold border ml-10 border-black"
                id="chepter"
                {...register("chepter", {
                  onChange: (e) => setValue("chepter", e.target.value),
                })}
              >
                <option value="chepter1">Chepter 1 </option>
                <option value="chepter2">Chepter 2</option>
                <option value="chepter3">Chepter 3</option>
                <option value="chepter4">Chepter 4 </option>
                <option value="chepter5">Chepter 5</option>
                <option value="chepter6">Chepter 6</option>
              </select>
            </div>
            <hr className="mt-3 border border-black" />
            <div className="flex mt-10 ">
              <label className="text-xl text-center w-1/4 font-semibold ">
                Question
              </label>
              <input
                className="border w-[500px] ml-4 border-black"
                type="text"
                {...register("question", {
                  required: true,
                  onChange: (e) => setValue("question", e.target.value),
                })}
              />
            </div>
            {errors.question && (
              <div className="text-orange-500 sm:w-1/2 text-center">
                ***question is Required
              </div>
            )}

            <div className="flex mt-5 ">
              <label className="text-xl text-center w-1/4 font-semibold ">
                Option1
              </label>
              <input
                className="border  border-black"
                type="text"
                {...register("option1", { required: true })}
              />
            </div>
            {errors.option1 && (
              <div className="text-orange-500 sm:w-1/2 text-center">
                ***option1 is Required
              </div>
            )}

            <div className="flex mt-1 ">
              <label className="text-xl text-center w-1/4 font-semibold ">
                Option2
              </label>
              <input
                className="border  border-black"
                type="text"
                {...register("option2", {
                  required: true,
                  onChange: (e) => setValue("option2", e.target.value),
                })}
              />
            </div>
            {errors.option2 && (
              <div className="text-orange-500 sm:w-1/2 text-center">
                ***option2 is Required
              </div>
            )}

            <div className="flex mt-1  ">
              <label className="text-xl text-center w-1/4 font-semibold ">
                Option3
              </label>
              <input
                className="border  border-black"
                type="text"
                {...register("option3", {
                  required: true,
                  onChange: (e) => setValue("option3", e.target.value),
                })}
              />
            </div>
            {errors.option3 && (
              <div className="text-orange-500 sm:w-1/2 text-center">
                ***option3 is Required
              </div>
            )}

            <div className="flex mt-1  ">
              <label className="text-xl text-center w-1/4 font-semibold ">
                Option4
              </label>
              <input
                className="border border-black"
                type="text"
                {...register("option4", {
                  required: true,
                  onChange: (e) => setValue("option4", e.target.value),
                })}
              />
            </div>
            {errors.option4 && (
              <div className="text-orange-500 sm:w-1/2 text-center">
                ***option4 is Required
              </div>
            )}

            <div className="flex mt-5  ">
              <label className="text-xl text-center w-1/4 font-semibold ">
                Answer
              </label>
              <select
                className="    text-xl font-semibold border  border-black"
                id="answer"
                {...register("answer", {
                  onChange: (e) => setValue("answer", e.target.value),
                })}
              >
                <option value="option1">Option 1 </option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4 </option>
              </select>
            </div>
            <div className="flex justify-center mt-10 ">
              <div>
                {loading ? (
                  <Loading />
                ) : (
                  <button className="bg-black rounded-md shadow-lg text-white text-xl font-semibold px-10 py-2">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
          {success ? (
            <div className="flex mt-5">
              <div>your question is Updated successfully ✅</div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default SubQueListPaperSeter;
