import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet } from '@/redux/api/apiClient';

// =====================
// TYPES (INLINE)
// =====================
interface CMSPage {
  id: string;
  banner_title: string;
  banner_image: string;
  title: string;
  base_url: string;
  description: string;
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: string;
  schema_field?: string;
  created_at?: string;
  status: string;
  cnt?: string;
}

interface PageDetailResponse {
  page: CMSPage[];
}

interface PageDetailState {
  data: CMSPage | null;
  loading: boolean;
  error: string | null;
}

// =====================
// INITIAL STATE
// =====================
const initialState: PageDetailState = {
  data: null,
  loading: false,
  error: null,
};

// =====================
// ASYNC THUNK
// =====================
export const fetchPageDetail = createAsyncThunk<
  CMSPage,
  string,
  { rejectValue: string }
>('pageDetail/fetch', async (slug, { rejectWithValue }) => {
  try {
    const res = await apiGet<PageDetailResponse>(
      '/get_page_details',
      { base_url: slug }
    );

    if (!res.page || res.page.length === 0) {
      return rejectWithValue('Page not found');
    }

    return res.page[0];
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch page');
  }
});

// =====================
// SLICE
// =====================
const pageDetailSlice = createSlice({
  name: 'pageDetail',
  initialState,
  reducers: {
    clearPageDetail(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPageDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPageDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearPageDetail } = pageDetailSlice.actions;
export default pageDetailSlice.reducer;
