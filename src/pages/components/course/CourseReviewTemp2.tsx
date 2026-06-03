import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";
interface CourseReviewProps {
  data: CourseData;
}

export default function CourseReview({ data }: CourseReviewProps) {
 
  if (!data) {
    return (
      <section className="course-banner p-10 text-center bg-gray-100">
        <h1>Course not found</h1>
        <p>The course you are looking for doesn&apos;t exist.</p>
      </section>
    );
  }
 

  return (
    
    <>
    <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 relative">
      
  <>{parse(data.template2_google_reviews ?? "")}</>
    </div>
    
    </>
  );
}
