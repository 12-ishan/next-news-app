
import { configureStore } from '@reduxjs/toolkit';
import newsCategoryReducer from './slice/newsCategoriesSlice';
import newsReducer from './slice/newsSlice'; 


import newsDetailReducer from './slice/newsDetailSlice';

import searchReducer from './slice/searchSlice';
import generalSettingsReducer from './slice/generalSettingsSlice';
import landingPagesReducer from './slice/landingPagesSlice';

import contactReducer from './slice/contactSlice';


const store = configureStore({
  reducer: {
    newsCategory: newsCategoryReducer,
    news: newsReducer, 
    newsDetail: newsDetailReducer,
    search: searchReducer,
    generalSettings: generalSettingsReducer,
    landingPage: landingPagesReducer,
    contact: contactReducer,
  }
});

export default store;
