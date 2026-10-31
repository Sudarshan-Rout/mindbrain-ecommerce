import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Blog() {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Top 10 Trending Shoes in 2026",
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      description:
        "Discover the latest shoe trends and styles that are popular in 2026.",
      content:
        "Shoes are an important part of fashion. In 2026, sneakers, running shoes, casual shoes and comfortable sports shoes are popular choices. Always choose shoes according to your comfort, style and daily needs."
    },
    {
      id: 2,
      title: "How to Choose the Perfect T-Shirt",
      category: "Clothing",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      description:
        "Learn how to select the perfect T-shirt for your everyday style.",
      content:
        "Choosing the right T-shirt depends on fabric, size, colour and fitting. Cotton T-shirts are comfortable for everyday use. Choose colours and designs that match your personal style."
    },
    {
      id: 3,
      title: "Best Jackets for Winter",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
      description:
        "Explore stylish jackets that keep you warm during winter.",
      content:
        "Winter jackets provide warmth and improve your overall look. Hoodies, denim jackets, leather jackets and puffer jackets are popular options. Choose a jacket based on weather conditions and comfort."
    },
    {
      id: 4,
      title: "Latest Fashion Trends in 2026",
      category: "Trends",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
      description:
        "Explore the latest fashion trends and upgrade your wardrobe.",
      content:
        "Fashion keeps changing with time. Casual outfits, oversized T-shirts, sneakers and minimal designs are popular fashion choices. You can create your own style by combining comfortable and trendy clothes."
    },
    {
      id: 5,
      title: "Smart Shopping Tips",
      category: "Shopping",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600",
      description:
        "Follow these simple tips to enjoy a better online shopping experience.",
      content:
        "Before purchasing any product, compare prices, check product details and read customer reviews. Always check the size guide, return policy and available discounts. Smart shopping helps you save money and choose better products."
    }
  ];

  return (
    <div className="blog-container">

      {selectedBlog ? (
        <div className="blog-detail">

          <img
            src={selectedBlog.image}
            alt={selectedBlog.title}
          />

          <span className="blog-category">
            {selectedBlog.category}
          </span>

          <h1>{selectedBlog.title}</h1>

          <p>{selectedBlog.content}</p>

          <button onClick={() => setSelectedBlog(null)}>
            ← Back to Blogs
          </button>

        </div>
      ) : (
        <>
          <div className="blog-header">
            <h1>Our Blog</h1>
            <p>
              Explore fashion trends, shopping tips and the
              latest styles. Stay updated with our latest blogs!
            </p>
          </div>

          <div className="blog-grid">

            {blogs.map((blog) => (
              <div className="blog-card" key={blog.id}>

                <img
                  src={blog.image}
                  alt={blog.title}
                />

                <div className="blog-card-content">

                  <span className="blog-category">
                    {blog.category}
                  </span>

                  <h2>{blog.title}</h2>

                  <p>{blog.description}</p>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Read More →
                  </button>

                </div>

              </div>
            ))}

          </div>

          <button
            className="blog-home"
            onClick={() => navigate("/dashboard")}
          >
            Back to Home
          </button>
        </>
      )}

    </div>
  );
}

export default Blog;