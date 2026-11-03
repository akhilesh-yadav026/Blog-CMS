const slugify = require("slugify");
const Blog = require("../models/blogs.model.js");

const generateUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (!baseSlug) {
    throw new Error("Please provide a valid blog title");
  }

  let slug = baseSlug;
  let count = 1;

  while (true) {
    const query = { slug };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingBlog = await Blog.findOne(query);

    if (!existingBlog) {
      return slug;
    }

    slug = `${baseSlug}-${count}`;
    count++;
  }
};

module.exports = generateUniqueSlug;