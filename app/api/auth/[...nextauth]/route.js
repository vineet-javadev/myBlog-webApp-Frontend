import NextAuth from "next-auth";
import { login } from "@/services/service";

import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";


const githubHandler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID_PRODUCTION,
      clientSecret: process.env.GITHUB_SECRET_PRODUCTION,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jSmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials.username, credentials.password);
          const userDefault = {
            "id": user.userId,
            "email": user.emailId,
            "name": user.userName,
            // "image": ,
            // "userGender": "Male",
            // "password": "************",
            // "userNationality": "Indian",
            // "userBio": "i am here to express myself or my views",
            // "userCoverPicture": null
            };
            
            // sessionStorage.setItem("webData" , JSON.stringify(await login(credentials.username , credentials.password)));
            



          if (userDefault) {
            return userDefault;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
});

export { githubHandler as GET, githubHandler as POST };
