import Vue from 'vue'
import VueRouter from 'vue-router'
//路由懒加载
const Recommend = () =>import ('../components/Recommend')
const Recditail = () =>import ('../components/Recditail')
const Singer = () =>import  ('../components/Singer/index.vue')
const Rank = () =>import ('../components/Rank')
const Ranksinger = () =>import  ('components/Ranksinger')
const Search = () =>import  ('../components/Search')
const Detail = () =>import  ('components/Detail')
const My = () =>import ('components/My')

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
   {
     path:'/recommend',
     component:Recommend,
     children:[
      {
        path:':disstid',
        name:'recditail',
        component:Recditail
      }
    ]
   },
   {
    path:'/singer',
    component:Singer,
    children:[
      {
        path:':singermid',
        name:'detail',
        component:Detail
      }
    ]
    },{
      path:'/rank',
      component:Rank,
      children:[
        {
          path:':topid',
          name:'ranksinger',
          component:Ranksinger
        }
      ]
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/my',
      name:'my',
      component:My
    },
    {
      path:'/',
      redirect:'/recommend',
    }
  ]
})

export default router
