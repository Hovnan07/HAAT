import { create } from 'zustand';
import apiClient from '../services/api';

type AppState = {
  loading: boolean;
  markets: any;
  marketsDetail: any;
  getMarkets: () => void;
  getMarketsDetail: (categoryId: string) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  loading: false,
  markets: { marketCategories: [] },
  marketsDetail: { marketSubcategories: [] },
  setLoading: (isLoading: boolean) =>
    set({
      loading: isLoading
    }),
  getMarkets: () => {
    set({ loading: true });
    apiClient.get('/markets/4532')
      .then(response => {        
        set({ loading: false, markets: response.data });
      })
      .catch(error => {
        set({ loading: false });
        console.log(error);
      })
  },
  getMarketsDetail: (categoryId: string) => {
    set({ loading: true });
    apiClient.get(`/markets/4532/categories/${categoryId}`)
      .then(response => {
        set({ loading: false, marketsDetail: response.data });
      })
      .catch(error => {
        set({ loading: false });
        console.log(error, 'error');
      })
  }

}
));
