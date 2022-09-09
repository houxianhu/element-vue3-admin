<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script setup>
import { isExternal } from '@/utils/validate';
import { useRouter } from 'vue-router';
import useStore from '@/store';

const { app } = useStore();
const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);

const props = defineProps({
  to: {
      type: String,
      required: true
    }
})

const router = useRouter();

const push = () => {
  if (device.value === 'mobile' && sidebar.value.opened == true) {
    app.closeSideBar(false);
  }
  router.push(props.to).catch(err => {
    console.log(err);
  });
};

</script>
