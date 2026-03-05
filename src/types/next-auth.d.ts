import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    isAcceptingMessages?: boolean;
    isVerified?: boolean;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      isAcceptingMessages?: boolean;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }
}

// Extend the JWT interface to include custom properties
// alternate way to extend the JWT interface without using module augmentation
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isAcceptingMessages?: boolean;
    isVerified?: boolean;
  }
}
