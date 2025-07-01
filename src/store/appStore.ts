import { create } from 'zustand';
import apiClient from '../services/api';

type AppState = {
  loading: boolean;
  markets: any;
  getMarkets: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  loading: false,
  markets: [],
  setLoading: (isLoading: boolean) =>
    set({
      loading: isLoading
    }),
  getMarkets: () => {
    set({ loading: true });
    apiClient.get('/markets/4532')
      .then(response => {
        console.log(response.data);
        set({ loading: false, markets: response.data });
      })
      .catch(error => {
        set({ loading: false });
        console.log(error);
      })
  }

}
));
