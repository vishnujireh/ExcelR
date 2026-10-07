import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

/* ── Types (mirrors only what Footer.tsx needs) ── */
interface ApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface FooterInfo         { description: string }
export interface FooterOrg          { description: string }
export interface FooterContact      { description: string }
export interface FooterCourseItem   { description: string }

interface FooterState {
  info:         ApiState<FooterInfo[]>;
  org:          ApiState<FooterOrg[]>;
  contact:      ApiState<FooterContact[]>;
  footer_course: ApiState<FooterCourseItem[]>;
}

const initialState: FooterState = {
  info:          { data: [], loading: false, error: null },
  org:           { data: [], loading: false, error: null },
  contact:       { data: [], loading: false, error: null },
  footer_course: { data: [], loading: false, error: null },
};

/* ── Thunk: hits the same /home_data endpoint, keeps only footer fields ── */
export const fetchFooterData = createAsyncThunk(
  "footer/fetchFooterData",
  async () => {
    const res = await apiGet("/footer_data");
    return {
      info:          (res.info          || []) as FooterInfo[],
      org:           (res.org           || []) as FooterOrg[],
      contact:       (res.contacts      || []) as FooterContact[],
      footer_course: (res.footer_course || []) as FooterCourseItem[],
    };
  }
);

/* ── Slice ── */
const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterData.pending, (state) => {
        state.info.loading         = true;
        state.org.loading          = true;
        state.contact.loading      = true;
        state.footer_course.loading = true;
        state.info.error           = null;
        state.org.error            = null;
        state.contact.error        = null;
        state.footer_course.error  = null;
      })
      .addCase(fetchFooterData.fulfilled, (state, action) => {
        state.info.data            = action.payload.info;
        state.org.data             = action.payload.org;
        state.contact.data         = action.payload.contact;
        state.footer_course.data   = action.payload.footer_course;
        state.info.loading         = false;
        state.org.loading          = false;
        state.contact.loading      = false;
        state.footer_course.loading = false;
      })
      .addCase(fetchFooterData.rejected, (state, action) => {
        const msg = action.error.message || "Failed to load footer data";
        state.info.error           = msg;
        state.org.error            = msg;
        state.contact.error        = msg;
        state.footer_course.error  = msg;
        state.info.loading         = false;
        state.org.loading          = false;
        state.contact.loading      = false;
        state.footer_course.loading = false;
      });
  },
});

export default footerSlice.reducer;
