import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Params from '@/components/Params'
import Error from '@/components/Error'
import Count from '@/components/Count'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Main from '@/components/Main'
Vue.use(Router)

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)

const router= new Router({
  mode:'history',
  routes: [
    {
      path:'*',
      component:Error
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/', // 默认地址
    //   redirect: '/index'
    // },
    {
      path: '/',
      name: 'Index',
      components: {
        // default:Header,
        // default:Footer
        header:Header,
        main:Main,
        footer:Footer
      }
    },
    {
    path:'/count',
    name:'Count',
    component:Count
    },
    {
      path:'/goParams/:newsId(\\d+)/:newsTitle',
      redirect:'/params/:newsId(\\d+)/:newsTitle'
    },
    {
      path:'/params/:newsId/:newsTitle',
      name:'Params',
      component:Params
    },
    {
      path:'/hi1',
      name:'Hi1',
      component:Hi1
    },
    {
      path:'/hi/hi2',
      name:'Hi2',
      component:Hi2,
      beforeRouteEnter:((to, from, next) => {
          // ${//does NOT have access to `this` component instance}
          console.log('我进入了Hi2模板');
          console.log(to);
          console.log(from);
          next();
        }
      )
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      components: {
        default:HelloWorld,
        left:Hi1,
        right:Hi2
      }
    },
    {
      path: '/Hi',
      name: 'Hi',
      components: {
        default:Hi,
        left:Hi2,
        right:Hi1
      }
    }
    // {
    //   path: '/hi',
    //   name: 'Hi',
    //   component: Hi,
    //   children:[
    //     {path:'/',component:Hi},
    //     {path:'hi1',name:'hi1',component:Hi1},
    //     {path:'hi2',component:Hi2},
    //   ]
    // }
  ]
})
// 全局路由守卫

router.beforeEach((to, from, next) => {
  console.log('navigation-guards');
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 
  const nextRoute = ['Index', 'Count', 'HelloWorld'];
  // console.log(document.cookie())
  let isLogin = false
  // let isLogin1 = this.$cookies.isKey("g_userName");  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) { 
    if (!isLogin) {
      console.log('what fuck');
      router.push({ name: 'Login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'Login') {
    if (isLogin) {
      router.push({ name: 'Index' });
    }
  }
  next();
});

export default router
