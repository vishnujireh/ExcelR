import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

/* ============================
✅ TYPES
============================ */

// ✅ Career List Type
export interface Career {
  id: string;
  title: string;
  base_url: string;
  industry: string;
  category: string;
  location: string;
}

// ✅ Career Detail Type
export interface CareerDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  industry: string;
  location: string;
}

interface CareerState {
  careers: Career[];            // ✅ Career List
  careerDetail: CareerDetail | null; // ✅ Single Job Detail
  loading: boolean;
  error: string | null;
}

/* ============================
✅ INITIAL STATE
============================ */

const initialState: CareerState = {
  careers: [],
  careerDetail: null,
  loading: false,
  error: null,
};

/* ============================
✅ FETCH CAREER LIST
============================ */

export const fetchCareers = createAsyncThunk<
  Career[],
  void,
  { rejectValue: string }
>("careers/fetchCareers", async (_, { rejectWithValue }) => {
  try {
    const data = await apiGet<{ jobs: Career[] }>("/get_careers_list");
    return data.jobs;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch careers");
  }
});

/* ============================
✅ FETCH CAREER DETAILS
============================ */

export const fetchCareerDetail = createAsyncThunk<
  CareerDetail,
  string, // ✅ slug (inside-sales-manager)
  { rejectValue: string }
>("careers/fetchCareerDetail", async (slug, { rejectWithValue }) => {
  try {
    const data = await apiGet<{ job: CareerDetail }>(
      "/get_careers_details",
      { base_url: slug }
    );

    return data.job;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch career details");
  }
});

/* ============================
✅ SLICE
============================ */

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    clearCareerDetail: (state) => {
      state.careerDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =====================
      ✅ CAREER LIST
      ===================== */

      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = action.payload;
      })

      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      /* =====================
      ✅ CAREER DETAIL
      ===================== */

      .addCase(fetchCareerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.careerDetail = null;
      })

      .addCase(fetchCareerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.careerDetail = action.payload;
      })

      .addCase(fetchCareerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load job details";
      });
  },
});

/* ============================
✅ EXPORTS
============================ */

export const { clearCareerDetail } = careerSlice.actions;
export default careerSlice.reducer;
