import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../api/apiClient";

/* ============================
✅ TYPES
============================ */

export interface PostEventCommentPayload {
  news_events_id: string;
  username: string;
  useremail: string;
  subject?: string;
  message: string;
}

export interface PostEventReplyPayload {
  comment_id: string;
  username: string;
  useremail: string;
  subject: string;
  message: string;
}

export interface PostCommentResponse {
  status: boolean;
  message: string;
}

export interface CommentReply {
  id: string;
  username: string;
  message: string;
  created: string;
}

export interface Comment {
  id: string;
  username: string;
  message: string;
  created: string;
  replies: CommentReply[];
}

export interface NewsEvent {
  id: string;
  title: string;
  description_short?: string;
  description_full?: string;
  event_date: string;
  event_month?: string;
  event_day?: string;
  image: string;
  baseurl?: string;
  detail_url?: string;
}

interface NewsCategory {
  id: string;
  category: string;
  baseurl: string;
  url: string;
}
interface Comments {
  id: string;
  username: string;
  message: string;
  created: string;
  replies?: Reply[];
}
interface Reply {
  id: string;
  username: string;
  message: string;
  created: string;
}
interface LatestPost {
  id: string;
  title: string;
  event_date: string;
  image: string;
  detail_url: string;
  description_short?: string;
}

interface NewsEventState {
  newsEvents: NewsEvent[];
  newsDetail: NewsEvent | null;
  comments?: Comments[];

  categories: NewsCategory[];
  listLatestPosts: LatestPost[];
  popularNews: NewsEvent[];

  loading: boolean;
  error: string | null;

  postCommentLoading: boolean;
  postCommentSuccess: boolean;
  postCommentMessage?: string;
  postCommentError?: string;
}

/* ============================
✅ INITIAL STATE
============================ */

const initialState: NewsEventState = {
  newsEvents: [],
  newsDetail: null,
  comments: [],

  categories: [],
  listLatestPosts: [],
  popularNews: [],

  loading: false,
  error: null,

  postCommentLoading: false,
  postCommentSuccess: false,
  postCommentMessage: "",
  postCommentError: "",
};

/* ============================
✅ LIST PAGE
============================ */

export const fetchNewsEvents = createAsyncThunk(
  "newsEvents/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      return await apiGet("/get_news_events");
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================
✅ CATEGORY LIST
============================ */

export const fetchNewsByCategory = createAsyncThunk(
  "newsEvents/fetchByCategory",
  async (categorySlug: string, { rejectWithValue }) => {
    try {
      // Try filtering on backend; API typically ignores unknown params safely.
      const response = await apiGet("/get_news_events", {
        category: categorySlug,
        baseurl: categorySlug,
        slug: categorySlug,
      });
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================
✅ DETAIL PAGE
============================ */

export const fetchNewsEventDetail = createAsyncThunk(
  "newsEvents/fetchDetail",
  async (baseurl: string, { rejectWithValue }) => {
    try {
      const response = await apiGet("/get_news_event_detail", { baseurl });
      const comments = response?.comments ?? response?.event?.comments ?? [];
      return {
        ...response,
        // ✔ add comments
        comments: Array.isArray(comments)
          ? comments.map((c: any) => {
              const replies = c?.replies ?? c?.reply ?? c?.replys ?? c?.children ?? [];
              return {
                id: c.id,
                username: c.username,
                message: c.message,
                created: c.created,
                replies: Array.isArray(replies)
                  ? replies.map((r: any) => ({
                      id: r.id,
                      username: r.username,
                      message: r.message,
                      created: r.created,
                    }))
                  : [],
              };
            })
          : [],
      };
    } catch (err: any) {
      return rejectWithValue(err.message);

    }
  }
);

/* ============================
✅ POST COMMENT
============================ */

export const postEventComment = createAsyncThunk<
  PostCommentResponse,
  PostEventCommentPayload,
  { rejectValue: string }
>("newsEvents/postComment", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return await apiPost<PostCommentResponse>(
          "/event_post_reply",
          formData,
          {

            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      } catch (error: any) {
        return rejectWithValue(error.message || "Failed to post comment");
      }
});

/* ============================
✅ POST REPLY
============================ */

export const postEventReply = createAsyncThunk<
  PostCommentResponse,
  PostEventReplyPayload,
  { rejectValue: string }
>("newsEvents/postReply", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([k, v]) => {
      formData.append(k, String(v));
    });

    return await apiPost("/save_event_reply", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

/* ============================
✅ SLICE
============================ */

const newsEventsSlice = createSlice({
  name: "newsEvents",
  initialState,
  reducers: {
    clearNewsDetail(state) {
      state.newsDetail = null;
      state.comments = [];
    },
    resetCommentStatus(state) {
      state.postCommentSuccess = false;
      state.postCommentMessage = "";
      state.postCommentError = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // LIST
      .addCase(fetchNewsEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsEvents.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.newsEvents = action.payload.news_events;
        state.categories = action.payload.categories;
        state.listLatestPosts = action.payload.latest_posts;
      })
      .addCase(fetchNewsEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DETAIL
      .addCase(fetchNewsEventDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.newsDetail = action.payload.event;
        state.comments = action.payload.comments;
        state.popularNews = action.payload.popular_news;
      })

      // CATEGORY LIST
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const payload = action.payload?.data ?? action.payload;
        state.newsEvents = payload?.news_events ?? payload?.events ?? [];
        state.categories = payload?.categories ?? state.categories;
        state.listLatestPosts = payload?.latest_posts ?? state.listLatestPosts;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Post blog comment
      .addCase(postEventComment.pending, (state) => {
        state.postCommentLoading = true;
        state.postCommentSuccess = false;
        state.postCommentError = undefined;
        state.postCommentMessage = undefined;
      })
      .addCase(postEventComment.fulfilled,
      (state,action)=>{
      
       state.postCommentLoading=false;
      
       state.postCommentSuccess=true;
      
       state.postCommentError="";
      
       state.postCommentMessage=
       action.payload.message;
      
      }
      )
      .addCase(postEventComment.rejected, (state, action) => {
        state.postCommentLoading = false;
        state.postCommentSuccess = false;
        state.postCommentError = action.payload as string;
      })

      // REPLY
      .addCase(postEventReply.pending, (state) => {
        state.postCommentLoading = true;
        state.postCommentSuccess = false;
        state.postCommentError = undefined;
        state.postCommentMessage = undefined;
      })
      .addCase(postEventReply.fulfilled, (state, action) => {
        state.postCommentLoading = false;
        state.postCommentSuccess = true;
        state.postCommentError = "";
        state.postCommentMessage = action.payload.message;
      })
      .addCase(postEventReply.rejected, (state, action) => {
        state.postCommentLoading = false;
        state.postCommentSuccess = false;
        state.postCommentError = action.payload as string;
      })
     ;
  },
});

/* ============================
✅ EXPORTS
============================ */

export const { clearNewsDetail, resetCommentStatus } = newsEventsSlice.actions;
export default newsEventsSlice.reducer;
