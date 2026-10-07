import Link from "next/link";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-zinc-900 transition hover:text-zinc-600"
        >
          Auth
        </Link>
      </div>
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
