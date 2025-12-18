import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "@/redux/api/apiClient";

/* ------------------ Types ------------------ */

export interface LetUsKnowPayload {
  user_name: string;
  user_email: string;
  user_mobile: string;
  user_course: string;
  preferred_date: string;
  form_source: string;
  country_code: string;
  user_country: string;
  user_state: string;
  user_location: string;
  user_course_url: string;
  landing_page_url: string;
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
}

interface LetUsKnowResponse {
  status: boolean;
  message: string;
  data: {
    lead_id: string;
    name: string;
    email: string;
    mobile: string;
  };
}

interface LetUsKnowState {
  loading: boolean;
  success: boolean;
  message: string;
  data: LetUsKnowResponse["data"] | null;
  error: string | null;
}

/* ------------------ Initial State ------------------ */

const initialState: LetUsKnowState = {
  loading: false,
  success: false,
  message: "",
  data: null,
  error: null,
};

/* ------------------ Async Thunk ------------------ */

export const submitLetUsKnow = createAsyncThunk<
  LetUsKnowResponse,
  LetUsKnowPayload,
  { rejectValue: string }
>("letUsKnow/submit", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return await apiPost<LetUsKnowResponse>(
      "/letusknow",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error: any) {
    return rejectWithValue(error.message || "Let Us Know submission failed");
  }
});

/* ------------------ Slice ------------------ */

const letUsKnowSlice = createSlice({
  name: "letUsKnow",
  initialState,
  reducers: {
    resetLetUsKnowState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLetUsKnow.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        submitLetUsKnow.fulfilled,
        (state, action: PayloadAction<LetUsKnowResponse>) => {
          state.loading = false;
          state.success = action.payload.status;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      )
      .addCase(submitLetUsKnow.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetLetUsKnowState } = letUsKnowSlice.actions;
export default letUsKnowSlice.reducer;
