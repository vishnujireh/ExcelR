import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Breadcrumb = () => {
  const router = useRouter();
  const pathname = router.asPath.split("?")[0]; // remove query params
  const pathSegments = pathname.split("/").filter(Boolean); // ["courses", "react"]

  const crumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/");
    const name = segment.replace(/-/g, " ");
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    return { name: displayName, href };
  });

  return (
     <div className="w-full md:mx-auto md:py-3 2xl:px-25 xl:px-20 lg:px-10 p-5">
    <nav aria-label="breadcrumb" className="text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={idx} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="text-blue-600 hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </div>
  );
};

export default Breadcrumb;
