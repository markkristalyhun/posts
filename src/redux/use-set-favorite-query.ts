import {store} from './store';
import {setFavorite as setFavoriteQuery} from './post.api';

export const useSetFavoriteQuery = () => {
  const setFavorite = (id: number, isFavorite: boolean) => {
    store.dispatch(setFavoriteQuery(id, isFavorite));
  };
  return {setFavorite};
};
