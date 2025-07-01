import { create } from 'zustand';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { Languages } from '../utils/languages';
type SettingsState = {
  isRTL: boolean;
  language: Languages;
  setLanguage: (value: Languages) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  isRTL: I18nManager.isRTL,
  language: Languages.EN,
  setLanguage: (value: Languages) => {
    set({ language: value });
    if(value === Languages.AR || value === Languages.HE ){
      if(I18nManager.isRTL){
        return 
      }
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      RNRestart.Restart();
    }else{
      if(!I18nManager.isRTL){
        return 
      }
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      RNRestart.Restart();
    }
  },
}));
