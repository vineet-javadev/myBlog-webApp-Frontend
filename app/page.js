"use client";
import Image from "next/image";
import Welcome from "./welcome/page";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Explore from "@/app/explore/page";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    // router.push("/explore");
    return (
      <>
        <Explore />

        <div className="fixed right-2 bottom-4">
          <Image src="/app/favicon.ico" width={55} height={55} alt="goToTop" />
        </div>
      </>
    );
  } else {
    // router.push("/welcome");
    return (
      <>
          <Welcome />
        
        <div className="visible lg:hidden flex justify-center items-center  p-5 select-none absolute top-0 pb-10 min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#001919_1px)] bg-[size:20px_20px] text-white">
          <div className="px-8 py-5 rounded-md  backdrop-blur-sm ubuntu-regular ">
            <h1 className="text-center">Sorry Guys, </h1><h1 className="text-center">This Version is not for Small Devices</h1>
          </div>
            <span className="fixed bottom-3 bitaText">Beta Version</span>
        </div>
      </>
    );
  }
}
