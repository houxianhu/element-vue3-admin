<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import useStore from '@/store';

const route = useRoute()
const { tagsView } = useStore();
tagsView.addCachedView(route)
const cachedViews = computed(() => tagsView.cachedViews);
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  width: 100%;
  position: relative;
  overflow: auto;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
