"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Welcome from "../welcome/page";
import { useRouter } from "next/navigation";

const Notification = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="min-h-screen py-5 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px] text-white">
          <div className="w-3/4 m-auto md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-start mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                All Notifications
              </h5>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">9:30</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">AM</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Neil Sims
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">9:00</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">AM</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Bonnie Green
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">7:22</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">AM</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Michael Gough
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">1 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Lana Byrd
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">1 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">1 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">1 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 flex text-black">
                      <div className="flex flex-col justify-center items-center pr-5">
                        {/* this span for data / time  */}
                        <span className=" font-extrabold">2 Day</span>
                        {/* this span for data or am/pm */}
                        <span className="font-bold">ago</span>
                      </div>
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
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-800 cursor-pointer">
                        Message
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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

export default Notification;
