import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';


const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const data = await axios.get(`https://6467dda560c8cb9a2c9ed9e1.mockapi.io/items?category=${categoryId}`)
      .then(({ data }) => {
        return data
      })
  }
)

const initialState = {
  items: [],
  status: 'loading'
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succsess';
    },
    [fetchItems.rejected]: (state, action) => {
      state.items = [];
      state.status = 'error';
    },
  }
})

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;