import { db } from "@/components/utils/connect";
import { redirect } from "next/navigation";

export default function CommentForm({ id }) {

  async function handleCommentSubmit(formData) {
    "use server";
    const comment_text = formData.get('comment_body');

    await db.query(
      `INSERT INTO comments (text, post_id) VALUES ($1, $2)`,
      [comment_text, id]
    );

    redirect(`/blogs/${id}`);
  }

  return (
    <form action={handleCommentSubmit} className="flex flex-col gap-4">
      <textarea 
        name="comment_body" 
        placeholder="Write your comment" 
        className="p-3 border border-mindaro rounded text-raisinBlack placeholder-grey resize-none h-24"
      ></textarea>
      <button 
        type="submit" 
        className="w-full p-3 bg-mindaro text-raisinBlack font-bold rounded hover:bg-[#c0e06b] transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
