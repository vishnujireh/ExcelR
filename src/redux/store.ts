import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import courseMenuReducer  from './slices/courseMenuSlice';
import upcomingBatchReducer from './slices/upcomingBatchSlice'
import ourClientsReducer from './slices/ourClientsSlice';

export const store = configureStore({
  reducer: {
    course: courseReducer,
    courseMenu: courseMenuReducer,
    upcomingBatch: upcomingBatchReducer,
    OurClients: ourClientsReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
