import Vue from 'vue'
import Router from 'vue-router'
import SearchRepo from './components/SearchRepo.vue'
import SearchUser from './components/SearchUser.vue'
import ForksList from './components/ForksList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search-repo',
      component: SearchRepo
    },
    {
      path: '/search-user',
      name: 'search-user',
      component: SearchUser
    },
    {
      path: '/forks-list/:repo/:id',
      name: 'forks-list',
      component: ForksList
    },
    
  ]
})