export class Server {
  branch: string
  name: string
  fetching: boolean
  status: string
  url: string
  subscription: boolean

  constructor (branch: string, name: string, url: string) {
    this.branch = branch
    this.name = name
    this.url = url
    this.fetching = false
    this.status = 'unconfirmed'
    this.subscription = false
  }

  public getBadgeUrl () {
    if (this.status === 'unconfirmed') {
      return 'https://img.shields.io/badge/' + this.name + '-checking-yellowgreen.svg'
    } else if (this.status === 'running') {
      return 'https://img.shields.io/badge/' + this.name + '-deploying-yellow.svg'
    } else {
      return 'https://img.shields.io/badge/' + this.name + '-done-green.svg'
    }
  }

  public setStatus (status) {
    let oldStatus = this.status
    this.status = status
    if (this.subscription) {
      if ((oldStatus !== 'running' && status === 'running') || (oldStatus === 'running' && status !== 'running')) {
        let notification = new Notification(this.branch, { body: this.name + ' changed from ' + oldStatus + ' to ' + status })
      }
    }
  }

  public subscribe () {
    this.subscription = !this.subscription
  }
}
