"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/blogs/admin/all");

      setBlogs(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to fetch blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}`);

      setBlogs((prev) =>
        prev.filter((blog) => blog._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete blog"
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            All Blogs
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your blog content
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
        >
          <Plus size={18} />
          Create Blog
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Total Blogs
            </p>

            <FileText className="text-blue-600" />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {blogs.length}
          </h2>
        </div>
      </div>

      {/* Blog Table */}
      <div className="overflow-hidden rounded-xl border bg-white">

        <div className="border-b px-5 py-4">
          <h2 className="font-semibold text-gray-800">
            Blog Management
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading blogs...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500">
            {error}
            <button
              onClick={fetchBlogs}
              className="ml-3 underline"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No blogs found.
            </p>

            <Link
              href="/admin/blogs/create"
              className="mt-3 inline-block text-blue-600"
            >
              Create your first blog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">

              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Slug</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {blogs.map((blog) => (
                  <tr key={blog._id}>

                    <td className="px-5 py-4 font-medium text-gray-900">
                      {blog.title}
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {blog.slug}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {blog.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
                          title="Edit"
                        >
                          <Pencil
                            size={17}
                            className="text-blue-600"
                          />
                        </Link>

                        {blog.status === "published" && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            title="View"
                          >
                            <Eye
                              size={18}
                              className="text-green-600"
                            />
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(blog._id)}
                          title="Delete"
                        >
                          <Trash2
                            size={17}
                            className="text-red-600"
                          />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}