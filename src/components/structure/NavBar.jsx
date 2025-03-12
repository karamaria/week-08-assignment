import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-raisinBlack p-4 border-b-4 border-green-800 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-mindaro rounded-full"></div>
        <h1 className="text-2xl font-bold text-mindaro">Pandas🐼World</h1>
      </div>
      <div className="flex gap-6 text-lg">
        <Link href="/" className="text-green-800 hover:text-mindaro transition-colors">
          Home
        </Link>
        <Link href="/blogs/add-post" className="text-green-800 hover:text-mindaro transition-colors">
          Add Post
        </Link>
        <Link href="/blogs" className="text-green-800 hover:text-mindaro transition-colors">
          Blog
        </Link>
      </div>
    </nav>
  );
}