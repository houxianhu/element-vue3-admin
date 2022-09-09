import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router';
import './styles/index.scss';
import App from './App.vue';
import {createPinia} from 'pinia';
import './permisson';
import directive from './directive' // directive

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// 引入svg注册脚本
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue'
// import elementIcons from '@/components/SvgIcon/svgicon'

// 分页组件
import Pagination from '@/components/Pagination/index.vue'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar/index.vue'
// 文件上传组件
import FileUpload from "@/components/FileUpload/index.vue"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload/index.vue"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview/index.vue"
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect/index.vue'
// 字典标签组件
import DictTag from '@/components/DictTag/index.vue'

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel } from '@/utils/common'

const pinia = createPinia();

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel

directive(app)

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('svg-icon', SvgIcon)
// app.use(elementIcons)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(plugins)
app.mount('#app')



