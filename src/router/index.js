import Vue from 'vue'
import Router from 'vue-router'
import Rules from '@/components/Rules'
import Editor from '@/components/Editor'
import Viewer from '@/components/Viewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/edit/:id',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/view/:ids',
      name: 'Viewer',
      component: Viewer
    }
  ]
})
