import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const AppBar = async() => {

  const user = await getServerSession(options);

  return (
    <div className="bg-teal-500 p-2 flex gap-5 ">
      <Link href={"/"} className="text-lg hover:text-gray-100">{user?.user.role === "CUSTOMER" ? <p>
        Enroll Vehicle
      </p> : <p>List a Vehicle</p>}</Link>
      <Link href={"/enrollments"} className="text-lg hover:text-gray-100 hover:rounded-lg">Enrollments</Link>
      <Link href='/' className="text-lg hover:text-gray-100 hover:rounded-lg"> <p>Hey {user?.user.username}</p> </Link>
      <LoginButton />
    </div>
  );
};

export default AppBar;

