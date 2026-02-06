import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "../api/apiClient";

export interface EveryDayLearningPayload {
  name: string;
  college_name: string;
  company_email: string;
  mobile_no: string;
  country_code: string;
  location: string;
  country: string;
  course: string;
}

export interface EveryDayLearningResponse {
  status: boolean;
  message: string;
}

interface EveryDayLearningState {
  loading: boolean;
  success: boolean;
  message?: string;
  error?: string;
}

const initialState: EveryDayLearningState = {
  loading: false,
  success: false,
  message: "",
  error: "",
};

export const submitEveryDayLearning = createAsyncThunk<
  EveryDayLearningResponse,
  EveryDayLearningPayload,
  { rejectValue: string }
>("everyDayLearning/submit", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return await apiPost("/every_day_learning_form", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const everyDayLearningSlice = createSlice({
  name: "everyDayLearning",
  initialState,
  reducers: {
    resetEveryDayLearningState(state) {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEveryDayLearning.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = "";
      })
      .addCase(
        submitEveryDayLearning.fulfilled,
        (state, action: PayloadAction<EveryDayLearningResponse>) => {
          state.loading = false;
          state.success = action.payload.status;
          state.message = action.payload.message;
        }
      )
      .addCase(submitEveryDayLearning.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetEveryDayLearningState } = everyDayLearningSlice.actions;
export default everyDayLearningSlice.reducer;
