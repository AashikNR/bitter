import Vue from 'vue'
import VueRouter from 'vue-router'
import Add from '../views/Addblog.vue'
import About from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import User from '../views/Otheruser.vue'
import other from '../components/Otherprofile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/addnewblog',
    name: 'Add',
    component: Add
  },
  {
    path: '/',
    name: 'Login',
    component: About
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/other',
    name: 'other',
    component: other,
    props: {
      header: true,
      content: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
