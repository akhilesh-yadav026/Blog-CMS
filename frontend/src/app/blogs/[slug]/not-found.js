import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">

      <h1 className="text-6xl font-bold text-gray-900">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Blog Not Found
      </h2>

      <p className="mt-3 text-gray-500">
        Sorry, the blog you're looking for doesn't exist.
      </p>

      <Link
        href="/blog"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Back to Blogs
      </Link>

    </div>
  );
}