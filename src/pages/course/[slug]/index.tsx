// app/course/[slug]/page.tsx
import React from 'react';
import Layout1 from '../layouts/Layout1';
import Layout2 from '../layouts/Layout2';
import { serverApiGet } from '../../../redux/api/apiClient';
import { CourseData } from '../../../redux/slices/courseSlice';
import Head from "next/head";

interface LayoutProps {
  data: CourseData;
}

// API Response types
interface ApiResponse {
  status: boolean;
  data: ApiData;
}

interface ApiData {
  course_pmenu: any[];
  course_details: CourseData[];
  popular_courses?: any [];
  our_clients?: any[];
  sticky_section?: any;
  rating?: any;
  footer?: any;
}

type PageProps = {
  courseData?: CourseData | null;
  error?: string | null;
};

export default function CoursePage({ courseData, error }: PageProps) {
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">No course data found</p>
      </div>
    );
  }

  const layouts: Record<string, React.ComponentType<LayoutProps>> = {
    layout1: Layout1,
    layout2: Layout2,
  };

  const layoutType = courseData.template === '1' ? 'layout1' : 'layout2';
  const LayoutComponent = layouts[layoutType] || Layout1;

  return (
    <>
      <Head>
        <title>{courseData.meta_title || courseData.title}</title>
        <meta
          name="description"
          content={courseData.meta_description || courseData.description}
        />
        <meta
          name="keywords"
          content={courseData.meta_keyword || ''}
        />
      </Head>
      <LayoutComponent data={courseData} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const params = context?.params;
  const slug = params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  try {
    const response = await serverApiGet<ApiResponse>(`/course_details/${slug}`);

    if (
      !response?.status ||
      !response?.data?.course_details ||
      response.data.course_details.length === 0
    ) {
      return { notFound: true };
    }

    // ✅ Merge all needed sections into courseData
    const courseData: CourseData = {
      ...response.data.course_details[0],
      sticky_section: response.data.sticky_section,
      rating: response.data.rating,
      footer: response.data.footer,
      popular_courses: response.data.popular_courses || [],
      our_clients: response.data.our_clients || [],
    };

    return {
      props: {
        courseData,
      },
    };
  } catch (err: any) {
    console.error('getServerSideProps course fetch error:', err);
    return {
      props: {
        courseData: null,
        error: err?.message || 'Failed to fetch course data',
      },
    };
  }
}
