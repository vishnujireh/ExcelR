// src/lib/courses.ts
export interface Course {
  slug: string;
  title: string;
  shortDescription: string;
  bannerImage: string;
  associtionicon?: string;
  studentsenrolled?: string;
  duration?: string;
  layoutType?: "layout1" | "layout2"; // optional layout type
}

export const courses: Course[] = [
  {
    slug: "data-science-course-training-in-bangalore",
    title: "Data Science Course Training in Bangalore",
    shortDescription: "Certificate from prestigious IITM Pravartak",
    bannerImage: "/IITM_Banner_334.jpg",
    associtionicon:"/IITM.jpg",
    studentsenrolled:"11,200",
    duration:"6 Months",
    layoutType: "layout1",
  },
  {
    slug: "aws-certification-training",
    title: "Amazon Web Services (AWS) Certification Training",
    shortDescription: "Master AWS Cloud Computing with practical projects.",
   bannerImage: "/IITM_Banner_334.jpg",
    layoutType: "layout2",
  },
  {
    slug: "pmp-certification-course",
    title: "PMP® Certification Course Training",
    shortDescription: "Advance your career with globally recognized PMP® training.",
    bannerImage: "/images/pmp-banner.jpg",
    layoutType: "layout1",
  },
];

export function getCourseData(slug: string): Course | undefined {
  return courses.find(
    (course) => course.slug.toLowerCase() === slug.toLowerCase()
  );
}
