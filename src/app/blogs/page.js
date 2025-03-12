import { db } from "@/components/utils/connect";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
  const { sortBy } = searchParams || {};

  const posts = (await db.query("SELECT * FROM posts")).rows;

  async function deletePost(postId) {
    "use server";
    await db.query("DELETE FROM posts WHERE id = $1", [postId]);

    redirect("/blogs");
  }

  if (sortBy === "asc") {
    posts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "desc") {
    posts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-green-800 mt-12">Posts</h1>
      
      <div className="flex flex-row gap-2 mt-4">
        <p className="font-bold text-green-800">Sort Posts:</p>
        <Link href="/blogs" className="text-green-800 hover:underline">Remove Filters</Link>
        <Link href="/blogs?sortBy=asc" className="text-green-800 hover:underline">Asc</Link>
        <Link href="/blogs?sortBy=desc" className="text-green-800 hover:underline">Desc</Link>
      </div>

      <div className="flex gap-4 overflow-x-auto mt-4 ml-4">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col min-w-[300px] max-w-[350px] p-4 border border-green-300 rounded-lg">
            
            {post.image && (
              <Link href={`/blogs/${post.id}`}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[200px] object-cover mb-4 rounded-md cursor-pointer" 
                />
              </Link>
            )}
            
            <Link href={`/blogs/${post.id}`}>
              <h2 className="text-xl font-semibold text-green-800 mb-2 cursor-pointer hover:underline">
                {post.title}
              </h2>
            </Link>

            {post.author && (
              <p className="text-green-800 mb-4"><strong>Author:</strong> {post.author}</p>
            )}

            <p className="text-green-800 mb-4 line-clamp-3">{post.content}</p>

            <DeleteButton deleteFunction={deletePost} id={post.id} />

            {post.comments && post.comments.length > 0 ? (
              <ul className="mt-2 border-t pt-2">
                {post.comments.map((comment) => (
                  <li key={comment.id} className="text-sm text-green-800 italic">
                    {comment.text}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
