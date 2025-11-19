// redux/slices/upcomingBatchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

// --- Types ---
export interface DateInfo {
  raw: string;
  display: string;
}

export interface BatchDate {
  batch_id: number;
  date: DateInfo;
  time: string;
  currency: string;
  amount: string;
  discount_amount: string;
  discount_validity: string;
  enroll_url: string;
  filling_fast: boolean;
}

export interface PriceInfo {
  currency: string;
  amount: string;
  discount_amount: string;
}

export interface TrainingMode {
  mode: string;
  price_info: PriceInfo;
  benefits_html: string;
  upcoming_dates_preview: BatchDate[];
  upcoming_dates_all: Record<string, BatchDate[]>;
  upcoming_count: number;
  show_all_batches_action: string;
  enroll_action: string;
}

export interface ComboOfferItem {
  name: string;
  mrp: string;
  discount_price: string;
  currency: string;
  enroll_url: string;
}

export interface ComboOffer {
  items: ComboOfferItem[];
  action: string;
}

export interface UpcomingBatchData {
  course_id: number;
  city: string;
  training_modes: TrainingMode[];
  combo_offer?: ComboOffer | null;
}

export interface UpcomingBatchResponse {
  status: boolean;
  data: UpcomingBatchData;
}

interface UpcomingBatchState {
  batchData: UpcomingBatchData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UpcomingBatchState = {
  batchData: null,
  loading: false,
  error: null,
};

// --- Async Thunk ---
export interface FetchUpcomingBatchParams {
  courseSlug: string;
  city: string;
  ip_address?: string;
}

export const fetchUpcomingBatch = createAsyncThunk(
  "upcomingBatch/fetch",
  async (params: FetchUpcomingBatchParams, { rejectWithValue }) => {
    try {
      const { courseSlug, ip_address } = params;
      const endpoint = `/course_batches/${courseSlug}`;
      
      const res = await apiGet<UpcomingBatchResponse>(
        endpoint,
        ip_address ? { ip_address } : undefined
      );
      
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch upcoming batches");
    }
  }
);

// --- Slice ---
const upcomingBatchSlice = createSlice({
  name: "upcomingBatch",
  initialState,
  reducers: {
    clearBatchData: (state) => {
      state.batchData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUpcomingBatch.fulfilled,
        (state, action: PayloadAction<UpcomingBatchData>) => {
          state.loading = false;
          state.batchData = action.payload;
        }
      )
      .addCase(fetchUpcomingBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBatchData } = upcomingBatchSlice.actions;
export default upcomingBatchSlice.reducer;