import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "../api/apiClient";

export interface CorporateTrainingPayload {
  name: string;
  company_name: string;
  company_email: string;
  mobile_no: string;
  country_code: string;
  location: string;
  country: string;
  course: string;
  hear_about_us: string;
  description: string;
}

export interface CorporateTrainingResponse {
  status: boolean;
  message: string;
}

interface CorporateTrainingState {
  loading: boolean;
  success: boolean;
  message?: string;
  error?: string;
}

const initialState: CorporateTrainingState = {
  loading: false,
  success: false,
  message: "",
  error: "",
};

export const submitCorporateTraining = createAsyncThunk<
  CorporateTrainingResponse,
  CorporateTrainingPayload,
  { rejectValue: string }
>("corporateTraining/submit", async (payload, { rejectWithValue }) => {
  try {
    const formData = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return await apiPost("/corporate_training_form", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const corporateTrainingSlice = createSlice({
  name: "corporateTraining",
  initialState,
  reducers: {
    resetCorporateTrainingState(state) {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCorporateTraining.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = "";
      })
      .addCase(
        submitCorporateTraining.fulfilled,
        (state, action: PayloadAction<CorporateTrainingResponse>) => {
          state.loading = false;
          state.success = action.payload.status;
          state.message = action.payload.message;
        }
      )
      .addCase(submitCorporateTraining.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCorporateTrainingState } =
  corporateTrainingSlice.actions;
export default corporateTrainingSlice.reducer;
