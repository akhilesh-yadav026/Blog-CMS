import BlogForm from "@/components/admin/BlogForm";

export default function CreateBlogPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Blog
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Write and publish your blog content.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 md:p-8">
        <BlogForm />
      </div>

    </div>
  );
}