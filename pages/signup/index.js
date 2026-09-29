import { Router, useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const router = useRouter()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const signup = async (e) => {
    e.preventDefault()
    const user = {
      firstname,
      lastname,
      username,
      email,
      password
    }

    console.log(user)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      if (res.status === 201) {
        setFirstname("")
        setLastname("")
        setUsername("")
        setEmail("")
        setPassword("")

        alert("The user was successfully registered.")


        router.replace("/dashboard")
      } else if (res.status === 422) {
        alert("A user with these details has already registered.")
      }


    } catch (err) {
      console.log(err)
    }




  }





  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input type="text" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} autoComplete="off" required />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="off" required />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" required />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" required />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" onClick={signup} />
      </form>
    </div>
  );
}

export default Index;
