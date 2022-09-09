<template>
    <div>
        <p>this is index</p> 
        
        <svg-icon :icon-class="'dashboard'"></svg-icon>
        <router-link to="/test">to test page</router-link>
    </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
</script>