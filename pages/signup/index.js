import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10";

function Index() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

    console.log(user);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 201) {
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");

        alert("The user was successfully registered.");

        router.replace("/dashboard");
      } else if (res.status === 422) {
        alert("A user with these details has already registered.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="All fields are required.">
      <form role="form" method="post" className="space-y-4" onSubmit={signup}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-zinc-700">
              First name
            </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              autoComplete="off"
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-zinc-700">
              Last name
            </label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              autoComplete="off"
              required
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
        >
          Sign up
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-zinc-900 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Index;
