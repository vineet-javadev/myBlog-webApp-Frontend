"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CloseEyeSvg from "@/components/CloseEye";
import OpenEyeSvg from "@/components/OpenEye";

import { signIn } from "next-auth/react";
import { login } from "@/services/service";
import SuccessTost from "@/components/SuccessTost";
import ErrorTost from "@/components/ErrorTost";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // const onLoginSubmit = async (data) => {
  // console.log(data)
  //   try {
  //     const user = await login(data);
  //     setSuccessTost(true);
  //     setTimeout(() => {
  //       setSuccessTost(false);
  //     }, 2000);
  //   } catch (error) {
  //     setErrorTost(true);
  //     setTimeout(() => {
  //       setErrorTost(false);
  //     }, 2000);
  //   }

  // };

  const onLoginSubmit = async (data) => {};

  const [errorTost, setErrorTost] = useState(false);
  const [successTost, setSuccessTost] = useState(false);

  const [passVisibility, setPassVisibility] = useState(false);

  return (
    <div className="none lg:block select-none absolute top-0 pb-10 min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px] text-white">
      {successTost && <SuccessTost message="Logged in Successfully..." />}
      {errorTost && <ErrorTost message="You are not a Valid User..." />}

      <div className="hidden logo container m-auto gap-10 py-5 lg:flex flex-col items-center justify-center min-h-[20vh] select-none">
        <div>
          <span className="text-white text-7xl font-extrabold">My-</span>
          <span className="text-sky-200 text-6xl">Blogs :&#41;</span>
        </div>
        <p className="text-slate-400 select-none">
          Lorem, ipsum dolor sit abet consectetur edit. Corpora ease site
          voluptatibus laudanum berate facer preferences.
        </p>
      </div>
      <div className="hidden container m-auto min-h-[70vh] lg:flex flex-wrap items-center justify-evenly">
        <div className=" min-h-[500px] flex items-center w-[40%] rounded-lg bg-slate-600 ">
          <div
            className="w-full p-12 text-black
            sm:px-10 sm:py-6 
           bg-transparent "
          >
            <h2 className="text-center text-white font-bold text-3xl lg:text-4xl ">
              Login
            </h2>

            <form
              className="mt-10 text-white"
              onSubmit={handleSubmit(onLoginSubmit)}
            >
              <label htmlFor="email" className="block font-semibold uppercase ">
                E-mail :
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-mail address"
                autoComplete="email"
                className="block w-full py-3 px-2 mt-2 rounded-lg
                    text-black appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
                {...register("email")}
              />

              <label
                htmlFor="password"
                className="block mt-2 font-mono font-semibold  uppercase"
              >
                Password :
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="block w-full py-3 px-2 mt-2 mb-4 rounded-lg
                    text-black appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                  {...register("password")}
                />
                <span
                  className="absolute right-3 top-1/4 cursor-pointer"
                  onClick={() => {
                    passVisibility
                      ? setPassVisibility(false)
                      : setPassVisibility(true);
                  }}
                >
                  {passVisibility ? <OpenEyeSvg /> : <CloseEyeSvg />}
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                Login
              </button>

              <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                <a href="#" className="flex-2 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className=" min-h-[500px] w-[40%] flex item-center">
          <div className="w-full flex flex-col justify-center rounded-lg bg-transparent ">
            <form className="p-4 md:p-5 lg:p-6">
              <div className="grid gap-y-3">
                <button
                  className="hidden lg:flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
                  onClick={() => {
                    signIn({ callbackUrl: "/explore" });
                  }}
                >
                  <svg
                    // style="color: rgb(203, 213, 225)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                      fill="#cbd5e1"
                    ></path>
                  </svg>
                  Sign in with Github
                </button>
                <button
                  className="hidden lg:flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
                  onClick={() => {
                    signIn({ callbackUrl: "/explore" });
                  }}
                >
                  <svg
                    // style="color: rgb(203, 213, 225)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                      fill="#cbd5e1"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>

              <div className="my-3 flex items-center px-3">
                <hr className="w-full border-slate-600" />
                <span className="mx-3 text-slate-500">or</span>
                <hr className="w-full border-slate-600" />
              </div>

              <div className="grid gap-y-3">
                {/* <input
                  className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                  placeholder="email@example.com"
                /> */}
                <button
                  className="hidden lg:flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
                  onClick={() => {
                    signIn({ callbackUrl: "/explore" });
                  }}
                >
                  <svg
                    // style="color: rgb(203, 213, 225)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                      fill="#cbd5e1"
                    ></path>
                  </svg>
                  LogIn as a Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
