import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import axios, { AxiosResponse } from 'axios'
import { Server } from './server'

import './home.scss'

@Component({
  template: require('./home.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  }
})
export class HomeComponent extends Vue {

  package: string = 'vue-webpack-typescript'
  repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript'
  mode: string = process.env.ENV
  protected axios
  private servers: Server[] = [
    new Server('release', 'Shikigaku', 'http://shikigakucloud.com'),
    new Server('staging', 'Staging', 'https://s.skillhub.jp'),
    new Server('basic', 'Basic', 'https://pops.basicinc.jp')
  ]
  private url = 'https://circleci.com/api/v1.1/project/github/happa/pops/tree/:branch?circle-token=:token'

  constructor () {
    super()
    this.axios = axios
  }

  mounted () {
    if ((Notification as any).permission !== 'denied' && (Notification as any).permission !== 'granted') {
      (Notification as any).requestPermission()
    }
    this.$nextTick(() => {
      this.loadServers()
    })
  }

  public subscribe (e) {
    if (e.target.checked) {
      let server = this.servers.find((s) => s.branch === e.target.value)
      server.subscribe()
    }
  }

  private loadServers () {
    let token = this.$route.hash.substr(1)
    let unfetchedServer = this.servers.filter((s) => !s.fetching)
    if (unfetchedServer.length) {
      for (let s of unfetchedServer) {
        s.fetching = true
        this.axios.get(this.getUrl(s.branch, token)).then((response: AxiosResponse) => {
          let commit = response.data.find((commit) => commit.status === 'running') || response.data[0]
          s.setStatus(commit.status)
          setTimeout(() => {
            s.fetching = false
          }, 1000)
        }, (error) => {
          console.error(error)
          setTimeout(() => {
            s.fetching = false
          }, 1000)
        })
      }
    }
    let that = this
    setTimeout(() => {
      that.$nextTick(() => {
        that.loadServers()
      })
    }, 1000)
  }

  private getUrl (branch, token) {
    return this.url.replace(':branch', branch).replace(':token', token)
  }
}
