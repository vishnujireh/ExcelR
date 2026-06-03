import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";
interface CoursePlacementProps {
  data: CourseData;
}

export default function CoursePlacement({ data }: CoursePlacementProps) {
  
 
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
    <>{parse(data.extra_info ?? "")}</>
    </>
  );
}
