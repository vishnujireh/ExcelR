import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet } from '../api/apiClient';

interface Country {
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

interface City {
  ID: string;
  name: string;
}

interface CountryApiResponse {
  data: {
    selected_country_id: string;
    selected_country_name: string;
    selected_city: string;
    countries: Country[];
    cities: City[];
  };
}

interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  selectedCity: City | null;
  initialCities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
  selectedCity: null,
  initialCities: [],
  loading: false,
  error: null,
};

// Async thunk to fetch countries with dynamic slug
export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async ({ slug, ipAddress = '49.37.251.29' }: { slug: string; ipAddress?: string }, { rejectWithValue }) => {
    try {
      const response = await apiGet<CountryApiResponse>(
        `/get_country/${slug}`,
        { ip_address: ipAddress }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },
    setSelectedCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
    clearSelectedCity: (state) => {
      state.selectedCity = null;
    },
    resetCountryState: (state) => {
      state.countries = [];
      state.selectedCountry = null;
      state.selectedCity = null;
      state.initialCities = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload.countries;
        state.initialCities = action.payload.cities;
        
        // Set selected country based on API response
        if (action.payload.selected_country_id) {
          const selectedCountry = action.payload.countries.find(
            c => c.ID === action.payload.selected_country_id
          );
          if (selectedCountry) {
            state.selectedCountry = selectedCountry;
          }
        }
        
        // Set selected city based on API response
        if (action.payload.selected_city) {
          // First check if city exists in cities array
          let selectedCity = action.payload.cities.find(
            c => c.name === action.payload.selected_city
          );
          
          // If cities array is empty but selected_city exists, create a city object
          if (!selectedCity && action.payload.selected_city) {
            selectedCity = {
              ID: '0', // Temporary ID for selected city
              name: action.payload.selected_city
            };
            // Add it to initialCities so it shows in the dropdown
            state.initialCities = [selectedCity];
          }
          
          if (selectedCity) {
            state.selectedCity = selectedCity;
          }
        }
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setSelectedCountry, 
  clearSelectedCountry, 
  setSelectedCity,
  clearSelectedCity,
  resetCountryState 
} = countrySlice.actions;
export default countrySlice.reducer;