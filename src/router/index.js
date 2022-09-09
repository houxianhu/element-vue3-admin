import { createRouter,createWebHistory, createWebHashHistory } from "vue-router";
import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        hidden: true,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect/index.vue')
          }
        ]
      },
      // {
      //   path: '/register',
      //   component: () => import('@/views/register.vue'),
      //   hidden: true
      // },
      {
        path: "/:pathMatch(.*)*",
        component: () => import('@/views/error/404.vue'),
        hidden: true
      },
      {
        path: '/401',
        component: () => import('@/views/error/401.vue'),
        hidden: true
      },
      {
        path: '',
        component: Layout,
        redirect: '/index',
        children: [
          {
            path: '/index',
            component: () => import('@/views/index.vue'),
            name: 'Index',
            meta: { title: '首页', icon: 'dashboard', affix: true }
          }
        ]
      },
      {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
          {
            path: 'profile',
            component: () => import('@/views/system/user/profile/index.vue'),
            name: 'Profile',
            meta: { title: '个人中心', icon: 'user' }
          }
        ]
      },
      {
        path: '/system/user-auth',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'role/:userId(\\d+)',
            component: () => import('@/views/system/user/authRole.vue'),
            name: 'AuthRole',
            meta: { title: '分配角色', activeMenu: '/system/user' }
          }
        ]
      },
      {
        path: '/system/role-auth',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'user/:roleId(\\d+)',
            component: () => import('@/views/system/role/authUser.vue'),
            name: 'AuthUser',
            meta: { title: '分配用户', activeMenu: '/system/role' }
          }
        ]
      },
      {
        path: '/system/dict-data',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'index/:dictId(\\d+)',
            component: () => import('@/views/system/dict/data.vue'),
            name: 'Data',
            meta: { title: '字典数据', activeMenu: '/system/dict' }
          }
        ]
      },
      {
        path: '/monitor/job-log',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'index',
            component: () => import('@/views/monitor/job/log.vue'),
            name: 'JobLog',
            meta: { title: '调度日志', activeMenu: '/monitor/job' }
          }
        ]
      },
      {
        path: '/tool/gen-edit',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'index/:tableId(\\d+)',
            component: () => import('@/views/tool/gen/editTable.vue'),
            name: 'GenEdit',
            meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
          }
        ]
      }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { top: 0 }
        }
    },
})


export default router;

