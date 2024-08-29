"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { userContext } from "@/store/context";

import Welcome from "../welcome/page";

import {
  getDataByMail,
  getAllPosts,
  getAllCategories,
  createPost,
} from "@/services/service";
import SuccessTost from "@/components/SuccessTost";
import { ButtonVariants } from "@/components/Button";
import Link from "next/link";

const Explore = () => {
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupFor, setPopupFor] = useState("");
  const [user, setUser] = useState({});
  const [tostMessage, setTostMessage] = useState("");
  const [successTost, setSuccessTost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [catIdForPost, setCatIdForPost] = useState();
  const [categorySuggestionBox, setCategorySuggestionBox] = useState("hidden");

  const [descLength, setDescLength] = useState(0);
  const { userId, setUserId } = useContext(userContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const catTitleValue = watch("catTitle");
    setSearch(catTitleValue);
    if (catTitleValue.length < 1) {
      setCategorySuggestionBox("hidden");
    } else {
      setCategorySuggestionBox("absolute");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("catTitle")]);

  useEffect(() => {
    setDescLength(watch("postDescription").length);
  }, [watch("postDescription")]);

  const fetchData = async () => {
    if (sessionStorage.getItem("webData") == null) {
      try {
        const userData = await getDataByMail(session.user.email);
        if (userData) {
          setUser(userData);
          sessionStorage.setItem("webData", JSON.stringify(userData));
          setUserId(JSON.parse(sessionStorage.getItem("webData")).userId);
          if (user.userId == 0) {
            setSuccessTost(true);
            setTostMessage("GUEST MODE ACTIVATED !!");
            setTimeout(() => {
              setSuccessTost(false);
            }, 2000);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setUser(JSON.parse(sessionStorage.getItem("webData")));
    }
    //console.log(user);
    //console.log(sessionStorage.getItem("webData"));
  };

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      if (response) {
        setPosts(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response) {
        setCategoryData(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPosts();
    fetchCategories();
  }, []);

  // if (session) {

  const formSubmit = async (data) => {
    // //console.log(data);

    if (user.userId != 0) {
      if (catIdForPost != null) {
        const dataSet = {
          postTitle: data.postTitle,
          postDescription: data.postDescription,
          postCategory: document.getElementById("catInput").value,
          catId: catIdForPost,
          userId: user.userId,
        };
        // //console.log(dataSet);
        try {
          // //console.log("post button clicked");
          const response = await createPost(dataSet);
          if (response) {
            // //console.log(response);
            fetchPosts();
            setSuccessTost(true);
            setTostMessage("Post Created Successfully");
            document.getElementById("postTitle").value = "";
            document.getElementById("postDesc").value = "";
            document.getElementById("catInput").value = "";
            setTimeout(() => {
              setSuccessTost(false);
            }, 2000);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        //console.log("need to create a new Category");
      }
    } else {
      setSuccessTost(true);
      setTostMessage(
        "for Post a Blog You need to create a account or login into your existing account..."
      );
      setTimeout(() => {
        setSuccessTost(false);
      }, 3000);
    }
  };

  if (session) {
    return (
      <>
        {successTost && <SuccessTost message={tostMessage} />}
        {/* popup window */}
        {popupVisibility && (
          <div
            onClick={() => {
              setPopupVisibility(false);
            }}
            className="fixed h-full flex items-center justify-center w-[100%] bg-black bg-opacity-60"
          >
            {popupFor == "location" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className=" h-[100px] flex  items-center gap-5 p-3 bg-white rounded-lg text-black"
              >
                <span className="py-2 px-3 border-black bg-slate-300 border-2 cursor-pointer rounded-md hover:bg-black hover:text-white">
                  Use Current Location
                </span>
                <input
                  type="text"
                  placeholder="Enter your Location "
                  className="border-2 border-black py-3 px-2 pr-10"
                />
                <span className="bg-purple-700 py-2 px-3 border-2 text-white font-bold border-purple-700 cursor-pointer hover:bg-transparent hover:text-purple-700 ">
                  Enter
                </span>
                <svg
                  onClick={() => {
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
            {popupFor == "links" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className=" h-[100px] flex flex-col justify-center p-3 bg-white rounded-lg text-black"
              >
                <div className="flex  items-center gap-5 ">
                  <input
                    type="text"
                    placeholder="Enter Links. "
                    className="border-2 border-black py-3 px-2 pr-10"
                  />
                  <span className="bg-purple-700 py-2 px-3 border-2 text-white font-bold border-purple-700 cursor-pointer hover:bg-transparent hover:text-purple-700 ">
                    Enter
                  </span>
                  <svg
                    onClick={() => {
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
                <p>for multiple links use | Symbol</p>
              </div>
            )}
          </div>
        )}
        {/* main window */}
        <div className="flex flex-col gap-4 min-h-screen py-5  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px]">
          {/* create blog post section */}
          <section className="py-5 bg-white dark:bg-gray-900 w-[90%] m-auto rounded-lg">
            <div className="editor  text-gray-800 border border-gray-300 p-4 shadow-lg ">
              <form
                className="mx-auto w-10/12 flex justify-evenly items-center"
                onSubmit={handleSubmit(formSubmit)}
              >
                {/* profile logo */}
                <div>
                  <Image
                    src={
                      user && user.userProfilePic
                    ? user.userProfilePic : user.userGender == "Male" ? "https://th.bing.com/th/id/OIP.hxh6omrkOuj2l9rGHNe7qQHaHa?rs=1&pid=ImgDetMain" : user.userGender == "Female" ? "https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg"
                    : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                    }
                    width={70}
                    height={70}
                    alt="profile Picture"
                    className="rounded-full "
                  />
                </div>
                {/* input section */}

                <div className="flex flex-col w-[70%]">
                  <input
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                    id="postTitle"
                    spellCheck="false"
                    placeholder="Title"
                    type="text"
                    {...register("postTitle", { required: true })}
                  />
                  <textarea
                    className={`${
                      descLength > 4990 ? "border-red-500" : "border-gray-300"
                    } description bg-gray-100 sec p-3 h-30 border outline-none`}
                    id="postDesc"
                    spellCheck="false"
                    placeholder="Describe everything about this post here"
                    {...register("postDescription", {
                      required: true,
                      maxLength: 5000,
                    })}
                  ></textarea>

                  <div className="icons flex text-gray-500 m-2 ">
                    <div>
                      <input
                        id="catInput"
                        className="bg-gray-100 border border-gray-300 outline-none px-4 rounded-md mr-2"
                        type="text"
                        placeholder="add Category. ( ex : 'New')"
                        // onChange={handleCategoryInputChange}
                        {...register("catTitle", { required: true })}
                      />
                      <div
                        className={`${categorySuggestionBox} bg-gray-100 border py-1 mt-1 border-gray-300 outline-none px-4 rounded-md mr-2 `}
                      >
                        {categoryData
                          .filter((item) => {
                            return search.toLowerCase() === ""
                              ? item
                              : item.catTitle
                                  .toLowerCase()
                                  .includes(search.toLowerCase());
                          })
                          .map((item) => {
                            return (
                              <h3
                                className="cursor-pointer hover:font-bold"
                                key={item.catId}
                                onClick={() => {
                                  document.getElementById("catInput").value =
                                    item.catTitle;
                                  setCatIdForPost(item.catId);
                                  setCategorySuggestionBox("hidden");
                                }}
                              >
                                {item.catTitle}
                              </h3>
                            );
                          })}
                      </div>
                    </div>
                    <span
                      onClick={() => {
                        setPopupFor("location");
                        setPopupVisibility(true);
                      }}
                    >
                      <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <span>
                      <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span
                      onClick={() => {
                        setPopupFor("links");
                        setPopupVisibility(true);
                      }}
                    >
                      <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </span>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">
                      {descLength}/5000
                    </div>
                  </div>
                </div>

                {/* submit button section */}
                <div className="buttons flex flex-row-reverse gap-3">
                  <div
                    className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                    onClick={() => {
                      document.getElementById("postTitle").value = "";
                      document.getElementById("postDesc").value = "";
                      document.getElementById("catInput").value = "";
                    }}
                  >
                    Clear
                  </div>
                  <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-indigo-500">
                    Post
                  </button>
                </div>
              </form>
            </div>

            {/* <div className="heading text-center font-bold text-2xl m-5 text-slate-400">
            Create a New Post
          </div> */}
          </section>

          {/* Create Account Section */}
          {user.userId == 0 ? (
            <section className="py-4 bg-gray-400 dark:bg-gray-900 w-[90%] m-auto rounded-lg">
              <div className="flex gap-4 justify-center items-center">
                <h3>
                  <span className="font-bold">Hey {session.user.name},</span>{" "}
                  You are Currently in{" "}
                  <span className="font-bold">Guest mode.</span> So would you
                  like to Create Account{" "}
                </h3>
                <Link
                  className="font-mono border-2 border-cyan-900 bg-cyan-900 px-10 py-2 text-white rounded-xl hover:bg-cyan-400 hover:border-cyan-100 font-bold"
                  href="/createUser"
                >
                  Create Account
                </Link>
              </div>
            </section>
          ) : (
            ""
          )}

          {/* explore section */}
          <section className="bg-white dark:bg-gray-900 w-[90%] m-auto rounded-lg">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Explore
                </h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                  We use an agile approach to test assumptions and connect with
                  the needs of your audience early and often.
                </p>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {posts.map((item, index) => (
                  <article
                    key={index}
                    className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                        </svg>
                        {item.category.catTitle
                          ? item.category.catTitle
                          : "Tutorial"}
                      </span>
                      <span className="text-sm">
                        {item.date
                          ? item.date.substring(0, 10) +
                            " | " +
                            item.date.substring(11, 16)
                          : "14 May"}
                      </span>
                    </div>
                    <h2 className="mb-2 text-2xl cursor-default font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.postTitle
                        ? item.postTitle
                        : "How to quickly deploy a static website"}
                    </h2>
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                      {item.postDescription
                        ? item.postDescription.length <= 220
                          ? item.postDescription
                          : item.postDescription.substring(0, 220) + " ...."
                        : "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Image
                          className="w-7 h-7 rounded-full"
                          src={
                            item.user.userProfilePic
                              ? item.user.userProfilePic
                              : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                          }
                          alt="Jese Leos avatar"
                          width={100}
                          height={100}
                        />
                        <span
                          className="font-medium dark:text-white cursor-pointer"
                          onClick={() => {
                            window.location.href = `/profile/${item.user.userId}`;
                          }}
                        >
                          {item.user.userName != null &&
                          item.user.userLastName != null
                            ? item.user.userName + " " + item.user.userLastName
                            : item.user.userName != null &&
                              item.user.userLastName == null
                            ? item.user.userName
                            : "Jese Leos"}
                        </span>
                      </div>
                      <Link
                        href={`/blogPostPage/${item.postId}`}
                        className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                      >
                        <span className="flex items-center">
                          Read more
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}

                {/* <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Tutorial
                  </span>
                  <span className="text-sm">14 days ago</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">How to quickly deploy a static website</a>
                </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and
                  are becoming the basis for a variety of tools that even
                  influence both web designers and developers influence both web
                  designers and developers.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="w-7 h-7 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                      width={100}
                      height={100}
                    />
                    <span className="font-medium dark:text-white">
                      Jese Leos
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </article>
              <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                    </svg>
                    Article
                  </span>
                  <span className="text-sm">14 days ago</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Our first project with React</a>
                </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and
                  are becoming the basis for a variety of tools that even
                  influence both web designers and developers influence both web
                  designers and developers.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="w-7 h-7 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                      alt="Bonnie Green avatar"
                      width={100}
                      height={100}
                    />
                    <span className="font-medium dark:text-white">
                      Bonnie Green
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </article>
              <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Tutorial
                  </span>
                  <span className="text-sm">14 days ago</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">How to quickly deploy a static website</a>
                </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and
                  are becoming the basis for a variety of tools that even
                  influence both web designers and developers influence both web
                  designers and developers.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="w-7 h-7 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                      width={100}
                      height={100}
                    />
                    <span className="font-medium dark:text-white">
                      Jese Leos
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </article>
              <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                    </svg>
                    Article
                  </span>
                  <span className="text-sm">14 days ago</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Our first project with React</a>
                </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and
                  are becoming the basis for a variety of tools that even
                  influence both web designers and developers influence both web
                  designers and developers.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="w-7 h-7 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                      alt="Bonnie Green avatar"
                      width={100}
                      height={100}
                    />
                    <span className="font-medium dark:text-white">
                      Bonnie Green
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </article> */}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } else {
    sessionStorage.clear("webData");
    alert("Session is Over, You need to LogIn again...");
    router.push("/");
    return (
      <>
      {/* <Welcome /> */}
      </>
    );
  }
};
export default Explore;
