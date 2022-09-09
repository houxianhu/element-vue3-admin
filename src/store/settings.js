import { defineStore } from 'pinia';
import defaultSettings from '@/settings';
// import { localStorage } from '@/utils/storage';

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings;
const el = document.documentElement;
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

export const useSettingStore = defineStore('settings', {
  state: () => {
    return {
      title: '',
      theme: storageSetting.theme || getComputedStyle(el).getPropertyValue(`--el-color-primary`),
      sideTheme: storageSetting.sideTheme || sideTheme,
      showSettings: showSettings,
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
    }
  },
  actions: {
    changeSetting(payload) {
      const { key, value } = payload;
      switch (key) {
        case 'topNav':
          this.topNav = value;
          break;
        case 'tagsView':
          this.tagsView = value;
          break;
        case 'fixedHeader':
          this.fixedHeader = value;
          break;
        case 'sidebarLogo':
          this.sidebarLogo = value;
          break;
        case 'dynamicTitle':
          this.dynamicTitle = value;
          break;
        case 'theme':
          this.theme = value;
          break;
        case 'sideTheme':
          this.sideTheme = value;
          break;
      }
    },
    setTitle(title) {
      this.title = title;
      if (this.dynamicTitle) {
        document.title = this.title + ' - ' + defaultSettings.title;
      } else {
        document.title = defaultSettings.title;
      }
    }
  },
});

export default useSettingStore;
