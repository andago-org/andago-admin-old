<template>
  <div>
    <v-btn color="primary" @click="login">Login</v-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Authing } from '@authing/browser';

const loginState = ref(null as any)

const authing = new Authing({
  domain: 'https://andago.authing.cn',// 应用的认证地址
  appId: '64a5715a3b3a89342064261e',// 应用 ID
  redirectUri: 'https://localhost:3000',// 登录回调地址
});

onMounted(() => {


  if (authing.isRedirectCallback()) {
    console.log('redirect');

    /**
     * 以跳转方式打开 Authing 托管的登录页，认证成功后，
     * 需要配合 handleRedirectCallback 方法，在回调端点处理 Authing 发送
     * 的授权码或 token，获取用户登录态
     */
    authing.handleRedirectCallback().then((res) => {
      loginState.value = res;
      window.location.replace('/');
    });
  } else {
    getLoginState();
  }
});

function login() {
  authing.loginWithRedirect();
}

async function getLoginState() {
  try {
    const state = await authing.getLoginState();
    loginState.value = state;
  } catch (error) {
    console.log(error);
  }
}
</script>