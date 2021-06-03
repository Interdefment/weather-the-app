import { UserInfo } from '@firebase/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, signIn } from '../api/firebase.api';

export const registerThunk = createAsyncThunk<
	UserInfo,
	{ email: string; password: string; username: string }
>('auth/register', async ({ email, password, username }) => {
	const user = await registerUser(email, password, username);
	return user.providerData[0];
});

export const loginThunk = createAsyncThunk<
	UserInfo,
	{ email: string; password: string }
>('auth/login', async ({ email, password }) => {
	const user = await signIn(email, password);
	return user.providerData[0];
});

const getInitialState = (): { user: UserInfo | null } => {
	return { user: null };
};

const authSlice = createSlice({
	name: 'auth',
	initialState: getInitialState(),
	reducers: {
		setUser: (state, action: PayloadAction<UserInfo | null>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerThunk.fulfilled, (state, { payload }) => {
			state.user = payload;
		});
		builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
			state.user = payload;
		});
	},
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
