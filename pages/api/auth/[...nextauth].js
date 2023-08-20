import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/connection";
import User from "../../../model/User";
import { compare } from "bcryptjs";
import clientPromise from "../../../database/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { sign } from "jsonwebtoken";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          console.log(error);
        });

        const { username, password } = credentials;
        const user = await User.findOne({ username });
        if (user) {
          const check = await compare(password, user.password);
          if (!check) {
            throw new Error("password");
          }
          return user;
        } else {
          throw new Error("username");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const accessToken = sign(
          { name: user.name, username: user.username, role: user.role },
          process.env.NEXTAUTH_SECRET,
          {
            expiresIn: 24 * 60 * 60,
          }
        );
        token.accessToken = accessToken;
        token.name = user.name;
        token.username = user.username;
        token.role = user.role;
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.image = "";
        session.user.email = "";
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
