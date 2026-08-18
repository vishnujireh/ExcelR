import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

export interface PlacementRecord {
  id: string;
  name: string;
  course: string;
  city: string;
  company: string;
  role: string;
  placed_date: string;
  linkedin_url?: string;
}

export interface PlacementStats {
  total_placements: number | string;
  hiring_companies: number | string;
  cities: number | string;
  courses: number | string;
}

interface PlacementState {
  records: PlacementRecord[];
  stats: PlacementStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlacementState = {
  records: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchPlacementRecords = createAsyncThunk<
  { records: PlacementRecord[]; stats: PlacementStats | null },
  void,
  { rejectValue: string }
>("placement/fetchRecords", async (_, { rejectWithValue }) => {
  try {
    const res = await apiGet<any>("/placement_records");
    // Handle both { data: [], stats: {} } and flat array responses
    const records: PlacementRecord[] = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
      ? res.data
      : [];
    const stats: PlacementStats | null = res?.stats ?? null;
    return { records, stats };
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch placement records");
  }
});

const placementSlice = createSlice({
  name: "placement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlacementRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlacementRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload.records;
        state.stats = action.payload.stats;
      })
      .addCase(fetchPlacementRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default placementSlice.reducer;
