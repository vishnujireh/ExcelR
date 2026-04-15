// store/HomeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

/* ================= TYPES ================= */

interface ApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface HomeConfig {
  our_courses: string;
  our_clients: string;
  our_instructors: string;

  banner_image: string;
  banner_image2: string;
  banner_image3: string;

  popular_courses: string;

  section1_description: string;
  section2_description: string;
  section2_image: string;

  no_of_years_experience: string;
  no_of_courses: string;
  no_of_corporate_clients: string;
  no_of_universities_tieup: string;

  our_moments_desc: string;
  why_excelr_desc: string;
  why_excelr_part1: string;
  why_excelr_part2: string;
  why_excelr_part3: string;

  meta_title: string;
  meta_description: string;
  meta_keyword: string;
}

export interface HomeInstructor {
  id:string;
  name: string;
  image: string;
  designation: string;
  to_show:string;
}

export interface HomeLink{
  id:string;
  title:string;
  base_url:string;
}

export interface FooterMenu{
  id:string;
  course_name:string;
  base_url:string;
}

export interface HomeContact {
  description: string;
}

export interface HomeInfo{
  description: string;
}
export interface HomeOrg{
  description: string;
}
export interface HomeFooterCourse {
  description: string;
}
export interface HomeCourse {
  course_name: string;
  description: string;
  image: string;
  url: string;
  review_rating: string;
}
 
export interface HomeBlog {
  title: string;
  image: string;
  url: string;
  category: string;
  subcategory: string;
}
export interface HomeBlogResponse  {
  blogs: HomeBlog[]; // ✅ correct key
  read_more: boolean;
  read_more_url: string;
}
export interface HomeNewsEvent {
  title: string;
  description: string;
  image: string;
  url: string;
  event_date: string;
}
export interface HomeNewsEventResponse {
  news_events: HomeNewsEvent[];
  view_all: string;
}
export interface HomeQuiz {
  title: string;
  description: string;
  image: string;
  url: string;
  base_url: string;
}
export interface HomeGalleryImage {
  image: string;
  title: string;
} 
export interface HomeGallery {
  gallery_id: string;
  title: string;
  main_image: string;
  view_url: string;
  images: HomeGalleryImage[];
}
export interface HomeGalleryResponse {
  galleries: HomeGallery[];
  read_more: boolean;
  read_more_url: string;
}
export interface HomeYoutube{
  video_url: string;
  thumbnail: string;
  embed_url: string;
}

export interface HomeConfig {
  our_courses: string;
  our_clients: string;
  our_instructors: string;
}

/* ================= STATE ================= */

interface HomeState {
  config: ApiState<HomeConfig | null>;
  courses: ApiState<HomeCourse[]>;
  blogs: ApiState<HomeBlogResponse>;
  news_events: ApiState<HomeNewsEventResponse>;
  quizzes: ApiState<HomeQuiz[]>;
  gallery: ApiState<HomeGalleryResponse>;
  youtube: ApiState<HomeYoutube[]>;

   instructors: ApiState<HomeInstructor[]>;
  links: ApiState<HomeLink[]>;
  footer_menu: ApiState<FooterMenu[]>;
  contact: ApiState<HomeContact[]>;
  footer_course: ApiState<HomeFooterCourse[]>;
  org: ApiState<HomeOrg[]>;
  info: ApiState<HomeInfo[]>;
}

const initialState: HomeState = {
  config: { data: null, loading: false, error: null },
  courses: { data: [], loading: false, error: null },
  blogs: {
  data: {
    blogs: [],
    read_more: false,
    read_more_url: "",
  },
  loading: false,
  error: null,
},
news_events: {
  data: {
    news_events: [],
    view_all: "",
  },
  loading: false,
  error: null,
},
  quizzes: { data: [], loading: false, error: null },
  gallery: {
  data: {
    galleries: [],
    read_more: false,
    read_more_url: "",
  },
  loading: false,
  error: null,
},
  youtube: { data: [], loading: false, error: null },
  instructors: { data: [], loading: false, error: null },
  links: { data: [], loading: false, error: null },
  footer_menu: { data: [], loading: false, error: null },
  contact: { data: [], loading: false, error: null },
  footer_course: { data: [], loading: false, error: null },
  org: { data: [], loading: false, error: null },
  info: { data: [], loading: false, error: null },
};

/* ================= THUNKS ================= */

// 1. CONFIG API
export const fetchHomeConfig = createAsyncThunk(
  "home/fetchConfig",
  async () => {
    const res = await apiGet("/home_data");
   const raw = res.data[0];

    return {
      ...raw,

      // fix corrupted banner string
      banner_image: raw.banner_image?.split(",")[0] || "",

      // fallback safety
      banner_image2: raw.banner_image2 || "",
      banner_image3: raw.banner_image3 || "",

      popular_courses: raw.popular_courses || "",

      section1_description: raw.section1_description || "",
      section2_description: raw.section2_description || "",
      section2_image: raw.section2_image || "",

      meta_title: raw.meta_title || "",
  meta_description: raw.meta_description || "",
  meta_keyword: raw.meta_keyword || "",

      instructors: res.instructors || [],
      links: res.links || [],
      footer_menu: res.footer_menu || [],
      contact: res.contacts || [],
      footer_course: res.footer_course || [],
      org: res.org || [],
      info: res.info || [],

    };
  }
);

// 2. COURSES API
export const fetchHomeCourses = createAsyncThunk(
  "home/fetchCourses",
  async () => {
    const res = await apiGet("/home_courses");
    return res.data;
  }
);

// 3. BLOG API
export const fetchHomeBlogs = createAsyncThunk(
  "home/fetchBlogs",
  async () => {
    const res = await apiGet("/home_blog");

    return {
      blogs: res.data.map((b: any) => ({
        title: b.title,
        image: b.image,
        url: b.url,
        category: b.category,
        subcategory: b.subcategory,
      })),
      read_more: res.read_more,
      read_more_url: res.read_more_url,
    };
  }
);

// 4. NEWS & EVENTS API
export const fetchHomeNewsEvents = createAsyncThunk(
  "home/fetchNewsEvents",
  async () => {
    const res = await apiGet("/home_news_events");

    return {
      news_events: res.data.map((item: any) => ({
        title: item.title,
        description: item.description,
        image: item.image,
        url: item.url,
        event_date: item.event_date,
      })),
      view_all: res.view_all, // ✅ keep URL
    };
  }
);

// 5. QUIZZES API (not used currently, but can be added later)
export const fetchHomeQuizzes = createAsyncThunk(
  "home/fetchQuizzes",
  async () => {
    const res = await apiGet("/home_quiz");
    return res.data;
  }
);

 // 6. GALLERY API (not used currently, but can be added later)
export const fetchHomeGallery = createAsyncThunk(
  "home/fetchGallery",
  async () => {
    const res = await apiGet("/home_gallery");
    return {
      galleries: res.data,
      read_more: res.read_more,
      read_more_url: res.read_more_url,
    };
  }
);

// 7. YOUTUBE API (not used currently, but can be added later)
export const fetchHomeYoutube = createAsyncThunk(
  "home/fetchYoutube",
  async () => {
    const res = await apiGet("/home_youtube");
    return res.data;
  }
);

/* ================= SLICE ================= */

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CONFIG
   builder
  .addCase(fetchHomeConfig.pending, (state) => {
    state.config.loading = true;
    state.config.error = null;

    state.instructors.loading = true;
    state.links.loading = true;
    state.footer_menu.loading = true;
    state.contact.loading = true;
    state.footer_course.loading = true;
    state.org.loading = true;
    state.info.loading = true;
  })

  .addCase(fetchHomeConfig.fulfilled, (state, action) => {
    state.config.loading = false;
    state.config.data = action.payload;

    state.instructors.loading = false;
    state.instructors.data = action.payload.instructors || [];

    state.links.loading = false;
    state.links.data = action.payload.links || [];

    state.footer_menu.loading = false;
    state.footer_menu.data = action.payload.footer_menu || [];

    state.contact.loading = false;
    state.contact.data = action.payload.contact || [];

    state.footer_course.loading = false;
    state.footer_course.data = action.payload.footer_course || [];
    
    state.org.loading = false;
    state.org.data = action.payload.org || [];

    state.info.loading = false;
    state.info.data = action.payload.info || [];
  })

  .addCase(fetchHomeConfig.rejected, (state, action) => {
    const error = action.error.message || "Error";

    state.config.loading = false;
    state.config.error = error;

    state.instructors.loading = false;
    state.instructors.error = error;

    state.links.loading = false;
    state.links.error = error;

    state.footer_menu.loading = false;
    state.footer_menu.error = error;

    state.contact.loading = false;
    state.contact.error = error;

    state.footer_course.loading = false;
    state.footer_course.error = error;

    state.org.loading = false;
    state.org.error = error;

    state.info.loading = false;
    state.info.error = error;
  });

    // COURSES
    builder
      .addCase(fetchHomeCourses.pending, (state) => {
        state.courses.loading = true;
        state.courses.error = null;
      })
      .addCase(fetchHomeCourses.fulfilled, (state, action) => {
        state.courses.loading = false;
        state.courses.data = action.payload;
      })
      .addCase(fetchHomeCourses.rejected, (state, action) => {
        state.courses.loading = false;
        state.courses.error = action.error.message || "Error";
      });

    // BLOGS
    builder
      .addCase(fetchHomeBlogs.pending, (state) => {
        state.blogs.loading = true;
        state.blogs.error = null;
      })
      .addCase(fetchHomeBlogs.fulfilled, (state, action) => {
        state.blogs.loading = false;
        state.blogs.data = action.payload;
      })
      .addCase(fetchHomeBlogs.rejected, (state, action) => {
        state.blogs.loading = false;
        state.blogs.error = action.error.message || "Error";
      });

    // NEWS & EVENTS
    builder
      .addCase(fetchHomeNewsEvents.pending, (state) => {
        state.news_events.loading = true;
        state.news_events.error = null;
      })
      .addCase(fetchHomeNewsEvents.fulfilled, (state, action) => {
        state.news_events.loading = false;
        state.news_events.data = action.payload;
      })
      .addCase(fetchHomeNewsEvents.rejected, (state, action) => {
        state.news_events.loading = false;
        state.news_events.error = action.error.message || "Error";
      });

    // QUIZZES
    builder
      .addCase(fetchHomeQuizzes.pending, (state) => {
        state.quizzes.loading = true;
        state.quizzes.error = null;
      })
      .addCase(fetchHomeQuizzes.fulfilled, (state, action) => {
        state.quizzes.loading = false;
        state.quizzes.data = action.payload;
      })
      .addCase(fetchHomeQuizzes.rejected, (state, action) => {
        state.quizzes.loading = false;
        state.quizzes.error = action.error.message || "Error";
      });

    // GALLERY
    builder
      .addCase(fetchHomeGallery.pending, (state) => {
        state.gallery.loading = true;
        state.gallery.error = null;
      })
      .addCase(fetchHomeGallery.fulfilled, (state, action) => {
        state.gallery.loading = false;
        state.gallery.data = action.payload;
      })
      .addCase(fetchHomeGallery.rejected, (state, action) => {
        state.gallery.loading = false;
        state.gallery.error = action.error.message || "Error";
      });

    // YOUTUBE
    builder
      .addCase(fetchHomeYoutube.pending, (state) => {
        state.youtube.loading = true;
        state.youtube.error = null;
      })
      .addCase(fetchHomeYoutube.fulfilled, (state, action) => {
        state.youtube.loading = false;
        state.youtube.data = action.payload;
      })
      .addCase(fetchHomeYoutube.rejected, (state, action) => {
        state.youtube.loading = false;
        state.youtube.error = action.error.message || "Error";
      });

  },
});

export default homeSlice.reducer;
