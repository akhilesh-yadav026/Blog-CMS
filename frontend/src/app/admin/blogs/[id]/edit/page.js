"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(
          `/blogs/admin/${id}`
        );

        setBlog(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Unable to fetch blog"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-gray-500">
        Loading blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Blog
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update your existing blog content.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 md:p-8">

        <BlogForm
          key={blog._id}
          mode="edit"
          blogId={blog._id}
          initialData={blog}
        />

      </div>

    </div>
  );
}