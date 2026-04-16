import { Link } from "react-router-dom";
import { format } from "date-fns";

const BlogCard = ({ blog }) => {
    return (
        <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            {blog.image && (
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                    {format(new Date(blog.createdAt), "MMM dd, yyyy")} • {blog.author}
                </div>
                <h3 className="text-xl font-playfair font-bold mb-3 hover:text-secondary transition">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <Link
                    to={`/blog/${blog.slug}`}
                    className="text-secondary font-semibold hover:text-primary transition inline-flex items-center gap-2"
                >
                    Read More →
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
