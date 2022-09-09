import useUserStore from './user';
import useAppStore from './app';
import usePermissionStore from './permission';
import useSettingStore from './settings';
import useTagsViewStore from './tagsView';

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  settings: useSettingStore(),
  tagsView: useTagsViewStore()
});

export default useStore;