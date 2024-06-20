import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { SignUpAtom } from "../store/userAtom";
import axios from "axios";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const setSignUp = useSetRecoilState(SignUpAtom);

  const logInBackend = async (userName, password) => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/users/login", {
        userName,
        password,
      });

      console.log("logIn successful", res);
    } catch (error) {
      console.log("error accur in logIn", error.message);
    }
  };

  const onSubmit = (data) => {
    logInBackend(data.userName, data.password);
    reset();
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  ">
          <label className="text-xl text-center w-1/2 font-semibold ">
            UserName
          </label>
          <input
            className="border w-1/2 border-black"
            type="text"
            {...register("userName", { required: true })}
          />
        </div>
        {errors.userName && (
          <div className="text-orange-500 sm:w-1/2 text-center">
            ***userName is Required
          </div>
        )}

        <div className="flex mt-5">
          <label className="text-xl text-center w-1/2 font-semibold ">
            Password
          </label>
          <input
            className="border w-1/2 border-black"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <div className="text-orange-500 sm:w-1/2 text-center">
            ***password is Required
          </div>
        )}

        <div className="flex justify-center mt-10 ">
          <div>
            <button className="bg-black rounded-md shadow-lg text-white text-xl font-semibold px-10 py-2">
              LogIn
            </button>
          </div>
        </div>
        <div
          onClick={() => setSignUp(true)}
          className="cursor-pointer text-center mt-5 underline"
        >
          new_user_please_click_here_for_register
        </div>
      </form>
    </>
  );
};

export default LogIn;
