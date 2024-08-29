"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { updateUser } from "@/services/service";
import { imageDB } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const UpdateData = () => {
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupFor, setPopupFor] = useState("");
  const [socialPanel, setSocialPanel] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();

  const [dataOfUserProfilePic, setDataOfUserProfilePic] = useState();
  const [dataOfUserCoverPic, setDataOfUserCoverPic] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("webData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const SubmitInDB = async (passValue, data) => {
    console.log(data);

    try {
      const updatedData = await updateUser(user.userId, passValue, data);
      if (updatedData) {
        sessionStorage.setItem("webData", JSON.stringify(updatedData));
        console.log("updated");
        router.push(`/profile/${user.userId}`);
      } else {
        alert("Something were Wrong!!!");
        router.push(`/profile/${user.userId}`);
      }
    } catch (error) {
      console.log(error);
      alert("Given Password is Wrong or Data");
    }
  };

  const formSubmit =async (data) => {
    let passValue = document.getElementById("grid-password").value;
    let cPassValue = document.getElementById("grid-cPassword").value;
    if (passValue == cPassValue) {
      if (user.userId == null) {
        alert("Sorry. User not found");
        router.push(`/profile/${user.userId}`);
        return;
      }
      try {
        const updatedData = await updateUser(user.userId, passValue, data);
        if (updatedData) {
          sessionStorage.setItem("webData", JSON.stringify(updatedData));
          console.log("updated");
          router.push(`/profile/${user.userId}`);
        } else {
          alert("Something were Wrong!!!");
          router.push(`/profile/${user.userId}`);
        }
      } catch (error) {
        console.log(error);
        alert("Given Password is Wrong or Data");
      }
    }
  };

  return (
    <div className="min-h-screen py-[5vh]  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px] ">
      <div className="bg-slate-700 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-[80%] m-auto">
        <div className="relative border-b-2 border-black pb-2 mb-5">
          <Link
            href={`/profile/${user.userId}`}
            className="absolute bottom-0 hover:font-bold hover:underline cursor-pointer hover:text-blue-700"
          >
            Go Back
          </Link>
          <h1 className="text-center text-4xl font-bold ">Update Form</h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                {...register("userName")}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                {...register("userLastName")}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker  font-bold mb-2"
                htmlFor="grid-dob-name"
              >
                Date Of Birth
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="grid-dob-name"
                type="Date"
                {...register("userDOB")}
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-password"
              >
                Password*
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-password"
                type="password"
                placeholder="******************"
                required
                {...register("password")}
                onChange={() => {
                  let passValue =
                    document.getElementById("grid-password").value;
                  let cPassValue =
                    document.getElementById("grid-cPassword").value;
                  if (passValue != cPassValue) {
                    document.getElementById(
                      "grid-password"
                    ).style.backgroundColor = "red";
                  } else {
                    document.getElementById(
                      "grid-password"
                    ).style.backgroundColor = "transparent";
                    if (
                      document.getElementById("grid-cPassword").style
                        .backgroundColor == "red"
                    ) {
                      document.getElementById(
                        "grid-cPassword"
                      ).style.backgroundColor = "transparent";
                    }
                  }
                }}
              />
              <p className="text-grey-dark text-xs italic">
                Make it as long and as crazy as you like,
              </p>
            </div>
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-cPassword"
              >
                Confirm Password*
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-cPassword"
                type="text"
                placeholder="Same as Password"
                required
                onChange={() => {
                  let passValue =
                    document.getElementById("grid-password").value;
                  let cPassValue =
                    document.getElementById("grid-cPassword").value;
                  if (passValue != cPassValue) {
                    document.getElementById(
                      "grid-cPassword"
                    ).style.backgroundColor = "red";
                  } else {
                    document.getElementById(
                      "grid-cPassword"
                    ).style.backgroundColor = "transparent";

                    if (
                      document.getElementById("grid-password").style
                        .backgroundColor == "red"
                    ) {
                      document.getElementById(
                        "grid-password"
                      ).style.backgroundColor = "transparent";
                      console.log("yes");
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-deepBio"
              >
                Bio
              </label>
              <textarea
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-deepBio"
                type="text"
                {...register("userBio", { maxLength: 500 })}
                placeholder="Express yourself ......"
              />

              <p className="text-grey-dark text-xs italic">
                Make it as long, but under 500 words
              </p>
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-city"
              >
                Nationality
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-city"
                type="text"
                placeholder="India"
                {...register("userNationality")}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-gender"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-transparent border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  id="grid-gender"
                  {...register("userGender")}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="TransGender">TransGender</option>
                </select>
                <div className="absolute right-3 top-[30%] pointer-events-none flex items-center px-2 text-grey-darker">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-zip"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-zip"
                type="mail"
                placeholder="xyz@gmail.com"
                {...register("emailId",  )}
              />
            </div> */}
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-location"
              >
                location
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-location"
                type="text"
                placeholder="Ethiopia, Addis Ababa"
                {...register("userLocation")}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-state"
              >
                contact
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-contact"
                type="text"
                placeholder="+251913****30"
                {...register("userContact")}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-zip"
              >
                Website
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-website"
                type="text"
                placeholder="https://www.myBlog.com"
                {...register("userWebsite")}
              />
            </div>
          </div>

          {/* <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-pp"
              >
                Profile Picture
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-pp"
                type="file"
                accept="image/*"
                {...register("userProfilePic")}
                onChange={(e) => {
                  setDataOfUserProfilePic(e.target.files[0]);
                }}
              />
            </div>
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker font-bold mb-2"
                htmlFor="grid-cp"
              >
                Cover Picture
              </label>
              <input
                className="appearance-none block w-full bg-transparent text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-cp"
                type="file"
                accept="image/*"
                {...register("userCoverPic")}
                onChange={(e) => {
                  setDataOfUserCoverPic(e.target.files[0]);
                }}
              />
            </div>
          </div> */}

          <div className="mb-6 flex gap-1 items-center">
            <div className=" px-3">
              <span
                className="text-sm font-mono font-bold cursor-default"
                onClick={() => {
                  socialPanel ? setSocialPanel(false) : setSocialPanel(true);
                }}
              >
                Link social Handle: -
              </span>
            </div>
            <div className="md:flex rounded-md px-4 bg-white gap-1">
              {/* linkedIn */}

              <div
                className="p-2 cursor-pointer hover:scale-125"
                onClick={() => {
                  setPopupFor("linkedIn");
                  setPopupVisibility(true);
                }}
              >
                <svg
                  className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </div>
              {/* github */}
              <div
                className="p-2 cursor-pointer hover:scale-125"
                onClick={() => {
                  setPopupFor("gitHub");
                  setPopupVisibility(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                >
                  <path
                    d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {/* facebook */}
              <div
                className="p-2 cursor-pointer hover:scale-125"
                onClick={() => {
                  setPopupFor("facebook");
                  setPopupVisibility(true);
                }}
              >
                <svg
                  className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-blue-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* YouTube */}
              <div
                className="p-2 cursor-pointer hover:scale-125"
                onClick={() => {
                  setPopupFor("youTube");
                  setPopupVisibility(true);
                }}
              >
                <svg
                  className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-red-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* popup window */}
          {popupVisibility && (
            <div
              onClick={() => {
                setPopupVisibility(false);
              }}
              className="fixed h-full  left-0 bottom-0 flex items-center justify-center w-[100%] bg-black bg-opacity-60"
            >
              {popupFor == "linkedIn" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" h-[100px] flex  items-center gap-5 p-3 bg-white rounded-lg text-black"
                >
                  <span className="py-2 px-3 cursor-default">
                    LinkedIn Profile Url :-
                  </span>
                  <input
                    type="text"
                    id="linkedInURL"
                    placeholder="Paste Here... "
                    className="border-2 border-black py-3 px-2 pr-10"
                    {...register("linkedInURL")}
                  />
                  <span
                    className="bg-purple-700 py-2 px-3 border-2 text-white font-bold border-purple-700 cursor-pointer hover:bg-transparent hover:text-purple-700 "
                    onClick={() => {
                      setPopupVisibility(false);
                    }}
                  >
                    Enter
                  </span>
                  <svg
                    onClick={() => {
                      document.getElementById("linkedInURL").value = "";
                      setPopupVisibility(false);
                    }}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M15.7494 15L9.75 9M9.75064 15L15.75 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              )}
              {popupFor == "gitHub" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" h-[100px] flex  items-center gap-5 p-3 bg-white rounded-lg text-black"
                >
                  <span className="py-2 px-3 cursor-default">
                    gitHub Profile Url :-
                  </span>
                  <input
                    type="text"
                    id="gitHubURL"
                    placeholder="Paste Here... "
                    className="border-2 border-black py-3 px-2 pr-10"
                    {...register("gitHubURL")}
                  />
                  <span
                    className="bg-purple-700 py-2 px-3 border-2 text-white font-bold border-purple-700 cursor-pointer hover:bg-transparent hover:text-purple-700 "
                    onClick={() => {
                      setPopupVisibility(false);
                    }}
                  >
                    Enter
                  </span>
                  <svg
                    onClick={() => {
                      document.getElementById("gitHubURL").value = "";
                      setPopupVisibility(false);
                    }}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M15.7494 15L9.75 9M9.75064 15L15.75 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              )}
              {popupFor == "facebook" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" h-[100px] flex  items-center gap-5 p-3 bg-white rounded-lg text-black"
                >
                  <span className="py-2 px-3 cursor-default">
                    Facebook Profile Url :-
                  </span>
                  <input
                    type="text"
                    id="facebookURL"
                    placeholder="Paste Here... "
                    className="border-2 border-black py-3 px-2 pr-10"
                    {...register("facebookURL")}
                  />
                  <span
                    className="bg-purple-700 py-2 px-3 border-2 text-white font-bold border-purple-700 cursor-pointer hover:bg-transparent hover:text-purple-700 "
                    onClick={() => {
                      setPopupVisibility(false);
                    }}
                  >
                    Enter
                  </span>
                  <svg
                    onClick={() => {
                      document.getElementById("facebookURL").value = "";
                      setPopupVisibility(false);
                    }}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M15.7494 15L9.75 9M9.75064 15L15.75 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              )}
              {popupFor == "youTube" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=" h-[100px] flex  items-center gap-5 p-3 bg-white rounded-lg text-black"
                >
                  <span className="py-2 px-3 cursor-default">
                    YouTube Profile Url :-
                  </span>
                  <input
                    type="text"
                    id="youtubeURL"
                    placeholder="Paste Here... "
                    className="border-2 border-black py-3 px-2 pr-10"
                    {...register("youtubeURL")}
                  />
                  <span
                    className="bg-purple-700 py-2 px-3 border-2 text-white font-bold border-purple-700 cursor-pointer hover:bg-transparent hover:text-purple-700 "
                    onClick={() => {
                      setPopupVisibility(false);
                    }}
                  >
                    Enter
                  </span>
                  <svg
                    onClick={() => {
                      document.getElementById("youtubeURL").value = "";
                      setPopupVisibility(false);
                    }}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M15.7494 15L9.75 9M9.75064 15L15.75 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}

          <div className="-mx-3 md:flex mb-2">
            <button className="border-2 border-white hover:bg-black font-semibold hover:text-white py-3 px-10 rounded-lg w-3/4 m-auto bg-transparent text-white">
              Submit Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
