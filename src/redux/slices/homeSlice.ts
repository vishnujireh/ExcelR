// store/HomeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

/* ================= TYPES ================= */

interface ApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
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
};

/* ================= THUNKS ================= */

// 1. CONFIG API
export const fetchHomeConfig = createAsyncThunk(
  "home/fetchConfig",
  async () => {
    const res = await apiGet("/home_data");
    return res.data[0]; // important
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
      })
      .addCase(fetchHomeConfig.fulfilled, (state, action) => {
        state.config.loading = false;
        state.config.data = action.payload;
      })
      .addCase(fetchHomeConfig.rejected, (state, action) => {
        state.config.loading = false;
        state.config.error = action.error.message || "Error";
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