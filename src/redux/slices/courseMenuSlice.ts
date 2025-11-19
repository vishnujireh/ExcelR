// redux/slices/courseMenuSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

// --- Types ---
export interface CourseItem {
  course_name: string;
  base_url: string;
}

export interface Subcategory {
  subcategory: string | null;
  courses: CourseItem[];
}

export interface ParentCategory {
  parent_category: string;
  base_url: string;
  subcategories: Subcategory[];
}

interface CourseMenuState {
  menu: ParentCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseMenuState = {
  menu: [],
  loading: false,
  error: null,
};

// --- Async Thunk ---
export const fetchCourseMenu = createAsyncThunk(
  "courseMenu/fetch",
  async (ip_address: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const res = await apiGet<{ data: ParentCategory[] }>("/course_menu", 
        ip_address ? { ip_address } : undefined
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Slice ---
const courseMenuSlice = createSlice({
  name: "courseMenu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCourseMenu.fulfilled,
        (state, action: PayloadAction<ParentCategory[]>) => {
          state.loading = false;
          state.menu = action.payload;
        }
      )
      .addCase(fetchCourseMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default courseMenuSlice.reducer;
