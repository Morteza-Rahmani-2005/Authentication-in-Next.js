import { verifyToken } from "@/utils/auth";
import React, { use } from "react";
import UserModel from "@/models/User"
import connectToDB from "@/configs/db";
function Dashboard({ user }) {
  return (
    <>
      <h1>{user.firstname} {user.lastname}</h1>
    </>
  );
}


export async function getServerSideProps(context) {
  connectToDB()

  const { token } = context.req.cookies

  if (!token) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }

  const isValidToken = await verifyToken(token)


  if (!isValidToken) {
    return {
      redirect: {
        destination: "/signin"
      }
    }
  }


  const user = await UserModel.findOne({ email: isValidToken.email }, "firstname lastname")

  console.log(user)

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}

export default Dashboard;
