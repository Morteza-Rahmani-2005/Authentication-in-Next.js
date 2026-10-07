import Link from "next/link";

export default function PageHeader({ title, description }) {
  return (
    <header className="border-b border-zinc-200/80 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
          >
            ← Home
          </Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
