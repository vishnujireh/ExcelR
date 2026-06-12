"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { SidebarCategory, fetchCategoryBlogsCount } from "@/redux/slices/blogSlice";
import { LuChevronRight } from "react-icons/lu";

interface SidebarProps {
  activeCategory?: string | string[];
  activeSubcategory?: string | string[];
}

export default function Sidebar({ activeCategory, activeSubcategory }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const sidebarCategories = useSelector(
    (state: RootState) => state.blogs.sidebarCategories
  );

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [visibleCategories,setVisibleCategories] =
useState<SidebarCategory[]>([]);

  // 🔥 Auto-expand category when on subcategory page
useEffect(() => {
  if (activeCategory) {
    setExpandedCategory(activeCategory as string);
    return;
  }

  if (activeSubcategory) {
    const parent = sidebarCategories.find(cat =>
      cat.subcategories.some(sub => sub.baseurl === activeSubcategory)
    );

    if (parent) {
      setExpandedCategory(parent.baseurl);
    }
  }
}, [activeCategory, activeSubcategory, sidebarCategories]);


useEffect(()=>{


const checkCategories = async()=>{


const result = await Promise.all(

 sidebarCategories.map(async(category)=>{


  const res = await dispatch(
    fetchCategoryBlogsCount(
      category.baseurl
    )
  ).unwrap();


  return {
    ...category,
    hasBlogs: res.hasBlogs
  };


 })

);


setVisibleCategories(
 result.filter(
  (item:any)=>item.hasBlogs
 )
);


};


if(sidebarCategories.length){

 checkCategories();

}


},[
 sidebarCategories,
 dispatch
]);


  const toggleCategory = (categorySlug: string) => {
    setExpandedCategory(prev => (prev === categorySlug ? null : categorySlug));
  };

  return (
    <div className="sticky top-20 p-4 rounded-lg">
      {/* <h3 className="font-bold mb-3">Categories</h3> */}

      <ul className="space-y-3 text-sm text-gray-600">
        {visibleCategories.map((category: SidebarCategory) => {
          const hasSubCategories = category.subcategories.length > 0;
          const isExpanded = expandedCategory === category.baseurl;
          const isActiveCat = activeCategory === category.baseurl;

          return (
            <li key={category.id}>
              {/* Category Line */}
              <div
                className={`flex items-center justify-between cursor-pointer hover:text-orange-500 ${
                  isActiveCat ? "text-orange-500 font-medium" : ""
                }`}
                onClick={() => hasSubCategories && toggleCategory(category.baseurl)}
              >
                <Link href={`/blog-category/${category.baseurl}`} className="flex-1">
                  {category.name}
                </Link>

                {hasSubCategories && (
                  <LuChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </div>

              {/* Subcategories */}
              {hasSubCategories && isExpanded && (
                <ul className="ml-4 mt-2 space-y-1 list-disc text-sm">
                  {category.subcategories.map((sub) => {
                    const isActiveSub = activeSubcategory === sub.baseurl;

                    return (
                      <li key={sub.id}>
                        <Link
                          href={`/blog-subcategory/${sub.baseurl}`}
                          className={`block text-sm hover:text-orange-500 ${
                            isActiveSub
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {sub.subcategory}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
