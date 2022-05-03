import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MDBAccordion } from "mdb-react-ui-kit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour Added Sucessfully ");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
    "tour/searchTours",
    async (searchQuery, { rejectWithValue }) => {
      try {
        const response = await api.getToursBySearch(searchQuery);

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const deleteTours = createAsyncThunk(
  "tour/deleteTours",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ navigate, updatedTourData, id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour({ id, updatedTourData });
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getTourByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByTag = createAsyncThunk(
    "tour/getTourByTag",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getToursByTag(id);

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const likeTour = createAsyncThunk(
    "tour/likeTour",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.likeATour(id);

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const getRelatedTours = createAsyncThunk(
    "tour/getRelatedTours",
    async (tags, { rejectWithValue }) => {
      try {
        console.log(tags)
        const response = await api.getRelatedTours(tags);

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    relatedTours:[],
    error: "",
    loading: false,
    currentPage:1,
    numberOfPages:null

  },
  reducers:{
    setCurrentpage:(state,action) =>{
      state.currentPage = action.payload
    },
  },

  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("working");
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages
      state.currentPage = action.payload.currentPage
    },
    [getTours.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [deleteTours.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTours.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.userTours.filter((item) => item._id !== id);
      }
    },
    [deleteTours.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [searchTours.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [getToursByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('completed')
      state.tours = action.payload;

    },
    [getToursByTag.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [getRelatedTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('completed')
      state.relatedTours = action.payload;

    },
    [getRelatedTours.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [likeTour.pending]: (state, action) => {},
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg
      } = action.meta;


      if (arg) {
        state.tours = state.tours.map((item) =>
            item._id === arg ? action.payload : item
        );
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

  },
});

export const {setCurrentpage} = tourSlice.actions
export default tourSlice.reducer;
