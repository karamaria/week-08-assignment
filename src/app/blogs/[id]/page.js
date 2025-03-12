import { db } from "@/components/utils/connect";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { redirect } from "next/navigation";
import CommentForm from "@/components/structure/CommentForm";

export default async function Page({ params }) {
  const { id } = params;

  const post = (await db.query(
    `SELECT posts.*, ARRAY_AGG(json_build_object(
        'id', comments.id, 
        'post_id', comments.post_id,   
        'text', comments.text, 
        'created_at', comments.created_at  
      )) FILTER (WHERE comments.id IS NOT NULL) AS comments
    FROM posts
    LEFT JOIN comments ON comments.post_id = posts.id
    WHERE posts.id = $1
    GROUP BY posts.id`,
    [id]
  )).rows[0];

  async function deleteComment(commentId) {
    "use server";
    await db.query("DELETE FROM comments WHERE id = $1", [commentId]);

    redirect(`/blogs/${id}`);
  }

  return (
    <section className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-3xl p-6 border border-green-300 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>
        <p className="text-center mb-4">{post.content}</p>
        <p className="text-center mb-4"><strong>Author:</strong> {post.author}</p>

        <img src={post.image} alt={post.title} className="w-full h-auto mb-4 rounded-md" />

        {post.comments?.map((comment) => (
          <div key={comment.id} className="border-t pt-2 mt-4">
            <p className="text-sm text-green-800">{comment.text}</p>
            <DeleteButton 
              id={comment.id} 
              deleteFunction={deleteComment} 
            />
          </div>
        ))}

        <div className="mt-6">
          <CommentForm id={id} className="max-w-lg mx-auto" />
        </div>
      </div>
    </section>
  );
}
