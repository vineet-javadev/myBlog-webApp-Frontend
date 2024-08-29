"use client";
import { SessionProvider } from "next-auth/react";
import React , { useState } from "react";

import { userContext } from "@/store/context";

const SessionWrapper = ({ children }) => {
  const [userId, setUserId] = useState();
  return (
    <userContext.Provider value={{ userId, setUserId }}><SessionProvider>{children}</SessionProvider></userContext.Provider>
  );
};

export default SessionWrapper;


