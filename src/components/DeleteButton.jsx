"use client";

export default function DeleteButton({ deleteFunction, id }) {
  return (
    <button
      onClick={() => deleteFunction(id)}
      className="bg-red-500 text-white p-2 rounded"
    >
      Delete
    </button>
  );
}
