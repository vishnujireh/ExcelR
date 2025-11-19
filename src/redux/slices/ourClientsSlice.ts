// src/redux/slices/ourClientsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../api/apiClient";

export const fetchOurClients = createAsyncThunk(
  "OurClients/fetchOurClients",
  async () => {
    const res = await apiGet("/our_clients");
    return res;  // returns { status, message, data }
  }
);

interface ClientState {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: ClientState = {
  loading: false,
  data: [],
  error: null,
};

const ourClientsSlice = createSlice({
  name: "OurClients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOurClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOurClients.fulfilled, (state, action) => {
        state.loading = false;

        // IMPORTANT FIX 🔥
        state.data = action.payload.data;
      })
      .addCase(fetchOurClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default ourClientsSlice.reducer;
