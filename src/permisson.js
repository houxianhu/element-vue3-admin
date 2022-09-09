import router from './router'
import useStore from './store/index';
import { getToken } from './utils/auth';
import { isHttp } from '@/utils/validate'
import { isRelogin } from '@/utils/request'

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  const {user, permission} = useStore();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/index', replace: true})
    } else {
      if(user.roles.length === 0) {
        isRelogin.show = true;
        try {
          const res = await user.getUesrInfo()
          isRelogin.show = false;
          const accessRoutes = await permission.generateRoutes(res.roles)
          accessRoutes.forEach(route => {
            if(!isHttp(route.path)) {
              router.addRoute(route)
            }
          })
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          user.Logout()
          next(`/login?redirect=${to.path}`);
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})