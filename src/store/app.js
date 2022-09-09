import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: () => {
    return {
      device: 'desktop',
      sidebar: {
        opened: localStorage.get('sidebarStatus') ? !!+localStorage.get('sidebarStatus') : true,
        withoutAnimation: false,
        hide: false,
      },
      size: localStorage.get('size') || 'default',
    }
  },
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', 1);
      } else {
        localStorage.set('sidebarStatus', 0);
      }
    },
    closeSideBar(withoutAnimation) {
      localStorage.set('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device) {
      this.device = device;
    },
    setSize(size) {
      this.size = size;
      localStorage.set('size', size);
    },
    toggleSideBarHide(status) {
      this.sidebar.hide = status
    }
  },
});

export default useAppStore;
