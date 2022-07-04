<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '无效手机号' },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /\d{6}/, message: '无效验证码' },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button
            v-if="showSendBtn"
            round
            size="small"
            class="send-sms-btn"
            native-type="button"
            @click="onSendCode"
            >发送验证码</van-button
          >
          <van-count-down v-else :time="60000" format="ss 秒后重新获取" @finish="showSendBtn=true"/>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="default" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13988888888',
        code: '246810'
      },
      showSendBtn: true
    }
  },
  components: {},
  methods: {
    // 发送验证码
    async onSendCode () {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        console.log('error')
        return false
      }
      console.log('ll')
      // 启动倒计时
      this.showSendBtn = false
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('验证码已发送，请注意查看手机短信')
      } catch (error) {
        this.showSendBtn = true
        if (error.status === 429) {
          this.$toast.fail('发送验证码过于频繁，请稍后再试')
        } else {
          this.$toast.fail('发送失败，请稍后再试')
        }
      }
    },
    onSubmit () {
      const user = this.user
      // 表单校验
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })

      // 校验通过-》提交请求
      login(user)
        .then((response) => {
          // 存储token
          this.$store.commit('setUser', response.data)
          this.$toast.success('登录成功')
          // todo 跳转首页
        })
        .catch((error) => {
          if (error.status === 400) {
            this.$toase.fail(error.data.message)
          } else {
            this.$toase.fail('异常，请稍后再试')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 156px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      color: #fff;
    }
  }
}
</style>
