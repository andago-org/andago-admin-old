import { Authing as AuthingClient } from '@authing/browser';

class Authing {
  public client = new AuthingClient({
    domain: 'https://andago.authing.cn',// 应用的认证地址
    appId: '64a5715a3b3a89342064261e',// 应用 ID
    redirectUri: 'http://localhost:3000',// 登录回调地址
  })

  public loginState: any = null

  public async start()
  {
    if (this.client.isRedirectCallback()) {
      console.log('redirect')

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后，
       * 需要配合 handleRedirectCallback 方法，在回调端点处理 Authing 发送
       * 的授权码或 token，获取用户登录态
       */
      this.client.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/')
      });
    } else {
      const state = await this.client.getLoginState()
      console.log(await this.client.getUserInfo())
      console.log(state)
    }
  }

  public async login() {
    await this.client.loginWithRedirect()
  }

  // public static async getLoginState() {
  //   try {
  //     this.loginState = await this.client.getLoginState()
  //
  //     console.log(this.loginState)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

const authing = new Authing()

export default authing
