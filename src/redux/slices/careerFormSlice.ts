import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "../api/apiClient";

export interface CareerFormPayload {
  first_name: string;
  contact_no: string;
  email_id: string;
  title: string;
  location: string;
  category: string;
  industry: string;
  referral_code: string;
  cover_letter: string;
  resume?: File | null;
}

export interface CareerFormResponse {
  status: boolean;
  message: string;
}

interface CareerFormState {
  loading: boolean;
  success: boolean;
  message?: string;
  error?: string;
}

const initialState: CareerFormState = {
  loading: false,
  success: false,
  message: "",
  error: "",
};

export const submitCareerForm = createAsyncThunk<
  CareerFormResponse,
  CareerFormPayload,
  { rejectValue: string }
>("careerForm/submit", async (payload, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "resume") return;
      formData.append(key, String(value));
    });

    if (payload.resume) {
  formData.append("resume", payload.resume);
}

    return await apiPost("/job_portal_register", formData);
  } catch (err: any) {
 console.log("Career API Error:", err.response?.data || err);
 return rejectWithValue(
   err.response?.data?.message || err.message
 );
}
});

const careerFormSlice = createSlice({
  name: "careerForm",
  initialState,
  reducers: {
    resetCareerFormState(state) {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCareerForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = "";
      })
      .addCase(
        submitCareerForm.fulfilled,
        (state, action: PayloadAction<CareerFormResponse>) => {
          state.loading = false;
          state.success = action.payload.status;
          state.message = action.payload.message;
        }
      )
      .addCase(submitCareerForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCareerFormState } = careerFormSlice.actions;
export default careerFormSlice.reducer;
