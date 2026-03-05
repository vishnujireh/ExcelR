// app/course/[slug]/page.tsx
import React from 'react';
import Layout1 from './layouts/Layout1';
import Layout2 from './layouts/Layout2';
import { serverApiGet } from '../../redux/api/apiClient';
import { CourseData } from '../../redux/slices/courseSlice';
import Meta from '@/pages/components/Meta';
import Footer from '@/pages/components/Footer';
 
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

const normalizeIp = (raw?: string) => {
  const value = (raw || "").trim();
  if (!value) return "";

  const bracketMatch = value.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (bracketMatch?.[1]) return bracketMatch[1];

  if (value.includes(".") && value.includes(":")) {
    const idx = value.lastIndexOf(":");
    const maybeIp = value.slice(0, idx);
    const maybePort = value.slice(idx + 1);
    if (/^\d+$/.test(maybePort)) {
      return maybeIp;
    }
  }

  if (value.toLowerCase().startsWith("::ffff:")) {
    return value.slice(7);
  }

  return value;
};

const isPrivateOrLocalIp = (ip: string) => {
  const v = ip.toLowerCase();
  if (!v) return true;

  if (v === "::1" || v === "::" || v === "0.0.0.0") return true;
  if (v.startsWith("127.") || v.startsWith("10.") || v.startsWith("192.168.")) {
    return true;
  }
  if (v.startsWith("172.")) {
    const second = Number(v.split(".")[1] || "-1");
    if (second >= 16 && second <= 31) return true;
  }
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80")) {
    return true;
  }

  return false;
};

const resolveRequestIp = async (context: any) => {
  const req = context?.req;
  const getHeaderValue = (header: any): string => {
    if (typeof header === "string") return header;
    if (Array.isArray(header)) return header[0] || "";
    return "";
  };

  const protoHeader = getHeaderValue(req?.headers?.["x-forwarded-proto"]);
  const protocol = (protoHeader.split(",")[0] || "http").trim();
  const host = getHeaderValue(req?.headers?.host).trim();

  if (host) {
    try {
      const localIpRes = await fetch(`${protocol}://${host}/nextapi/client-ip`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "x-forwarded-for": getHeaderValue(req?.headers?.["x-forwarded-for"]),
          "x-real-ip": getHeaderValue(req?.headers?.["x-real-ip"]),
          "x-client-ip": getHeaderValue(req?.headers?.["x-client-ip"]),
          "true-client-ip": getHeaderValue(req?.headers?.["true-client-ip"]),
          "cf-connecting-ip": getHeaderValue(req?.headers?.["cf-connecting-ip"]),
        },
      });

      if (localIpRes.ok) {
        const localIpData = await localIpRes.json();
        const localIp = normalizeIp(localIpData?.ip || "");
        if (localIp && !isPrivateOrLocalIp(localIp)) {
          return localIp;
        }
      }
    } catch {
      // fallback below
    }
  }

  const xClientIpHeader = req?.headers?.["x-client-ip"];
  const xClientIp = normalizeIp(
    typeof xClientIpHeader === "string" ? xClientIpHeader : ""
  );

  const forwardedHeader = req?.headers?.["x-forwarded-for"];
  const forwardedRaw =
    typeof forwardedHeader === "string"
      ? forwardedHeader
      : Array.isArray(forwardedHeader)
      ? forwardedHeader[0]
      : "";
  const forwardedIp = normalizeIp(forwardedRaw.split(",")[0] || "");

  const xRealIpHeader = req?.headers?.["x-real-ip"];
  const xRealIp = normalizeIp(
    typeof xRealIpHeader === "string" ? xRealIpHeader : ""
  );

  const remoteIp = normalizeIp(req?.socket?.remoteAddress || "");

  let ipAddress = xClientIp || forwardedIp || xRealIp || remoteIp;

  if (!ipAddress || isPrivateOrLocalIp(ipAddress)) {
    try {
      const ipRes = await fetch("https://api64.ipify.org?format=json", {
        method: "GET",
        cache: "no-store",
      });
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        const externalIp = normalizeIp(ipData?.ip || "");
        if (externalIp && !isPrivateOrLocalIp(externalIp)) {
          ipAddress = externalIp;
        } else {
          ipAddress = "";
        }
      } else {
        ipAddress = "";
      }
    } catch {
      ipAddress = "";
    }
  }

  return ipAddress || "";
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
       <Meta
  title={courseData.meta_title}
  description={courseData.meta_description}
  keywords={courseData.meta_keyword}
  ogImage={courseData.course_image ?
    `https://www.excelr.com/uploads/course/${courseData.course_image}` : undefined}
  schema={courseData.schema_field?.replace(/<\/?script[^>]*>/g, "")}
/>
      <LayoutComponent data={courseData} />
      <Footer footerHtml={courseData.footer_course || null} />
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
    const ipAddress = await resolveRequestIp(context);
    const response = await serverApiGet<ApiResponse>(`/course_details/${slug}`, {
      ip_address: ipAddress,
    });

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
      footerHtml: response.data.course_details[0].footer_course,
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
