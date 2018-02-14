import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent)
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home'

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (require('./components/home') as any).HomeComponent)))
}

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
