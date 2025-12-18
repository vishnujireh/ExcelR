export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  categorySlug: string;
  subCategory?: string;      // Optional
  subCategorySlug?: string;  // Optional
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Statistical Analysis for Data Science [6 Step Framework]",
    slug: "data-science-statistical-analysis",
    category: "Data Science",
    categorySlug: "data-science",
    subCategory: "Machine Learning",
    subCategorySlug: "machine-learning",
    description: "Learn the basics of statistical analysis in data science and practical use cases...",
    date: "2024-01-10",
    image: "/ultimateguide.jpg",
  },
  {
    id: "2",
    title: "Supervised vs Unsupervised Learning",
    slug: "supervised-vs-unsupervised",
    category: "Data Science",
    categorySlug: "data-science",
    subCategory: "Machine Learning",
    subCategorySlug: "machine-learning",
    description: "Learn the difference between supervised and unsupervised learning techniques...",
    date: "2024-01-20",
    image: "/images/blog4.jpg",
  },
  {
    id: "3",
    title: "Neural Networks Explained",
    slug: "neural-networks-explained",
    category: "Data Science",
    categorySlug: "data-science",
    subCategory: "Machine Learning",
    subCategorySlug: "machine-learning",
    description: "An introduction to neural networks and backpropagation...",
    date: "2024-02-05",
    image: "/images/blog5.jpg",
  },
  {
    id: "4",
    title: "AI vs ML vs DL",
    slug: "ai-vs-ml-vs-dl",
    category: "Data Science",
    categorySlug: "data-science",
    // ❌ No subcategory
    description: "Understanding the differences between AI, Machine Learning, and Deep Learning...",
    date: "2024-01-15",
    image: "/images/blog2.jpg",
  },
  {
    id: "5",
    title: "What is DevOps?",
    slug: "what-is-devops",
    category: "DevOps",
    categorySlug: "devops",
    description: "Learn DevOps fundamentals and CI/CD process...",
    date: "2024-02-01",
    image: "/images/blog3.jpg",
  },
  // More blogs...
];
