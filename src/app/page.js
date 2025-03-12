import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-green-50 p-8 max-w-3xl mx-auto text-center mt-6 flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-green-800 mb-4">
        Discover Cool Facts About Pandas
      </h1>
      <p className="text-lg text-green-600 mb-6">
        Welcome to our website, where we share captivating articles about the animal kingdom, including everything you ever wanted to know about pandas!
      </p>
      <Link href="/blogs">
        <span className="inline-block bg-green-500 text-white text-lg font-semibold py-2 px-6 cursor-pointer">
          Explore More
        </span>
      </Link>
    </div>
  );
}
