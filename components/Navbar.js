"use client";
import React, { useState, useEffect , useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getAllUsers } from "@/services/service";
import { userContext } from "@/store/context";

const Navbar = () => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  // const [ userSS , setUserSS] = useState({});

  const { userId, setUserId } = useContext(userContext);

  const [searchList, setSearchList] = useState("hidden");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const fetchUsers = await getAllUsers();
    setUserData(fetchUsers);
  };

  return (
    <>
      <nav className="hidden min-h-[100px] bg-cyan-900 lg:flex items-center justify-between px-20">
        <Link href="/">
          <div className="logo flex items-center select-none ">
            <span className="text-white text-5xl font-extrabold">My-</span>
            <span className="text-sky-200 text-4xl">Blogs :&#41;</span>
          </div>
        </Link>
        <div className="menu">
          <ul className="flex items-center gap-5 justify-around text-white text-l cursor-pointer select-none">
            <li>
              <Link href="/" className="hover:text-sky-200 active:text-sky-300">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/notification" className="hover:text-sky-200 active:text-sky-300">
                Notification
              </Link>
            </li>
            <li>
              <Link href={`/profile/${userId}`} className="hover:text-sky-200 active:text-sky-300">
                Profile
              </Link>
            </li>
            <li>
              {/* <Link href="/api/auth/signout?csrf=true" className="hover:text-sky-200">
                <span onClick={()=>{sessionStorage.clear("webData")}}>Settings</span>
              </Link> */}

              <Link href="/setting" className="hover:text-sky-200 active:text-sky-300">
                <span>Settings</span>
              </Link>
            </li>
            <li className="hover:text-sky-200">
              <input
                type="text"
                placeholder="Profile"
                className="px-2 py-2 rounded-lg border-2 border-cyan-900 text-black"
                id="search"
                onChange={(e) => {
                  setSearch(e.target.value);
                  if(e.target.value.length < 1){
                    setSearchList("hidden");
                  }else{
                    setSearchList("absolute")
                  }
                }}
              />
            </li>
            <li>
              <button
                onClick={async () => {
                  searchList == "hidden"
                    ? setSearchList("absolute")
                    : setSearchList("hidden");

                  if (searchList == "absolute") {
                    const fetchUsers = await getAllUsers();
                    setUserData(fetchUsers);
                  }
                }}
                className="bg-sky-200 px-5 py-2 text-cyan-950 font-bold hover:bg-cyan-600 hover:text-white hover:border-white border-2 border-sky-200 rounded-lg"
              >
                Search
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* search panel */}
      <div
        className={`${searchList} z-10 max-h-[90%] overflow-x-hidden overflow-y-scroll bg-slate-600 p-4 right-0`}
      >
        <div className=" m-auto md  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Search List
            </h5>
            <div></div>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {userData
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : (item.userName.toLowerCase() + item.userId).includes(
                        search.toLowerCase()
                      );
                })
                .map((item) => (
                  <li
                    className={`${
                      item.userId == 0 ? "hidden" : ""
                    } py-3 sm:py-4`}
                    key={item.userId}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={
                            item.userProfilePic
                              ? item.userProfilePic
                              : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                          }
                          width={50}
                          height={50}
                          alt="profile Picture"
                          className="rounded-full "
                        />
                      </div>
                      <div className="flex gap-2 min-w-40">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.userId ? item.userName + item.userId : "userID"}
                        </p>
                        {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {item.userName != null && item.userLastName != null
                          ? item.userName + " " + item.userLastName
                          : item.userName != null && item.userLastName == null
                          ? item.userName
                          : "Josef Kuroshio"}
                      </p> */}
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <span className={`text-blue-800 cursor-pointer`}>
                          Add
                        </span>
                      </div>
                    </div>
                  </li>
                ))}

              {/* <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        session
                          ? session.user.image
                          : "https://cdn-icons-png.flaticon.com/512/456/456141.png"
                      }
                      width={50}
                      height={50}
                      alt="profile Picture"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-800 cursor-pointer">Add</span>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
