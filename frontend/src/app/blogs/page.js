import BlogCard from "@/components/blog/BlogCard";

async function getBlogs() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error("Blog fetching error:", error);
    return null;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gray-950 px-6 py-20 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          Our Blog
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Explore our latest articles, tutorials and insights.
        </p>
      </section>

      {/* Blog Listing */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        {blogs === null ? (
          <div className="py-16 text-center">
            <p className="text-red-500">
              Unable to load blogs. Please try again later.
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              No blogs available
            </h2>

            <p className="mt-2 text-gray-500">
              Check back later for new articles.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Latest Articles
              </h2>

              <p className="mt-2 text-gray-500">
                {blogs.length} articles available
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                />
              ))}
            </div>
          </>
        )}

      </section>

    </main>
  );
}
