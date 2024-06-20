import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { SignUpAtom } from "../store/userAtom";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const setSignUp = useSetRecoilState(SignUpAtom);

  const signUpBackend = async (userName, password, role) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/signup",
        {
          userName,
          password,
          role,
        }
      );
      console.log("signUp successful", res);
    } catch (error) {
      console.log("error accur in signUp", error.message);
    }
  };

  const onSubmit = (data) => {

    signUpBackend(data.userName, data.password, data.role);
    reset();
  };
  return (
    <>
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
        <div className="flex  mt-5">
          <label className="text-xl text-center w-1/2 font-semibold">
            Confirm Password
          </label>
          <input
            className="border w-1/2 border-black"
            type="password"
            {...register("confirmPassword", {
              required: "***confirmPassword is Required",
              validate: (value) =>
                value === password || "password do not match",
            })}
          />
        </div>
        {errors.confirmPassword && (
          <div className="text-orange-500 sm:w-1/2 text-center">
            {errors.confirmPassword.message}
          </div>
        )}

        <div className="flex  mt-5">
          {/* <label className="text-xl ">userName</label> */}
          <label className="text-xl text-center w-1/2 font-semibold">
            Role:
          </label>
          <div className="flex">
            <div className="">
              <label className="">
                <input
                  type="radio"
                  value="teacher"
                  {...register("role", {
                    required: "role is required",
                  })}
                />
                Teacher{" "}
              </label>
            </div>
            <div className="sm:ml-10">
              <label className="">
                <input
                  type="radio"
                  value="paperSeter"
                  {...register("role", {
                    required: "role is required",
                  })}
                />
                PaperSeter
              </label>
            </div>
          </div>
        </div>
        {errors.role && (
          <div className="text-orange-500 sm:w-1/2 text-center">
            ***please select at least one
          </div>
        )}
        <div className="flex justify-center mt-10 ">
          <div>
            <button className="bg-black rounded-md shadow-lg text-white text-xl font-semibold px-10 py-2">
              SignUp
            </button>
          </div>
        </div>
        <div
          onClick={() => setSignUp(false)}
          className="cursor-pointer text-center mt-5 underline"
        >
          already_register_please_click_here_for_login
        </div>
      </form>
    </>
  );
};

export default SignUp;
