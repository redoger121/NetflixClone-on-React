import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  username: string;
  email: string;
};

export type UserState = {
  value: {
    user: User | null;
    isloading: boolean;
  };
};

const initialState: UserState = {
  value: {
    user: null,
    isloading: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value.user = action.payload;
      state.value.isloading = false;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.isloading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
