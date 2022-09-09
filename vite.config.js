import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import Inspect from 'vite-plugin-inspect'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig(({mode, command}) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  console.log(VITE_APP_ENV)
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [
          ElementPlusResolver(),
          // IconsResolver({
          //   prefix: 'Icon',
          // })
        ],
        dts: false, // path.resolve(__dirname, 'src/auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ['ep'],
          //   alias: path.resolve(__dirname, 'src/assets/icons')
          // }),
          ElementPlusResolver({
            importStyle: 'sass'
          }),
        ],
        dts: false, // path.resolve(__dirname, 'src/components.d.ts'),
      }),
      // Icons({
      //   autoInstall: true,
      // }),
      ElementPlus({
        // options
      }),
      createSvgIconsPlugin({
         // 指定需要缓存的图标文件夹
         iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
         // 指定symbolId格式
         symbolId: 'icon-[dir]-[name]'
      })
      // Inspect()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: true,
      port: 3008,
      open: true,
      proxy: {
        '/api': {
          target:  'http://vue.ruoyi.vip/prod-api',//'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
  }
})
