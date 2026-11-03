"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function BlogForm({
  mode = "create",
  blogId,
  initialData = null,
}) {
  const router = useRouter();

  const [title, setTitle] = useState(
    initialData?.title || ""
  );

  const [description, setDescription] = useState(
    initialData?.description || {
      type: "doc",
      content: [{ type: "paragraph" }],
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getText = (node) => {
    if (node.type === "text") {
      return node.text || "";
    }

    return (node.content || [])
      .map(getText)
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Blog title is required");
      return;
    }

    if (!getText(description).trim()) {
      setError("Blog description is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: title.trim(),
        description,
      };

      let response;

      if (mode === "edit") {
        response = await api.put(
          `/blogs/${blogId}`,
          payload
        );
      } else {
        response = await api.post(
          "/blogs/create",
          payload
        );
      }

      if (response.data.success) {
        router.push("/admin/blogs");
        router.refresh();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Blog Title *
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Blog Description *
        </label>

        <RichTextEditor
          content={description}
          onChange={setDescription}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg bg-gray-600 border px-5 py-2.5 text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-2.5 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "edit"
              ? "Update Blog"
              : "Publish Blog"}
        </button>

      </div>

    </form>
  );
}