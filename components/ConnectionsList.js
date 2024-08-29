"use client";
import React, { useState , useEffect} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getConnectionList } from "@/services/service";

const ConnectionsList = (props) => {
  const Router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [connectionList, setConnectionList] = useState([]);
  if (!session) {
    Router.push("/");
  }

  useEffect(() => {
    setUser(props.user);

    getConnectionList(props.user.userId)
      .then((response) => {
        setConnectionList(response);
        console.log*=(response);
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to Load Your's Connections");
      });
  }, [props.user]);

  return (
    <div className="w-3/4 m-auto md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >

          { connectionList.map((item , index)=>{
            <li className="py-3 sm:py-4" key={index}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src={
                    item && item.userProfilePic
                  ? item.userProfilePic : item.userGender == "Male" ? "https://th.bing.com/th/id/OIP.hxh6omrkOuj2l9rGHNe7qQHaHa?rs=1&pid=ImgDetMain" : item.userGender == "Female" ? "https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg"
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
                {item.user.userName != null &&
                          item.user.userLastName != null
                            ? item.user.userName + " " + item.user.userLastName
                            : item.user.userName != null &&
                              item.user.userLastName == null
                            ? item.user.userName
                            : "Jese Leos"}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {item.emailId ? item.emailId : "email@windster.com"}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span className="text-blue-800 cursor-pointer">Message</span>
              </div>
            </div>
          </li>
          })}
          








          {/* <li className="py-3 sm:py-4">
            <div className="flex items-center ">
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
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Bonnie Green
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span className="text-blue-800 cursor-pointer">Message</span>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
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
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Michael Gough
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span className="text-blue-800 cursor-pointer">Message</span>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center ">
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
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Lana Byrd
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span className="text-blue-800 cursor-pointer">Message</span>
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center ">
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
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Thomes Lean
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span className="text-blue-800 cursor-pointer">Message</span>
              </div>
            </div>
          </li> */}

        </ul>
      </div>
    </div>
  );
};

export default ConnectionsList;
