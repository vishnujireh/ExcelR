import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

/* -----------------------------
   Types
----------------------------- */

interface GalleryImage {
  image_title: string;
  image: string;
}

export interface GalleryItem {
  gallery_id: string;
  image_title: string;
  image: string;
  images: GalleryImage[];
}

interface GalleryState {
  images: GalleryItem[];
  loading: boolean;
  error: string | null;
}

/* -----------------------------
   Initial State
----------------------------- */

const initialState: GalleryState = {
  images: [],
  loading: false,
  error: null,
};

/* -----------------------------
   Async Thunk
----------------------------- */

export const fetchGallery = createAsyncThunk<
  GalleryItem[],
  void,
  { rejectValue: string }
>("gallery/fetchGallery", async (_, { rejectWithValue }) => {
  try {
    const response = await apiGet<{
      gallery: GalleryItem[];
    }>("/get_gallery");

    // ✅ response is already DATA
    return response.gallery;
  } catch (error: any) {
    return rejectWithValue(
      error?.message || "Failed to fetch gallery"
    );
  }
});


/* -----------------------------
   Slice
----------------------------- */

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load gallery";
      });
  },
});

export default gallerySlice.reducer;
