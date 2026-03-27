"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, body }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
        return;
      }

      const data = await res.json();

      console.log(data);

      window.location.href = `${process.env.NEXT_PUBLIC_NEWS_SITE_URL}/articles/${data.slug}`;
    } catch (err) {
      console.error(err);
      alert("Error creating article");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add New Article</h1>
      <div>
        <p>
          Create a new article by filling out the title, author and body fields
          below.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add New Article"}
        </button>
      </form>
    </div>
  );
}
