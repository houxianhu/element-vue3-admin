<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card style="height: calc(100vh - 125px)">
          <div slot="header">
            <span>缓存列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              :text="true"
              :icon="RefreshRight"
              @click="refreshCacheNames()"
            ></el-button>
          </div>
          <el-table
            v-loading="loading"
            :data="cacheNames"
            :height="tableHeight"
            highlight-current-row
            @row-click="getCacheKeys"
            style="width: 100%"
          >
            <el-table-column label="序号" width="60" type="index"></el-table-column>

            <el-table-column
              label="缓存名称"
              align="center"
              prop="cacheName"
              :show-overflow-tooltip="true"
              :formatter="nameFormatter"
            ></el-table-column>

            <el-table-column
              label="备注"
              align="center"
              prop="remark"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="操作"
              width="60"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template #default="scope">
                <el-button
                  :text="true"
                  :icon="DeleteFilled"
                  @click="handleClearCacheName(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card style="height: calc(100vh - 125px)">
          <div slot="header">
            <span>键名列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              :text="true"
              :icon="RefreshRight"
              @click="refreshCacheKeys()"
            ></el-button>
          </div>
          <el-table
            v-loading="subLoading"
            :data="cacheKeys"
            :height="tableHeight"
            highlight-current-row
            @row-click="handleCacheValue"
            style="width: 100%"
          >
            <el-table-column label="序号" width="60" type="index"></el-table-column>
            <el-table-column
              label="缓存键名"
              align="center"
              :show-overflow-tooltip="true"
              :formatter="keyFormatter"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="60"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template #default="scope">
                <el-button
                  :text="true"
                  :icon="DeleteFilled"
                  @click="handleClearCacheKey(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :bordered="false" style="height: calc(100vh - 125px)">
          <div slot="header">
            <span>缓存内容</span>
            <el-button
              style="float: right; padding: 3px 0"
              :text="true"
              :icon="DeleteFilled"
              @click="handleClearCacheAll()"
              >清理全部</el-button
            >
          </div>
          <el-form :model="cacheForm">
            <el-row :gutter="32">
              <el-col :offset="1" :span="22">
                <el-form-item label="缓存名称:" prop="cacheName">
                  <el-input v-model="cacheForm.cacheName" :readOnly="true" />
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="22">
                <el-form-item label="缓存键名:" prop="cacheKey">
                  <el-input v-model="cacheForm.cacheKey" :readOnly="true" />
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="22">
                <el-form-item label="缓存内容:" prop="cacheValue">
                  <el-input
                    v-model="cacheForm.cacheValue"
                    type="textarea"
                    :rows="8"
                    :readOnly="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="CacheList">
import { listCacheName, listCacheKey, getCacheValue, clearCacheName, clearCacheKey, clearCacheAll } from "@/api/monitor/cache";
import { Delete, RefreshRight, DeleteFilled } from '@element-plus/icons-vue'
const cacheNames = ref([]);
const cacheKeys = ref([])
const cacheForm = reactive({})
const loading = ref(true)
const subLoading = ref(false)
const nowCacheName = ref('')
const tableHeight = computed(() => window.innerHeight - 200)

const proxy = getCurrentInstance()

 /** 查询缓存名称列表 */
const getCacheNames = async () => {
    loading.value = true;
    const res = await listCacheName()
    cacheNames.value = res.data;
    loading.value = false;
}

/** 刷新缓存名称列表 */
const refreshCacheNames = () => {
    getCacheNames();
    proxy.$modal.msgSuccess("刷新缓存列表成功");
}

/** 清理指定名称缓存 */
const handleClearCacheName = async (row)=> {
    const res = await clearCacheName(row.cacheName)
    proxy.$modal.msgSuccess("清理缓存名称[" + nowCacheName.value + "]成功");
    getCacheKeys();
}
    /** 查询缓存键名列表 */
    const getCacheKeys = async (row) => {
      const cacheName = row !== undefined ? row.cacheName : nowCacheName.value;
      if (cacheName === "") {
        return;
      }
      subLoading.value = true;
      const res = await listCacheKey(cacheName)
      cacheKeys.value = res.data;
      subLoading.value = false;
      nowCacheName.value = cacheName;
    }

    /** 刷新缓存键名列表 */
    const refreshCacheKeys = () => {
      getCacheKeys();
      proxy.$modal.msgSuccess("刷新键名列表成功");
    }
    /** 清理指定键名缓存 */
    const handleClearCacheKey = async (cacheKey) => {
      await clearCacheKey(cacheKey)
      proxy.$modal.msgSuccess("清理缓存键名[" + cacheKey + "]成功");
      getCacheKeys();
    }
    /** 列表前缀去除 */
    const nameFormatter = (row) => {
      return row.cacheName.replace(":", "");
    }
    /** 键名前缀去除 */
    const keyFormatter = (cacheKey) => {
      return cacheKey.replace(nowCacheName.value, "");
    }
    /** 查询缓存内容详细 */
    const handleCacheValue = async (cacheKey) => {
      const res = await getCacheValue(nowCacheName.value, cacheKey)
      cacheForm.value = res.data;
    }
    /** 清理全部缓存 */
    const handleClearCacheAll = async () => {
      await clearCacheAll()
      proxy.$modal.msgSuccess("清理全部缓存成功");
    }

onMounted(() => {
    getCacheNames()
})
</script>
