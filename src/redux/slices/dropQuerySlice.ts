import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "@/redux/api/apiClient";

/* ------------------ Types ------------------ */

export interface DropQueryPayload {
  user_name: string;
  user_email: string;
  user_mobile: string;
  course: string;
  user_country: string;
  user_state: string;
  user_location: string;
  user_message: string;
  course_url: string;
  landing_page_url: string;
  form_source: string;
  looking_for: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  ucontent: string;
  device: string;
  adgroup: string;
  gclid: string;
  utm_channel: string;
  utm_type: string;
  utm_variety: string;
  utm_experiment: string;
  form_name: string;
  country_code: string;
  template: string;
}

interface DropQueryResponse {
  status: boolean;
  message: string;
  data: {
    query_id: boolean;
    name: string;
    email: string;
    mobile: string;
  };
}

interface DropQueryState {
  loading: boolean;
  success: boolean;
  message: string;
  data: DropQueryResponse["data"] | null;
  error: string | null;
}

/* ------------------ Initial State ------------------ */

const initialState: DropQueryState = {
  loading: false,
  success: false,
  message: "",
  data: null,
  error: null,
};

/* ------------------ Async Thunk ------------------ */

export const submitDropQuery = createAsyncThunk<
  DropQueryResponse,
  DropQueryPayload,
  { rejectValue: string }
>("dropQuery/submit", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return await apiPost<DropQueryResponse>("/drop_query", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error: any) {
    return rejectWithValue(error.message || "Query submission failed");
  }
});

/* ------------------ Slice ------------------ */

const dropQuerySlice = createSlice({
  name: "dropQuery",
  initialState,
  reducers: {
    resetDropQueryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDropQuery.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        submitDropQuery.fulfilled,
        (state, action: PayloadAction<DropQueryResponse>) => {
          state.loading = false;
          state.success = action.payload.status;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      )
      .addCase(submitDropQuery.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDropQueryState } = dropQuerySlice.actions;
export default dropQuerySlice.reducer;
