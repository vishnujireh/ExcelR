import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet } from "@/redux/api/apiClient";

/* ===================== TYPES ===================== */

export interface Country {
  ID: string;
  code: string;
  name: string;
  dial_code: string;
  currency_name: string;
  currency_symbol: string;
  currency_code: string;
  currency_value: string;
  status: string;
}

export interface StateItem {
  ID: string;
  name: string;
  country_id: string;
  status: string;
}

export interface LocationItem {
  ID: string;
  name: string;
  state_id: string;
  status: string;
}

interface ApiResponse<T> {
  status: boolean;
  data: T[];
}

interface LocationState {
  countries: Country[];
  states: StateItem[];
  locations: LocationItem[];

  loadingCountries: boolean;
  loadingStates: boolean;
  loadingLocations: boolean;

  error: string | null;
}

/* ===================== INITIAL STATE ===================== */

const initialState: LocationState = {
  countries: [],
  states: [],
  locations: [],

  loadingCountries: false,
  loadingStates: false,
  loadingLocations: false,

  error: null,
};

/* ===================== THUNKS ===================== */

// ---- Countries
export const fetchCountries = createAsyncThunk<
  Country[],
  void,
  { rejectValue: string }
>("location/fetchCountries", async (_, { rejectWithValue }) => {
  try {
    const res = await apiGet<ApiResponse<Country>>("/get_countries");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ---- States
export const fetchStates = createAsyncThunk<
  StateItem[],
  { country_id: string },
  { rejectValue: string }
>("location/fetchStates", async ({ country_id }, { rejectWithValue }) => {
  try {
    const res = await apiGet<ApiResponse<StateItem>>("/get_states", {
      country_id,
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ---- Locations
export const fetchLocations = createAsyncThunk<
  LocationItem[],
  { state_id: string },
  { rejectValue: string }
>("location/fetchLocations", async ({ state_id }, { rejectWithValue }) => {
  try {
    const res = await apiGet<ApiResponse<LocationItem>>("/get_locations", {
      state_id,
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

/* ===================== SLICE ===================== */

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetStatesAndLocations(state) {
      state.states = [];
      state.locations = [];
    },
    resetLocations(state) {
      state.locations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- Countries --------
      .addCase(fetchCountries.pending, (state) => {
        state.loadingCountries = true;
        state.error = null;
      })
      .addCase(
        fetchCountries.fulfilled,
        (state, action: PayloadAction<Country[]>) => {
          state.loadingCountries = false;
          state.countries = action.payload;
        }
      )
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loadingCountries = false;
        state.error = action.payload || "Failed to load countries";
      })

      // -------- States --------
      .addCase(fetchStates.pending, (state) => {
        state.loadingStates = true;
        state.error = null;
      })
      .addCase(
        fetchStates.fulfilled,
        (state, action: PayloadAction<StateItem[]>) => {
          state.loadingStates = false;
          state.states = action.payload;
        }
      )
      .addCase(fetchStates.rejected, (state, action) => {
        state.loadingStates = false;
        state.error = action.payload || "Failed to load states";
      })

      // -------- Locations --------
      .addCase(fetchLocations.pending, (state) => {
        state.loadingLocations = true;
        state.error = null;
      })
      .addCase(
        fetchLocations.fulfilled,
        (state, action: PayloadAction<LocationItem[]>) => {
          state.loadingLocations = false;
          state.locations = action.payload;
        }
      )
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loadingLocations = false;
        state.error = action.payload || "Failed to load locations";
      });
  },
});

export const {
  resetStatesAndLocations,
  resetLocations,
} = locationSlice.actions;

export default locationSlice.reducer;
