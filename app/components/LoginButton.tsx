"use client";
import { data } from "autoprefixer";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";


const LoginButton =  () => {

  return (
    <div className="ml-auto flex gap-2">
        <div className="p-2">
          <button className="text-white bg-teal-500 text-lg hover:text-black hover:bg-white p-2 rounded-sm" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
    </div>
  );
};

export default LoginButton;