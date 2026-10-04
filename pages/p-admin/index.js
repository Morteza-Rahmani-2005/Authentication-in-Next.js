import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User"
import React from "react";

function PAdmin({ user }) {
  return <h1>Welcome To Admin Panel , {user.firstname}  - {user.lastname}❤️</h1>;
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


  const user = await UserModel.findOne({ email: isValidToken.email }, "firstname lastname role")


  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard"
      }
    }
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}


export default PAdmin;
