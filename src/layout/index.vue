<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar  v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar @setLayout="setLayout"/>
        <tags-view v-if="needTagsView" />
      </div>

      <!--主页面-->
      <app-main />
      <Settings ref="settingRef" />
    </div>
  </div>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
import { AppMain, Navbar, TagsView, Settings, Sidebar } from './components';
import useStore from '@/store';

const { width } = useWindowSize();
const WIDTH = 992;

const { app, settings } = useStore();

const theme = computed(() => app.theme);
const sideTheme = computed(() => settings.sideTheme);
const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const needTagsView = computed(() => settings.tagsView);
const fixedHeader = computed(() => settings.fixedHeader);
const showSettings = computed(() => settings.showSettings);

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}));

watchEffect(() => {
  if(device.value === 'mobile' && sidebar.value.opened) {
    app.closeSideBar(false)
  }
  if (width.value - 1 < WIDTH) {
    app.toggleDevice('mobile');
    app.closeSideBar(true);
  } else {
    app.toggleDevice('desktop');
  }
});

const handleClickOutside = () => {
  app.closeSideBar(false);
}

const settingRef = ref(null);

const setLayout = () => {
  settingRef.value.openSetting();
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  width: 100%;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
