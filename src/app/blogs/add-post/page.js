import { redirect } from 'next/navigation';
import { db } from "@/components/utils/connect";

export default function Page() {

  async function handleSubmit(formData) {
    "use server";
    const { title, author, content, image } = Object.fromEntries(formData);

    await db.query(
      `INSERT INTO posts (title, author, content, image) VALUES ($1, $2, $3, $4)`,
      [title, author, content, image]
    );
    
    redirect(`/blogs`);
  }

  return (
    <div className="max-w-lg mx-auto bg-auburn p-6 rounded-lg shadow-lg border mborder-mindaro t-40">
      <h2 className="text-2xl font-bold text-mindaro mb-4 text-center">Add a New Post</h2>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          className="p-3 border border-mindaro rounded text-raisinBlack placeholder-grey"
        />
        <input 
          type="text" 
          name="author" 
          placeholder="Author" 
          className="p-3 border border-mindaro rounded text-raisinBlack placeholder-grey"
        />
        <textarea 
          name="content" 
          placeholder="Content" 
          className="p-3 border border-mindaro rounded text-raisinBlack placeholder-grey resize-none h-24"
        ></textarea>
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          className="p-3 border border-mindaro rounded text-raisinBlack placeholder-grey"
        />
        <button 
          type="submit" 
          className="w-full p-3 bg-mindaro text-raisinBlack font-bold rounded hover:bg-[#c0e06b] transition-colors"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
