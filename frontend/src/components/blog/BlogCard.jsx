import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
  const getPlainText = (node) => {
    if (!node) return "";

    if (node.type === "text") {
      return node.text || "";
    }

    return (node.content || [])
      .map(getPlainText)
      .join(" ");
  };

  const excerpt = getPlainText(blog.description);

  return (
    <article className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-lg">

      <div className="p-6">

        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={15} />

          {new Date(blog.createdAt).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </div>

        <h2 className="mb-3 text-xl font-bold text-gray-900 transition group-hover:text-blue-600">
          {blog.title}
        </h2>

        <p className="mb-6 line-clamp-3 text-sm leading-7 text-gray-600">
          {excerpt}
        </p>

        <Link
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          Read More

          <ArrowRight
            size={17}
            className="transition group-hover:translate-x-1"
          />
        </Link>

      </div>

    </article>
  );
}