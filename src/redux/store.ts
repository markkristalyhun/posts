import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {commentApi} from './comment.api';
import {postApi} from './post.api';
import {userApi} from './user.api';

const reducerMap = {
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};

const rootReduce = combineReducers({
  ...reducerMap,
});

export const store = configureStore({
  reducer: rootReduce,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      commentApi.middleware,
      userApi.middleware,
    ),
});

setupListeners(store.dispatch);
