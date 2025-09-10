import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Existing THEME: (used for easy theme extension)
const THEME = {
  primary: "#1a2b57",
  secondary: "#acc6ff",
  accent: "#e5eeff",
  gradient: "bg-gradient-to-b from-white to-gray-50",
};

// Mock categories list
const categoriesList = [
  "Loan Approval",
  "Home Loans",
  "Subsidy",
  "Business",
  "Education",
  "Personal Loans",
  "Tips & Tools",
];

// Mock author images
const authorsImages = {
  "Rahul Singh": "/lovable-uploads/author-rahul.png",
  "Neha Sharma": "/lovable-uploads/author-neha.png",
  "Akash Rao": "/lovable-uploads/author-akash.png",
};

// Mock sample blog posts
const samplePosts = [
  {
    id: "1",
    title: "Step-by-Step Guide to Home Loan Approval",
    excerpt: "Learn how to get your home loan approved quickly with practical tips and required documents explained in detail.",
    author: "Rahul Singh",
    date: "2025-08-14T10:30:00Z",
    tags: ["Home Loans", "Loan Approval", "Tips & Tools"],
    readMins: 5,
  },
  {
    id: "2",
    title: "Subsidy Schemes for First-Time Home Buyers",
    excerpt: "Explore the latest government subsidy schemes for affordable housing and how to apply for them effectively.",
    author: "Neha Sharma",
    date: "2025-07-26T08:15:00Z",
    tags: ["Subsidy", "Home Loans"],
    readMins: 4,
  },
  {
    id: "3",
    title: "Business Loan Success Stories: Tips from Entrepreneurs",
    excerpt: "Hear from business owners who secured loans, and get actionable advice to prepare your own application successfully.",
    author: "Akash Rao",
    date: "2025-06-02T14:45:00Z",
    tags: ["Business", "Loan Approval", "Tips & Tools"],
    readMins: 6,
  },
  {
    id: "4",
    title: "Educational Loan Trends in 2025",
    excerpt: "Stay updated on the latest education loan opportunities for students and families, including new schemes and eligibility.",
    author: "Rahul Singh",
    date: "2025-08-01T17:55:00Z",
    tags: ["Education", "Personal Loans", "Tips & Tools"],
    readMins: 5,
  },
  {
    id: "5",
    title: "Maximise Personal Loan Benefits: What You Need to Know",
    excerpt: "Discover how to get the best rates and features for your personal loan, plus smart repayment strategies.",
    author: "Neha Sharma",
    date: "2025-07-16T09:40:00Z",
    tags: ["Personal Loans", "Tips & Tools"],
    readMins: 4,
  },
  {
    id: "6",
    title: "New Business Possibilities with SME Loans",
    excerpt: "Find out what makes SME loans unique, and how small businesses can leverage these for expansion and innovation.",
    author: "Akash Rao",
    date: "2025-06-22T12:25:00Z",
    tags: ["Business", "Loan Approval"],
    readMins: 7,
  },
];

// Utility to format date for blog articles
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const postsPerPage = 6;

  // Filter posts by search and category
  const filteredPosts = useMemo(() => {
    return samplePosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        !selectedCategory || post.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calculate total pages based on filtered posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Paginate posts for current page
  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIdx, startIdx + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  function goToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }

  function onCategoryClick(category) {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1);
  }

  return (
    <>
      {/* Header */}
      <Header />
      {/* Main content */}
      <div
        className={`${THEME.gradient} min-h-screen p-8 md:p-16 font-sans`}
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Content Section */}
          <section className="lg:w-4/5 space-y-10">
            <header className="mb-10 text-center lg:text-left">
              <h1 className="text-5xl font-extrabold text-[#1a2b57]">
                Loans & Finance Blog
              </h1>
              <p className="mt-3 max-w-lg text-gray-600">
                Latest articles, guides, and tools — futuristic and practical.
              </p>
            </header>

            {/* Search Input */}
            <div className="mb-6">
              <input
                type="search"
                aria-label="Search articles"
                placeholder="Search loans, subsidy, home..."
                className="w-full rounded-md border border-[#acc6ff] px-4 py-3 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1a2b57]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categoriesList.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => onCategoryClick(category)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition 
                      ${
                        isSelected
                          ? "bg-[#1a2b57] text-white shadow-lg"
                          : "bg-[#e5eeff] text-[#1a2b57] hover:bg-[#c0d1fa]"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Blog Cards */}
            {paginatedPosts.length ? (
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg border border-transparent hover:border-[#e8efff] transition cursor-pointer flex flex-col justify-between"
                  >
                    {/* Title and excerpt */}
                    <div className="mb-5">
                      <h2 className="text-xl font-semibold text-[#0f1834] mb-3">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                    </div>

                    {/* Author Row */}
                    <div className="flex items-center gap-3">
                      <img
                        className="rounded-full w-12 h-12 object-cover border border-[#acc6ff]"
                        alt={post.author}
                        src={authorsImages[post.author] || "https://via.placeholder.com/48"}
                        loading="lazy"
                      />
                      <div className="flex flex-col text-sm text-gray-500">
                        <span>
                          By{" "}
                          <strong className="text-gray-700">{post.author}</strong>
                        </span>
                        <span>
                          {formatDateTime(post.date)} • {post.readMins} min read
                        </span>
                      </div>
                    </div>

                    {/* Tags and Read More */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#1a2b57] text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="px-6 py-2 rounded-xl border text-[#1a2b57] border-[#acc6ff] hover:bg-[#acc6ff] hover:text-white font-semibold transition whitespace-nowrap">
                        Read Article
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-24 text-lg font-medium">
                No articles found matching your criteria.
              </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex justify-center gap-3 mt-14 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#1a2b57] text-white hover:bg-[#122148]"
                  }`}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-md font-semibold ${
                        isActive
                          ? "bg-[#3554aa] text-white"
                          : "bg-[#a1c1ff] text-[#3554aa] hover:bg-[#6381fa]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#1a2b57] text-white hover:bg-[#122148]"
                  }`}
                >
                  Next
                </button>
              </nav>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:w-1/5 w-full sticky top-24 max-h-[75vh] overflow-y-auto bg-white p-6 rounded-3xl shadow border border-[#f0f4ff]">
            <h3 className="text-[#1a2b57] text-xl font-bold mb-5">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((cat) => (
                <button
                  onClick={() => onCategoryClick(cat)}
                  key={cat}
                  className={`px-3 py-1 rounded-full cursor-pointer font-semibold text-sm transition ${
                    selectedCategory === cat
                      ? "bg-[#1a2b57] text-white shadow-lg"
                      : "bg-[#e5eeff] text-[#1a2b57] hover:bg-[#c0d1fa]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-10 pt-4 border-t border-[#e6ecf9] text-center">
              <p className="text-gray-700 mb-3 font-medium">Need Expert Loan Help?</p>
              <button
                className="w-full bg-[#1a2b57] text-white py-3 rounded-lg font-semibold hover:bg-[#122148] transition"
                aria-label="Get Loan Assistance"
              >
                Get Assistance
              </button>
              <p className="mt-6 text-xs text-gray-400">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}
