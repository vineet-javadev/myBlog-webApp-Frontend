import React, { useState, useEffect } from "react";
import { getAllPostByUserId } from "@/services/service";

const BlogPosts = (props) => {
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);

  const updatePost = async (userId) => {
    try {
      const result = await getAllPostByUserId(userId);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUser(props.user);
    // const storedUser = JSON.parse(sessionStorage.getItem("webData"));
    if (user && user.userId) {
      updatePost(user.userId).then((result) => {
          setPost(result);
      }).catch(()=>{
        alert("Unable to find Posts");
      });
    }
  }, [props.user, user]);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {post.map((item, index) => (
          <div
            key={index}
            className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.livemint.com/lm-img/img/2023/06/04/600x338/Rahul-Gandhi_1685847112071_1685847112303.jpg')]"
          >
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
              <a
                href="#"
                className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
              >
                {item.category.catTitle ? item.category.catTitle : "Category"}
              </a>
              <div className="text-white font-regular flex gap-1 flex-col justify-center">
                <span className="text-3xl leading-0 font-semibold">{item.date
                  ? item.date.substring(8, 10)
                  : "May"}</span>
                <span className="-mt-3">{item.date
                  ? item.date.substring(5, 7) == "01" ? "Jan" : item.date.substring(5, 7) == "02" ? "Fab" : item.date.substring(5, 7) == "03" ? "Mar" : item.date.substring(5, 7) == "04" ? "Apr" : item.date.substring(5, 7) == "05" ? "May" : item.date.substring(5, 7) == "06" ? "Jun" : item.date.substring(5, 7) == "07" ? "Jul" : item.date.substring(5, 7) == "08" ? "Aug" : item.date.substring(5, 7) == "09" ? "Sep" : item.date.substring(5, 7) == "10" ? "Oct" : item.date.substring(5, 7) == "11" ? "Nov" : "Dec"
                  : "MM"}</span>
              </div>
            </div>
            <main className="p-5 z-10">
              <a
                href={`/blogPostPage/${item.postId}`}
                className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
              >
                {item.postTitle
                  ? item.postTitle
                  : "Dr. Abdullah Abdullah&apos;s Presidential Election Campaign"}
              </a>
            </main>
          </div>
        ))}

        {/* <div
          className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.livemint.com/lm-img/img/2023/06/04/600x338/Rahul-Gandhi_1685847112071_1685847112303.jpg')]"
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
            <a
              href="#"
              className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
            >
              Politics
            </a>
            <div className="text-white font-regular flex flex-col justify-start">
              <span className="text-3xl leading-0 font-semibold">25</span>
              <span className="-mt-3">May</span>
            </div>
          </div>
          <main className="p-5 z-10">
            <a
              href="#"
              className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
            >
              Dr. Abdullah Abdullah&acos;s Presidential Election Campaign
            </a>
          </main>
        </div>

        <div
          className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.hindustantimes.com/ht-img/img/2024/03/21/550x309/delhi_cm_arvind_kejriwal_arrest_1711033407317_1711033407557.jpg')]"
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
            <a
              href="#"
              className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
            >
              Politics
            </a>
            <div className="text-white font-regular flex flex-col justify-start">
              <span className="text-3xl leading-0 font-semibold">10</span>
              <span className="-mt-3">Mar</span>
            </div>
          </div>
          <main className="p-5 z-10">
            <a
              href="#"
              className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
            >
              Afghanistan&acos;s President Ashram Ghana Speaks At The Council
            </a>
          </main>
        </div>

        <div
          className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.aljazeera.com/wp-content/uploads/2024/04/2024-04-22T142102Z_897427929_RC2YW6AWY7WF_RTRMADP_3_INDIA-ELECTION-RELIGION-MODI-1713962365.jpg?resize=770%2C513&quality=80')]"
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
            <a
              href="#"
              className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
            >
              Politics
            </a>
            <div className="text-white font-regular flex flex-col justify-start">
              <span className="text-3xl leading-0 font-semibold">20</span>
              <span className="-mt-3">Jan</span>
            </div>
          </div>
          <main className="p-5 z-10">
            <a
              href="#"
              className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
            >
              Middle East Participants Gather In Warsaw
            </a>
          </main>
        </div>

        <div
          className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.aljazeera.com/wp-content/uploads/2024/04/2024-04-22T142102Z_897427929_RC2YW6AWY7WF_RTRMADP_3_INDIA-ELECTION-RELIGION-MODI-1713962365.jpg?resize=770%2C513&quality=80')]"
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
            <a
              href="#"
              className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
            >
              Politics
            </a>
            <div className="text-white font-regular flex flex-col justify-start">
              <span className="text-3xl leading-0 font-semibold">20</span>
              <span className="-mt-3">Jan</span>
            </div>
          </div>
          <main className="p-5 z-10">
            <a
              href="#"
              className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
            >
              Middle East Participants Gather In Warsaw
            </a>
          </main>
        </div>

        <div
          className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.hindustantimes.com/ht-img/img/2024/03/21/550x309/delhi_cm_arvind_kejriwal_arrest_1711033407317_1711033407557.jpg')]"
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
            <a
              href="#"
              className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
            >
              Politics
            </a>
            <div className="text-white font-regular flex flex-col justify-start">
              <span className="text-3xl leading-0 font-semibold">10</span>
              <span className="-mt-3">Mar</span>
            </div>
          </div>
          <main className="p-5 z-10">
            <a
              href="#"
              className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
            >
              Afghanistan&apos;s President Ashram Ghana Speaks At The Council
            </a>
          </main>
        </div>

        <div
          className="transition ease-in-out hover:scale-105 hover:shadow-2xl shadow-black relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center bg-[url('https://www.aljazeera.com/wp-content/uploads/2024/04/2024-04-22T142102Z_897427929_RC2YW6AWY7WF_RTRMADP_3_INDIA-ELECTION-RELIGION-MODI-1713962365.jpg?resize=770%2C513&quality=80')]"
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
            <a
              href="#"
              className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
            >
              Politics
            </a>
            <div className="text-white font-regular flex flex-col justify-start">
              <span className="text-3xl leading-0 font-semibold">20</span>
              <span className="-mt-3">Jan</span>
            </div>
          </div>
          <main className="p-5 z-10">
            <a
              href="#"
              className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
            >
              Middle East Participants Gather In Warsaw
            </a>
          </main>
        </div> */}
      </div>
    </div>
  );
};

export default BlogPosts;
