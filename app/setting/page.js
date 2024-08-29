"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, updatePicture } from "@/services/service";
import { useForm } from "react-hook-form";
import { imageDB } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Setting = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [changePPVisible, setChangePPVisible] = useState("hidden");
  const [changeCPVisible, setChangeCPVisible] = useState("hidden");

  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const file = watch("imageFile");

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("webData")));
  }, []);

  const validateFile = (file) => {
    if (file && !file[0]?.type.startsWith("image/")) {
      setError("imageFile", {
        type: "manual",
        message: "Please upload a valid image file.",
      });
      return false;
    }
    clearErrors("imageFile");
    return true;
  };

  const SubmitInDB = async (data) => {
    try {
      const updatedData = await updatePicture(user.userId, data);
      if (updatedData) {
        sessionStorage.setItem("webData", JSON.stringify(updatedData));
        alert("Picture Update Successfully");
      } else {
        alert("Something were Wrong!!!");
      }
    } catch (error) {
      console.log(error);
      alert("Given Password is Wrong or Data");
    }
  };

  const onSubmitPP = () => {
    console.log("pp clicked");
    const imagePPRef = ref(imageDB, `profilePic/${v4()}`);
    uploadBytes(imagePPRef, profileImage)
      .then(() => {
        getDownloadURL(imagePPRef)
          .then((ppUrl) => {
            const data = {
              userProfilePic: ppUrl.toString(),
            };
            SubmitInDB(data);
            return;
          })
          .catch((error) => {
            console.log(error);
            alert("error getting the Profile Picture url");
            return;
          });
      })
      .catch((error) => {
        console.log(error);
        alert("error uploading the Profile Picture");
        return;
      });
  };

  const onSubmitCP = () => {
    console.log("cp clicked");
    const imageCPRef = ref(imageDB, `coverPic/${v4()}`);
    uploadBytes(imageCPRef, coverImage)
      .then(() => {
        getDownloadURL(imageCPRef)
          .then((cpUrl) => {
            const data = {
              userCoverPicture: cpUrl.toString(),
            };
            SubmitInDB(data);
            return;
          })
          .catch((error) => {
            console.log(error);
            alert("error getting the Cover Picture url");
            return;
          });
      })
      .catch((error) => {
        console.log(error);
        alert("error uploading the Cover Picture");
        return;
      });
  };
  return (
    <>
      <div className="min-h-[90vh] py-10 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px] text-white">
        <div className=" w-1/2 rounded-lg m-auto gap-5 bg-slate-500 py-6 flex flex-col justify-center items-center">
          <span className="text-2xl cursor-default">SETTING PANEL</span>

          {/* change profile picture button */}
          <button
            className={`${
              user.userId == 0 ? "opacity-50 cursor-not-allowed" : ""
            } border-2 w-1/2 border-white  py-3 rounded-lg hover:bg-slate-700`}
            onClick={() => {
              if (user.userId != 0) {
                if (changePPVisible == "hidden") {
                  setChangePPVisible("");
                  setChangeCPVisible("hidden");
                } else {
                  setChangePPVisible("hidden");
                  setChangeCPVisible("hidden");
                }
              }
            }}
          >
            Change Profile picture
          </button>
          <div
            className={`${changePPVisible} border-2 border-white rounded-lg p-5 bg-slate-600`}
          >
            <form onSubmit={handleSubmit(onSubmitPP)}>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("ppImage", {
                    required: true,
                  })}
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                  }}
                />
                {/* {errors.ppImage && (
                  <p style={{ color: "red" }}>{errors.ppImage.message}</p>
                )} */}
              </div>
              {/* {file && file[0] && (
                <div>
                  <p>Selected file: {file[0].name}</p>
                  <Image
                    src={URL.createObjectURL(file[0])}
                    alt="Selected"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )} */}
              <button
                className="border-2 border-white rounded-md px-6 py-1 mt-4 hover:text-black hover:bg-white"
                type="submit"
                onClick={() => {
                  if (profileImage) {
                    onSubmitPP();
                  }
                }}
              >
                Submit
              </button>
            </form>
          </div>
          {/* change Cover picture button */}
          <button
            className={`${
              user.userId == 0 ? "opacity-50 cursor-not-allowed" : ""
            } border-2 w-1/2 border-white  py-3 rounded-lg hover:bg-slate-700`}
            onClick={() => {
              if (user.userId != 0) {
                if (changeCPVisible == "hidden") {
                  setChangeCPVisible("");
                  setChangePPVisible("hidden");
                } else {
                  setChangePPVisible("hidden");
                  setChangeCPVisible("hidden");
                }
              }
            }}
          >
            Change Cover picture
          </button>
          <div
            className={`${changeCPVisible}  border-2 border-white rounded-lg p-5 bg-slate-600`}
          >
            <form onSubmit={handleSubmit(onSubmitCP)}>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("cpImage", {
                    required: true,
                  })}
                  onChange={(e) => {
                    setCoverImage(e.target.files[0]);
                  }}
                />
                {/* {errors.cpImage && (
                  <p style={{ color: "red" }}>{errors.cpImage.message}</p>
                )} */}
              </div>
              {/* {file && file[0] && (
                <div>
                  <p>Selected file: {file[0].name}</p>
                  <Image
                    src={URL.createObjectURL(file[0])}
                    alt="Selected"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )} */}
              <button
                className="border-2 border-white rounded-md px-6 py-1 mt-4 hover:text-black hover:bg-white"
                type="submit"
                onClick={() => {
                  if (coverImage) {
                    onSubmitCP();
                  }
                }}
              >
                Submit
              </button>
            </form>
          </div>
          {/* Update  Profile button */}
          <button
            className={`${
              user.userId == 0 ? "opacity-50 cursor-not-allowed" : ""
            } border-2 w-1/2 border-white  py-3 rounded-lg hover:bg-slate-700`}
            onClick={() => {
              if (user.userId != 0) {
                router.push("/updateData");
              }
            }}
          >
            Update Profile
          </button>
          {/* Log Out button */}
          <button
            className=" border-2 w-1/2 border-white  py-3 rounded-lg hover:bg-slate-700"
            onClick={() => {
              sessionStorage.clear("webData");
              router.push("/api/auth/signout?csrf=true");
            }}
          >
            Sign out
          </button>

          {/* delete user  */}
          <button
            className={`${
              user.userId == 0 ? "opacity-50 cursor-not-allowed" : ""
            } border-2 w-1/2 border-white py-3 rounded-lg text-red-500 hover:bg-slate-700`}
            onClick={async () => {
              if (user.userId != 0) {
                if (await deleteUser(user.userId)) {
                  router.push("/api/auth/signout?csrf=true");
                  sessionStorage.clear("webData");
                }
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Setting;
