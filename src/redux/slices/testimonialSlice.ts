import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

export interface Testimonial {
  id: string;
  caption: string;
  author: string;
  designation: string;
  description: string;
  image_url: string;
  linkedin_link: string;
}

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk<
  Testimonial[],
  void,
  { rejectValue: string }
>("testimonials/fetchTestimonials", async (_, { rejectWithValue }) => {
  try {
    const res = await apiGet<{
      message: string;
      data: Testimonial[];
    }>(`/testimonials`);

    return res.data; // ✅ VERY IMPORTANT
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch testimonials");
  }
});

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default testimonialSlice.reducer;