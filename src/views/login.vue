<template>
  <div class="public-page">
    <div class="login-box">
      <h1 class="text-center">element-plus-vite-vue3-admin系统</h1>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login-form"
        size="large"
      >
        <el-form-item label="" prop="username">
          <el-input
            :prefix-icon="UserFilled"
            v-model="loginForm.username"
            type="text"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="loginForm.password"
            :type="inpuType"
            :clearable="true"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="showPwd">
                <View v-if="inpuType === 'password'" />
                <Hide v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="code" v-if="captchaOnOff">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            :clearable="true"
            @keyup.enter="submitForm(loginFormRef)"
          >
            <template #prefix>
              <svg-icon icon-class="validCode"/>
            </template>
            <template #append>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img" />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-checkbox v-model="loginForm.remember" label="记住密码" size="large" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(loginFormRef)"
            :loading="loading"
            :disabled="loading"
            style="width: 100%; padding: 5px 0"
            >{{loading?'登录中...':'登录'}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { Lock, UserFilled } from "@element-plus/icons-vue";
import useStore from "../store";
import { getCodeImg } from "@/api/login";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import Cookies from "js-cookie";
import router from "../router";
import SvgIcon from "@/components/SvgIcon/index.vue";

const loginFormRef = ref();
const inpuType = ref("password");
const {user} = useStore()

const loginForm = reactive({
  username: Cookies.get("username") || 'admin',
  password: decrypt(Cookies.get("password")) || "admin123",
  uuid: "",
  remember: !!Cookies.get("rememberMe"),
});

const rules = reactive({
  username: [{ required: true, trigger: ["blur", "change"], message: "请输入您的账号" }],
  password: [{ required: true, trigger: ["blur", "change"], message: "请输入您的密码" }],
  code: [{ required: true, trigger: ["blur", "change"], message: "请输入验证码" }],
});

const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaOnOff = ref(false);

onMounted(async () => {
  getCode();
});

const getCode = async () => {
  const res = await getCodeImg();
  captchaOnOff.value = res.captchaEnabled;
  if (captchaOnOff.value) {
    codeUrl.value = "data:image/gif;base64," + res.img;
    loginForm.uuid = res.uuid;
  }
};
const showPwd = () => {
  if (inpuType.value === "password") {
    inpuType.value = "text";
  } else {
    inpuType.value = "password";
  }
};
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      if (loginForm.remember) {
        Cookies.set("username", loginForm.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.password), { expires: 30 });
        Cookies.set("rememberMe", loginForm.remember, { expires: 30 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }

      loading.value = true
      try {
        const res = await user.Login(loginForm);
        if (res.code == 200) router.push("/index");
        loading.value = true
      } catch (error) {
        loginForm.code = "";
        loading.value = false
        if(captchaOnOff.value) {
          getCode();
        }
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.public-page {
  background: url("../assets/images/login-bg.png") center no-repeat;
  display: grid;
  place-items: center;
  .login-box {
    width: 600px;
    padding: 40px 30px;
    background-color: var(--el-color-white);
    border-radius: 8px;
    box-shadow: var(--el-box-shadow-lighter);
    h1 {
      margin-top: 20px;
    }
    .login-form {
      padding: 60px 50px 0;
      // .el-form-item--large:not(:nth-child(3)){
      //     // margin-bottom: 36px;
      // }
      ::v-deep .el-input__prefix {
        font-size: 20px;
        font-weight: bold;
      }
      .login-code {
        height: 40px;
        img {
          height: 100%;
          cursor: pointer;
        }
      }
      ::v-deep .el-input-group__append {
        padding: 0;
      }
    }
  }
}
</style>
