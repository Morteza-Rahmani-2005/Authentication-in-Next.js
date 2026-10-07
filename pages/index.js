import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinkClass =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900";

function Index() {
  const route = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState();

  useEffect(function () {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me");

      if (res.status === 200) {
        const data = await res.json();
        setUserData(data.user);
        setIsLogin(true);
      }
    };

    userAuth();
  }, []);

  const signout = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();

    if (res.status === 200) {
      setIsLogin(false);
      setUserData(false);
      route.replace("/");
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-200/80 bg-white">
        <div className="border-b border-zinc-200/80 px-5 py-6">
          <p className="text-lg font-semibold tracking-tight text-zinc-900">
            Auth
          </p>
          <p className="mt-1 text-xs text-zinc-500">Minimal access control</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {isLogin ? (
            <>
              <Link href="/dashboard" className={navLinkClass}>
                Dashboard
              </Link>
              <button type="button" onClick={signout} className={`${navLinkClass} w-full text-left`}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className={navLinkClass}>
                Sign in
              </Link>
              <Link href="/signup" className={navLinkClass}>
                Sign up
              </Link>
            </>
          )}
          {userData?.role == "ADMIN" ? (
            <Link href="/p-admin" className={navLinkClass}>
              Admin panel
            </Link>
          ) : (
            ""
          )}
        </nav>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center px-8 py-16">
        <div className="max-w-lg text-center">
          {isLogin ? (
            <>
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                Signed in
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
                Hello, {userData?.firstname}
              </h2>
              <p className="mt-3 text-zinc-500">
                Open your dashboard or admin tools from the sidebar.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                Welcome
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
                Sign in to get started
              </h2>
              <p className="mt-3 text-zinc-500">
                Create an account or sign in to access protected pages.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/signin"
                  className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Index;
