<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view></router-view>
  </el-config-provider>
  
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const size = ref('default')
const zIndex = ref(3000)
const locale = ref(zhCn)
</script>
