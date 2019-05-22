<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <transition-group name="fade"> -->
    <router-view/>
    <!-- <router-view name="Login" style=""></router-view> -->
    <router-view name="header" style=""></router-view>
    <router-view name="main" style=""></router-view>
    <router-view name="footer" style=""></router-view>
    <!-- </transition-group> -->
    <p>导航 ：
      <router-link to="/">首页</router-link>
      <router-link to="/helloworld">helloworld页面</router-link> |
      <router-link to="/hi">Hi页面</router-link> |
      <router-link :to="{name:'Hi1',params:{username:'xiaoxiao'}}">Hi页面1</router-link>|
      <router-link to="/hi/hi2">-Hi页面2</router-link>|
      <router-link to="/params/198/jspang website is very good">params</router-link> |
      <router-link to="/bbbbbb">我是瞎写的</router-link> |
      <router-link to="/count">计数</router-link> |
    </p>
    <p>{{ $route.name}}</p>
    <button @click="goback">后退</button>
    <button @click="gohome">gohome</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
         goback(){
            this.$nextTick(function () {
              this.$router.go(-1); }
            )
          
        },
        gohome(){
            this.$nextTick(function () {
              this.$router.push('/'); }
            )
          
        }
   
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
