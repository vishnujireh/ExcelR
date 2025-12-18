import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

export interface PopularCourse {
  id: string;
  base_url: string;
  course_name: string;
  home_image: string;
}

interface PopularCoursesState {
  courses: PopularCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: PopularCoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchPopularCourses = createAsyncThunk<
  PopularCourse[],
  string,
  { rejectValue: string }
>("popularCourses/fetchPopularCourses", async (page_name, { rejectWithValue }) => {
  try {
    const res = await apiGet<{
      status: boolean;
      message: string;
      data: PopularCourse[];
    }>(`/popular_courses?page_name=${page_name}`);

    return res.data; // ✅ THIS IS CRITICAL
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch popular courses");
  }
});

const popularCoursesSlice = createSlice({
  name: "popularCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchPopularCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default popularCoursesSlice.reducer;
