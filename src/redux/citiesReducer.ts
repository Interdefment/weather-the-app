import { addDoc, collection, deleteDoc, doc, setDoc } from '@firebase/firestore';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../config.firebase';
import { City } from '../types';

export const addCityThunk = createAsyncThunk<City, { city: City, userId: string }>(
  'cities/addSavedCity',
  async ({city, userId}) => {
    const docRef = await addDoc(collection(db, 'cities'), { ...city, userId });
    return {
			...city,
			cityid: docRef.id,
		};
  }
)

export const deleteCityThunk = createAsyncThunk<string, string>(
  'cities/deleteSavedCity',
  async (cityid: string) => {
		await deleteDoc(doc(db, 'cities', cityid));
    return cityid;
  }
)

type CitiesState = {
	saved: City[];
	citiesCache: Record<string, number>;
};

const getInitialState = (): CitiesState => {
	return {
		saved: [],
		citiesCache: {},
	};
};

const citiesSlice = createSlice({
	name: 'cities',
	initialState: getInitialState(),
	reducers: {
		setSavedCities: (state, action: PayloadAction<City[]>) => {
			state.saved = action.payload;
		},
		loadFromStorage: (state) => {
		},
	},
  extraReducers: (builder) => {
    builder.addCase(addCityThunk.fulfilled, (state, { payload }) => {
			// state.saved.push(payload);
    })
    builder.addCase(deleteCityThunk.fulfilled, (state, { payload }) => {
			state.saved = state.saved.filter((city) => city.cityid !== payload);
    })
  },
});

export const {
	setSavedCities,
	loadFromStorage,
} = citiesSlice.actions;

export default citiesSlice.reducer;



// export const deleteCityThunk = createAsyncThunk<City, City>(
//   'users/fetchById',
//   async (city: City) => {
//     const docRef = await deleteDoc(doc(db, 'cities', city.cityid));
//     return {
// 			...city,
// 			cityid: docRef.id,
// 		};
//   }
// )
