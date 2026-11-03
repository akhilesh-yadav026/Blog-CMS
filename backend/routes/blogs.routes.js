const express =  require("express")
const {
createBlog,
getAllBlogs,
getBlogBySlug,
getBlogById,
updateBlog,
deleteBlog,
getAllAdminBlogs} = require("../controllers/blogs.controller.js")

const router =  express.Router()

// router.get("/test", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Blog API working successfully",
//   });
// });

router.post("/create", createBlog)
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Admin Route 
router.get("/admin/all", getAllAdminBlogs);
router.get("/admin/:id", getBlogById);

module.exports = router