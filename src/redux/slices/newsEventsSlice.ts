import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

/* ============================
✅ TYPES
============================ */

export interface NewsEvent {
  id: string;
  title: string;
  description_short?: string;
  description_full?: string;
  event_date: string;
  event_day?: string;
  event_month?: string;
  baseurl?: string;
  image: string;
  detail_url?: string;
}

interface Comment {
  id: string;
  username: string;
  message: string;
  created: string;
  reply: any[];
}

interface NewsCategory {
  id: string;
  category: string;
  baseurl: string;
  url: string;
}

interface LatestPost {
  id: string;
  title: string;
  event_date: string;
  image: string;
  detail_url: string;
}

interface NewsEventState {
  newsEvents: NewsEvent[];
  newsDetail: NewsEvent | null;

  listLatestPosts: LatestPost[];     // ✅ from LIST API
  detailLatestPosts: NewsEvent[];    // ✅ from DETAIL API

  popularNews: NewsEvent[];
  categories: NewsCategory[];
  comments: Comment[];

  loading: boolean;
  error: string | null;
}

/* ============================
✅ INITIAL STATE
============================ */

const initialState: NewsEventState = {
  newsEvents: [],
  newsDetail: null,

  listLatestPosts: [],
  detailLatestPosts: [],

  popularNews: [],
  categories: [],
  comments: [],

  loading: false,
  error: null,
};

/* ============================
✅ LIST PAGE API
============================ */

export const fetchNewsEvents = createAsyncThunk<
  {
    news_events: NewsEvent[];
    categories: NewsCategory[];
    latest_posts: LatestPost[];
  },
  void,
  { rejectValue: string }
>("newsEvents/fetchNewsEvents", async (_, { rejectWithValue }) => {
  try {
    const data = await apiGet<{
      status: boolean;
      news_events: NewsEvent[];
      categories: NewsCategory[];
      latest_posts: LatestPost[];
    }>("/get_news_events"); // ✅ api_key auto added

    return {
      news_events: data.news_events,
      categories: data.categories,
      latest_posts: data.latest_posts,
    };
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to load news");
  }
});

/* ============================
✅ DETAIL PAGE API
============================ */

export const fetchNewsEventDetail = createAsyncThunk<
  {
    event: NewsEvent;
    comments: Comment[];
    latest_post: NewsEvent[];
    popular_news: NewsEvent[];
  },
  string,
  { rejectValue: string }
>("newsEvents/fetchNewsEventDetail", async (baseurl, { rejectWithValue }) => {
  try {
    const data = await apiGet<{
      status: boolean;
      event: NewsEvent;
      comments: Comment[];
      latest_post: NewsEvent[];
      popular_news: NewsEvent[];
    }>("/get_news_event_detail", { baseurl }); // ✅ CORRECT PARAM

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to load detail");
  }
});

// ✅ NEW CATEGORY API THUNK (SAFE ADDITION)
export const fetchNewsByCategory = createAsyncThunk(
  "newsEvents/fetchByCategory",
  async (category: string) => {
    const res = await apiGet(
      `/get_news_event_category`,
      { category }
    );
    return res;
  }
);

/* ============================
✅ SLICE
============================ */

const newsEventsSlice = createSlice({
  name: "newsEvents",
  initialState,
  reducers: {
    clearNewsDetail: (state) => {
      state.newsDetail = null;
      state.comments = [];
      state.detailLatestPosts = [];
      state.popularNews = [];
    },
  },
  extraReducers: (builder) => {
    builder

      /* ✅ LIST */
      .addCase(fetchNewsEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.newsEvents = action.payload.news_events;
        state.categories = action.payload.categories;
        state.listLatestPosts = action.payload.latest_posts;
      })
      .addCase(fetchNewsEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading news";
      })

      /* ✅ DETAIL */
      .addCase(fetchNewsEventDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsEventDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.newsDetail = action.payload.event;
        state.comments = action.payload.comments;
        state.detailLatestPosts = action.payload.latest_post;
        state.popularNews = action.payload.popular_news;
      })
      .addCase(fetchNewsEventDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading detail";
      })
      .addCase(fetchNewsByCategory.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.newsEvents = action.payload.news_events;
    state.categories = action.payload.categories;
    state.listLatestPosts = action.payload.latest_posts;
  })
  .addCase(fetchNewsByCategory.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Category fetch failed";
  });
  },
});

/* ============================
✅ EXPORTS
============================ */

export const { clearNewsDetail } = newsEventsSlice.actions;
export default newsEventsSlice.reducer;
