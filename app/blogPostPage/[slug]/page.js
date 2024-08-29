"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPost } from "@/services/service";
import { useRouter } from "next/navigation";
import { likePost , postComment , getAllComments , getAllPostByPostId } from "@/services/service";

const BlogPostPage = ({ params }) => {
  const currentId = params.slug;
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("webData"));
      if (storedUser) {
        setUser(storedUser);
      }
      getPost(currentId)
        .then((response) => {
          setPost(response);
          setLikeCount(response.likesCount);
          fetchComments(response.postId);
        })
        .catch((error) => {
          alert("Post load unable")
          router.push("/");
        });

    } catch (error) {
      alert("user unable to get");
      router.push("/explore");
    }
  }, []);

  const fetchComments = async (postId) => {
    getAllPostByPostId(postId).then((response)=>{
      setCommentList(response);
    }).catch(error=>{
      alert("Unable to fetch posts");
    })
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen py-5  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px]">
      <section className="py-5 bg-white dark:bg-gray-900 w-[90%] px-[10%] mx-auto rounded-lg">
        <div className="flex justify-between">
          <Link href="/">
            <span className="mb-3 hover:font-bold hover:text-blue-700 cursor-pointer">
              &lt; Go Back
            </span>
          </Link>
          <Link href="/explore">
            <span className="mb-3 hover:font-bold hover:text-blue-700 cursor-pointer">
              {user && user.userId == post && post.user.userId
                ? "Update Post &gt;"
                : "Not Admin"}
            </span>
          </Link>
        </div>

        <div
          className={`w-full h-[400px] bg-blue-500 mx-auto rounded-md bg-[url(${
            post && post.postThumbnail
              ? post.postThumbnail
              : "'https://img.freepik.com/free-photo/snowy-mountain-peak-starry-galaxy-majesty-generative-ai_188544-9650.jpg'"
          })] bg-no-repeat bg-center bg-cover`}
        />
        <span className="flex gap-4 items-center cursor-default">
          <h1 className="text-4xl font-bold my-5 cursor-default">
            {post.postId ? post.postTitle : "Post Title"}
            {/* What is Cricket? */}
          </h1>
          <span>
            {/* {post? post.category.catTitle : "CatTitle"} */}
            {/* {post.postId ? post.postTitle : "Post Title"} */}
          </span>
        </span>
        <p className="text-justify">
          {post.postId ? post.postDescription : "Post Description"}

          {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          voluptatum reiciendis excepturi libero perferendis assumenda expedita
          itaque nesciunt obcaecati consectetur deleniti, corporis totam
          exercitationem aspernatur, distinctio beatae iste possimus quam minima
          dolores facere quas facilis? Nemo mollitia, saepe laborum impedit modi
          et suscipit maiores, vitae, aperiam quibusdam cumque molestias ad
          corporis. Voluptatum eaque cumque quasi incidunt voluptates excepturi
          corporis, maiores repellendus cum quas libero corrupti eos quisquam
          amet porro a necessitatibus ipsa vitae. Officia, neque cum nobis
          aliquam sapiente laudantium eligendi repellat ut commodi aperiam
          nesciunt doloremque ullam velit, quia iste! Culpa a velit adipisci non
          provident quis veritatis, laboriosam assumenda cum libero ipsam? Quis
          quisquam illo quasi! Sed eligendi veniam fugiat quam optio, voluptatem
          nesciunt tenetur repellendus maiores. Numquam hic, voluptatibus,
          perspiciatis tempora velit neque fugiat architecto nesciunt quo ea
          officiis iusto vitae modi consectetur porro dolore voluptates esse
          rerum temporibus nisi mollitia tempore inventore exercitationem?
          Nesciunt placeat ratione autem, earum sit ullam sed saepe libero, rem
          est facere! Provident nostrum quos saepe debitis rerum magnam
          possimus, eos vero, deserunt aliquid nisi explicabo modi officiis
          velit perspiciatis eligendi officia laborum, perferendis vitae
          suscipit amet. Voluptatum beatae illo, esse quos tempore autem est
          mollitia dignissimos iusto et aliquam optio architecto at voluptatem,
          porro quas repellat pariatur dicta suscipit nihil cupiditate incidunt
          perferendis libero laboriosam. Aliquid magnam obcaecati exercitationem
          nisi, ab assumenda temporibus distinctio repellat officia voluptas
          odio quia aperiam, consequuntur reprehenderit sint delectus cum
          adipisci itaque? Tempora iure laboriosam incidunt optio dolor minus
          accusamus consequuntur aliquam nisi doloribus numquam rem corrupti
          omnis deserunt soluta tempore sunt consectetur itaque, repellendus
          obcaecati. */}
        </p>
        {/* <p className="text-justify mt-4">
          Excepturi, iure repellat earum at ducimus esse labore quis enim
          doloremque nemo commodi? Deserunt quam et dicta, ab dignissimos
          excepturi quaerat pariatur eaque illum consectetur mollitia in
          voluptates libero sint eveniet corrupti perspiciatis possimus facilis
          ratione laboriosam dolore iste ipsa asperiores! Architecto vitae
          quisquam, perferendis obcaecati esse, praesentium inventore in ratione
          quis quaerat incidunt maiores maxime sequi veritatis, molestiae
          numquam. Voluptates architecto corporis fugiat iusto doloribus?
          Cupiditate velit quas reprehenderit corrupti sunt doloribus, aliquam
          tempora magnam cumque similique fuga minus aperiam aliquid accusamus
          doloremque! Eum, culpa. Inventore molestias, sit laboriosam fuga quod
          dicta maiores! Quae molestiae, similique minima soluta distinctio
          veritatis illum placeat quo vitae. Cum est nesciunt hic ratione, qui,
          expedita dolores sint quis architecto dolorum quo sapiente quae,
          doloribus ad officiis aliquid reprehenderit quasi ducimus
          voluptatibus. Iusto unde possimus culpa autem sapiente quasi aperiam
          voluptatem quo minus, consequatur suscipit deserunt. Incidunt quaerat
          est esse et voluptatem nulla amet dolorem, earum voluptates? Ullam
          necessitatibus suscipit doloremque saepe nam excepturi eius libero,
          impedit sequi corporis deserunt omnis tempora nemo et fugit quibusdam
          sapiente at officiis dolor. Ducimus nihil non recusandae delectus
          numquam, est officia alias, dignissimos deserunt tempore molestias
          excepturi iure perferendis quam neque totam incidunt enim pariatur eum
          provident quae eos odit dicta ullam. Quibusdam animi deleniti nam sit
          laborum libero id itaque aspernatur? Dicta possimus architecto illum
          dignissimos quidem, unde in! Eveniet saepe rem est laborum laudantium?
          Voluptates velit provident at repudiandae natus voluptas debitis
          obcaecati eius incidunt?
        </p> */}

        <div className="pt-3 flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            color="red"
            fill="red"
            className="hover:animate-ping cursor-pointer"
            onClick={() => {
              likePost(post.postId, user.userId)
                .then((response) => {
                  setLikeCount(response);
                })
                .catch((error) => {
                  console.error(error);
                  alert("Unable to Like this Post");
                });
            }}
          >
            <path
              d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          {likeCount}
        </div>

        <div className=" border-2 w-full mt-5"></div>

        <div className="flex flex-col mx-auto items-center justify-center shadow-lg mb-4 w-full">
          <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg mx-auto font-bold underline cursor-default">
                Add a new comment
              </h2>
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Type Your Comment"
                id="commentBox"
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                <svg
                  fill="none"
                  className="w-5 h-5 text-gray-600 mr-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
              </div>
              <div className="-mr-1">
                <input
                  type="submit"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Post Comment"
                  onClick={()=>{
                    if(document.getElementById("commentBox").value != "" ){
                      const data = {
                        commentContent : document.getElementById("commentBox").value
                      }
                      console.log(data)
                      console.log(post.postId)
                      console.log(user.userId)
                      postComment(post.postId , user.userId , data).then(response=>{
                        console.log(response);
                        setCommentList([...commentList, response]);
                        alert("New Comment Added");
                      }).catch(error=>{
                        console.error(error);
                        alert("Unable to Post Comment");
                      })
                    }
                  }}
                />
              </div>
            </div>
          </form>

          <div className=" border-2 w-full m-5"></div>

          <div className="flex flex-col w-full px-6 justify-start relative top-1/3">

            {commentList.map((item , index)=>{
              return(
              <div key={index} className="relative w-full grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <Image
                  src={item && item.user.userProfilePic ? item.user.userProfilePic : "https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"}
                  width={200}
                  height={200}
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                    {item.user.userName != null &&
                          item.user.userLastName != null
                            ? item.user.userName + " " + item.user.userLastName
                            : item.user.userName != null &&
                              item.user.userLastName == null
                            ? item.user.userName
                            : "Jese Leos"}
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                  {/* {item && item.commentDate ? item.commentDate : "20 April 2022, at 14:88 PM"} */}
                  {item && item.commentDate
                          ? item.commentDate.substring(0, 10) +
                            " | " +
                            item.commentDate.substring(11, 16)
                          : "14 May"}
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                {item && item.commentContent ? item.commentContent : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam vero adipisci beatae voluptas dolor ame."}
              </p>
            </div>)
            })}
            


            {/* <div className="relative w-full grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <Image
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  width={20}
                  height={20}
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
            <div className="relative w-full grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <Image
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  width={20}
                  height={20}
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
            <div className="relative w-full grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <Image
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  width={20}
                  height={20}
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div> */}

          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
