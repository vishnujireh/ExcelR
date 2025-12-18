import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet } from '../api/apiClient';

interface City {
  ID: string;
  name: string;
}

interface CityApiResponse {
  data: {
    selected_city: string;
    country_id: string;
    url_city: string;
    url_country: string;
    cities: City[];
  };
}

interface CityState {
  cities: City[];
  selectedCity: City | null;
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  cities: [],
  selectedCity: null,
  loading: false,
  error: null,
};

// Async thunk to fetch cities based on country ID with dynamic slug
export const fetchCities = createAsyncThunk(
  'city/fetchCities',
  async ({ countryId, slug }: { countryId: string; slug: string }, { rejectWithValue }) => {
    try {
      const response = await apiGet<CityApiResponse>(
        `/get_city/${slug}`,
        { country_id: countryId }
      );
      return response.data.cities;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
    clearSelectedCity: (state) => {
      state.selectedCity = null;
    },
    clearCities: (state) => {
      state.cities = [];
      state.selectedCity = null;
    },
    resetCityState: (state) => {
      state.cities = [];
      state.selectedCity = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCity, clearSelectedCity, clearCities, resetCityState } = citySlice.actions;
export default citySlice.reducer;
