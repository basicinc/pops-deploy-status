export class Server {
  branch: string
  name: string
  fetching: boolean
  status: string
  url: string

  constructor (branch: string, name: string, url: string) {
    this.branch = branch
    this.name = name
    this.url = url
    this.fetching = false
    this.status = 'unconfirmed'
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
}
