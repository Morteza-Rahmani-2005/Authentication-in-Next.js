import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10";

function Index() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const user = {
      identifier,
      password,
    };
    console.log(identifier, password);
    try {
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 200) {
        setIdentifier("");
        setPassword("");

        alert("The user was successfully registered.");

        router.replace("/dashboard");
      } else if (res.status === 422) {
        alert("Incorrect username or password.");
      } else if (res.status === 404) {
        alert("User not found with this information.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Use your username or email.">
      <form role="form" method="post" className="space-y-5" onSubmit={login}>
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-zinc-700">
            Username or email
          </label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            name="identifier"
            onChange={(e) => setIdentifier(e.target.value)}
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
            value={password}
            name="password"
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
          Sign in
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        No account?{" "}
        <Link href="/signup" className="font-medium text-zinc-900 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Index;
