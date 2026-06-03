import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";
import Image from "next/image";
import cnubgImageUrl from "../../../../public/cnubg.svg"
interface CourseWhychooseProps {
  data: CourseData;
}

export default function CourseWhychoose({ data }: CourseWhychooseProps) {
  
 
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
       <div className="block absolute inset-0 -z-10">

    <Image
      src={cnubgImageUrl}
      alt="Artificial Intelligence (AI) Course Training in Thane"
      fill
      priority
      fetchPriority="high"
      sizes="100vw"
      className="object-cover -z-10"
      quality={55}
    />

  </div>
  <>{parse(data.why_excelr ?? "")}</>
    </div>
    
    </>
  );
}
