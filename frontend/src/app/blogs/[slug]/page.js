import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import BlogContent from "@/components/blog/BlogContent";

async function getBlog(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Blog details error:", error);
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.title,
    openGraph: {
      title: blog.title,
      type: "article",
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Blog Header */}
      <section className="border-b bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-14">

          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </Link>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={17} />

            {new Date(blog.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>

        </div>
      </section>

      {/* Blog Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">

        <BlogContent content={blog.description} />

      </article>

    </main>
  );
}
