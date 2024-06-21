import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  InsideLoginAtom,
  LoadingAtom,
  RoleAtom,
  SignUpAtom,
  UserNameAtom,
} from "../store/userAtom";
import axios from "axios";
import Loading from "../assets/Loading";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const setUserName = useSetRecoilState(UserNameAtom);
  const setInsideLogin = useSetRecoilState(InsideLoginAtom);
  const setRole = useSetRecoilState(RoleAtom);
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const setSignUp = useSetRecoilState(SignUpAtom);

  const logInBackend = async (userName, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        {
          userName,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      reset();
      setInsideLogin(true);
      navigate("/inside");

      setUserName(res.data.data.userName);
      setRole(res.data.data.role);
      console.log("logIn successful", res);
    } catch (error) {
      console.log("error accur in logIn", error.message);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    logInBackend(data.userName, data.password);
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
            {loading ? (
              <Loading />
            ) : (
              <button className="bg-black rounded-md shadow-lg text-white text-xl font-semibold px-10 py-2">
                LogIn
              </button>
            )}
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
