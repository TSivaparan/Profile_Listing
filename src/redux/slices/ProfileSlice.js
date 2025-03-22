import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfilesApi, fetchProfileByIdApi } from "../../services/ProfileService";


export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async ({ page, limit }) => {
    return await fetchProfilesApi(page, limit);
  }
);


export const fetchProfileById = createAsyncThunk(
  "profiles/fetchProfileById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchProfileByIdApi(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    selectedProfile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProfile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default profileSlice.reducer;
