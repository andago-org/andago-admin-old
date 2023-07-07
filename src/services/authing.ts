import { Authing as AuthingClient } from '@authing/web';

class Authing {
  public client = new AuthingClient({
    domain: import.meta.env.VITE_AUTHING_DOMAIN,
    appId: import.meta.env.VITE_AUTHING_APP_ID,
    redirectUri: import.meta.env.VITE_APP_BASE_URL,
  } as any)

  public loginState: any = null

  public async check()
  {
    if (this.client.isRedirectCallback()) {
      console.log("redirect")

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后，
       * 需要配合 handleRedirectCallback 方法，在回调端点处理 Authing 发送
       * 的授权码或 token，获取用户登录态
       */
      this.client.handleRedirectCallback().then((res) => {
        this.loginState = res as any
        window.location.replace("/")
      });
    } else {
      await this.getLoginState()
    }
  }

  public async getLoginState() {
    const res = await this.client.getLoginState() as any
    this.loginState = res as any

    if (this.loginState == null)
    {
      await this.login()
    }
  }

  public async login() {
    await this.client.loginWithRedirect()
  }

  public async logout() {
    await this.client.logoutWithRedirect({
      redirectUri: import.meta.env.VITE_APP_BASE_URL,
    })
  }
}

const authing = new Authing()

export default authing
