import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet } from '../api/apiClient';

const isPrivateOrLocalIp = (ip: string) => {
  const v = (ip || "").trim().toLowerCase();
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

const resolveClientIp = async () => {
  if (typeof window !== "undefined") {
    try {
      const localIpRes = await fetch("/nextapi/client-ip", {
        method: "GET",
        cache: "no-store",
      });
      if (localIpRes.ok) {
        const localIpData = await localIpRes.json();
        const localIp = (localIpData?.ip || "").trim();
        if (localIp && !isPrivateOrLocalIp(localIp)) {
          return localIp;
        }
      }
    } catch {
      // fallback to third-party resolver
    }
  }

  try {
    const ipRes = await fetch("https://api64.ipify.org?format=json", {
      method: "GET",
      cache: "no-store",
    });
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      const externalIp = (ipData?.ip || "").trim();
      if (externalIp && !isPrivateOrLocalIp(externalIp)) {
        return externalIp;
      }
    }
  } catch {
    // fallback to empty ip
  }

  return "";
};

// ✅ Navigation and Sticky Section types
interface NavigationItem {
  id: number;
  label: string;
  anchor: string;
  class?: string;
  onclick?: string;
}

interface StickySection {
  navigation?: NavigationItem[];
  content_sections?: Array<{
    id: number;
    header: string;
    background_class?: string;
    content_html?: string;
  }>;
  testimonials?: {
    title?: string;
    id?: string;
    testimonials?: Array<{
      author: string;
      author_designation: string;
      caption: string;
      description: string;
      rating: number;
      image: string;
      linkedin_link?: string;
      stars?: { filled: number; empty: number };
    }>;
  };
  [key: string]: any;
}

// ✅ Popular Course Interface
interface PopularCourse {
  id: number;
  name: string;
  url: string;
  image: string;
  rating_html: string;
  enrolled_text: string;
  enrolled_count: number;
}

// ✅ Course data type based on API response
export interface CourseData {
  cid: string;
  id: string;
  course_name: string;
  course: string;
  course_short_name: string;
  course_short_description: string;
  base_url: string;
  course_image: string;
  brief_intro: string;
  extra_info: string;
  duration: string;
  students_enroll: string;
  template: string;
  layout_type?: 'layout1' | 'layout2';
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: string;
  course_details?: CourseData[];
  course_pmenu?: any[];
  status?: boolean;
  footer_course?: string;
  category?: string;
  
  // ✅ These come from the root API response, not from course_details[0]
  sticky_section?: StickySection;
  rating?: {
    bangalore_rating?: string;
    hyderabad_rating?: string;
  };
  footer?: any;
  popular_courses?: PopularCourse[];
  our_clients?: any[];

  [key: string]: any;
}

// ✅ API Response structure (matches your screenshot)
interface ApiResponse {
  status: boolean;
  data: {
    course_details: Array<{
      cid: string;
      id: string;
      course_name: string;
      course: string;
      course_short_name: string;
      course_short_description: string;
      base_url: string;
      course_image: string;
      brief_intro: string;
      extra_info: string;
      duration: string;
      category: string;
      students_enroll: string;
      template: string;
      [key: string]: any;
    }>;
    sticky_section?: StickySection;
    rating?: {
      bangalore_rating?: string;
      hyderabad_rating?: string;
    };
    our_clients?: any[];
    popular_courses?: PopularCourse[];
    footer?: any;
  };
}

// ✅ Async thunk for fetching course by slug
export const fetchCourseBySlug = createAsyncThunk(
  'course/fetchCourseBySlug',
  async (slug: string) => {
    const ipAddress = await resolveClientIp();

    const response = await apiGet<ApiResponse>(`/course_details/${slug}`, {
      ip_address: ipAddress,
    });

    console.log('API Response:', response);

    if (response.status && response.data.course_details.length > 0) {
      const courseDetail = response.data.course_details[0];

      // ✅ FIXED: Merge root-level data with course details
      const mergedData: CourseData = {
        ...courseDetail,
        sticky_section: response.data.sticky_section,
        rating: response.data.rating,
        footer: response.data.footer,
        popular_courses: response.data.popular_courses || [],
        our_clients: response.data.our_clients || [],
      };

      console.log('Merged course data:', mergedData);
      console.log('Popular courses count:', mergedData.popular_courses?.length);

      return mergedData;
    }

    throw new Error('Course not found');
  }
);

// ✅ Slice state type
interface CourseState {
  data: CourseData | null;
  loading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: CourseState = {
  data: null,
  loading: false,
  error: null,
};

// ✅ Slice definition
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCourse: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseBySlug.fulfilled, (state, action: PayloadAction<CourseData>) => {
        console.log('Redux storing course data:', action.payload);
        console.log('Popular courses in Redux:', action.payload.popular_courses);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourseBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch course';
        console.error('Redux error:', action.error);
      });
  },
});

export const { clearCourse } = courseSlice.actions;
export default courseSlice.reducer;

