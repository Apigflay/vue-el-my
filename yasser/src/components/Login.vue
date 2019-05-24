<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">mall-admin-web</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
            <!-- <router-link to="/home"> -->
          <el-button style="width: 100%" type="primary" :loading="loading" @click="gogogo">
            登录
          </el-button>
          <!-- </router-link> -->
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
  import qs from 'qs'
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,SupportUrl} from '@/utils/support';
  import login_center_bg from './imgs/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible:false
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      gogogo() {
        // api/AdminManager/AdminList
      //   this.$axios.get('http://192.168.84.170:9005/api/AdminManager/AdminList', {  
      //   //params参数必写 , 如果没有参数传{}也可以
      //     params:{  
      //       selectPageNum:1,
      //       everyPageNum:10
      //     }
      // })
        this.$axios({  
          url: '/api/AdminManager/Login',
          method: 'post',
        //params参数必写 , 如果没有参数传{}也可以
          data:{  
            account:"yxh",
            passwd:"21232f297a57a5a743894a0e4a801fc3"
          }
        })
        // this.$axios.post('http://192.168.84.170:9005/api/AdminManager/Login', {  
        // //params参数必写 , 如果没有参数传{}也可以
        //   params:{  
        //     account:"yxh",
        //     passwd:"21232f297a57a5a743894a0e4a801fc3"
        //   }
        // })
        .then((res)=>{
          console.log(res)
          if(res.data.code==1){
            this.$cookies.set("g_userName", 'admin')
            this.$router.push({path: '/'})
          }
        })
        .catch((err)=>{
          console.log(err)
        })

        // console.log(this.$refs.loginForm.validate)
        // this.$refs.loginForm.validate(valid => {
        //   if (valid) {
        //     let isSupport = getSupport();
        //     if(isSupport===undefined||isSupport==null){
        //       this.dialogVisible =true;
        //       return;
        //     }
        //     this.loading = true;
        //     // this.$store.dispatch('Login', this.loginForm).then(() => {
        //     //   this.loading = false;
        //       this.$router.push({path: '/'})
        //     // }).catch(() => {
        //     //   this.loading = false
        //     // })
        //   } else {
        //     console.log('参数验证不合法！');
        //     return false
        //   }
        // })
      },
      dialogConfirm(){
        this.dialogVisible =false;
        setSupport(true);
        window.location.href=SupportUrl;
      },
      dialogCancel(){
        this.dialogVisible = false;
        setSupport(false);
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
