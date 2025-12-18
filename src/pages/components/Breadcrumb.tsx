import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

interface BreadcrumbProps {
  courseName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ courseName }) => {
  const router = useRouter();

  // ⭐ Get sidebar categories from Redux
  const sidebarCategories = useSelector(
    (state: any) => state.blogs.sidebarCategories
  );

  const pathname = router.asPath.split("?")[0];
  const segments = pathname.split("/").filter(Boolean);

  // Helper: Find parent category for a subcategory slug
  const getParentCategory = (subcategorySlug: string) => {
    for (const cat of sidebarCategories) {
      const match = cat.subcategories.find(
        (sub: any) => sub.baseurl === subcategorySlug
      );
      if (match) return { categoryName: cat.name, categorySlug: cat.baseurl };
    }
    return null;
  };

  let crumbs: { name: string; href?: string }[] = [];

  // ✅ Example course breadcrumb usage
  if (segments[0] === "course-detail" && courseName) {
    crumbs = [
      { name: "Courses", href: "/courses" },
      { name: courseName },
    ];
  }

  // -------------------------
  // CASE 1: Blog Category Page
  // URL → /blog-category/[category]
  // -------------------------
  if (segments[0] === "blog-category") {
    const categorySlug = segments[1];
    const category = sidebarCategories.find(
      (c: any) => c.baseurl === categorySlug
    );

    crumbs = [
      { name: "Blog", href: "/blogs" },
      { name: category ? category.name : categorySlug.replace(/-/g, " ") },
    ];
  }

  // -------------------------
  // CASE 2: Blog Subcategory Page
  // URL → /blog-subcategory/[subcategory]
  // -------------------------
  else if (segments[0] === "blog-subcategory") {
    const subSlug = segments[1];
    const parent = getParentCategory(subSlug);

    crumbs = [
      { name: "Blog", href: "/blogs" },
      parent
        ? { name: parent.categoryName, href: `/blog-category/${parent.categorySlug}` }
        : { name: "Category" },
      {
        name: subSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      },
    ];
  }

  /* =====================================================
     ✅ ✅ ✅ CASE 3: NEWS EVENT DETAIL PAGE (NEW LOGIC)
     URL → /news-event-detail/[slug]
     REQUIRED:
     Home > News & Events > Event Title
  ===================================================== */
  else if (segments[0] === "news-event-detail") {
    const titleSlug = segments[1];

    crumbs = [
      { name: "News & Events", href: "/news-events" },
      {
        name: titleSlug
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      },
    ];
  }

   /* =====================================================
     ✅ ✅ ✅ CASE 3: NEWS EVENT DETAIL PAGE (NEW LOGIC)
     URL → /news-event-detail/[slug]
     REQUIRED:
     Home > News & Events > Event Title
  ===================================================== */
  else if (segments[0] === "news-event-category") {
    const titleSlug = segments[1];

    crumbs = [
      { name: "News & Events", href: "/news-events" },
      {
        name: titleSlug
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      },
    ];
  }

  // -------------------------
  // CASE 3: Everything Else (existing logic)
  // -------------------------
  else {
    crumbs = segments.map((segment, idx) => {
      const isLast = idx === segments.length - 1;
      const name = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      const href = "/" + segments.slice(0, idx + 1).join("/");

      return { name, href: isLast ? undefined : href };
    });
  }

  return (
    <div className="w-full md:mx-auto md:py-3 2xl:px-25 xl:px-20 lg:px-10 p-5">
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-blue-600">
              Home
            </Link>
          </li>

          {crumbs.map((crumb, idx) => (
            <li key={idx} className="flex items-center">
              <span className="mx-2">/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="text-blue-600">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-gray-500">{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
