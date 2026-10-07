import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Component {...pageProps} />
    </div>
  );
}
