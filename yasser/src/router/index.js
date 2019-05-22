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

export default new Router({
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
