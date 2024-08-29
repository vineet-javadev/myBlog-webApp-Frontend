"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import BlogPosts from "@/components/BlogPosts";

import ConnectionsList from "@/components/ConnectionsList";
import ProfileAbout from "@/components/ProfileAbout";
import TopBlogs from "@/components/TopBlogs";
import { getDataById } from "@/services/service";

import Welcome from "@/app/welcome/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = ({ params }) => {
  const router = useRouter();
  const [menu, setMenu] = useState("blogPosts");
  const [activeBtn, setActiveBtn] = useState("border-white");
  // const userState = useContext(userContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (params.slug) {
      try {
        getDataById(params.slug)
          .then((response) => {
            setUser(response);
          })
          .catch(() => {
            alert("User not Found!!!");
          });
      } catch (error) {}
    }
  }, []);


  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* background texture */}
        <div className="min-h-screen py-[10vh]  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px] text-white">
          <div className="container pb-[10vh] flex m-auto">
            <div className="w-1/4 text-center flex flex-col items-center gap-5 text-slate-300">
              <Image
                src={
                  user.userProfilePic
                    ? user.userProfilePic : user.userGender == "Male" ? "https://th.bing.com/th/id/OIP.hxh6omrkOuj2l9rGHNe7qQHaHa?rs=1&pid=ImgDetMain" : user.userGender == "Female" ? "https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg"
                    : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                }
                width={200}
                height={200}
                alt="profile Picture"
                className="rounded-full transition ease-in-out hover:scale-105 shadow-white hover:shadow-2xl"
              />
              <h1 className="cursor-pointer">
                UserId : {user.userId ? user.userName + user.userId : "user123"}
              </h1>
            </div>
            <div className="w-2/4 min-h-9 flex flex-col gap-2">
              <h1 className="text-4xl font-bold cursor-pointer">
                {user.userName != null && user.userLastName != null
                  ? user.userName + " " + user.userLastName
                  : user.userName != null && user.userLastName == null
                  ? user.userName
                  : "User Name"}
              </h1>
              <h1 className="text-xl font-bold text-slate-300">
                {user.userGender ? user.userGender : "Gender"}{" "}
              </h1>
              <p className="text-slate-200 ">
                {user.userBio
                  ? user.userBio.length <= 300
                    ? user.userBio
                    : user.userBio.substring(0, 300) + " ...."
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit Repudiandae nesciunt atque, officiis dignissimos facilis explicabo soluta! Quibusdam ipsum omnis soluta consectetur voluptas molestias nisi est obcaecati. Labore delectus similique laborum!"}
              </p>
              <div>
                <Link
                  href="/updateData"
                  className=" text-blue-400 text-sm hover:underline cursor-pointer"
                >
                  {JSON.parse(sessionStorage.getItem("webData")).userId ==
                    user.userId && user.userId != 0
                    ? "Update Profile"
                    : ""}
                </Link>
              </div>
            </div>
          </div>

          <div className="w-3/4 m-auto">
            <div className=" h-14 bg-slate-700 flex items-center justify-evenly rounded-lg">
              <button
                className={` bg-transparent border-slate-700 border-2 px-2 py-1 rounded-sm hover:border-slate-400 ${
                  menu == "blogPosts" && activeBtn
                } `}
                onClick={() => {
                  setMenu("blogPosts");
                }}
              >
                Blog Posts
              </button>
              <button
                className={` bg-transparent border-slate-700 border-2 px-2 py-1 rounded-sm hover:border-slate-400 ${
                  menu == "topBlogs" && activeBtn
                } `}
                onClick={() => {
                  setMenu("topBlogs");
                }}
              >
                Top Blogs
              </button>
              <button
                className={` bg-transparent border-slate-700 border-2 px-2 py-1 rounded-sm hover:border-slate-400 ${
                  menu == "connections" && activeBtn
                } `}
                onClick={() => {
                  setMenu("connections");
                }}
              >
                Connections
              </button>
              <button
                className={` bg-transparent border-slate-700 border-2 px-2 py-1 rounded-sm hover:border-slate-400 ${
                  menu == "about" && activeBtn
                } `}
                onClick={() => {
                  setMenu("about");
                }}
              >
                About
              </button>
            </div>
            <div className=" p-5 min-h-10 bg-slate-500 rounded-lg mt-1">
              {menu == "blogPosts" && <BlogPosts user={user} />}
              {menu == "topBlogs" && <TopBlogs user={user} />}
              {menu == "connections" && <ConnectionsList user={user}/>}
              {menu == "about" && <ProfileAbout user={user} />}
            </div>
          </div>
        </div>

        {/* fix social links */}
        <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
          {/* linkedIn */}
          <Link href={user.linkedInURL ? user.linkedInURL : "https://www.instagram.com/"} target="blank">
            <div className="p-2 hover:text-primary hover:dark:text-primary">
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
          </Link>
          {/* github */}
          <Link href={user.gitHubURL ? user.gitHubURL : "https://github.com/github"} target="blank">
            <div className="p-2 hover:text-primary hover:dark:text-primary">
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
          </Link>
          {/* facebook */}
          <Link href={user.facebookURL ? user.facebookURL : "https://www.facebook.com/"} target="blank">
            <div className="p-2 hover:text-blue-500 hover:dark:text-blue-500">
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
          </Link>
          {/* YouTube */}
          <Link href={user.youtubeURL ? user.youtubeURL : "https://www.youtube.com/"} target="blank">
            <div className="p-2 hover:text-primary hover:dark:text-primary">
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
          </Link>
        </div>
      </>
    );
  } else {
    sessionStorage.clear("webData");
    alert("Session is Over, You need to LogIn again...");
    router.push("/");
    return <>{/* <Welcome /> */}</>;
  }
};

export default Profile;
