import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import courseMenuReducer  from './slices/courseMenuSlice';
import upcomingBatchReducer from './slices/upcomingBatchSlice'
import ourClientsReducer from './slices/ourClientsSlice';
import countryReducer from './slices/countrySlice';
import cityReducer from './slices/citySlice';
import redirectReducer from './slices/redirectSlice';
import blogReducer from './slices/blogSlice';
import careerReducer from './slices/careerSlice'
import newsEventsReducer from './slices/newsEventsSlice'
import popularCoursesReducer from "./slices/popularCoursesSlice";
import testimonialReducer from "./slices/testimonialSlice";
import dropQuerySlice from "./slices/dropQuerySlice";
import locationReducer from "@/redux/slices/locationSlice";
import letUsKnowReducer from './slices/letUsKnowSlice';
import galleryReducer from "./slices/gallerySlice";
import pageDetailReducer from './slices/pageDetailSlice';
import corporateTrainingReducer from "./slices/corporateTrainingSlice";
import everyDayLearningReducer from "./slices/everyDayLearningSlice";
import careerFormReducer from "./slices/careerFormSlice";


export const store = configureStore({
  reducer: {
    course: courseReducer,
    courseMenu: courseMenuReducer,
    upcomingBatch: upcomingBatchReducer,
    OurClients: ourClientsReducer,
    country: countryReducer,
    city: cityReducer,
    redirect: redirectReducer,
    blogs: blogReducer,
    career: careerReducer,
    newsEvents: newsEventsReducer,
    popularCourses: popularCoursesReducer,
    testimonials: testimonialReducer,
    dropQuery: dropQuerySlice,
    location: locationReducer,
    letUsKnow: letUsKnowReducer,
    gallery: galleryReducer,
    pageDetail: pageDetailReducer,
    corporateTraining: corporateTrainingReducer,
    everyDayLearning: everyDayLearningReducer,
    careerForm: careerFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
