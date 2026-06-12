// redux/slices/blogSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../api/apiClient";
import { count } from "console";

export interface PostCommentPayload {
  blog_id: string;
  username: string;
  useremail: string;
  subject?: string;
  message: string;
}
export interface PostReplyPayload {
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
export interface Blog {
  id: string;
  banner_title: string;
  author_name: string;
  author_image: string;
  banner_image: string;
  category: string;
  blog_category: string;
  blog_subcategory: string;
  subcategory: string;
  baseurl: string;
  blog_title: string;
  blog_image: string;
  blog_description: string;
  created_at: string;
  category_baseurl: string;
  subcategory_baseurl: string;
}
export interface SidebarSubcategory {
  id: string;
  banner_title: string;
  banner_image: string;
  subcategory: string;
  category_id: string;
  baseurl: string;
  created_at: string;
  status: string;
}

export interface SidebarCategory {
  id: string;
  name: string;
  baseurl: string;
  full_url: string;
  subcategories: SidebarSubcategory[];
}

export interface CategoryBlogs {
  categoryName: string;
  categoryId: string;

  blogs: Blog[];
  hasMore?: boolean; // Track if more blogs are available from API
}
export interface BlogByCategory {
  id: string;
  blog_title: string;
  blog_image: string;
  created_at: string;
  author_name: string;
  author_image: string;
  category: string;
  subcategory: string;
  baseurl: string;
}
export interface BlogBySubcategory {
  id: string;
  blog_title: string;
  blog_image: string;
  created_at: string;
  category: string;
  author_name: string;
  author_image: string;
  subcategory: string;
  baseurl: string;
}

export interface BlogSearchItem {
  id: string;
  value: string;
  base_url: string;
}
interface Author {
  name: string;
  image: string;
  description: string;
  linkedin_url: string;
}
interface Comments {
  id: string;
  username: string;
  message: string;
  created_at: string;
  replies?: Reply[];
}
interface Reply {
  id: string;
  username: string;
  message: string;
  created_at: string;
}
interface NextBlog {
  id: string;
  title: string;
  Image: string;
  url: string;
}
interface PopularCourse {
  id: number;
  name: string;
  url: string;
  image: string;
  rating_html: string;
  enrolled_text: string;
  enrolled_count: number;
}
export interface BlogDetail {
  id: string;
  blog_title: string;
  blog_image: string;
  blog_description: string;
  created_at: string;
  category: string;
  subcategory: string;
  base_url: string;
  view_count: number;
  author?: Author | null;
  comments?: Comments[];
  nextblog?: NextBlog | null;
  popular_courses?: PopularCourse[];
  // optional SEO fields (your API may return these)
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

interface BlogState {
  popularBlogs: Blog[];
  categoryBlogs: CategoryBlogs[];
  sidebarCategories: SidebarCategory[];
  blogsByCategory: BlogByCategory[];
  loadingCategory: boolean;
  errorCategory?: string;
   blogsBySubcategory: BlogBySubcategory[];
  loadingSubcategory: boolean;
  errorSubcategory?: string;
  loading: boolean;
  error?: string;
  searchSuggestions: BlogSearchItem[];
searchLoading: boolean;
searchError?: string;
blogDetail: BlogDetail | null;
loadingDetail: boolean;
errorDetail?: string;
postCommentLoading: boolean;
postCommentError?: string | null;
postCommentSuccess: boolean;
postCommentMessage?: string;
}

const initialState: BlogState = {
  popularBlogs: [],
  categoryBlogs: [],
  sidebarCategories: [],
  blogsByCategory: [],
  loadingCategory: false,
  errorCategory: undefined,
  blogsBySubcategory: [],
  loadingSubcategory: false,
  errorSubcategory: undefined,
  loading: false,
  error: undefined,
  searchSuggestions: [],
  searchLoading: false,
  searchError: undefined,
  blogDetail: null,
loadingDetail: false,
errorDetail: undefined,
postCommentLoading: false,
postCommentError: "",
postCommentSuccess: false,
postCommentMessage: "",
};


// Fetch blog home
export const fetchBlogHome = createAsyncThunk(
  "blogs/fetchHome",
  async (_, { rejectWithValue }) => {
    try {
      // apiGet automatically adds api_key from apiClient.ts
      const response = await apiGet("/get_blog_home");
      if (!response.status) throw new Error("Failed to fetch blogs");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSidebarCategories = createAsyncThunk<
  SidebarCategory[], // return type
  void,
  { rejectValue: string }
>("blogs/fetchSidebarCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await apiGet("/get_blog_sidebar");
    if (!response.status) throw new Error("Failed to fetch sidebar categories");
    return response.categories; // categories with subcategories
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchCategoryBlogsCount = createAsyncThunk<
  { category: string; hasBlogs: boolean },
  string,
  { rejectValue: string }
>(
  "blogs/fetchCategoryBlogsCount",
  async (categorySlug, { rejectWithValue }) => {

    try {

      const response = await apiGet(
        `/get_blog_by_category?category=${categorySlug}`
      );


      return {
        category: categorySlug,
        hasBlogs: response?.blogs?.length > 0
      };


    } catch(error:any){

      return rejectWithValue(error.message);

    }

  }
);

export const loadMoreBlogs = createAsyncThunk(
  "blogs/loadMoreBlogs",
  async (
    { categoryId, offset, count }: { categoryId: string; offset: number; count: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiGet(
        `/load_more_blogs?categoryId=${categoryId}&offset=${offset}&count=${count}`
      );

      if (!response.status) throw new Error("Failed to load more blogs");


      const category = response.data.blogs.find(
        (cat:any)=>cat.categoryId === categoryId
      );


      return {
        categoryId,
        blogs: category?.blogs || [],
        hasMore: response.data.available ?? true
      };


    } catch (err:any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBlogsByCategory = createAsyncThunk<
  BlogByCategory[],
  string,
  { rejectValue: string }
>("blogs/fetchBlogsByCategory", async (categorySlug, { rejectWithValue }) => {
  try {
    const response = await apiGet(
      `/get_blog_by_category?category=${categorySlug}`
    );
    if (!response.status) throw new Error("Failed to fetch blogs by category");
    return response.blogs;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Fetch blogs by subcategory
export const fetchBlogsBySubcategory = createAsyncThunk<
  BlogBySubcategory[],
  string,
  { rejectValue: string }
>(
  "blogs/fetchBlogsBySubcategory",
  async (subcategorySlug, { rejectWithValue }) => {
    try {
      const response = await apiGet(
        `/get_blog_by_subcategory?subcategory=${subcategorySlug}`
      );
      if (!response.status) throw new Error("Failed to fetch blogs by subcategory");
      return response.blogs;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSearchSuggestions = createAsyncThunk<
  BlogSearchItem[],
  string,
  { rejectValue: string }
>("blogs/fetchSearchSuggestions", async (query, { rejectWithValue }) => {
  try {
    const response = await apiGet(`/get_blog_search?blog_title=${query}`);

    if (!response.status) throw new Error("Failed to fetch search suggestions");

    return response.blogs; // return suggestions list
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchBlogDetail = createAsyncThunk<BlogDetail, string>(
  "blogs/fetchBlogDetail",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await apiGet(`/get_blog_details?id=${blogId}`);
      if (!response.status) throw new Error("Failed to fetch blog detail");
      
      // Map API response to your BlogDetail interface
      const data = response.blog || response.data;
      const author = response.author || null;
      const comments = response.comments || [];
      const nextblog = response.next_blog || null;
      const popular_courses = response.popular_courses || [];
      return {
        id: data.id,
        blog_title: data.title,
        view_count: data.view_count || 0,
        blog_image: data.image,
        blog_description: data.description,
        created_at: data.created_at || "",
        category: data.category || "",
        subcategory: data.subcategory || "",
        base_url: data.baseurl || data.id,
         // ✔ add author
        author: author
          ? {
              name: author.name,
              image: author.image
                ? `https://demo3.excelr.com/uploads/blog/${author.image}`
                : "",
              description: author.description,
              linkedin_url: author.linkedin_url,
            }
          : null,
        // ✔ add comments
        comments: Array.isArray(comments)
  ? comments.map((c: any) => ({
      id: c.id,
      username: c.username,
      message: c.message,
      created_at: c.created_at,
      replies: Array.isArray(c.replies)
        ? c.replies.map((r: any) => ({
            id: r.id,
            username: r.username,
            message: r.message,
            created_at: r.created_at,
          }))
        : [],
    }))
  : [],
        // ✔ add nextblog
          nextblog: nextblog
          ? {
            id: nextblog.id,
            title: nextblog.title,
            Image: nextblog.image,
             url: nextblog.url,
          } : null,

          // POPULAR COURSES (fixed array)
        popular_courses: Array.isArray(popular_courses)
          ? popular_courses.map((c: any) => ({
              id: c.id,
              name: c.name,
              url: c.url,
              image: c.image,
              rating_html: c.rating_html,
              enrolled_text: c.enrolled_text,
              enrolled_count: c.enrolled_count,
            }))
          : [],
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const postBlogComment = createAsyncThunk<
  PostCommentResponse,
  PostCommentPayload,
  { rejectValue: string }
>("blog/postComment", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return await apiPost<PostCommentResponse>(
      "/post_reply",
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

export const postBlogReply = createAsyncThunk<
  PostCommentResponse,
  PostReplyPayload,
  { rejectValue: string }
>("blog/postReply", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return await apiPost<PostCommentResponse>(
      "/save_reply",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to post reply");
  }
});





const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogHome.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchBlogHome.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.popularBlogs = action.payload.popular_blogs;
        // Initialize with hasMore as true for all categories
        state.categoryBlogs = action.payload.blogs.map((cat: CategoryBlogs) => ({
          ...cat,
          hasMore: true,
        }));
      })
      .addCase(fetchBlogHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Sidebar categories reducer
    .addCase(fetchSidebarCategories.fulfilled, (state, action: PayloadAction<SidebarCategory[]>) => {
      state.sidebarCategories = action.payload;
    })
    .addCase(fetchSidebarCategories.rejected, (state, action) => {
      state.error = action.payload as string;
    })

      .addCase(loadMoreBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        const { categoryId, blogs, hasMore } = action.payload;

        const categoryIndex = state.categoryBlogs.findIndex(
          (cat) => cat.categoryId === categoryId
        );

        if (categoryIndex !== -1) {
          // Append new blogs (no duplicates)
          state.categoryBlogs[categoryIndex].blogs.push(...blogs);
          // Update hasMore status from API
          state.categoryBlogs[categoryIndex].hasMore = hasMore;
        }
      })
      .addCase(fetchBlogsByCategory.pending, (state) => {
        state.loadingCategory = true;
        state.errorCategory = undefined;
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, action: PayloadAction<BlogByCategory[]>) => {
        state.loadingCategory = false;
        state.blogsByCategory = action.payload;
      })
      .addCase(fetchBlogsByCategory.rejected, (state, action) => {
        state.loadingCategory = false;
        state.errorCategory = action.payload as string;
      })
       .addCase(fetchBlogsBySubcategory.pending, (state) => {
        state.loadingSubcategory = true;
        state.errorSubcategory = undefined;
      })
      .addCase(fetchBlogsBySubcategory.fulfilled, (state, action: PayloadAction<BlogBySubcategory[]>) => {
        state.loadingSubcategory = false;
        state.blogsBySubcategory = action.payload;
      })
      .addCase(fetchBlogsBySubcategory.rejected, (state, action) => {
        state.loadingSubcategory = false;
        state.errorSubcategory = action.payload as string;
      })
       // Post blog comment
.addCase(postBlogComment.pending, (state) => {
  state.postCommentLoading = true;
  state.postCommentSuccess = false;
  state.postCommentError = undefined;
  state.postCommentMessage = undefined;
})
.addCase(
  postBlogComment.fulfilled,
  (state, action: PayloadAction<PostCommentResponse>) => {
    state.postCommentLoading = false;
    state.postCommentSuccess = action.payload.status;
    state.postCommentMessage = action.payload.message;
  }
)
.addCase(postBlogComment.rejected, (state, action) => {
  state.postCommentLoading = false;
  state.postCommentSuccess = false;
  state.postCommentError = action.payload as string;
})
.addCase(fetchSearchSuggestions.pending, (state) => {
    state.searchLoading = true;
    state.searchError = undefined;
  })
  .addCase(
    fetchSearchSuggestions.fulfilled,
    (state, action: PayloadAction<BlogSearchItem[]>) => {
      state.searchLoading = false;
      state.searchSuggestions = action.payload;
    }
  )
  .addCase(fetchSearchSuggestions.rejected, (state, action) => {
    state.searchLoading = false;
    state.searchError = action.payload as string;
  })
  .addCase(fetchBlogDetail.pending, (state) => {
    state.loadingDetail = true;
    state.errorDetail = undefined;
    state.blogDetail = null;
  })
  .addCase(fetchBlogDetail.fulfilled, (state, action: PayloadAction<BlogDetail>) => {
    state.loadingDetail = false;
    state.blogDetail = action.payload;
  })
  .addCase(fetchBlogDetail.rejected, (state, action) => {
    state.loadingDetail = false;
    state.errorDetail = action.payload as string;
  })
  ;
  },
});


export default blogSlice.reducer;