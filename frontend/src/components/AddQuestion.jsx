import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { LoadingAtom } from "../store/userAtom";
import axios from "axios";
import Loading from "../assets/Loading";

const AddQuestion = ({ setAddQuestion }) => {
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const listQueToBackend = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/questionListing",
        { data },
        { withCredentials: true }
      );
      setLoading(false);
      reset();
      setSuccess(true);
      console.log("Question list to backend successfully", res);
    } catch (error) {
      console.log("Question list to backend Unsuccessfully", error.message);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    listQueToBackend(data);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[400px] sm:h-[550px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  ">
            <label className=" w-1/2 text-right font-semibold ">
              Please select a Chepter :-
            </label>
            <select
              className="  w-1/4  text-xl font-semibold border ml-10 border-black"
              id="chepter"
              {...register("chepter")}
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
              {...register("question", { required: true })}
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
              {...register("option2", { required: true })}
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
              {...register("option3", { required: true })}
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
              {...register("option4", { required: true })}
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
              {...register("answer")}
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
      </div>
      {success ? (
        <div className="flex justify-center mt-5">
          <div>your question is listed successfully ✅</div>
          <div
            onClick={() => setAddQuestion(false)}
            className="ml-5 cursor-pointer font-semibold  underline"
          >
            click here for view your all listed question
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddQuestion;
