import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../api/apiClient';

interface RedirectParams {
  country: string;
  city: string;
  courseId: string;
}

interface RedirectApiResponse {
  status: boolean;
  redirect_url: string;
}

interface RedirectState {
  redirectUrl: string | null;
  loading: boolean;
  error: string | null;
  shouldRedirect: boolean;
}

const initialState: RedirectState = {
  redirectUrl: null,
  loading: false,
  error: null,
  shouldRedirect: false,
};

// Async thunk to fetch redirect URL
export const fetchRedirectUrl = createAsyncThunk(
  'redirect/fetchRedirectUrl',
  async ({ country, city, courseId }: RedirectParams, { rejectWithValue }) => {
    try {
      const response = await apiGet<RedirectApiResponse>('/get_redirect_url', {
        country,
        city,
        course_id: courseId,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    clearRedirectUrl: (state) => {
      state.redirectUrl = null;
      state.error = null;
      state.shouldRedirect = false;
    },
    resetRedirectState: (state) => {
      state.redirectUrl = null;
      state.error = null;
      state.shouldRedirect = false;
    },
    markRedirectComplete: (state) => {
      state.shouldRedirect = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedirectUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shouldRedirect = false;
      })
      .addCase(fetchRedirectUrl.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload.status && action.payload.redirect_url) {
          state.redirectUrl = action.payload.redirect_url;
          state.shouldRedirect = true;
        } else {
          state.error = 'No redirect URL received';
        }
      })
      .addCase(fetchRedirectUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.shouldRedirect = false;
      });
  },
});

export const { clearRedirectUrl, resetRedirectState, markRedirectComplete } = redirectSlice.actions;
export default redirectSlice.reducer;